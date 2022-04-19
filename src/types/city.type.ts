import {Location} from './location.type.js';
import {cityNamesType} from './city-names.type.js';

export type City = {
  name: cityNamesType;
  location: Location;
};
