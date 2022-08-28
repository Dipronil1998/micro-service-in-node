import {AppRepository, RepositoryParameter} from './AppRepository';
/**
 * BusinessOwners Repository
 */
export class BusinessOwners extends AppRepository {
  /**
   * Constructor Method.
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }
}
