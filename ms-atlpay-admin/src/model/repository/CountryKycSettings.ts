import {AppRepository, RepositoryParameter} from './AppRepository';
/**
 * Country Kyc Setting Repository
 */
export class CountryKycSettings extends AppRepository {
  /**
   * Constructor Method.
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }
}
