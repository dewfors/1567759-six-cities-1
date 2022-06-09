import {IsEmail, IsEnum, IsString, IsUrl, MaxLength, MinLength} from 'class-validator';
import {UserType} from '../../../types/user-type.enum.js';
import {UserNameSetting, UserPasswordSetting} from "../../../utils/const";

export default class CreateUserDto {

  @IsString({message: 'name is required'})
  @MinLength(UserNameSetting.MinLength, {message: `name length must be at least ${UserNameSetting.MinLength} characters`})
  @MaxLength(UserNameSetting.MaxLength, {message: `name length must be less than ${UserNameSetting.MaxLength} characters`})
  public name!: string;

  @IsEmail({}, {message: 'not valid email'})
  public email!: string ;

  @IsUrl({}, {message: 'avatarPath must be url'})
  public avatarPath!: string;

  @IsEnum(UserType, {message: 'type must be of UserType type'})
  public type!: UserType;

  @IsString({message: 'password is required'})
  @MinLength(UserPasswordSetting.MinLength, {message: `password length must be at least ${UserPasswordSetting.MinLength} characters`})
  @MaxLength(UserPasswordSetting.MaxLength, {message: `password length must be less than ${UserPasswordSetting.MaxLength} characters`})
  public password!: string;
}
