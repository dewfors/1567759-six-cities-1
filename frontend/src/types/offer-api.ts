import { City } from './city';
import {Location} from './location';


export type OfferApi = {
    id: string;
    city: City;
    previewImage: string;
    images: string[];
    title: string;
    isPremium: boolean;
    isFavorite: boolean;
    rating: number;
    type: string;
    rooms: number;
    maxAdults: number;
    price: number;
    goods: string[];
    host: {
        avatarUrl: string;
        email: string;
        isPro: boolean;
        name: string;
    };
    description: string;
    location: Location;
    // createdDate: Date;
    // commentCount: number;
};
