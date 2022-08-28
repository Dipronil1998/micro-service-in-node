import {AppRepository, RepositoryParameter} from './AppRepository';
/**
 * Country Compliance Settings Repository
 */
export class CountryComplianceSettings extends AppRepository {
  /**
   * Constructor Method.
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }
}
