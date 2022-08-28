import {AppRepository, RepositoryParameter} from './AppRepository';
import {BusinessRole} from '../entity/BusinessRole';
/**
 * Business Role Repository
 */
export class BusinessRoles extends AppRepository {
  /**
   * Constructor Method.
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }

  /**
   * Sort Display Order
   * @return{Promise<BusinessRole[]>}
   */
  public async sortByDisplayOrder():Promise<BusinessRole[]> {
    const sortDisplayOrder: BusinessRole[] =
      await this.connection
          .getRepository(BusinessRole)
          .createQueryBuilder('businessRole')
          .orderBy('businessRole.display_order', 'ASC')
          .getMany();

    return sortDisplayOrder;
  }
}
