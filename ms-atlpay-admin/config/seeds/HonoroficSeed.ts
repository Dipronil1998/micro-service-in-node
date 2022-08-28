import {getConnection} from 'typeorm';
import {ormDBName} from '../bootstrap';
import {RepositoryParameter}
  from '../../src/model/repository/AppRepository';
import {Honorofic}
  from '../../src/model/entity/Honorofic';
import {Honorofics}
  from '../../src/model/repository/Honorofics';

/**
 * Honorofic Seed
 * @class
 */
export class HonoroficSeed {
  /**
   * Run Method.
   * Write your database seeder using this method.
   * @return{void}
   */
  public async run(): Promise<void> {
    try {
      const dbName: any = ormDBName;
      const honoroficParameter: RepositoryParameter =
      new RepositoryParameter(
          'Honorofic',
          Honorofic,
          dbName,
          'none',
          getConnection(dbName),
      );
      const honoroficRepo: Honorofics =
        new Honorofics(honoroficParameter);
      honoroficRepo.initializeAssociations();

      let honorofic: Honorofic = honoroficRepo.newEntity();
      honorofic.code = 'MR';
      honorofic.title = 'Mr';
      honorofic.gender = 'M';
      honorofic.displayOrder = 1;
      let createHonorofic =
        await honoroficRepo.exists({_code: 'MR'});
      if (createHonorofic === false) {
        await honoroficRepo.save(honorofic);
      }

      honorofic = honoroficRepo.newEntity();
      honorofic.code = 'MISS';
      honorofic.title = 'Miss';
      honorofic.gender = 'F';
      honorofic.displayOrder = 2;
      createHonorofic =
        await honoroficRepo.exists({_code: 'MISS'});
      if (createHonorofic === false) {
        await honoroficRepo.save(honorofic);
      }

      honorofic = honoroficRepo.newEntity();
      honorofic.code = 'MRS';
      honorofic.title = 'Mrs';
      honorofic.gender = 'F';
      honorofic.displayOrder = 3;
      createHonorofic =
        await honoroficRepo.exists({_code: 'MRS'});
      if (createHonorofic === false) {
        await honoroficRepo.save(honorofic);
      }

      honorofic = honoroficRepo.newEntity();
      honorofic.code = 'MS';
      honorofic.title = 'Ms';
      honorofic.gender = 'F';
      honorofic.displayOrder = 4;
      createHonorofic =
        await honoroficRepo.exists({_code: 'MS'});
      if (createHonorofic === false) {
        await honoroficRepo.save(honorofic);
      }

      honorofic = honoroficRepo.newEntity();
      honorofic.code = 'DR';
      honorofic.title = 'Dr';
      honorofic.gender = 'C';
      honorofic.displayOrder = 5;
      createHonorofic =
        await honoroficRepo.exists({_code: 'DR'});
      if (createHonorofic === false) {
        await honoroficRepo.save(honorofic);
      }

      console.log('HonoroficSeed Inserted Successfully');
    } catch (error) {
      console.log(error);
    }
  }
}
