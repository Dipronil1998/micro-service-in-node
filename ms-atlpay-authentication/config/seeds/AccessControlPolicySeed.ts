import {getConnection} from 'typeorm';
import {ormDBName} from '../bootstrap';
import {AccessControlPolicies}
  from '../../src/model/repository/AccessControlPolicies';
import {RepositoryParameter} from '../../src/model/repository/AppRepository';
import {AccessControlPolicy} from '../../src/model/entity/AccessControlPolicy';
/**
 * Access Control Policy Seed
 * @class
 */
export class AccessControlPolicySeed {
  /**
   * Execute Seed.
   */
  public async run() {
    const dbName:any=ormDBName;
    const accessControlPolicyParameter:RepositoryParameter =
    new RepositoryParameter(
        'AccessControlPolicy',
        AccessControlPolicy,
        dbName,
        'none',
        getConnection(dbName),
    );
    const accessControlRepo:AccessControlPolicies =
        new AccessControlPolicies(accessControlPolicyParameter);
    accessControlRepo.initializeAssociations();

    // let accessControlPolicy : AccessControlPolicy =
    //    new AccessControlPolicy();
  }
}
