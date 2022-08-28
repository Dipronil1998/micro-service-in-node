import {AppRepository, RepositoryParameter} from './AppRepository';
/**
 * MerchantWallets Repository
 */
export class MerchantWallets extends AppRepository {
  /**
   * Constructor Method.
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }
}
