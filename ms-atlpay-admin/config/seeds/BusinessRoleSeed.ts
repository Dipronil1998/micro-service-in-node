import {getConnection} from 'typeorm';
import {ormDBName} from '../bootstrap';
import {RepositoryParameter} from '../../src/model/repository/AppRepository';
import {BusinessRole} from './../../src/model/entity/BusinessRole';
import {BusinessRoles} from '../../src/model/repository/BusinessRoles';
/**
 * Business Role Seed
 * @class
 */
export class BusinessRoleSeed {
  /**
     * Execute Seed.
     */
  public async run() {
    try {
      const dbName: any = ormDBName;
      const BusinessRoleParameter: RepositoryParameter =
        new RepositoryParameter(
            'BusinessRole',
            BusinessRole,
            dbName,
            'none',
            getConnection(dbName),
        );
      const businessRoleRepo: BusinessRoles =
        new BusinessRoles(BusinessRoleParameter);
      businessRoleRepo.initializeAssociations();

      let businessRole: BusinessRole =
        businessRoleRepo.newEntity();
      businessRole.title='Director';
      businessRole.code='DIRECTOR';
      businessRole.displayOrder=1;
      let createBusinessSector:boolean=
      await businessRoleRepo.exists({_code: 'DIRECTOR'});
      if (createBusinessSector===false) {
        await businessRoleRepo.save(businessRole);
      }

      businessRole =businessRoleRepo.newEntity();
      businessRole.title='Owner';
      businessRole.code='OWNER';
      businessRole.displayOrder=2;
      createBusinessSector=await businessRoleRepo.exists({_code: 'OWNER'});
      if (createBusinessSector===false) {
        await businessRoleRepo.save(businessRole);
      }

      businessRole =businessRoleRepo.newEntity();
      businessRole.title='Partner';
      businessRole.code='PARTNER';
      businessRole.displayOrder=3;
      createBusinessSector=await businessRoleRepo.exists({_code: 'PARTNER'});
      if (createBusinessSector===false) {
        await businessRoleRepo.save(businessRole);
      }

      console.log('BusinessRoleSeed Inserted');
    } catch (error) {
      console.log(error);
    }
  }
}
