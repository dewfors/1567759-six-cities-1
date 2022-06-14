import {DocumentType} from '@typegoose/typegoose';
import {ObjectId} from 'mongoose';
import CreateOfferDto from './dto/create-offer.dto';
import {OfferEntity} from './offer.entity';
import {DocumentExistsInterface} from '../../types/document-exists.interface.js';


export interface OfferServiceInterface extends DocumentExistsInterface {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(id: ObjectId | string): Promise<DocumentType<OfferEntity> | null>;
  findAll(): Promise<DocumentType<OfferEntity>[]>;
  updateById(offerId: ObjectId | string, dto: CreateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: ObjectId | string): Promise<DocumentType<OfferEntity> | null>;
  findPremium(count: number): Promise<DocumentType<OfferEntity>[]>;
}
