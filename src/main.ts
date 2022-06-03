import {Container} from 'inversify';
import {LoggerInterface} from './common/logger/logger.interface.js';
import LoggerService from './common/logger/logger.service.js';
import {Component} from './types/component.types.js';
import {ConfigInterface} from './common/config/config.interface.js';
import ConfigService from './common/config/config.service.js';
import Application from './app/application.js';
import DatabaseService from './common/database-client/database.service.js';
import {DatabaseInterface} from './common/database-client/database.interface.js';
import UserService from './modules/user/user.service.js';
import {UserServiceInterface} from './modules/user/user-service.interface.js';
import {UserEntity, UserModel} from './modules/user/user.entity.js';
import { ModelType } from '@typegoose/typegoose/lib/types.js';
import { ExceptionFilterInterface } from './common/errors/exception-filter.interface.js';
import ExceptionFilter from './common/errors/exception-filter.js';
import { ControllerInterface } from './common/controller/controller.interface.js';
import UserController from './modules/user/user.controller.js';


const applicationContainer = new Container();
applicationContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
applicationContainer.bind<LoggerInterface>(Component.LoggerInterface).to(LoggerService).inSingletonScope();
applicationContainer.bind<ConfigInterface>(Component.ConfigInterface).to(ConfigService).inSingletonScope();
applicationContainer.bind<DatabaseInterface>(Component.DatabaseInterface).to(DatabaseService).inSingletonScope();
applicationContainer.bind<UserServiceInterface>(Component.UserServiceInterface).to(UserService);
applicationContainer.bind<ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
applicationContainer.bind<ExceptionFilterInterface>(Component.ExceptionFilterInterface).to(ExceptionFilter).inSingletonScope();
applicationContainer.bind<ControllerInterface>(Component.UserController).to(UserController).inSingletonScope();

const application = applicationContainer.get<Application>(Component.Application);
await application.init();
