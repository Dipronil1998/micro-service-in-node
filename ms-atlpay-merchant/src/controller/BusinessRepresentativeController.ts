import {NextFunction, Request} from 'express';
import {Response} from 'express-serve-static-core';
import {getConnection, UpdateResult} from 'typeorm';
import {httpDataNotFound, httpSuccessDataUpdate, ormDBName}
  from '../../config/bootstrap';
import {DataNotFoundException} from '../exception/DataNotFoundException';
import {InvalidInputException} from '../exception/InvalidInputException';
import {BusinessRepresentative} from '../model/entity/BusinessRepresentative';
import {Merchant} from '../model/entity/Merchant';
import {RepositoryParameter} from '../model/repository/AppRepository';
import {BusinessRepresentatives}
  from '../model/repository/BusinessRepresentatives';
import {Merchants} from '../model/repository/Merchants';
import {ResponseService} from '../service/ResponseService';
import {Pagination} from '../utils/Pagination';
import {AppController} from './AppController';

/**
 * Business Representative Controller
 * @class{BusinessRepresentativeController}
 * @extends{AppController}
 */
export class BusinessRepresentativeController extends AppController {
  private _databaseName: string = ormDBName;
  /**
     * Constructor Method.
     * @constructor
     */
  constructor() {
    super('Business Representative Controller');
  }
  /**
     * Create a new Business Representative.
     * @param{Request} request
     * @param{Response} response
     * @param{NextFunction} next
     */
  public create = async (
      request: Request,
      response : Response,
      next: NextFunction)=>{
    this._request = request;
    this._response = response;
    try {
      const businessRepresentativeRepositoryOptions : RepositoryParameter =
        new RepositoryParameter(
            'Business Representative',
            BusinessRepresentative,
            this._databaseName,
            'none',
            getConnection(this._databaseName),
        );
      const businessRepresentativeRepository: BusinessRepresentatives =
        new BusinessRepresentatives(businessRepresentativeRepositoryOptions);
      const businessRepresentative : BusinessRepresentative =
        businessRepresentativeRepository.newEntity();
      businessRepresentative.firstName =
      request.body.business_representative_first_name;
      businessRepresentative.middleName =
      request.body.business_representative_middle_name;
      businessRepresentative.lastName =
      request.body.business_representative_last_name;
      businessRepresentative.email = request.body.business_representative_email;
      businessRepresentative.jobTitle =
      request.body.business_representative_job_title;
      businessRepresentative.dateOfBirth =
      request.body.business_representative_date_of_birth;
      businessRepresentative.businessAddressLine1 =
        request.body.business_representative_business_address_line_1;
      businessRepresentative.businessAddressLine2 =
        request.body.business_representative_business_address_line_2;
      businessRepresentative.businessAddressLine3 =
        request.body.business_representative_business_address_line_3;
      businessRepresentative.phoneNumber =
        request.body.business_representative_phone_number;

      const newBusinessRepresentative : BusinessRepresentative| boolean =
        await businessRepresentativeRepository.save(businessRepresentative);
      if (newBusinessRepresentative instanceof BusinessRepresentative) {
        request.body.business_representative = newBusinessRepresentative;

        next();
      } else {
        throw new InvalidInputException(
            'Invalid Input in Business Representative');
      }
    } catch (error: any) {
      next(error);
    }
  };

  /**
     * Update Business Representative.
     * @param{Request} request
     * @param{Response} response
     * @param{NextFunction} next
     */
  public update = async (
      request: Request,
      response : Response,
      next: NextFunction)=>{
    try {
      const id: string = request.params.id;
      const isSaved: boolean =await this
          .updateOnCondition(request, response, next, {_id: id});
      if (isSaved === true) {
        new ResponseService()
            .sendSuccessResponse(response, httpSuccessDataUpdate);
      } else {
        next(isSaved);
      }
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * Get all Business Representative
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next
   */
  public find = async (
      request: Request, response: Response, next: NextFunction) => {
    this._request = request;
    this._response = response;
    try {
      const businessRepresentativeRepositoryOptions : RepositoryParameter =
    new RepositoryParameter(
        'Business Representative',
        BusinessRepresentative,
        this._databaseName,
        'none',
        getConnection(this._databaseName),
    );
      const businessRepresentativeRepository: BusinessRepresentatives =
    new BusinessRepresentatives(businessRepresentativeRepositoryOptions);
      const page: any = request.query.page;
      const size: any = request.query.size;
      let businessRepresentatives: BusinessRepresentative[] =
      await businessRepresentativeRepository.find();
      if (businessRepresentatives && businessRepresentatives.length != 0) {
        businessRepresentatives = businessRepresentativeRepository
            .toJson(businessRepresentatives);
        const paginatedmerchants =
        new Pagination().pagination(businessRepresentatives, page, size);
        new ResponseService().sendSuccessResponse(response, paginatedmerchants);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (error: any) {
      next(error);
    }
  };

  /**
 * Get Business Representative
 * @param{Request} request
 * @param{Response} response
 * @param{NextFunction} next
 */
  public get = async (
      request: Request, response: Response, next: NextFunction) => {
    this._request = request;
    this._response = response;
    try {
      const businessRepresentativeRepositoryOptions : RepositoryParameter =
    new RepositoryParameter(
        'Business Representative',
        BusinessRepresentative,
        this._databaseName,
        'none',
        getConnection(this._databaseName),
    );
      const businessRepresentativeRepository: BusinessRepresentatives =
    new BusinessRepresentatives(businessRepresentativeRepositoryOptions);
      const id: string = request.params.id;
      let businessRepresentatives: BusinessRepresentative[] =
      await businessRepresentativeRepository
          .getOnCondition({_id: id});
      if (businessRepresentatives &&
      businessRepresentatives.length != 0) {
        businessRepresentatives = businessRepresentativeRepository
            .toJson(businessRepresentatives);
        new ResponseService()
            .sendSuccessResponse(response, businessRepresentatives);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * Update BusinessRepresentative By MerchantId and BusinessId
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next
   */
  public updateBusinessRepresentation =
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
              this._databaseName,
              'none',
              getConnection(this._databaseName),
          );
        const merchantRepository: Merchants =
          new Merchants(merchantRepositoryOptions);
        merchantRepository.initializeAssociations();

        const merchantId: string = request.params.merchantId;
        const businessId: string = request.params.businessId;
        const businessRepresentativeId: any = await merchantRepository
            .getBusinessRepresentation(merchantId, businessId);
        const isSaved: boolean =await this
            .updateOnCondition(request, response, next,
                {_id: businessRepresentativeId[0]._id});
        if (isSaved === true) {
          new ResponseService()
              .sendSuccessResponse(response, httpSuccessDataUpdate);
        } else {
          next(isSaved);
        }
      } catch (error: any) {
        next(error);
      }
    };

  /**
   * Update On Condition
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next
   * @param{any} condition
   * @return{boolean}
   */
  public updateOnCondition = async (request: Request, response: Response,
      next: NextFunction, condition: any) : Promise<any>=> {
    this._request = request;
    this._response = response;
    try {
      const businessRepresentativeRepositoryOptions : RepositoryParameter =
    new RepositoryParameter(
        'Business Representative',
        BusinessRepresentative,
        this._databaseName,
        'none',
        getConnection(this._databaseName),
    );
      const businessRepresentativeRepository: BusinessRepresentatives =
      new BusinessRepresentatives(businessRepresentativeRepositoryOptions);
      businessRepresentativeRepository.initializeAssociations();

      let businessRepresentative: BusinessRepresentatives =
    await businessRepresentativeRepository.getOnCondition(condition);
      if (!businessRepresentative) {
        throw new DataNotFoundException(httpDataNotFound);
      }
      const updateBusinessRepresentative : BusinessRepresentative =
    new BusinessRepresentative();

      if (request.body.business_representative_first_name) {
        updateBusinessRepresentative.firstName =
        request.body.business_representative_first_name;
      }
      if (request.body.business_representative_middle_name) {
        updateBusinessRepresentative.middleName =
        request.body.business_representative_middle_name;
      }
      if (request.body.business_representative_last_name) {
        updateBusinessRepresentative.lastName =
        request.body.business_representative_last_name;
      }
      if (request.body.business_representative_email) {
        updateBusinessRepresentative.email =
        request.body.business_representative_email;
      }
      if (request.body.business_representative_job_title) {
        updateBusinessRepresentative.jobTitle =
        request.body.business_representative_job_title;
      }
      if (request.body.business_representative_date_of_birth) {
        updateBusinessRepresentative.dateOfBirth =
        request.body.business_representative_date_of_birth;
      }
      if (request.body.business_representative_business_address_line_1) {
        updateBusinessRepresentative.businessAddressLine1 =
        request.body.business_representative_business_address_line_1;
      }
      if (request.body.business_representative_business_address_line_2) {
        updateBusinessRepresentative.businessAddressLine2 =
        request.body.business_representative_business_address_line_2;
      }
      if (request.body.business_representative_business_address_line_3) {
        updateBusinessRepresentative.businessAddressLine3 =
        request.body.business_representative_business_address_line_3;
      }
      if (request.body.business_representative_phone_number) {
        updateBusinessRepresentative.phoneNumber =
        request.body.business_representative_phone_number;
      }

      businessRepresentative = await businessRepresentativeRepository
          .patchEntity(businessRepresentative, updateBusinessRepresentative);

      const updateauthenticationResult: UpdateResult =
        await businessRepresentativeRepository
            .updateAll(businessRepresentative, condition);
      const noOfRowsAffected: number | undefined =
        updateauthenticationResult.affected;
      if (noOfRowsAffected) {
        return true;
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
