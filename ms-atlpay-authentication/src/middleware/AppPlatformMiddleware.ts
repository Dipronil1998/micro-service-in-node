import {NextFunction, Request, Response} from 'express';
import {getConnection} from 'typeorm';
import {httpAppCredentialsNotPresent, httpInvalidAppCredential, ormDBName}
  from '../../config/bootstrap';
import {AppKeyNotPresentException}
  from '../exception/AppKeyNotPresentException';
import {InvalidAppCredentialException}
  from '../exception/InvalidAppCredentialException';
import {Platform} from '../model/entity/Platform';
import {RepositoryParameter} from '../model/repository/AppRepository';
import {Platforms} from '../model/repository/Platforms';

/**
 *  App Platform Middleware
 *  @class
 */
export class AppPlatformMiddleware {
  /**
   * App Platform Middleware
   * @param{Request} req -Request
   * @param{Response} res - Response
   * @param{NextFunction} next - next function
   */
  public appPlatform = async (
      req: Request,
      res: Response,
      next: NextFunction) => {
    const dbName: any = ormDBName;
    try {
      const platformParameter: RepositoryParameter = new RepositoryParameter(
          'Platform',
          Platform,
          dbName,
          'none',
          getConnection(dbName),
      );
      const platformRepo: Platforms = new Platforms(platformParameter);
      platformRepo.initializeAssociations();
      const headerInformation: any = JSON.parse(JSON.stringify(req.headers));
      const authId: string = headerInformation.app_token_id;
      const authSecret: string = headerInformation.app_secret_id;
      if (!authId || !authSecret) {
        throw new AppKeyNotPresentException(httpAppCredentialsNotPresent);
      } else {
        const isPlatformExists:boolean = await platformRepo.exists(
            {_appTokenId: authId, _appSecretId: authSecret});
        if (isPlatformExists) {
          next();
        } else {
          throw new InvalidAppCredentialException(httpInvalidAppCredential);
        }
      }
    } catch (err) {
      next(err);
    }
  };
}
