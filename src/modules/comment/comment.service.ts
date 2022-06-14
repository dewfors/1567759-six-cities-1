import 'reflect-metadata';
import {DocumentType, ReturnModelType} from '@typegoose/typegoose';
import {inject, injectable} from 'inversify';
import {CommentServiceInterface} from './comment-service.interface.js';
import {CommentEntity, CommentModel} from './comment.entity.js';
import CreateCommentDTO from './dto/create-comment.dto.js';
import {LoggerInterface} from '../../common/logger/logger.interface.js';
import {ObjectId} from 'mongoose';
import {MAX_COMMENTS_COUNT} from '../../utils/const.js';
import { Component } from '../../types/component.types.js';


@injectable()
export default class CommentService implements CommentServiceInterface {
  constructor(
    @inject(Component.CommentModel) private readonly commentModel: ReturnModelType<typeof CommentModel>,
    @inject(Component.LoggerInterface) private readonly logger: LoggerInterface,
  ) {}

  public async create(dto: CreateCommentDTO, userId: string, offerId: string): Promise<DocumentType<CommentEntity>> {
    const newComment = await this.commentModel.create({...dto, userId, offerId});
    this.logger.info('New comment created');
    return newComment.populate('userId');
  }

  public async findAllByOfferId(offerId: ObjectId | string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({offerId})
      .populate('userId')
      .limit(MAX_COMMENTS_COUNT);
  }
}
