import CreateUserDto from '../../dto/user/create-user.dto';
import {NewOffer} from '../../types/new-offer';
import {NewOfferApi} from '../../types/new-offer-api';
import {NewUser} from '../../types/new-user';
import {CITIES} from "../../const";
import {Offer} from '../../types/offer';
import {OfferApi} from '../../types/offer-api';
import {NewReview} from '../../types/new-review';
import {Review} from '../../types/review';
import {ReviewApi} from '../../types/review-api';
import {formatDate} from '../../utils';
import {OfferUpdateApi} from "../../types/offer-update-api";

export const adaptSignupToServer =
    (user: NewUser): CreateUserDto => ({
        name: user.name,
        email: user.email,
        password: user.password,
        userType: user.isPro ? 'pro' : 'regular',
    });

export const adaptOfferToClient = (offerApi: OfferApi): Offer => {

    //console.log('offerApi', offerApi);

    return {
        bedrooms: offerApi.rooms,
        city: offerApi.city,
        description: offerApi.description,
        goods: offerApi.goods,
        host: {
            avatarUrl: offerApi.host.avatarUrl,
            email: offerApi.host.email,
            isPro: offerApi.host.isPro,
            name: offerApi.host.name,
        },
        id: offerApi.id,
        images: offerApi.images,
        isFavorite: offerApi.isFavorite,
        isPremium: offerApi.isPremium,
        location: {
            latitude: offerApi.location.latitude,
            longitude: offerApi.location.longitude,
        },
        maxAdults: offerApi.maxAdults,
        previewImage: offerApi.previewImage,
        price: offerApi.price,
        rating: offerApi.rating,
        title: offerApi.title,
        type: offerApi.type,
    }
}

export const adaptOffersToClient = (offers: OfferApi[]): Offer[] => {

    //console.log(offers);
    const adaptOffers = offers.map((offer) => adaptOfferToClient(offer));
    //console.log('adaptOffers', adaptOffers);

    // return offers.map((offer) => adaptOfferToClient(offer));
    return adaptOffers;
}

export const adaptNewOfferToServer = (
    {
        title,
        description,
        city,
        previewImage,
        isPremium,
        type,
        bedrooms,
        maxAdults,
        price,
        goods,
        location,
    }: NewOffer): NewOfferApi => {
    return {
        // @ts-ignore
        city: CITIES.find(cityItem => cityItem === city),
        previewImage,
        images: [
            "http://almode.ru/uploads/posts/2021-05/1620455178_47-p-krasivie-intereri-gostinikh-48.jpg",
            "https://hameleone.ru/wp-content/uploads/6/3/f/63fda71fd1561cd18982d199a42e7ad3.jpeg",
            "https://dizainexpert.ru/wp-content/uploads/2019/11/foto-sovremennoj-kvartiry_20.jpg",
            "https://www.mirlandshaft.ru/wp-content/uploads/2018/06/63-1.jpg",
            "https://tvoidvor.com/wp-content/uploads/image20-min-45.jpg",
            "https://www.superpokupka.ru/images/detailed/198/6f345f540298557e322f3a203201f01b.jpeg"
        ],
        title,
        isPremium,
        rating: 1,
        type,
        rooms: bedrooms,
        maxAdults,
        price,
        goods,
        description,
        location,
        postDate: new Date()
    }
}

export const adaptOfferToServer = (
    {
        bedrooms,
        city,
        description,
        goods,
        images,
        isPremium,
        location,
        maxAdults,
        previewImage,
        price,
        rating,
        title,
        type
    }: Offer): OfferUpdateApi => {
    return {
        city,
        previewImage,
        images,
        title,
        isPremium,
        rating,
        type,
        rooms: bedrooms,
        maxAdults,
        price,
        goods,
        description,
        location,
        postDate: new Date(),
    }
}

export const adaptReviewToClient = (reviewApi: ReviewApi): Review => {

    console.log('reviewApi', reviewApi);

    const {comment, date, user, id, rating} = reviewApi;
    const {avatarUrl, email, name, userType} = user;

    const reviewAdapt = {
        comment: comment,
        // date: formatDate(reviewApi.postDate.toDateString()),
        date: date.toString(),
        id: id,
        rating: rating,
        user: {
            avatarUrl: avatarUrl,
            email: email,
            name: name,
            isPro: userType === 'pro',
        }
    }

    console.log(reviewAdapt);

    return <Review>reviewAdapt;
}

export const adaptReviewsToClient = (reviews: ReviewApi[]): Review[] => {
    return reviews.map((review) => adaptReviewToClient(review))
};

export const adaptNewReview = ({comment, rating}: NewReview): NewReviewApi => ({text: comment, rating});

export type NewReviewApi = {
    text: string;
    rating: number,
};