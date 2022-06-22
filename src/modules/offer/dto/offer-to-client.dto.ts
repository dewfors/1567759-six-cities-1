import {Expose, Transform, Type} from 'class-transformer';
import UserToClientDto from '../../user/dto/user-to-client.dto.js';

export default class OfferToClientDto {
  @Expose()
  @Transform((value) => value.obj._id.toString())
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public postDate!: string;

  @Expose()
  public city!: string;

  @Expose()
  public previewImage!: string;

  @Expose()
  public images!: string[];

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public isFavorite!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public type!: string;

  @Expose()
  public rooms!: number;

  @Expose()
  public maxAdults!: number;

  @Expose()
  public price!: number;

  @Expose()
  public goods!: string[];

  @Expose()
  @Type(() => UserToClientDto)
  public host!: UserToClientDto;

  @Expose()
  public countComments!: number;

  @Expose()
  public location!: {
    latitude: number;
    longitude: number;
  };

}


