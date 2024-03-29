import {Controller} from '../../common/controller/controller.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {Request, Response} from 'express';
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
import { FavoriteServiceInterface } from '../favorite/favorite-service.interface.js';
import {FavoriteEntity} from '../favorite/favorite.entity.js';
import typegoose, {DocumentType} from '@typegoose/typegoose';
import {PrivateRouteMiddleware} from '../../common/middlewares/private-route.middleware.js';
import { ConfigInterface } from '../../common/config/config.interface.js';
import CheckOwnerMiddleware from '../../common/middlewares/check-owner.middleware.js';
import {UserServiceInterface} from '../user/user-service.interface.js';
import UserToClientDto from '../user/dto/user-to-client.dto.js';
import OfferToClientDto from './dto/offer-to-client.dto.js';
import {ObjectId} from 'mongoose';
import CommentToClientDto from '../comment/dto/comment-to-client.dto.js';

const {isDocument} = typegoose;

type ParamsGetOffer = {
  offerId: string;
}

type ParamsOfferFavoriteStatus = {
  offerId: string;
  status: string;
}

@injectable()
export default class OfferController extends Controller {

  constructor(
    @inject(Component.LoggerInterface) protected readonly logger: LoggerInterface,
    @inject(Component.ConfigInterface) configService: ConfigInterface,
    @inject(Component.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
    @inject(Component.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
    @inject(Component.FavoriteServiceInterface) private readonly favoriteService: FavoriteServiceInterface,
    @inject(Component.UserServiceInterface) private readonly userService: UserServiceInterface,
  ) {
    super(logger, configService);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.getOffers});
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.createOffer,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto),
      ],
    });
    this.addRoute({path: '/premium', method: HttpMethod.Get, handler: this.getPremiumOffers});
    this.addRoute({
      path: '/favorites',
      method: HttpMethod.Get,
      handler: this.getFavoriteOffers,
      middlewares: [new PrivateRouteMiddleware()],
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.getOneOffer,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Put,
      handler: this.updateOffer,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new ValidateDtoMiddleware(CreateOfferDto),
        new CheckOwnerMiddleware(this.offerService, 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.deleteOffer,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
        new CheckOwnerMiddleware(this.offerService, 'offerId'),
      ]
    });

    this.addRoute({
      path: '/favorites/:offerId/:status',
      method: HttpMethod.Post,
      handler: this.changeFavoriteStatus,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ],
    });

    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Post,
      handler: this.createComment,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });

    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getCommentsByOfferId,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });

  }

  private async getHost(id: ObjectId | string) {
    const host = await this.userService.findById(id);

    const extendHost = {
      ...host?.toObject(),
      isPro: host?.userType === 'pro',
      avatarUrl: host?.avatarPath,
    };

    return extendHost;
  }

  public async getOffers(req: Request, res: Response): Promise<void> {

    const offers = await this.offerService.findAll();

    const extendedOffers = await Promise.all(offers.map(

      async (offer) => ({
        ...offer.toObject(),
        isFavorite: await this.favoriteService.getFavoriteStatus(offer.id, req?.user?.id),
        host: fillDTO(UserToClientDto, await this.getHost(offer.toObject().author)),
      })
    ));

    this.send(res, StatusCodes.OK, fillDTO(OfferToClientDto, extendedOffers));
  }

  public async createOffer(
    {body, user}: Request<unknown, unknown, CreateOfferDto>,
    res: Response,
  ): Promise<void> {
    const newOffer = await this.offerService.create(body, user.id);
    const host = fillDTO(UserToClientDto, await this.userService.findById(user.id));

    const extendedOffer = {
      ...newOffer.toObject(),
      isFavorite: false,
      host: fillDTO(UserToClientDto, host),
    };

    this.ok(res, fillDTO(OfferToClientDto, extendedOffer));
  }

  public async getOneOffer(
    req: Request<core.ParamsDictionary | ParamsGetOffer>,
    res: Response
  ): Promise<void> {
    const {params} = req;
    const {offerId} = params;
    const offer = await this.offerService.findById(offerId);

    const extendedOffer = {
      ...offer?.toObject(),
      isFavorite: await this.favoriteService.getFavoriteStatus(offer?.id, req?.user?.id),
      host: fillDTO(UserToClientDto, await this.getHost(req?.user?.id)),
    };

    this.ok(res, fillDTO(OfferToClientDto, extendedOffer));
  }

  public async updateOffer(
    req: Request<core.ParamsDictionary | ParamsGetOffer, unknown, CreateOfferDto>,
    res: Response,
  ): Promise<void> {
    const {params: {offerId}, body} = req;
    const updatedOffer = await this.offerService.updateById(offerId, body);

    const extendedOffer = {
      ...updatedOffer?.toObject(),
      isFavorite: await this.favoriteService.getFavoriteStatus(updatedOffer?.id, req?.user?.id),
      host: fillDTO(UserToClientDto, await this.getHost(req?.user?.id)),
    };

    this.ok(res, fillDTO(OfferToClientDto, extendedOffer));
  }

  public async deleteOffer(
    {params: {offerId}}: Request<core.ParamsDictionary | ParamsGetOffer>,
    res: Response
  ): Promise<void> {
    await this.offerService.deleteById(offerId);
    await this.commentService.deleteByOfferId(offerId);
    this.noContent(res);
  }

  public async getPremiumOffers(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findPremium(MAX_PREMIUM_COUNT);

    const extendedOffers = await Promise.all(offers.map(
      async (offer) => ({
        ...offer.toObject(),
        isFavorite: await this.favoriteService.getFavoriteStatus(offer.id, null),
      })
    ));

    this.ok(res, fillDTO(OfferDto, extendedOffers));
  }

  public async getFavoriteOffers(req: Request, res: Response): Promise<void> {

    const {user} = req;

    const favorites = await this.favoriteService.getFavorites(user.id);

    const extendedOffers = favorites.map((favorite: DocumentType<FavoriteEntity>) => {
      if (isDocument(favorite.offer)) {
        return {
          ...favorite.offer.toObject(),
          isFavorite: true,
        };
      }

      return null;
    });

    this.ok(res, fillDTO(OfferDto, extendedOffers));
  }

  public async changeFavoriteStatus(
    {params: {offerId, status}, user}: Request<core.ParamsDictionary | ParamsOfferFavoriteStatus>,
    res: Response
  ): Promise<void> {

    const newStatus = await this.favoriteService.setFavoriteStatus(
      offerId,
      user.id,
      Boolean(parseInt(status, 10)),
    );

    const offer = await this.offerService.findById(offerId);
    const extendedOffer = {...offer?.toObject(), isFavorite: newStatus};

    this.ok(res, fillDTO(OfferDto, extendedOffer));
  }


  public async createComment(
    req: Request<core.ParamsDictionary | ParamsGetOffer, CreateCommentDto>,
    res: Response
  ): Promise<void> {
    const {body, params: {offerId}, user} = req;
    const comment = await this.commentService.create(body, user.id, offerId);
    this.created(res, fillDTO(CommentDto, comment));
  }

  public async getCommentsByOfferId({params}: Request, res: Response): Promise<void> {
    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentToClientDto, comments));
  }

}
