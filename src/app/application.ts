import 'reflect-metadata';
import {inject, injectable} from 'inversify';
import express, {Express} from 'express';
import {LoggerInterface} from '../common/logger/logger.interface.js';
import {ConfigInterface} from '../common/config/config.interface.js';
import {Component} from '../types/component.types.js';
import {getURI} from '../utils/db.js';
import {DatabaseInterface} from '../common/database-client/database.interface.js';
import { ExceptionFilterInterface } from '../common/errors/exception-filter.interface.js';
import UserController from '../modules/user/user.controller.js';
import OfferController from '../modules/offer/offer.controller.js';
import {AuthenticateMiddleware} from '../common/middlewares/authenticate.middleware.js';
import { getFullServerPath } from '../utils/common.js';

@injectable()
export default class Application {
  private expressApp: Express;

  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.ConfigInterface) private config: ConfigInterface,
    @inject(Component.DatabaseInterface) private databaseClient: DatabaseInterface,
    @inject(Component.ExceptionFilterInterface) private exceptionFilter: ExceptionFilterInterface,
    @inject(Component.UserController) private userController: UserController,
    @inject(Component.OfferController) private readonly offerController: OfferController,
  ) {
    this.expressApp = express();
  }

  public registerRoutes() {
    this.expressApp.use('/users', this.userController.router);
    this.expressApp.use('/offers', this.offerController.router);
  }

  public registerMiddlewares() {
    this.expressApp.use(express.json());
    this.expressApp.use(
      '/upload',
      express.static(this.config.get('UPLOAD_DIRECTORY'))
    );
    this.expressApp.use(
      '/static',
      express.static(this.config.get('STATIC_DIRECTORY_PATH'))
    );

    const authenticateMiddleware = new AuthenticateMiddleware(this.config.get('JWT_SECRET'));
    this.expressApp.use(authenticateMiddleware.execute.bind(authenticateMiddleware));
  }

  public registerExceptionFilters() {
    this.expressApp.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public async init() {
    this.logger.info('Application initialization...');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    const uri = getURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    await this.databaseClient.connect(uri);

    this.registerMiddlewares();
    this.registerRoutes();
    this.registerExceptionFilters();
    this.expressApp.listen(this.config.get('PORT'));
    this.logger.info(`Server started on ${getFullServerPath(this.config.get('HOST'), this.config.get('PORT'))}`);
  }
}
