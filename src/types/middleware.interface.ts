import {NextFunction, Request, Response} from 'express';

export interface MiddlewareInterface {
  execute<T extends MiddlewareInterface>(this: T, req: Request, res: Response, next: NextFunction): void;
}
