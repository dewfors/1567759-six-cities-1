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

export const adaptSignupToServer =
    (user: NewUser): CreateUserDto => ({
        name: user.name,
        email: user.email,
        password: user.password,
        userType: user.isPro ? 'pro' : 'regular',
    });

export const adaptOfferToClient = (
    {
        id,
        city,
        previewImage,
        images,
        title,
        isPremium,
        isFavorite,
        rating,
        type,
        bedrooms,
        maxAdults,
        price,
        goods,
        host: {
            avatarUrl,
            email,
            isPro,
            name,
        },
        description,
        location
    }: OfferApi): Offer => {
    return {
        bedrooms,
        city,
        description,
        goods,
        host: {
            avatarUrl,
            email,
            isPro,
            name,
        },
        id,
        images,
        isFavorite,
        isPremium,
        // @ts-ignore
        location,
        maxAdults,
        previewImage,
        price,
        rating,
        title,
        type,
    }
}

export const adaptOffersToClient = (offers: OfferApi[]): Offer[] => {
    return offers.map((offer) => adaptOfferToClient(offer));
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

export const adaptReviewToClient = (reviewApi: ReviewApi): Review => {

    // console.log(reviewApi);

    const reviewAdapt = {
        comment: reviewApi.text,
        // date: formatDate(reviewApi.postDate.toDateString()),
        date: reviewApi.postDate.toString(),
        id: reviewApi.id,
        rating: reviewApi.rating,
        user: {
            avatarUrl: '',
            email: reviewApi.author.email,
            name: reviewApi.author.name,
            isPro: reviewApi.author.userType === 'pro',
        }
    }

    console.log(reviewAdapt);

    return reviewAdapt;
}

// export const adaptReviewsToClient = (reviews: ReviewApi[]): Review[] =>
//     reviews.map((review) => adaptReviewToClient(review));

export const adaptReviewsToClient = (reviews: ReviewApi[]): Review[] => {
    // console.log(reviews);
    // console.log(adaptReviewToClient(reviews[0]));
    return reviews.map((review) => adaptReviewToClient(review))
};

export const adaptNewReview = ({comment, rating}: NewReview): NewReviewApi => ({text: comment, rating});

export type NewReviewApi = {
    text: string;
    rating: number,
};