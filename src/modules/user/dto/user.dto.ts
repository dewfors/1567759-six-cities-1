import {Expose} from 'class-transformer';


export default class UserDto {
  @Expose()
  public name!: string;

  @Expose()
  public email!: string;

  @Expose()
  public avatar?: string;

  @Expose()
  public userType!: string;
}
