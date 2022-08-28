import {AppRepository, RepositoryParameter} from './AppRepository';
/**
 * Country Payout Channel Configuration Repository
 */
export class CountryPayoutChannelConfigurations extends AppRepository {
  /**
   * Constructor Method.
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }
}
