import {AppRepository, RepositoryParameter} from './AppRepository';
/**
 * MerchantDocuments Repository
 */
export class MerchantDocuments extends AppRepository {
  /**
   * Constructor Method.
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }
}
