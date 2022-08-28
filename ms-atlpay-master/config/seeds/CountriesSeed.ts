import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';
import {Connection, getConnection} from 'typeorm';
import {Country} from '../../src/model/entity/Country';
import {Countries} from './../../src/model/repository/Countries';
import {Currency} from '../../src/model/entity/Currency';
import {ormDBName} from '../bootstrap';
import {RepositoryParameter} from '../../src/model/repository/AppRepository';
/**
 * Countries seed.
 * @class
 */
export class CountriesSeed {
  /**
     * Run Method.
     * Write your database seeder using this method.
     * @return{void}
     */
  public run(): void {
    const countriesCSVFilePathName : string = './02-Countries.csv';
    const countriesFilepath : fs.PathLike =
      path.resolve(__dirname, countriesCSVFilePathName);
    const connection : Connection = getConnection(ormDBName);
    fs.createReadStream(countriesFilepath)
        .pipe(csv.parse({headers: true}))
        .on('error', (error) => console.error(error))
        .on('data', async (row)=>{
          const countryParameter: RepositoryParameter = new RepositoryParameter(
              'country',
              Country,
              ormDBName,
              'none',
              getConnection(ormDBName),
          );
          const countryRepo: Countries = new Countries(countryParameter);
          const isExists : boolean =
            await countryRepo.exists(
                {_isoNumeric: Number(row.Iso_Numeric)});
          if (!isExists) {
            const country = new Country();
            country.continentCode = row.Continent_Code;
            country.iso2 = row.Iso_2;
            country.iso3 = row.Iso_3;
            country.isoNumeric = Number(row.Iso_Numeric);
            country.fipsCode = row.Fips_Code;
            country.isdCode = Number(row.Isd_Code);
            country.commonName = row.Common_Name;
            country.officialName = row.Official_Name;
            country.endonym = row.Endonym;
            country.demonym = row.Demonym;
            const currency = await connection.createQueryBuilder()
                .select('currency')
                .from(Currency, 'currency')
                .where('currency.iso = :id',
                    {id: row.Official_Currency_Code}).getOne();
            if (currency!==undefined) {
              country.officialCurrencyCode = currency;
            }
            await connection.manager.save(country);
          }
        })
        .on('end', async (rowCount: number)=>{
          console.log(`Countries Seed Inserted ${rowCount} rows`);
        });
  }
}
