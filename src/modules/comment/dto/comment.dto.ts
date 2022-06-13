import {Expose, Transform, Type} from 'class-transformer';
import UserDto from '../../user/dto/user.dto.js';


export default class CommentDto {
  @Expose()
  @Transform((value) => value.obj._id.toString())
  public id!: string;

  @Expose()
  public text!: string;

  @Expose()
  public rating!: number;

  @Expose({name: 'createdAt'})
  public postDate!: string;

  @Expose({name: 'userId'})
  @Type(() => UserDto)
  public author!: UserDto;
}
