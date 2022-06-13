import {IsNumber, IsOptional, Max, MaxLength, Min, MinLength} from 'class-validator';
import {CommentSettings} from "../../../utils/const";

export default class UpdateCommentDto {
  @IsOptional()
  @MinLength(CommentSettings.CommentMinLength, {message: `Minimum text length must be greater than ${CommentSettings.CommentMinLength}`})
  @MaxLength(CommentSettings.CommentMaxLength, {message: `Maximum text length must be less than ${CommentSettings.CommentMaxLength}`})
  public text!: string;

  @IsOptional()
  @IsNumber({}, {message: 'rating must be number'})
  @Min(CommentSettings.CommentRatingMin, {message: `Minimum rating must be greater than ${CommentSettings.CommentRatingMin}`})
  @Max(CommentSettings.CommentRatingMax, {message: `Maximum rating must be less than ${CommentSettings.CommentRatingMax}`})
  public rating!: number;
}
