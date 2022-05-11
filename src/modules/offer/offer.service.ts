import 'reflect-metadata';
import {DocumentType, ModelType} from '@typegoose/typegoose/lib/types.js';
import {inject, injectable} from 'inversify';
import {ObjectId} from 'mongoose';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import CreateOfferDTO from './dto/create-offer.dto.js';
import {OfferServiceInterface} from './offer-service.interface.js';
import {OfferEntity} from './offer.entity.js';
import { Component } from '../../types/component.types.js';


@injectable()
export default class OfferService implements OfferServiceInterface {
  constructor(
    @inject(Component.OfferModel) private readonly offerModel: ModelType<OfferEntity>,
    @inject(Component.LoggerInterface) private logger: LoggerInterface
  ) {}

  public async create(dto: CreateOfferDTO): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: '${dto.title}'`);

    return result;
  }

  public async findById(id: ObjectId | string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(id).exec();
  }
}
