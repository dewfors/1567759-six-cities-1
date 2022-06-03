import {Controller} from '../../common/controller/controller.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {Request, Response} from 'express';
import HttpError from '../../common/errors/http-error.js';
import { StatusCodes } from 'http-status-codes';

@injectable()
export default class OfferController extends Controller {

  constructor(
    @inject(Component.LoggerInterface) protected readonly logger: LoggerInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.getOffers});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.createOffer});
    this.addRoute({path: '/:offerId', method: HttpMethod.Get, handler: this.getOneOffer});
    this.addRoute({path: '/:offerId', method: HttpMethod.Put, handler: this.updateOffer});
    this.addRoute({path: '/:offerId', method: HttpMethod.Delete, handler: this.deleteOffer});
    this.addRoute({path: '/premium', method: HttpMethod.Get, handler: this.getPremiumOffers});
    this.addRoute({path: '/favorites', method: HttpMethod.Get, handler: this.getFavoriteOffers});
    this.addRoute({path: '/favorites/:offerId/:status', method: HttpMethod.Post, handler: this.changeFavoriteStatus});

  }

  public async getOffers(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'Not implemented!', 'OfferController');
  }

  public async createOffer(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'Not implemented!', 'OfferController');
  }

  public async getOneOffer(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'Not implemented!', 'OfferController');
  }

  public async updateOffer(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'Not implemented!', 'OfferController');
  }

  public async deleteOffer(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'Not implemented!', 'OfferController');
  }

  public async getPremiumOffers(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'Not implemented!', 'OfferController');
  }

  public async getFavoriteOffers(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'Not implemented!', 'OfferController');
  }

  public async changeFavoriteStatus(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'Not implemented!', 'OfferController');
  }





}

