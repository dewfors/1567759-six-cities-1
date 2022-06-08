import {CityType} from '../../../types/city.type.js';
import { HousingType } from '../../../types/housing.type.js';
import {GoodsType} from '../../../types/goods.type.js';
import {Location} from '../../../types/location.type.js';


export default class CreateOfferDto {
  public title!: string;
  public description!: string;
  public postDate!: string;
  public city!: CityType;
  public previewImage!: string;
  public images!: string[];
  public isPremium!: boolean;
  public rating!: number;
  public type!: HousingType;
  public rooms!: number;
  public maxAdults!: number;
  public price!: number;
  public goods!: GoodsType[];
  public author!: string;
  public countComments!: number;
  public location!: Location;
}
