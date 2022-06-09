import {Expose, Transform} from 'class-transformer';

export default class OfferDto {
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
  @Transform((value) => value.obj.author.toString())
  public author!: string;

  @Expose()
  public countComments!: number;

  @Expose()
  public location!: {
    latitude: number;
    longitude: number;
  };

}


