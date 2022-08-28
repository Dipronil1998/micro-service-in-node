import {AppRepository, RepositoryParameter} from './AppRepository';
/**
 * Exchange Rate Definitions Repository
 * @class
 * @extends{AppRepository}
 */
export class ExchangeRateDefinitions extends AppRepository {
  /**
   * Constructor Method.
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }
}
