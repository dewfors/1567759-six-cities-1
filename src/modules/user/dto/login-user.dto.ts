import {IsEmail, IsString, MaxLength, MinLength} from 'class-validator';
import {UserPasswordSetting} from '../../../utils/const.js';

export default class LoginUserDto {
  @IsEmail({}, {message: 'not valid email'})
  public email!: string;

  @IsString({message: 'password is required'})
  @MinLength(UserPasswordSetting.MinLength, {message: `password length must be at least ${UserPasswordSetting.MinLength} characters`})
  @MaxLength(UserPasswordSetting.MaxLength, {message: `password length must be less than ${UserPasswordSetting.MaxLength} characters`})
  public password!: string;
}
