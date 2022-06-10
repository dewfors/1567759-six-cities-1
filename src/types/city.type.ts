import {Location} from './location.type.js';
import {CityNamesType} from './city-names.type.js';

export type CityType = {
  name: CityNamesType;
  location: Location;
};
