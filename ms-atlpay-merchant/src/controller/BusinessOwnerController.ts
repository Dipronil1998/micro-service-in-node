import {NextFunction, Request, Response} from 'express';
import {getConnection, UpdateResult} from 'typeorm';
import {httpDataNotFound, httpSuccessDataUpdate, ormDBName}
  from '../../config/bootstrap';
import {RepositoryParameter} from '../model/repository/AppRepository';
import {AppController} from './AppController';
import {BusinessOwner} from './../model/entity/BusinessOwner';
import {BusinessOwners} from '../model/repository/BusinessOwners';
import {MerchantBusinessProfile} from '../model/entity/MerchantBusinessProfile';
import {InvalidInputException} from '../exception/InvalidInputException';
import {DataNotFoundException} from '../exception/DataNotFoundException';
import {ResponseService} from '../service/ResponseService';
import {Pagination} from '../utils/Pagination';
import {Merchants} from '../model/repository/Merchants';
import {Merchant} from '../model/entity/Merchant';

/**
 * Business Owner Controller
 * @class{BusinessOwnerController}
 * @extends{AppController}
 */
export class BusinessOwnerController extends AppController {
  private _dataBaseName: any;
  /**
   * Constructor Method.
   */
  constructor() {
    super('BusinessOwnerController');
    this._dataBaseName = ormDBName;
  }
  /**
   * Create a business owner.
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next
   */
  public create = async (
      request: Request,
      response: Response,
      next: NextFunction,
  ) => {
    this._request = request;
    this._response = response;
    try {
      const businessOwnerRepositoryOptions: RepositoryParameter =
        new RepositoryParameter(
            'businessOwner',
            BusinessOwner,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const businessOwnerRepository: BusinessOwners = new BusinessOwners(
          businessOwnerRepositoryOptions,
      );
      const firstName: string = request.body.business_owner_first_name;
      const middleName: string = request.body.business_owner_middle_name;
      const lastName: string = request.body.business_owner_last_name;
      const email: string = request.body.business_owner_email;
      const merchantBusinessProfile: MerchantBusinessProfile =
        request.body.merchant_business_profile;

      const businessOwner: BusinessOwner = businessOwnerRepository.newEntity();
      businessOwner.firstName = firstName;
      businessOwner.middleName = middleName;
      businessOwner.lastName = lastName;
      businessOwner.email = email;
      businessOwner.merchantBusinessProfile = merchantBusinessProfile;
      const newbusinessOwner: BusinessOwner | boolean =
        await businessOwnerRepository.save(businessOwner);
      if (newbusinessOwner instanceof BusinessOwner) {
        next();
      } else {
        throw new InvalidInputException('Invalid Input in Business Owner');
      }
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get all Business Owner
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next
   */
  public find = async (
      request: Request, response: Response, next: NextFunction) => {
    this._request = request;
    this._response = response;
    try {
      const businessOwnerRepositoryOptions: RepositoryParameter =
        new RepositoryParameter(
            'businessOwner',
            BusinessOwner,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );

      const page: any = request.query.page;
      const size: any = request.query.size;
      const businessOwnerRepository: BusinessOwners = new BusinessOwners(
          businessOwnerRepositoryOptions,
      );
      businessOwnerRepository.initializeAssociations();
      let businessOwnerDetail: BusinessOwner[] =
        await businessOwnerRepository.find();
      if (businessOwnerDetail && businessOwnerDetail.length != 0) {
        businessOwnerDetail =
          businessOwnerRepository.toJson(businessOwnerDetail);
        const paginatedbusinessOwnerDetail =
          new Pagination().pagination(businessOwnerDetail, page, size);
        new ResponseService()
            .sendSuccessResponse(response, paginatedbusinessOwnerDetail);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (error: any) {
      next(error);
    }
  };

  /**
 * Get Business Owner
 * @param{Request} request
 * @param{Response} response
 * @param{NextFunction} next
 */
  public get = async (
      request: Request, response: Response, next: NextFunction) => {
    this._request = request;
    this._response = response;
    try {
      const businessOwnerRepositoryOptions: RepositoryParameter =
        new RepositoryParameter(
            'businessOwner',
            BusinessOwner,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const businessOwnerRepository: BusinessOwners = new BusinessOwners(
          businessOwnerRepositoryOptions,
      );
      const id: string = request.params.id;
      let businessOwnerDetail: BusinessOwner[] =
        await businessOwnerRepository
            .getOnCondition({_id: id});
      if (businessOwnerDetail && businessOwnerDetail.length != 0) {
        businessOwnerDetail =
          businessOwnerRepository.toJson(businessOwnerDetail);
        new ResponseService()
            .sendSuccessResponse(response, businessOwnerDetail);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (error: any) {
      next(error);
    }
  };

  /**
     * Update Business Owner.
     * @param{Request} request
     * @param{Response} response
     * @param{NextFunction} next Next Function
     */
  public update = async (
      request: Request, response: Response, next: NextFunction) => {
    this._request = request;
    this._response = response;
    try {
      const businessBankDetailOptions: RepositoryParameter =
      new RepositoryParameter(
          'BusinessOwner',
          BusinessOwner,
          this._dataBaseName,
          'none',
          getConnection(this._dataBaseName),
      );
      const businessOwnerRepository: BusinessOwners =
      new BusinessOwners(businessBankDetailOptions);
      businessOwnerRepository.initializeAssociations();

      const id: string = request.params.id;
      let businessOwnerDetail: BusinessOwner[] =
      await businessOwnerRepository
          .getOnCondition({_id: id});
      if (!businessOwnerDetail) {
        throw new DataNotFoundException(httpDataNotFound);
      }
      const businessOwnerUpdate:BusinessOwner = new BusinessOwner;

      const firstName: string = request.body.business_owner_first_name;
      const middleName: string = request.body.business_owner_middle_name;
      const lastName: string = request.body.business_owner_last_name;
      const email: string = request.body.business_owner_email;
      const merchantBusinessProfile: MerchantBusinessProfile =
          request.body.merchant_business_profile;
      if (firstName) {
        businessOwnerUpdate.firstName = firstName;
      } if (middleName) {
        businessOwnerUpdate.middleName = middleName;
      } if (lastName) {
        businessOwnerUpdate.lastName = lastName;
      } if (email) {
        businessOwnerUpdate.email = email;
      } if (merchantBusinessProfile) {
        businessOwnerUpdate.merchantBusinessProfile =
            merchantBusinessProfile;
      }

      businessOwnerDetail = await businessOwnerRepository
          .patchEntity(businessOwnerDetail, businessOwnerUpdate);
      const updateBusinessOwnerDetail: UpdateResult =
        await businessOwnerRepository
            .updateAll(businessOwnerDetail, {_id: id});
      const noOfRowsAffected: number | undefined =
      updateBusinessOwnerDetail.affected;
      if (noOfRowsAffected) {
        new ResponseService()
            .sendSuccessResponse(response, httpSuccessDataUpdate);
      } else {
        const dataNotFoundException: DataNotFoundException =
          new DataNotFoundException(httpDataNotFound);
        next(dataNotFoundException);
      }
    } catch (err) {
      next(err);
    }
  };

  /**
   * Update MerchantBusinessOwner By merchantId and businessId
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next
   */
  public updateMerchantBusinesOwner =
    async (request: Request,
        response: Response,
        next: NextFunction) => {
      this._request = request;
      this._response = response;
      try {
        const merchantRepositoryOptions: RepositoryParameter =
          new RepositoryParameter(
              'merchant',
              Merchant,
              this._dataBaseName,
              'none',
              getConnection(this._dataBaseName),
          );
        const merchantRepository: Merchants =
          new Merchants(merchantRepositoryOptions);
        const merchantId: string = request.params.merchantId;
        const businessId: string = request.params.businessId;
        const merchantBusinesOwner: BusinessOwner[] = await merchantRepository
            .getMerchantBusinessOwner(merchantId, businessId);
        if (merchantBusinesOwner.length==0) {
          throw new DataNotFoundException(httpDataNotFound);
        }
        const id:string = merchantBusinesOwner[0].id;
        const businessBankDetailOptions: RepositoryParameter =
          new RepositoryParameter(
              'BusinessOwner',
              BusinessOwner,
              this._dataBaseName,
              'none',
              getConnection(this._dataBaseName),
          );
        const businessOwnerRepository: BusinessOwners =
           new BusinessOwners(businessBankDetailOptions);
        const businessOwnerUpdate:BusinessOwner = new BusinessOwner;
        let businessOwnerDetail: BusinessOwner[] =
          await businessOwnerRepository.getOnCondition({_id: id});

        const firstName: string = request.body.business_owner_first_name;
        const middleName: string = request.body.business_owner_middle_name;
        const lastName: string = request.body.business_owner_last_name;
        const email: string = request.body.business_owner_email;
        const merchantBusinessProfile: MerchantBusinessProfile =
           request.body.merchant_business_profile;
        if (firstName) {
          businessOwnerUpdate.firstName = firstName;
        } if (middleName) {
          businessOwnerUpdate.middleName = middleName;
        } if (lastName) {
          businessOwnerUpdate.lastName = lastName;
        } if (email) {
          businessOwnerUpdate.email = email;
        } if (merchantBusinessProfile) {
          businessOwnerUpdate.merchantBusinessProfile =
             merchantBusinessProfile;
        }

        businessOwnerDetail = await businessOwnerRepository
            .patchEntity(businessOwnerDetail, businessOwnerUpdate);
        const updateBusinessOwnerDetail: UpdateResult =
         await businessOwnerRepository
             .updateAll(businessOwnerDetail, {_id: id});
        const noOfRowsAffected: number | undefined =
           updateBusinessOwnerDetail.affected;
        if (noOfRowsAffected) {
          new ResponseService()
              .sendSuccessResponse(response, httpSuccessDataUpdate);
        } else {
          const dataNotFoundException: DataNotFoundException =
               new DataNotFoundException(httpDataNotFound);
          next(dataNotFoundException);
        }
      } catch (error: any) {
        next(error);
      }
    };
}
