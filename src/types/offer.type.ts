import {City} from './city.type.js';
import { GoodsType } from './goods.type.js';
import {HousingType} from './housing.type.js';
import { Location } from './location.type.js';
import {User} from './user.type.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: City;
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
