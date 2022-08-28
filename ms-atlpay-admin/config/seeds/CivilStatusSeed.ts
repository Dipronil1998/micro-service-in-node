import {getConnection} from 'typeorm';
import {ormDBName} from '../bootstrap';
import {RepositoryParameter} from '../../src/model/repository/AppRepository';
import {CivilStatus} from './../../src/model/entity/CivilStatus';
import {CivilStatuses} from '../../src/model/repository/CivilStatuses';
/**
 * Civil Statuses Seed
 * @class
 */
export class CivilStatusSeed {
  /**
     * Execute Seed.
     */
  public async run() {
    try {
      const dbName: any = ormDBName;
      const CivilStatusParameter: RepositoryParameter =
        new RepositoryParameter(
            'CivilStatus',
            CivilStatus,
            dbName,
            'none',
            getConnection(dbName),
        );
      const civilStatusesRepo: CivilStatuses =
        new CivilStatuses(CivilStatusParameter);
      civilStatusesRepo.initializeAssociations();

      let civilStatuses: CivilStatus =
        civilStatusesRepo.newEntity();
      civilStatuses.title='Annulled';
      civilStatuses.code='ANNULLED';
      civilStatuses.displayOrder=1;
      let createCivilStatuses:boolean=
      await civilStatusesRepo.exists({_code: 'ANNULLED'});
      if (createCivilStatuses===false) {
        await civilStatusesRepo.save(civilStatuses);
      }

      civilStatuses = civilStatusesRepo.newEntity();
      civilStatuses.title='Divorced';
      civilStatuses.code='DIVORCED';
      civilStatuses.displayOrder=2;
      createCivilStatuses = await civilStatusesRepo.exists({_code: 'DIVORCED'});
      if (createCivilStatuses===false) {
        await civilStatusesRepo.save(civilStatuses);
      }

      civilStatuses = civilStatusesRepo.newEntity();
      civilStatuses.title='Interlocutory';
      civilStatuses.code='INTERLOCUTORY';
      civilStatuses.displayOrder=3;
      createCivilStatuses = await civilStatusesRepo
          .exists({_code: 'INTERLOCUTORY'});
      if (createCivilStatuses===false) {
        await civilStatusesRepo.save(civilStatuses);
      }

      civilStatuses = civilStatusesRepo.newEntity();
      civilStatuses.title='Legally Separated';
      civilStatuses.code='LEGALLY_SEPARATED';
      civilStatuses.displayOrder=4;
      createCivilStatuses = await civilStatusesRepo
          .exists({_code: 'LEGALLY_SEPARATED'});
      if (createCivilStatuses===false) {
        await civilStatusesRepo.save(civilStatuses);
      }

      civilStatuses = civilStatusesRepo.newEntity();
      civilStatuses.title='Married';
      civilStatuses.code='MARRIED';
      civilStatuses.displayOrder=5;
      createCivilStatuses = await civilStatusesRepo.exists({_code: 'MARRIED'});
      if (createCivilStatuses===false) {
        await civilStatusesRepo.save(civilStatuses);
      }

      civilStatuses = civilStatusesRepo.newEntity();
      civilStatuses.title='Polygamous';
      civilStatuses.code='POLYGAMOUS';
      civilStatuses.displayOrder=6;
      createCivilStatuses = await civilStatusesRepo
          .exists({_code: 'POLYGAMOUS'});
      if (createCivilStatuses===false) {
        await civilStatusesRepo.save(civilStatuses);
      }

      civilStatuses = civilStatusesRepo.newEntity();
      civilStatuses.title='Never Married';
      civilStatuses.code='NEVER_MARRIED';
      civilStatuses.displayOrder=7;
      createCivilStatuses = await civilStatusesRepo
          .exists({_code: 'NEVER_MARRIED'});
      if (createCivilStatuses===false) {
        await civilStatusesRepo.save(civilStatuses);
      }

      civilStatuses = civilStatusesRepo.newEntity();
      civilStatuses.title='Domestic Partner';
      civilStatuses.code='DOMESTIC_PARTNER';
      civilStatuses.displayOrder=8;
      createCivilStatuses = await civilStatusesRepo
          .exists({_code: 'DOMESTIC_PARTNER'});
      if (createCivilStatuses===false) {
        await civilStatusesRepo.save(civilStatuses);
      }

      civilStatuses = civilStatusesRepo.newEntity();
      civilStatuses.title='Unmarried';
      civilStatuses.code='UNMARRIED';
      civilStatuses.displayOrder=9;
      createCivilStatuses = await civilStatusesRepo
          .exists({_code: 'UNMARRIED'});
      if (createCivilStatuses===false) {
        await civilStatusesRepo.save(civilStatuses);
      }

      civilStatuses = civilStatusesRepo.newEntity();
      civilStatuses.title='Widowed';
      civilStatuses.code='WIDOWED';
      civilStatuses.displayOrder=10;
      createCivilStatuses = await civilStatusesRepo.exists({_code: 'WIDOWED'});
      if (createCivilStatuses===false) {
        await civilStatusesRepo.save(civilStatuses);
      }

      console.log('CivilStatusSeed Inserted');
    } catch (error) {
      console.log(error);
    }
  }
}
