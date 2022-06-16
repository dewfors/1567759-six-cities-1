import typegoose, {getModelForClass} from '@typegoose/typegoose';
import {Base, TimeStamps} from '@typegoose/typegoose/lib/defaultClasses.js';
import {UserType} from '../../types/user-type.enum.js';
import {User} from '../../types/user.type.js';
import {createSHA256} from '../../utils/common.js';
import {UserNameSetting} from '../../utils/const.js';

const {prop, modelOptions} = typegoose;

export interface UserEntity extends Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})

export class UserEntity extends TimeStamps implements User {
  constructor(data: User) {
    super();

    this.name = data.name;
    this.email = data.email;
    this.avatarPath = data.avatarPath;
    this.userType = data.userType;
  }

  @prop({
    required: true,
    minlength: UserNameSetting.MinLength,
    maxlength: UserNameSetting.MaxLength,
    trim: true,
    default: '',
  })
  public name!: string;

  @prop({
    unique: true,
    required: true,
    trim: true,
    default: ''
  })
  public email!: string;

  @prop({})
  public avatarPath: string;

  @prop({
    type: () => String,
    enum: UserType,
    required: true,
    default: UserType.Regular,
  })
  public userType!: UserType;

  @prop({
    required: true,
    default: ''
  })
  private password!: string;

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
