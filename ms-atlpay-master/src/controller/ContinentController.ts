import {NextFunction, Request, Response} from 'express';
import {getConnection} from 'typeorm';
import {RepositoryParameter} from '../model/repository/AppRepository';
import {AppController} from './AppController';
import {ResponseService} from '../service/ResponseService';
import {httpDataNotFound, ormDBName}
  from '../../config/bootstrap';
import {DataNotFoundException} from '../exception/DataNotFoundException';
import {Continent} from '../model/entity/Continent';
import {Continents} from '../model/repository/Continents';

/**
  * ContinentController
  * @class
  * @extends{AppController}
*/
export class ContinentController extends AppController {
  /**
      * Database name
      * @var{any}
      */
  private _repositoryDBName: any;
  /**
      * Constructor of ContinentController
      * @param{string} name
      */
  constructor(name: string) {
    super(name);
    this._repositoryDBName = ormDBName;
  }

  /**
      * Get all Continent List
      * @param{Request} req - Request
      * @param{Response} res - Response
      * @param{NextFunction} next - next function
      */
  public find = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const continentParameter: RepositoryParameter = new RepositoryParameter(
          'Continent',
          Continent,
          this._repositoryDBName,
          'none',
          getConnection(this._repositoryDBName),
      );
      const continentRepo: Continents = new Continents(continentParameter);
      continentRepo.initializeAssociations();
      let continentList: Continent[] = await continentRepo.find();
      if (continentList.length != 0) {
        continentList = continentRepo.toJson(continentList);
        new ResponseService().sendSuccessResponse(res, continentList);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (err: any) {
      next(err);
    }
  };

  /**
      * Find one Continent List
      * @param{Request} req - Request
      * @param{Response} res - Response
      * @param{NextFunction} next - next function
      */
  public get = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const continentParameter: RepositoryParameter = new RepositoryParameter(
          'Continent',
          Continent,
          this._repositoryDBName,
          'none',
          getConnection(this._repositoryDBName),
      );
      const continentRepo: Continents = new Continents(continentParameter);
      continentRepo.initializeAssociations();
      const code: string = req.params.code;
      let continent: Continent[] =
                await continentRepo.getOnCondition({_code: code});
      if (continent && continent.length != 0) {
        continent = continentRepo.toJson(continent);
        new ResponseService().sendSuccessResponse(res, continent);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (err: any) {
      next(err);
    }
  };
}
