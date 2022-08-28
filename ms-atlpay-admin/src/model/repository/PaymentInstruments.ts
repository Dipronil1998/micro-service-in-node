import {AppRepository, RepositoryParameter} from './AppRepository';
/**
 * Payment Instruments Repository
 */
export class PaymentInstruments extends AppRepository {
  /**
   * Constructor Method.
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }
}
