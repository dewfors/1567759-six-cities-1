import {HttpMethod} from './http-method.enum.js';
import {NextFunction, Request, Response} from 'express';
import { MiddlewareInterface } from './middleware.interface.js';
import { ControllerInterface } from '../common/controller/controller.interface.js';

export interface RouteInterface {
  path: string;
  method: HttpMethod;
  handler: (this: ControllerInterface, req: Request, res: Response, next: NextFunction) => void;
  middlewares?: MiddlewareInterface[];
}
