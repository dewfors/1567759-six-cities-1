import {Controller} from '../../common/controller/controller.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {Request, Response} from 'express';
import HttpError from '../../common/errors/http-error.js';
import { StatusCodes } from 'http-status-codes';

@injectable()
export default class CommentController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) protected readonly logger: LoggerInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController...');

    this.addRoute({path: '/offers/:offerId/comments', method: HttpMethod.Get, handler: this.getComments});
    this.addRoute({path: '/offers/:offerId/comments', method: HttpMethod.Post, handler: this.createComment});

  }

  public async getComments(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'Not implemented!', 'CommentController');
  }

  public async createComment(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'Not implemented!', 'CommentController');
  }

}
