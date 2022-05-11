import {DocumentType} from '@typegoose/typegoose';
import {ObjectId} from 'mongoose';
import CreateOfferDTO from './dto/create-offer.dto';
import {OfferEntity} from './offer.entity';


export interface OfferServiceInterface {
  create(dto: CreateOfferDTO): Promise<DocumentType<OfferEntity>>;
  findById(id: ObjectId | string): Promise<DocumentType<OfferEntity> | null>;
}
