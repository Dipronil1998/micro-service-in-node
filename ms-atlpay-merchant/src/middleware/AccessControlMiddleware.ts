import {NextFunction, Request, Response} from 'express';
import {forbidden, unauthorizedClientMessage} from '../../config/bootstrap';
import {InvalidInputException} from '../exception/InvalidInputException';
import {UnauthorizedClientException}
  from '../exception/UnauthorizedClientException';
import {Payload} from '../interface/types/jwt';
import {AutheticationService} from '../service/AuthenticationService';

/**
 * Access Control Middleware
 * @class{AccessControlMiddleware}
 */
export class AccessControlMiddleware {
  /**
     * Verify access role of a Merchant
     * @param{Request} request
     * @param{Response} response
     * @param{NextFunction} next
     */
  public verifyMerchantAccess = async (request : Request,
      response : Response, next : NextFunction) =>{
    try {
      const hasPermission: boolean = await
      this.verifyAccessRole(request, ['Merchant']);
      if (hasPermission === true) {
        next();
      } else {
        throw hasPermission;
      }
    } catch (error: any) {
      next(error);
    }
  };
  /**
   * Verify access role of a merchant and admin (as well as super admin)
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next
   */
  public verifyMerchantAndAdminAccess = async (request : Request,
      response: Response, next : NextFunction) =>{
    try {
      const hasPermission: boolean =
        await this.verifyAccessRole(request,
            ['Super Administrator', 'Administrator', 'Merchant']);
      if (hasPermission === true) {
        next();
      } else {
        throw hasPermission;
      }
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * Verify access role of Super Admin
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next
  */
  public verifySuperAdminAccess = async (request : Request,
      response: Response, next : NextFunction) =>{
    try {
      const hasPermission: boolean =
        await this.verifyAccessRole(request, ['Super Administrator']);
      if (hasPermission === true) {
        next();
      } else {
        throw hasPermission;
      }
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * Verify access role of Adminstrator
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next
   */
  public verifyAdminAccess = async (request : Request,
      response: Response, next : NextFunction) =>{
    try {
      const hasPermission: boolean =
        await this.verifyAccessRole(request,
            ['Super Administrator', 'Administrator']);
      if (hasPermission === true) {
        next();
      } else {
        throw hasPermission;
      }
    } catch (error: any) {
      next(error);
    }
  };
  /**
   * Verify accress based of input roles
   * @param{Request} request
   * @param{Array<string>} permissableAccessRoleTitles
   * @return{Promise<boolean>}
   */
  public verifyAccessRole = async (
      request : Request,
      permissableAccessRoleTitles : Array<string>):
    Promise<boolean> =>{
    try {
      const accessRoles = await new AutheticationService()
          .getAccessRole(request);
      const permissableAccessRoles: Array<any> =
        accessRoles.filter((accessRole : { title: string})=>{
          return permissableAccessRoleTitles.includes(accessRole.title);
        }).map( (accessRole : {id : string}) => {
          return accessRole.id;
        });
      if (! request.headers.user) {
        throw new UnauthorizedClientException();
      }

      if ( typeof(request.headers.user)==='string') {
        const user : Payload = JSON.parse(request.headers.user);
        if (permissableAccessRoles.includes(user.user_access_role_id )) {
          return true;
        } else {
          throw new UnauthorizedClientException(
              unauthorizedClientMessage, forbidden);
        }
      } else {
        throw new InvalidInputException('Invalid Input');
      }
    } catch (error: any) {
      throw error;
    }
  };
}
