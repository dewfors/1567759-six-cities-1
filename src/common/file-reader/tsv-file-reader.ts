import { readFileSync } from 'fs';
import { Offer } from '../../types/offer.type.js';
import { FileReaderInterface } from './file-reader.interface.js';
import {cityNamesType} from '../../types/city-names.type.js';
import {HousingType} from '../../types/housing.type.js';
import {GoodsType} from '../../types/goods.type.js';
import {UserType} from '../../types/user-type.enum.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([title, description, createdDate, cityName, cityLat, cityLng,
        previewImage, images, isPremium, rating, type, rooms,
        maxAdults, price, goods, authorName, authorEmail,
        authorAvatar, authorType, countComments, locationLat, locationLng]) => ({
        title,
        description,
        postDate: new Date(createdDate),
        city: {name: cityName as cityNamesType,
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
        author: {name: authorName, email: authorEmail, avatarPath: authorAvatar, type: authorType as UserType},
        countComments: Number.parseInt(countComments, 10),
        location: {latitude: Number.parseInt(locationLat, 10), longitude: Number.parseInt(locationLng, 10)},
      }));
  }
}
