import {NextFunction, Request, Response} from 'express';
import {MiddlewareInterface} from '../../types/middleware.interface.js';
import HttpError from '../errors/http-error.js';
import {StatusCodes} from 'http-status-codes';
import {CheckOwnerInterface} from '../../types/check-owner.interface.js';

class CheckOwnerMiddleware implements MiddlewareInterface {
  constructor(
    private readonly service: CheckOwnerInterface,
    private readonly param: string
  ) {}

  public async execute(req: Request, _res: Response, next: NextFunction): Promise<void> {

    const {params, user} = req;

    console.log(user);
    console.log(params);

    const documentId = params[this.param];
    console.log(documentId);

    if (!await this.service.isOwner(user.id, documentId)) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'access error.',
        'CheckOwnerMiddleware'
      );
    }

    next();
  }
}

export default CheckOwnerMiddleware;
