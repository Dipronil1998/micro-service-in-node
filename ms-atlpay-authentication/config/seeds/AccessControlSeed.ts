import {getConnection} from 'typeorm';
import {ormDBName} from '../bootstrap';
import {AccessControls} from '../../src/model/repository/AccessControls';
import {RepositoryParameter} from '../../src/model/repository/AppRepository';
import {AccessControl} from './../../src/model/entity/AccessControl';
/**
 * Access Control Seed
 * @class
 */
export class AccessControlSeed {
  /**
   * Execute Seed.
   */
  public async run() {
    const dbName:any=ormDBName;
    const accessControlParameter:RepositoryParameter =
    new RepositoryParameter(
        'AccessControl',
        AccessControl,
        dbName,
        'none',
        getConnection(dbName),
    );
    const accessControlRepo:AccessControls =
        new AccessControls(accessControlParameter);
    accessControlRepo.initializeAssociations();

    // let accessControl : AccessControl = new AccessControl();
  }
}
