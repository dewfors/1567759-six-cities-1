import {DocumentType} from '@typegoose/typegoose';
import {ObjectId} from 'mongoose';
import {CommentEntity} from './comment.entity.js';
import CreateCommentDTO from './dto/create-comment.dto.js';


export interface CommentServiceInterface {
  create(dto: CreateCommentDTO): Promise<DocumentType<CommentEntity>>
  findAllByOfferId(offerId: ObjectId | string): Promise<DocumentType<CommentEntity>[]>;
}
