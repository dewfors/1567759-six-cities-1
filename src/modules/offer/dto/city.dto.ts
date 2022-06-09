import {IsEnum, ValidateNested} from 'class-validator';
import {CityNamesType} from '../../../types/city-names.type.js';
import LocationDto from './location.dto.js';


export default class CityDto {
  @IsEnum(CityNamesType, {message: 'city must be of City type'})
  public name!: CityNamesType;

  @ValidateNested()
  public location!: LocationDto;
}
