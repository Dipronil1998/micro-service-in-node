import {AppRepository, RepositoryParameter} from './AppRepository';
import * as bcrypt from 'bcrypt';
import {passwordHashKey, pinHashKey} from '../../../config/bootstrap';
import {AccessRole} from '../entity/AccessRole';
import {UserAuthentication} from '../entity/UserAuthentication';

/**
 * UsersAuthentication class
 * @extends{AppRepository}
 * @class
 */
export class UsersAuthentications extends AppRepository {
  /**
   * Initializes a new instance
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }

  /**
   * Corresponding bcryptPassword function
   * @param{string} password
   * @return{Promise<string>}
   */
  public async bcryptPassword(password: string): Promise<string> {
    const bcryptedPassword: string =
      await bcrypt.hash(password, passwordHashKey);
    return bcryptedPassword;
  }
  /**
   * Corresponding bcryptPinfunction
   * @param{string} pin
   * @return{Promise<string>}
   */
  public async bcryptPin(pin: string): Promise<string> {
    const bcryptedPin: string =
      await bcrypt.hash(pin, pinHashKey);
    return bcryptedPin;
  }
  /**
   * Random UIN Generator
   * @return{bigint}
   */
  public randomUin(): bigint {
    let i: number = 0;
    let data: number = 0;
    const time: number = Date.now();
    for (i; i < 5; i++) {
      data = Math.floor(Math.random() * 90000) + 10000;
    }
    const uin: bigint = BigInt(data + time);
    return uin;
  }

  /**
   * Compare Password
   * @param{string} password
   * @param{string} storePassword
   * @return{Promise<boolean>}
   */
  public async comparePassword(password: string, storePassword: string)
    : Promise<boolean> {
    const isValid: boolean = await bcrypt.compare(password, storePassword);
    if (isValid) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * get Merchant Access Role data
   * @return{Promise<AccessRole|undefined>}
   */
  public async getMerchantAccessRole(): Promise<AccessRole | undefined> {
    const merchantAccessRole: AccessRole | undefined = await this.connection
        .getRepository(AccessRole)
        .createQueryBuilder('accessRole')
        .where('accessRole.title = :title', {title: 'Merchant'})
        .getOne();

    return merchantAccessRole;
  }

  /**
  * get Administrator Access Role data
  * @return{Promise<AccessRole|undefined>}
  */
  public async getAdministratorAccessRole(): Promise<AccessRole | undefined> {
    const administratorAccessRole: AccessRole | undefined =
      await this.connection
          .getRepository(AccessRole)
          .createQueryBuilder('accessRole')
          .where('accessRole.title = :title', {title: 'Administrator'})
          .getOne();

    return administratorAccessRole;
  }

  /**
  * get User data
  * @param{string} id
  * @return{Promise<UserAuthentication | undefined>}
  */
  public async getUserById(id:string): Promise<UserAuthentication | undefined> {
    const user: UserAuthentication | undefined =
      await this.connection
          .getRepository(UserAuthentication)
          .createQueryBuilder('userAuthentication')
          .where('userAuthentication.id = :id', {id: id})
          .getOne();

    return user;
  }
}
