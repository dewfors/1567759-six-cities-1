import {
  ArrayMaxSize,
  ArrayMinSize,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsUrl,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested
} from 'class-validator';
import { HousingType } from '../../../types/housing.type.js';
import {GoodsType} from '../../../types/goods.type.js';
import {OfferFieldsSettings} from '../../../utils/const.js';
import CityDto from './city.dto.js';
import LocationDto from './location.dto.js';


export default class CreateOfferDto {
  @MinLength(OfferFieldsSettings.OfferTitleMin, {message: `Minimum title length must be greater than ${OfferFieldsSettings.OfferTitleMin}`})
  @MaxLength(OfferFieldsSettings.OfferTitleMax, {message: `Maximum title length must be less than ${OfferFieldsSettings.OfferTitleMax}`})
  public title!: string;

  @MinLength(OfferFieldsSettings.OfferDescriptionMin, {message: `Minimum description length must be greater than ${OfferFieldsSettings.OfferDescriptionMin}`})
  @MaxLength(OfferFieldsSettings.OfferDescriptionMax, {message: `Maximum description length must be less than ${OfferFieldsSettings.OfferDescriptionMax}`})
  public description!: string;

  @IsDateString({}, {message: 'date must be valid ISO date'})
  public postDate!: string;

  @ValidateNested()
  public city!: CityDto;

  @IsUrl({}, {message: 'previewImage must be url'})
  public previewImage!: string;

  @IsUrl({}, {each: true, message: 'images must be array of urls'})
  @ArrayMinSize(OfferFieldsSettings.OfferImagesCount, {message: `number of images must be ${OfferFieldsSettings.OfferImagesCount}`})
  @ArrayMaxSize(OfferFieldsSettings.OfferImagesCount, {message: `number of images must be ${OfferFieldsSettings.OfferImagesCount}`})
  public images!: string[];

  @IsBoolean({message: 'isPremium must be of boolean type'})
  public isPremium!: boolean;

  @IsNumber({}, {message: 'rating must be of number type'})
  @Min(OfferFieldsSettings.OfferRatingMin, {message: `Minimum rating must be greater than ${OfferFieldsSettings.OfferRatingMin}`})
  @Max(OfferFieldsSettings.OfferRatingMax, {message: `Maximum rating must be less than ${OfferFieldsSettings.OfferRatingMax}`})
  public rating!: number;

  @IsEnum(HousingType, {message: 'type must be of HousingType type'})
  public type!: HousingType;

  @IsInt({message: 'rooms must be of integer type'})
  @Min(OfferFieldsSettings.OfferRoomsMin, {message: `Minimum rooms must be greater than ${OfferFieldsSettings.OfferRoomsMin}`})
  @Max(OfferFieldsSettings.OfferRoomsMax, {message: `Maximum rooms must be less than ${OfferFieldsSettings.OfferRoomsMax}`})
  public rooms!: number;

  @IsInt({message: 'maxAdults must be of integer type'})
  @Min(OfferFieldsSettings.OfferMaxAdultsMin, {message: `Minimum maxAdults must be greater than ${OfferFieldsSettings.OfferMaxAdultsMin}`})
  @Max(OfferFieldsSettings.OfferMaxAdultsMax, {message: `Maximum maxAdults must be less than ${OfferFieldsSettings.OfferMaxAdultsMax}`})
  public maxAdults!: number;

  @IsInt({message: 'price must be of integer type'})
  public price!: number;

  @IsEnum(GoodsType, {each: true, message: 'goods must be of GoodsType[] type'})
  public goods!: GoodsType[];

  public author!: string;

  @ValidateNested()
  public location!: LocationDto;
}
