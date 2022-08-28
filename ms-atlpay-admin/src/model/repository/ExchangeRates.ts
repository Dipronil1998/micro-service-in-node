import {AppRepository, RepositoryParameter} from './AppRepository';
/**
 * Exchange Rates Repository
 * @class
 * @extends{AppRepository}
 */
export class ExchangeRates extends AppRepository {
  /**
   * Constructor Method.
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }
}
