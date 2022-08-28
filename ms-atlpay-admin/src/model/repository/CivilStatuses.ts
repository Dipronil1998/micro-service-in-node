import {AppRepository, RepositoryParameter} from './AppRepository';
import {CivilStatus} from '../entity/CivilStatus';
/**
 * Civil Statuses Repository
 */
export class CivilStatuses extends AppRepository {
  /**
   * Constructor Method.
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }

  /**
   * Sort Display Order
   * @return{Promise<CivilStatus[]>}
   */
  public async sortByDisplayOrder():Promise<CivilStatus[]> {
    const sortDisplayOrder: CivilStatus[] =
      await this.connection
          .getRepository(CivilStatus)
          .createQueryBuilder('civilStatus')
          .orderBy('civilStatus.display_order', 'ASC')
          .getMany();

    return sortDisplayOrder;
  }
}
