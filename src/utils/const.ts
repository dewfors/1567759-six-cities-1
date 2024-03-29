export const MAX_OFFERS_COUNT = 60;
export const MAX_COMMENTS_COUNT = 50;
export const MAX_PREMIUM_COUNT = 3;

export enum UserNameSetting {
  MinLength = 1,
  MaxLength = 15,
}

export enum UserPasswordSetting {
  MinLength = 6,
  MaxLength = 12,
}

export enum OfferFieldsSettings {
  OfferTitleMin = 10,
  OfferTitleMax = 100,
  OfferDescriptionMin = 20,
  OfferDescriptionMax = 1024,
  OfferRatingMin = 1,
  OfferRatingMax = 5,
  OfferRoomsMin = 1,
  OfferRoomsMax = 8,
  OfferMaxAdultsMin = 1,
  OfferMaxAdultsMax = 10,
  OfferPriceMin = 100,
  OfferPriceMax = 100000,
  OfferImagesCount = 6,
}

export enum CommentSettings {
  CommentMinLength = 5,
  CommentMaxLength = 1024,
  CommentRatingMin = 1,
  CommentRatingMax = 5,
}

export const SUPPORTED_IMG_FORMATS = [
  'image/jpeg',
  'image/png',
];
