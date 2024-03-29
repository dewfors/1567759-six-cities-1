import 'reflect-metadata';
import {DocumentType, ModelType} from '@typegoose/typegoose/lib/types.js';
import {inject, injectable} from 'inversify';
import {ObjectId} from 'mongoose';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import {OfferServiceInterface} from './offer-service.interface.js';
import {OfferEntity} from './offer.entity.js';
import { Component } from '../../types/component.types.js';
import {MAX_OFFERS_COUNT} from '../../utils/const.js';


@injectable()
export default class OfferService implements OfferServiceInterface {
  constructor(
    @inject(Component.LoggerInterface) private logger: LoggerInterface,
    @inject(Component.OfferModel) private readonly offerModel: ModelType<OfferEntity>,
  ) {}

  public async create(dto: CreateOfferDto, userId: string): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create({...dto, author: userId});
    this.logger.info(`New offer created: '${dto.title}'`);

    return result;
  }

  public async findById(id: ObjectId | string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(id).exec();
  }

  public async findAll(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.find({}).sort({date: -1}).limit(MAX_OFFERS_COUNT).exec();
  }

  public async updateById(offerId: ObjectId | string, dto: CreateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndUpdate(offerId, dto).exec();
  }

  public async deleteById(offerId: ObjectId | string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndRemove(offerId).exec();
  }

  public async findPremium(count: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.find({isPremium: true}).sort({postDate: -1}).limit(count).exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel.exists({_id: documentId}) !== null);
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': {countComments: 1,}}).exec();
  }

  public async isOwner(userId: string, documentId: string): Promise<boolean> {
    return (await this.offerModel.exists({id: documentId, author: userId}) !== null);
  }


}
