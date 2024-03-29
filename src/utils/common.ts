import * as jose from 'jose';
import crypto from 'crypto';
import {plainToInstance} from 'class-transformer';
import {ClassConstructor} from 'class-transformer/types/interfaces/class-constructor.type.js';
import { Offer } from '../types/offer.type.js';
import {CityNamesType} from '../types/city-names.type.js';
import {HousingType} from '../types/housing.type.js';
import {GoodsType} from '../types/goods.type.js';
import {UserType} from '../types/user-type.enum.js';
import {UnknownObject} from '../types/unknown-object.type.js';
import {DEFAULT_STATIC_IMAGES} from '../app/application.constant.js';
import { ValidationError } from 'class-validator/types/validation/ValidationError.js';
import { ValidationErrorField } from '../types/validation-error-field.type.js';
import {ServiceError} from '../types/service-error.enum.js';

export const createOffer = (row: string) => {
  const tokens = row.replace('\n', '').split('\t');
  const [title, description, createdDate, cityName, cityLat, cityLng,
    previewImage, images, isPremium, rating, type, rooms,
    maxAdults, price, goods, authorName, authorEmail,
    authorAvatar, authorType, countComments, locationLat, locationLng] = tokens;

  return {
    title,
    description,
    postDate: createdDate,
    city: {name: cityName as CityNamesType,
      location: {latitude: Number.parseInt(cityLat, 10), longitude: Number.parseInt(cityLng, 10)}},
    previewImage,
    images: images.split(';').map((name) => (name)),
    isPremium: Boolean(Number(isPremium)),
    rating: Number.parseInt(rating, 10),
    type: type as HousingType,
    rooms: Number.parseInt(rooms, 10),
    maxAdults: Number.parseInt(maxAdults, 10),
    price: Number.parseInt(price, 10),
    goods: goods.split(';').map((name) => (name as GoodsType)),
    author: {name: authorName, email: authorEmail, avatarPath: authorAvatar, userType: authorType as UserType},
    countComments: Number.parseInt(countComments, 10),
    location: {latitude: Number.parseInt(locationLat, 10), longitude: Number.parseInt(locationLng, 10)},
  } as Offer;

};

export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : '';

export const createSHA256 = (line: string, salt: string): string => {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
};

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});

export const createErrorObject = (serviceError: ServiceError, message: string, details: ValidationErrorField[] = []) => ({
  errorType: serviceError,
  message,
  details: [...details]
});

export const createJWT = async (algoritm: string, jwtSecret: string, payload: object): Promise<string> =>
  new jose.SignJWT({...payload})
    .setProtectedHeader({ alg: algoritm})
    .setIssuedAt()
    .setExpirationTime('2d')
    .sign(crypto.createSecretKey(jwtSecret, 'utf-8'));

export const getFullServerPath = (host: string, port: number) => `http://${host}:${port}`;

const isObject = (value: unknown) => typeof value === 'object' && value !== null;

export const transformProperty = (
  property: string,
  someObject: UnknownObject,
  transformFn: (object: UnknownObject) => void
) => {
  Object.keys(someObject)
    .forEach((key) => {
      if (key === property) {
        transformFn(someObject);
      } else if (isObject(someObject[key])) {
        transformProperty(property, someObject[key] as UnknownObject, transformFn);
      }
    });
};

export const transformObject = (properties: string[], staticPath: string, uploadPath: string, data:UnknownObject) => {
  properties
    .forEach((property) => transformProperty(property, data, (target: UnknownObject) => {
      const rootPath = DEFAULT_STATIC_IMAGES.includes(target[property] as string) ? staticPath : uploadPath;
      target[property] = `${rootPath}/${target[property]}`;
    }));
};

export const transformErrors = (errors: ValidationError[]): ValidationErrorField[] =>
  errors.map(({property, value, constraints}) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : []
  }));
