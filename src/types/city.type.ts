import {Location} from './location.type.js';
import {cityNamesType} from './city-names.type.js';

export type CityType = {
  name: cityNamesType;
  location: Location;
};
