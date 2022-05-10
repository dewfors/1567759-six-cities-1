import {UserType} from '../../types/user-type.enum.js';
import {User} from '../../types/user.type.js';

export class UserEntity implements User {
  public name!: string;
  public email!: string;
  public avatarPath!: string;
  public type!: UserType;
}
