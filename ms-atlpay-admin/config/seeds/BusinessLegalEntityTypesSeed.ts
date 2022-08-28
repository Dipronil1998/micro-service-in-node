import {getConnection} from 'typeorm';
import {ormDBName} from '../bootstrap';
import {RepositoryParameter} from '../../src/model/repository/AppRepository';
import {BusinessLegalEntityType}
  from './../../src/model/entity/BusinessLegalEntityType';
import {BusinessLegalEntityTypes}
  from './../../src/model/repository/BusinessLegalEntityTypes';
/**
 * Business Legal Entity Types Seed
 * @class
 */
export class BusinessLegalEntityTypesSeed {
  /**
   * Execute Seed.
   */
  public async run() {
    try {
      const dbName: any = ormDBName;
      const BusinessLegalEntityTypeParameter: RepositoryParameter =
        new RepositoryParameter(
            'BusinessLegalEntityType',
            BusinessLegalEntityType,
            dbName,
            'none',
            getConnection(dbName),
        );
      const businessLegalEntityTypeRepo: BusinessLegalEntityTypes =
        new BusinessLegalEntityTypes(BusinessLegalEntityTypeParameter);
      businessLegalEntityTypeRepo.initializeAssociations();
      let businessLegalEntityType: BusinessLegalEntityType =
      businessLegalEntityTypeRepo.newEntity();

      businessLegalEntityType.title='Limited by Guarantee';
      businessLegalEntityType.code='LIMITED_BY_GUARANTEE';
      businessLegalEntityType.displayOrder=1;
      let createBusinessLegalEntityType:boolean=
      await businessLegalEntityTypeRepo.exists({_code: 'LIMITED_BY_GUARANTEE'});
      if (createBusinessLegalEntityType===false) {
        await businessLegalEntityTypeRepo.save(businessLegalEntityType);
      }

      businessLegalEntityType=businessLegalEntityTypeRepo.newEntity();
      businessLegalEntityType.title='Limited';
      businessLegalEntityType.code='LIMITED';
      businessLegalEntityType.displayOrder=2;
      createBusinessLegalEntityType =
      await businessLegalEntityTypeRepo.exists({_code: 'LIMITED'});
      if (createBusinessLegalEntityType===false) {
        await businessLegalEntityTypeRepo.save(businessLegalEntityType);
      }

      businessLegalEntityType=businessLegalEntityTypeRepo.newEntity();
      businessLegalEntityType.title='Partnership';
      businessLegalEntityType.code='PARTNERSHIP';
      businessLegalEntityType.displayOrder=3;
      createBusinessLegalEntityType =
      await businessLegalEntityTypeRepo.exists({_code: 'PARTNERSHIP'});
      if (createBusinessLegalEntityType===false) {
        await businessLegalEntityTypeRepo.save(businessLegalEntityType);
      }

      businessLegalEntityType=businessLegalEntityTypeRepo.newEntity();
      businessLegalEntityType.title='Sole Trader / Freelancer';
      businessLegalEntityType.code='SOLE_TRADER_FREELANCER';
      businessLegalEntityType.displayOrder=4;
      createBusinessLegalEntityType =
      await businessLegalEntityTypeRepo
          .exists({_code: 'SOLE_TRADER_FREELANCER'});
      if (createBusinessLegalEntityType===false) {
        await businessLegalEntityTypeRepo.save(businessLegalEntityType);
      }

      businessLegalEntityType=businessLegalEntityTypeRepo.newEntity();
      businessLegalEntityType.title='Trust';
      businessLegalEntityType.code='TRUST';
      businessLegalEntityType.displayOrder=5;
      createBusinessLegalEntityType =
      await businessLegalEntityTypeRepo.exists({_code: 'TRUST'});
      if (createBusinessLegalEntityType===false) {
        await businessLegalEntityTypeRepo.save(businessLegalEntityType);
      }

      businessLegalEntityType=businessLegalEntityTypeRepo.newEntity();
      businessLegalEntityType.title='Charity';
      businessLegalEntityType.code='CHARITY';
      businessLegalEntityType.displayOrder=6;
      createBusinessLegalEntityType =
      await businessLegalEntityTypeRepo.exists({_code: 'CHARITY'});
      if (createBusinessLegalEntityType===false) {
        await businessLegalEntityTypeRepo.save(businessLegalEntityType);
      }

      console.log('BusinessLegalEntityTypes Seed Inserted');
    } catch (error) {
      console.log(error);
    }
  }
}
