import {AppRepository, RepositoryParameter} from './AppRepository';
import {BusinessSector} from '../entity/BusinessSector';
/**
 * Business Sector Repository
 */
export class BusinessSectors extends AppRepository {
  /**
   * Constructor Method.
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }

  /**
   * Sort Display Order
   * @return{Promise<BusinessSector[]>}
   */
  public async sortByDisplayOrder():Promise<BusinessSector[]> {
    const sortDisplayOrder: BusinessSector[] =
      await this.connection
          .getRepository(BusinessSector)
          .createQueryBuilder('businessSector')
          .orderBy('businessSector.display_order', 'ASC')
          .getMany();

    return sortDisplayOrder;
  }
}
