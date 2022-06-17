import {DocumentType} from '@typegoose/typegoose';
import {ObjectId} from 'mongoose';
import {CommentEntity} from './comment.entity.js';
import CreateCommentDTO from './dto/create-comment.dto.js';
import {CheckOwnerInterface} from '../../types/check-owner.interface.js';


export interface CommentServiceInterface extends CheckOwnerInterface{
  create(dto: CreateCommentDTO, userId: string, offerId: string): Promise<DocumentType<CommentEntity>>
  findByOfferId(id: ObjectId | string): Promise<DocumentType<CommentEntity>[]>;
  deleteByOfferId(id: string): Promise<void | null>;
}
