import {AppRepository, RepositoryParameter} from './AppRepository';
import {BusinessLegalEntityType} from '../entity/BusinessLegalEntityType';
/**
 * Business Legal Entity Types Repository
 */
export class BusinessLegalEntityTypes extends AppRepository {
  /**
   * Constructor Method.
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }

  /**
   * Sort Display Order
   * @return{Promise<BusinessLegalEntityType[]>}
   */
  public async sortByDisplayOrder():Promise<BusinessLegalEntityType[]> {
    const sortDisplayOrder: BusinessLegalEntityType[] =
      await this.connection
          .getRepository(BusinessLegalEntityType)
          .createQueryBuilder('businessLegalEntityType')
          .orderBy('businessLegalEntityType.display_order', 'ASC')
          .getMany();

    return sortDisplayOrder;
  }
}
