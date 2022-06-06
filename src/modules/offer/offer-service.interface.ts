import {DocumentType} from '@typegoose/typegoose';
import {ObjectId} from 'mongoose';
import CreateOfferDto from './dto/create-offer.dto';
import {OfferEntity} from './offer.entity';


export interface OfferServiceInterface {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(id: ObjectId | string): Promise<DocumentType<OfferEntity> | null>;
  findAll(): Promise<DocumentType<OfferEntity>[]>;
  updateById(offerId: ObjectId | string, dto: CreateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: ObjectId | string): Promise<DocumentType<OfferEntity> | null>;
  findPremium(count: number): Promise<DocumentType<OfferEntity>[]>;
  // findPremium(): Promise<DocumentType<OfferEntity>[]>;
}
