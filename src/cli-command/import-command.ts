import TSVFileReader from '../common/file-reader/tsv-file-reader.js';
import { CliCommandInterface } from './cli-command.interface.js';
import {createOffer, getErrorMessage} from '../utils/common.js';
import { LoggerInterface } from '../common/logger/logger.interface.js';
import {DatabaseInterface} from '../common/database-client/database.interface.js';
import {OfferServiceInterface} from '../modules/offer/offer-service.interface.js';
import {UserServiceInterface} from '../modules/user/user-service.interface.js';
import ConsoleLoggerService from '../common/logger/console-logger.service.js';
import OfferService from '../modules/offer/offer.service.js';
import {OfferModel} from '../modules/offer/offer.entity.js';
import UserService from '../modules/user/user.service.js';
import {UserModel} from '../modules/user/user.entity.js';
import DatabaseService from '../common/database-client/database.service.js';
import { Offer } from '../types/offer.type.js';
import {getURI} from '../utils/db.js';
import ConfigService from '../common/config/config.service.js';
import { ConfigInterface } from '../common/config/config.interface.js';

const DEFAULT_USER_PASSWORD = '123456';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  private userService!: UserServiceInterface;
  private offerService!: OfferServiceInterface;
  private databaseService!: DatabaseInterface;
  private logger: LoggerInterface;
  private salt!: string;
  private configService!: ConfigInterface;

  constructor() {
    this.onLine = this.onLine.bind(this);
    this.onComplete = this.onComplete.bind(this);

    this.logger = new ConsoleLoggerService();
    this.offerService = new OfferService(this.logger, OfferModel);
    this.userService = new UserService(this.logger, UserModel);
    this.databaseService = new DatabaseService(this.logger);
    this.configService = new ConfigService(this.logger);
    this.salt = this.configService.get('SALT');
  }

  private async saveOffer(offer: Offer) {
    const user = await this.userService.findOrCreate({
      ...offer.author,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    await this.offerService.create({
      ...offer,
      author: user.id,
    });
  }

  private async onLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onComplete(count: number) {
    console.log(`${count} rows imported.`);
    this.databaseService.disconnect();
  }

  public async execute(filename: string): Promise<void> {
    try {
      const uri = getURI(
        this.configService.get('DB_USER'),
        this.configService.get('DB_PASSWORD'),
        this.configService.get('DB_HOST'),
        this.configService.get('DB_PORT'),
        this.configService.get('DB_NAME'),
      );

      await this.databaseService.connect(uri);

      const fileReader = new TSVFileReader(filename.trim());
      fileReader.on('line', this.onLine);
      fileReader.on('end', this.onComplete);
      await fileReader.read();
    } catch (err) {
      if (err instanceof TypeError) {
        console.log(`file name not specified: ${getErrorMessage(err)}`);
      } else {
        console.log(`Can't read the file: ${getErrorMessage(err)}`);
      }
    }
  }

}
