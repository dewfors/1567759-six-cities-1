
export const MAX_COMMENTS_COUNT = 50;

export enum UserNameSetting {
  MinLength = 1,
  MaxLength = 15,
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
}

export enum CommentSettings {
  CommentMinLength = 5,
  CommentMaxLength = 1024,
  CommentRatingMin = 1,
  CommentRatingMax = 5,
}
