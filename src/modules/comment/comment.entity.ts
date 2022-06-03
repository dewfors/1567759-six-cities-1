import typegoose, {defaultClasses, getModelForClass, Ref} from '@typegoose/typegoose';
import {CommentSettings} from '../../utils/const.js';
import {OfferEntity} from '../offer/offer.entity.js';
import {UserEntity} from '../user/user.entity.js';

const {prop, modelOptions, index} = typegoose;


@modelOptions({
  schemaOptions: {
    collection: 'comments',
  }
})
@index({author: 1, offer: 1}, {unique: true})
class CommentEntity extends defaultClasses.TimeStamps {
  constructor() {
    super();
  }

  @prop({
    trim: true,
    required: true,
    minlength: CommentSettings.CommentMinLength,
    maxlength: CommentSettings.CommentMaxLength,
    default: '',
  })
  public comment!: string;

  @prop({
    required: true,
    min: CommentSettings.CommentRatingMin,
    max: CommentSettings.CommentRatingMax,
    default: 0,
  })
  public rating!: number;

  @prop({
    required: true,
    ref: () => OfferEntity
  })
  public offer!: Ref<OfferEntity>;

  @prop({
    required: true,
    ref: () => UserEntity,
  })
  public author!: Ref<UserEntity>;

  public get postDate() {
    return this.createdAt;
  }
}


const CommentModel = getModelForClass(CommentEntity);


export {CommentEntity, CommentModel};
