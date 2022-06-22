import {Expose, Transform, Type} from 'class-transformer';
import UserToClientDto from '../../user/dto/user-to-client.dto.js';


export default class CommentToClientDto {
  @Expose()
  @Transform((value) => value.obj._id.toString())
  public id!: string;

  @Expose({name: 'text'})
  public comment!: string;

  @Expose()
  public rating!: number;

  @Expose({name: 'createdAt'})
  public date!: string;

  @Expose({name: 'userId'})
  @Type(() => UserToClientDto)
  public user!: UserToClientDto;
}
