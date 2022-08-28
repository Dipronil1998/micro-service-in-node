import {AppRepository, RepositoryParameter} from './AppRepository';
/**
 * Instrument Charges Repository
 * @class
 * @extends{AppRepository}
 */
export class InstrumentCharges extends AppRepository {
  /**
   * Constructor Method.
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }
}
