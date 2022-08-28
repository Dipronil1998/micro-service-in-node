import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';
import {Currency} from '../../src/model/entity/Currency';
import {Connection, getConnection} from 'typeorm';
import {ormDBName} from '../bootstrap';
import {RepositoryParameter} from '../../src/model/repository/AppRepository';
import {Currencies} from '../../src/model/repository/Currencies';
/**
 * Currencies seed.
 * @class
 */
export class CurrenciesSeed {
  /**
     * Run Method.
     * Write your database seeder using this method.
     * @return{void}
     */
  public run(): void {
    const currenciesCSVFilePathName: string = './01-Currencies.csv';
    const currenciesFilepath: fs.PathLike =
      path.resolve(__dirname, currenciesCSVFilePathName);
    fs.createReadStream(currenciesFilepath)
        .pipe(csv.parse({headers: true}))
        .on('error', (error) => console.error(error))
        .on('data', async (row) => {
          const currencyParameter: RepositoryParameter =
            new RepositoryParameter(
                'currency',
                Currency,
                ormDBName,
                'none',
                getConnection(ormDBName),
            );
          const currencyRepo: Currencies = new Currencies(currencyParameter);
          const isExist: boolean =
            await currencyRepo.exists(
                {_iso: row.Iso});
          if (!isExist) {
            const currency: Currency = new Currency();
            currency.iso = row.Iso;
            // @ts-ignore
            currency.isoNumeric =
            Number(row.Iso_Numeric) ? Number(row.Iso_Numeric) : null;
            currency.commonName = row.Common_Nane;
            currency.officialName = row.Official_Name;
            currency.icon = row.Icon;
            currency.createdOn = new Date();
            currency.modifiedOn = new Date();
            const connection: Connection = getConnection(ormDBName);
            await connection.manager.save(currency);
          }
        })
        .on('end', async (rowCount: number) => {
          console.log(`Currencies Seed Inserted ${rowCount} rows`);
        });
  }
}

