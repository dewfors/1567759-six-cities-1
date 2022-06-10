import {IsMongoId, IsNumber, Max, MaxLength, Min, MinLength} from 'class-validator';
import {CommentSettings} from '../../../utils/const.js';

export default class CreateOfferDTO {
  @MinLength(CommentSettings.CommentMinLength, {message: `Minimum text length must be greater than ${CommentSettings.CommentMinLength}`})
  @MaxLength(CommentSettings.CommentMaxLength, {message: `Maximum text length must be less than ${CommentSettings.CommentMaxLength}`})
  public text!: string;

  @IsNumber({}, {message: 'rating must be number'})
  @Min(CommentSettings.CommentRatingMin, {message: `Minimum rating must be greater than ${CommentSettings.CommentRatingMin}`})
  @Max(CommentSettings.CommentRatingMax, {message: `Maximum rating must be less than ${CommentSettings.CommentRatingMax}`})
  public rating!: string;

  @IsMongoId({message: 'offer must be of MongoId type'})
  public offer!: string;

  @IsMongoId({message: 'author must be of MongoId type'})
  public author!: string;
}
