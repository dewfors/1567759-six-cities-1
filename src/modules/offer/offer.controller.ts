import {Controller} from '../../common/controller/controller.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {Request, Response} from 'express';
import HttpError from '../../common/errors/http-error.js';
import { StatusCodes } from 'http-status-codes';
import { OfferServiceInterface } from './offer-service.interface.js';
import * as core from 'express-serve-static-core';
import {fillDTO} from '../../utils/common.js';
import OfferDto from './dto/offer.dto.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import { MAX_PREMIUM_COUNT } from '../../utils/const.js';
import {ValidateObjectIdMiddleware} from '../../common/middlewares/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from '../../common/middlewares/validate-dto.middleware.js';
import CommentDto from '../comment/dto/comment.dto.js';
import { CommentServiceInterface } from '../comment/comment-service.interface.js';
import CreateCommentDto from '../comment/dto/create-comment.dto.js';
import { DocumentExistsMiddleware } from '../../common/middlewares/document-exists.middleware.js';

type ParamsGetOffer = {
  offerId: string;
}

@injectable()
export default class OfferController extends Controller {

  constructor(
    @inject(Component.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.getOffers});
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.createOffer,
      middlewares: [new ValidateDtoMiddleware(CreateOfferDto)]
    });
    this.addRoute({path: '/premium', method: HttpMethod.Get, handler: this.getPremiumOffers});
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.getOneOffer,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Put,
      handler: this.updateOffer,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(CreateOfferDto)
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.deleteOffer,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });
    this.addRoute({path: '/favorites', method: HttpMethod.Get, handler: this.getFavoriteOffers});
    this.addRoute({path: '/favorites/:offerId/:status', method: HttpMethod.Post, handler: this.changeFavoriteStatus});

    this.addRoute({
      path: `/:offerId/comments`,
      method: HttpMethod.Post,
      handler: this.createComment,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });

    this.addRoute({
      path: `/:offerId/comments`,
      method: HttpMethod.Get,
      handler: this.getCommentsByOfferId,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });

  }

  public async getOffers(_req: Request, res: Response): Promise<void> {

    const offers = await this.offerService.findAll();
    this.send(res, StatusCodes.OK, fillDTO(OfferDto, offers));
  }

  public async createOffer(
    {body}: Request<unknown, unknown, CreateOfferDto>,
    res: Response,
  ): Promise<void> {
    const newOffer = await this.offerService.create(body);
    const extendedOffer = {
      ...newOffer.toObject(),
      isFavorite: false,
    };

    this.ok(res, fillDTO(OfferDto, extendedOffer));
  }

  public async getOneOffer(
    {params}: Request<core.ParamsDictionary | ParamsGetOffer>,
    res: Response
  ): Promise<void> {
    const {offerId} = params;
    const offer = await this.offerService.findById(offerId);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found.`,
        'OfferController'
      );
    }

    this.ok(res, offer);
  }

  public async updateOffer(
    {params: {offerId}, body}: Request<core.ParamsDictionary | ParamsGetOffer, unknown, CreateOfferDto>,
    res: Response,
  ): Promise<void> {
    const updatedOffer = await this.offerService.updateById(offerId, body);

    this.ok(res, fillDTO(OfferDto, updatedOffer));
  }

  public async deleteOffer(
    {params: {offerId}}: Request<core.ParamsDictionary | ParamsGetOffer>,
    res: Response
  ): Promise<void> {
    await this.offerService.deleteById(offerId);

    this.noContent(res);
  }

  public async getPremiumOffers(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findPremium(MAX_PREMIUM_COUNT);
    console.log(offers);
    this.ok(res, fillDTO(OfferDto, offers));

  }

  public async getFavoriteOffers(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'Not implemented!', 'OfferController');
  }

  public async changeFavoriteStatus(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'Not implemented!', 'OfferController');
  }


  public async createComment(
    {body, params: {offerId}}: Request<core.ParamsDictionary | ParamsGetOffer, CreateCommentDto>,
    res: Response
  ): Promise<void> {
    const comment = await this.commentService.create(body, '627b80b930e4a5aa9d9b4cab', offerId);
    this.created(res, fillDTO(CommentDto, comment));
  }

  public async getCommentsByOfferId({params}: Request, res: Response): Promise<void> {
    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentDto, comments));
  }



}
