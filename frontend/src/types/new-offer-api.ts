import {Location} from './location.js';
import {City} from "./city";

export type NewOfferApi = {
    city: City;
    previewImage: string;
    images: string[];
    title: string;
    isPremium: boolean;
    rating: number;
    type: string;
    bedrooms: number;
    maxAdults: number;
    price: number;
    goods: string[];
    description: string;
    location: Location;
    createdDate: Date;
};
