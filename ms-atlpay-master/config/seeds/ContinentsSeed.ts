import {getConnection} from 'typeorm';
import {Continent} from '../../src/model/entity/Continent';
import {RepositoryParameter} from '../../src/model/repository/AppRepository';
import {Continents} from '../../src/model/repository/Continents';
import {ormDBName} from '../bootstrap';

/**
 * ContinentsSeed class
 * @class
 */
export class ContinentsSeed {
  /**
      * Run Method.
      * Write your database seeder using this method.
      * @return{void}
      */
  public async run(): Promise<void> {
    try {
      const dbName: any = ormDBName;
      const continentParameter: RepositoryParameter =
                new RepositoryParameter(
                    'Continent',
                    Continent,
                    dbName,
                    'none',
                    getConnection(dbName),
                );
      const continentRepo: Continents = new Continents(continentParameter);
      continentRepo.initializeAssociations();

      let continent: Continent = continentRepo.newEntity();
      continent.code = 'AS';
      continent.name = 'Asia';
      let createContinent: boolean = await continentRepo.exists({_code: 'AS'});
      if (createContinent == false) {
        await continentRepo.save(continent);
      }

      continent = continentRepo.newEntity();
      continent.code = 'AF';
      continent.name = 'Africa';
      createContinent = await continentRepo.exists({_code: 'AF'});
      if (createContinent == false) {
        await continentRepo.save(continent);
      }

      continent = continentRepo.newEntity();
      continent.code = 'AN';
      continent.name = 'Antarctica';
      createContinent = await continentRepo.exists({_code: 'AN'});
      if (createContinent == false) {
        await continentRepo.save(continent);
      }

      continent = continentRepo.newEntity();
      continent.code = 'OC';
      continent.name = 'Oceania';
      createContinent = await continentRepo.exists({_code: 'OC'});
      if (createContinent == false) {
        await continentRepo.save(continent);
      }

      continent = continentRepo.newEntity();
      continent.code = 'EU';
      continent.name = 'Europe';
      createContinent = await continentRepo.exists({_code: 'EU'});
      if (createContinent == false) {
        await continentRepo.save(continent);
      }

      continent = continentRepo.newEntity();
      continent.code = 'NA';
      continent.name = 'North America';
      createContinent = await continentRepo.exists({_code: 'NA'});
      if (createContinent == false) {
        await continentRepo.save(continent);
      }

      continent = continentRepo.newEntity();
      continent.code = 'SA';
      continent.name = 'South America';
      createContinent = await continentRepo.exists({_code: 'SA'});
      if (createContinent == false) {
        await continentRepo.save(continent);
      }

      console.log('Continent Seed Inserted Sucessfully');
    } catch (err: any) {
      console.log(err);
    }
  }
}
