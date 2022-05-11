import typegoose, {getModelForClass, Ref} from '@typegoose/typegoose';
import {TimeStamps} from '@typegoose/typegoose/lib/defaultClasses.js';
import {UserEntity} from '../user/user.entity.js';
import {OfferFieldsSettings} from '../../utils/const.js';
import {CityType} from '../../types/city.type.js';
import {GoodsType} from '../../types/goods.type.js';
import {HousingType} from '../../types/housing.type.js';
import {Location} from "../../types/location.type";


const {modelOptions, prop} = typegoose;


@modelOptions({
  schemaOptions: {
    collection: 'offers',
  }
})
class OfferEntity extends TimeStamps {
  constructor() {
    super();
  }

  @prop({
    required: true,
    minlength: OfferFieldsSettings.OfferTitleMin,
    maxlength: OfferFieldsSettings.OfferTitleMax,
    default: '',
  })
  public title!: string;

  @prop({
    required: true,
    minlength: OfferFieldsSettings.OfferDescriptionMin,
    maxlength: OfferFieldsSettings.OfferDescriptionMax,
    default: '',
  })
  public description!: string;

  @prop({
    required: true,
    default: '',
  })
  public postDate!: string;

  @prop({
    required: true,
    default: '',
  })
  public city!: CityType;

  @prop({
    required: true,
    default: '',
  })
  public previewImage!: string;

  @prop({
    required: true,
    type: () => String,
    default: [],
  })
  public images!: string[];

  @prop({
    required: true,
    default: false,
  })
  public isPremium!: boolean;

  @prop({
    required: true,
    min: OfferFieldsSettings.OfferRatingMin,
    max: OfferFieldsSettings.OfferRatingMax,
    default: 0,
  })
  public rating!: number;

  @prop({
    required: true,
    enum: HousingType,
    default: '',
  })
  public type!: HousingType;

  @prop({
    required: true,
    min: OfferFieldsSettings.OfferRoomsMin,
    max: OfferFieldsSettings.OfferRoomsMax,
    default: 0,
  })
  public rooms!: number;

  @prop({
    required: true,
    min: OfferFieldsSettings.OfferMaxAdultsMin,
    max: OfferFieldsSettings.OfferMaxAdultsMax,
    default: 0,
  })
  public maxAdults!: number;

  @prop({
    required: true,
    min: OfferFieldsSettings.OfferPriceMin,
    max: OfferFieldsSettings.OfferPriceMax,
    default: 0,
  })
  public price!: number;

  @prop({
    required: true,
    type: () => String,
    default: [],
  })
  public goods!: GoodsType[];

  @prop({
    required: true,
    ref: () => UserEntity,
  })
  public author!: Ref<UserEntity>;

  @prop({
    required: true,
    default: 0,
  })
  public countComments!: number;

  @prop({
    required: true,
    default: {
      latitude: 0,
      longitude: 0,
    },
  })
  public location!: Location;
}


const OfferModel = getModelForClass(OfferEntity);


export {OfferEntity, OfferModel};
