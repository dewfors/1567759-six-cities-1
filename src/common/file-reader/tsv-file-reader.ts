import { readFileSync } from 'fs';
import { Offer } from '../../types/offer.type.js';
import { FileReaderInterface } from './file-reader.interface.js';

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
      .map(([title, description, createdDate, cityName, price, housingType]) => ({
        title,
        description,
        postDate: new Date(createdDate),
        city: cityName,
        type: housingType,
        price: Number.parseInt(price, 10),
      }));
  }
}
