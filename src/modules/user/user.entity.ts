import typegoose, {getModelForClass} from '@typegoose/typegoose';
import {TimeStamps} from '@typegoose/typegoose/lib/defaultClasses.js';
import {UserType} from '../../types/user-type.enum.js';
import {User} from '../../types/user.type.js';

const {prop} = typegoose;

export class UserEntity extends TimeStamps implements User {
  @prop()
  public name!: string;

  @prop({ unique: true, required: true })
  public email!: string;

  @prop()
  public avatarPath!: string;

  @prop()
  public type!: UserType;

  @prop()
  public password!: string;
}

export const UserModel = getModelForClass(UserEntity);
