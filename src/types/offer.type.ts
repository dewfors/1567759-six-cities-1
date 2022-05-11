import { Location } from './location.type.js';
import {User} from './user.type.js';
import {CityType} from './city.type';
import {HousingType} from './housing.type';
import { GoodsType } from './goods.type.js';

export type Offer = {
  title: string;
  description: string;
  postDate: string;
  city: CityType;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  rating: number;
  type: HousingType;
  rooms: number;
  maxAdults: number;
  price: number;
  goods: GoodsType[];
  author: User;
  countComments: number;
  location: Location;
};
