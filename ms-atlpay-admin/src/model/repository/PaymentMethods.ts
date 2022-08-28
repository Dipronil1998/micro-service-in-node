import {AppRepository, RepositoryParameter} from './AppRepository';
/**
 * Payment Methods Repository
 */
export class PaymentMethods extends AppRepository {
  /**
   * Constructor Method.
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }
}
