import {Expose} from 'class-transformer';


export default class UserToClientDto {
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;

  @Expose()
  public email!: string;

  @Expose()
  public avatar?: string;

  @Expose()
  public userType!: string;
}
