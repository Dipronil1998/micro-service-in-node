import {AdminAuthentication} from '../entity/AdminAuthentication';
import {AppRepository,
  RepositoryParameter} from './AppRepository';
/**
 * Admin notes repository
 * @class{AdminNotes}
 * @extends{AppRepository}
 */
export class AdminNotes extends AppRepository {
  /**
   * Constructor Method.
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }
  /**
   * Get owner
   * @param{string} ownerId
   * @return{Promise<AdminAuthentication| boolean>}
   */
  public getOwner = async (ownerId: string)
    : Promise<AdminAuthentication| boolean> =>{
    try {
      const owner : AdminAuthentication = (await this
          .connection
          .getRepository(AdminAuthentication)
          .findByIds([ownerId]))[0];
      return owner;
    } catch (error) {
      return false;
    }
  };
  /**
   * Get admin
   * @param{string} adminId
   * @return{Promise<AdminAuthentication| boolean>}
   */
  public getAdmin = async (adminId: string)
    : Promise<AdminAuthentication| boolean> =>{
    try {
      const admin : AdminAuthentication = (await this
          .connection
          .getRepository(AdminAuthentication)
          .findByIds([adminId]))[0];
      return admin;
    } catch (error) {
      return false;
    }
  };
}
