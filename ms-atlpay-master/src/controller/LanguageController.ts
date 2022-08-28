import {NextFunction, Request, Response} from 'express';
import {getConnection} from 'typeorm';
import {RepositoryParameter}
  from '../model/repository/AppRepository';
import {AppController} from './AppController';
import {ResponseService} from '../service/ResponseService';
import {httpDataNotFound, ormDBName}
  from '../../config/bootstrap';
import {DataNotFoundException}
  from '../exception/DataNotFoundException';
import {Language} from '../model/entity/Language';
import {Languages} from '../model/repository/Languages';

/**
  * LanguageController
  * @class
  * @extends{AppController}
*/
export class LanguageController extends AppController {
  /**
        * Database name
        * @var{any}
        */
  private _repositoryDBName: any;
  /**
        * Constructor of LanguageController
        * @param{string} name
        */
  constructor(name: string) {
    super(name);
    this._repositoryDBName = ormDBName;
  }

  /**
        * Get all Language List
        * @param{Request} req - Request
        * @param{Response} res - Response
        * @param{NextFunction} next - next function
        */
  public find = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const languageParameter: RepositoryParameter = new RepositoryParameter(
          'Language',
          Language,
          this._repositoryDBName,
          'none',
          getConnection(this._repositoryDBName),
      );
      const languageRepo: Languages = new Languages(languageParameter);
      languageRepo.initializeAssociations();
      let languageList: Language[] = await languageRepo.find();
      if (languageList.length != 0) {
        languageList = languageRepo.toJson(languageList);
        new ResponseService().sendSuccessResponse(res, languageList);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (err: any) {
      next(err);
    }
  };

  /**
        * Find one Language List
        * @param{Request} req - Request
        * @param{Response} res - Response
        * @param{NextFunction} next - next function
        */
  public get = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const languageParameter: RepositoryParameter = new RepositoryParameter(
          'Language',
          Language,
          this._repositoryDBName,
          'none',
          getConnection(this._repositoryDBName),
      );
      const languageRepo: Languages = new Languages(languageParameter);
      languageRepo.initializeAssociations();
      const code: string = req.params.code;
      let language: Language[] =
                await languageRepo.getOnCondition({_code: code});
      if (language && language.length != 0) {
        language = languageRepo.toJson(language);
        new ResponseService().sendSuccessResponse(res, language);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (err: any) {
      next(err);
    }
  };
}
