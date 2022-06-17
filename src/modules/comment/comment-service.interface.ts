import {DocumentType} from '@typegoose/typegoose';
import {ObjectId} from 'mongoose';
import {CommentEntity} from './comment.entity.js';
import CreateCommentDTO from './dto/create-comment.dto.js';


export interface CommentServiceInterface {
  create(dto: CreateCommentDTO, userId: string, offerId: string): Promise<DocumentType<CommentEntity>>
  findByOfferId(id: ObjectId | string): Promise<DocumentType<CommentEntity>[]>;
  deleteByOfferId(id: string): Promise<void | null>;
}
