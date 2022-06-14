import {DocumentType} from '@typegoose/typegoose';
import {ObjectId} from 'mongoose';
import {FavoriteEntity} from './favorite.entity.js';

export interface FavoriteServiceInterface {
  getFavoriteStatus(offerId: ObjectId | string, userId: ObjectId | string | null): Promise<boolean>;
  setFavoriteStatus(offerId: ObjectId | string, userId: ObjectId | string, status: boolean): Promise<boolean>;
  getFavorites(userId: string | ObjectId): Promise<DocumentType<FavoriteEntity>[]>;
}
