import {Controller} from '../../common/controller/controller.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component.types.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {HttpMethod} from '../../types/http-method.enum.js';
import {Request, Response} from 'express';
import CreateUserDto from './dto/create-user.dto.js';
import { UserServiceInterface } from './user-service.interface.js';
import { ConfigInterface } from '../../common/config/config.interface.js';
import HttpError from '../../common/errors/http-error.js';
import { StatusCodes } from 'http-status-codes';
import UserDto from './dto/user.dto.js';
import { createJWT, fillDTO } from '../../utils/common.js';
import LoginUserDto from './dto/login-user.dto.js';
import {ValidateDtoMiddleware} from '../../common/middlewares/validate-dto.middleware.js';
import { ValidateObjectIdMiddleware } from '../../common/middlewares/validate-objectid.middleware.js';
import {UploadFileMiddleware} from '../../common/middlewares/upload-file.middleware.js';
import { JWT_ALGORITM } from './user.constant.js';
import LoggedUserDto from './dto/logged-user.dto.js';
import { PrivateRouteMiddleware } from '../../common/middlewares/private-route.middleware.js';

@injectable()
export default class UserController extends Controller {
  constructor(
    @inject(Component.LoggerInterface) logger: LoggerInterface,
    @inject(Component.UserServiceInterface) private readonly userService: UserServiceInterface,
    @inject(Component.ConfigInterface) private readonly configService: ConfigInterface,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController...');

    this.addRoute({
      path: '/register',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateUserDto)]
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.loginUser,
      middlewares: [new ValidateDtoMiddleware(LoginUserDto)]
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Get,
      handler: this.checkUser,
      middlewares: [new PrivateRouteMiddleware()],
    });
    this.addRoute({path: '/login',    method: HttpMethod.Get, handler: this.logoutUser});
    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('userId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'avatar'),
      ]
    });
  }

  public async create(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateUserDto>,
    res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email "${body.email}" exists.`,
        'UserController'
      );
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(res, fillDTO(UserDto, result));
  }

  public async loginUser(
    {body}: Request<Record<string, unknown>, Record<string, unknown>, LoginUserDto>,
    res: Response,
  ): Promise<void> {
    const user = await this.userService.verifyUser(body, this.configService.get('SALT'));

    if (!user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController',
      );
    }

    const token = await createJWT(
      JWT_ALGORITM,
      this.configService.get('JWT_SECRET'),
      { email: user.email, id: user.id}
    );

    this.ok(res, fillDTO(LoggedUserDto, {email: user.email, token}));
  }

  public async checkUser(req: Request, res: Response): Promise<void> {
    const user = await this.userService.findById(req.user.id);
    this.ok(res, fillDTO(UserDto, user));
  }

  public async logoutUser(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'Not implemented!', 'UserController');
  }

  public async uploadAvatar(req: Request, res: Response) {
    this.created(res, {
      filepath: req.file?.path
    });
  }

}
