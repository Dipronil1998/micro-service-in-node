import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';
import {Language} from '../../src/model/entity/Language';
import {Languages} from '../../src/model/repository/Languages';
import {Connection, getConnection} from 'typeorm';
import {ormDBName} from '../bootstrap';
import {RepositoryParameter} from '../../src/model/repository/AppRepository';
/**
 * Languages seed.
 * @class
 */
export class LanguagesSeed {
  /**
       * Run Method.
       * Write your database seeder using this method.
       * @return{void}
       */
  public run(): void {
    try {
      const languagesCSVFilePathName: string = './03-Languages.csv';
      const languagesFilepath: fs.PathLike =
                path.resolve(__dirname, languagesCSVFilePathName);
      fs.createReadStream(languagesFilepath)
          .pipe(csv.parse({headers: true}))
          .on('error', (error) => console.error(error))
          .on('data', async (row) => {
            const languageParameter: RepositoryParameter =
                        new RepositoryParameter(
                            'Language',
                            Language,
                            ormDBName,
                            'none',
                            getConnection(ormDBName),
                        );
            const currencyRepo: Languages = new Languages(languageParameter);
            const isExist: boolean =
                        await currencyRepo.exists(
                            {_code: row.code});
            if (!isExist) {
              const language: Language = new Language();
              language.code = row.code;
              language.languageFamily = row.language_family;
              language.title = row.title;
              const connection: Connection = getConnection(ormDBName);
              await connection.manager.save(language);
            }
          })
          .on('end', async (rowCount: number) => {
            console.log(`Language Seed Inserted ${rowCount} rows`);
          });
    } catch (err: any) {
      console.log(err);
    }
  }
}

