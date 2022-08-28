import {AppRepository, RepositoryParameter}
  from './AppRepository';
import {Honorofic} from '../entity/Honorofic';
/**
 * Honorofic Repository
 */
export class Honorofics extends AppRepository {
  /**
   * Constructor Method.
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }

  /**
   * Sort Display Order
   * @return{Promise<Honorofic[]>}
   */
  public async sortByDisplayOrder(): Promise<Honorofic[]> {
    const sortDisplayOrder: Honorofic[] =
      await this.connection
          .getRepository(Honorofic)
          .createQueryBuilder('honorofic')
          .orderBy('honorofic.display_order', 'ASC')
          .getMany();

    return sortDisplayOrder;
  }
}
