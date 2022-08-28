import {AppRepository, RepositoryParameter} from './AppRepository';
/**
 * BusinessBankDetails Repository
 */
export class BusinessBankDetails extends AppRepository {
  /**
   * Constructor Method.
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }
}
