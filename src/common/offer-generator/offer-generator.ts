import dayjs from "dayjs";
import {MockData} from '../../types/mock-data.type.js';
import {generateRandomValue, getRandomItem, getRandomItems} from '../../utils/random.js';
import {OfferGeneratorInterface} from './offer-generator.interface.js';
import {CityType} from '../../types/city.type.js';
import {UserType} from '../../types/user-type.enum.js';

const BOOL_FALSE = 0;
const BOOL_TRUE = 1;

const MIN_RATING = 1;
const MAX_RATING = 5;

const MIN_ROOMS = 1;
const MAX_ROOMS = 8;

const MIN_GUESTS = 1;
const MAX_GUESTS = 10;

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const MIN_COMMENTS = 0;
const MAX_COMMENTS = 5;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;



export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const createdDate =  dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const city = getRandomItem<CityType>(this.mockData.cities);
    const cityName = city.name;
    const cityLat = city.location.latitude;
    const cityLng = city.location.longitude;
    const preview = getRandomItem<string>(this.mockData.offerImages);
    const previewImage = `${preview}.jpg`
    const images = Array.from({length: 6}, (index) => {
      return `${preview}${index}.jpg`;
    }).join(';');
    const isPremium = generateRandomValue(BOOL_FALSE, BOOL_TRUE).toString();
    const rating = generateRandomValue(MIN_RATING, MAX_RATING).toString();
    const type = getRandomItem<string>(this.mockData.types);
    const rooms = generateRandomValue(MIN_ROOMS, MAX_ROOMS).toString();
    const maxAdults = generateRandomValue(MIN_GUESTS, MAX_GUESTS).toString();
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const goods = getRandomItems<string>(this.mockData.goods).join(';');
    const authorName = getRandomItem<string>(this.mockData.users);
    const authorEmail = getRandomItem<string>(this.mockData.emails);
    const authorAvatar = `avatar-${authorName}.jpg`;
    const authorType = getRandomItem([UserType.Pro, UserType.Regular]);
    const countComments = generateRandomValue(MIN_COMMENTS, MAX_COMMENTS).toString();
    const locationLat = cityLat;
    const locationLng = cityLng;

    return [
      title, description, createdDate,
      cityName, cityLat, cityLng, previewImage,
      images, isPremium, rating, type, rooms,
      maxAdults, price, goods, authorName,
      authorEmail, authorAvatar, authorType,
      countComments, locationLat, locationLng,
    ].join('\t');

  }
}
