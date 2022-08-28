import {AppRepository, RepositoryParameter} from './AppRepository';
/**
 * Payment Method Setting Repository
 */
export class PaymentMethodSettings extends AppRepository {
  /**
   * Constructor Method.
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }
}
