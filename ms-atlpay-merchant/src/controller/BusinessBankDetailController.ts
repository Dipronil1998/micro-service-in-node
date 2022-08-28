import {NextFunction, Request} from 'express';
import {Response} from 'express-serve-static-core';
import {getConnection, UpdateResult} from 'typeorm';
import {httpDataNotFound, httpSuccessDataUpdate, ormDBName}
  from '../../config/bootstrap';
import {DataNotFoundException} from '../exception/DataNotFoundException';
import {InvalidInputException} from '../exception/InvalidInputException';
import {BusinessBankDetail} from '../model/entity/BusinessBankDetail';
import {RepositoryParameter} from '../model/repository/AppRepository';
import {BusinessBankDetails} from '../model/repository/BusinessBankDetails';
import {ResponseService} from '../service/ResponseService';
import {AppController} from './AppController';
import {Pagination} from '../utils/Pagination';

/**
 * Business Bank Detail Controller
 * @class{BusinessBankDetailController}
 * @extends{AppController}
 */
export class BusinessBankDetailController extends AppController {
  /**
     * Database Name
     * @var{any}
     */
  private _dataBaseName: any;
  /**
     * Contructor Method.
     * @constructor
     */
  constructor() {
    super('Business Bank Detail Controller');
    this._dataBaseName = ormDBName;
  }
  /**
     * Create a new Business Bank Detail.
     * @param{Request} request
     * @param{Response} response
     * @param{NextFunction} next Next Function
     */
  public create = async (
      request: Request, response: Response, next: NextFunction) => {
    this._request = request;
    this._response = response;
    try {
      const businessBankDetailOptions: RepositoryParameter =
        new RepositoryParameter(
            'BusinessBankDetail',
            BusinessBankDetail,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const businessBankDetailRepository: BusinessBankDetails =
        new BusinessBankDetails(businessBankDetailOptions);
      businessBankDetailRepository.initializeAssociations();
      const businessBankDetail: BusinessBankDetail =
        businessBankDetailRepository.newEntity();

      const accountHolderName = request.body.account_holder_name;
      const accountNumber = request.body.account_number;
      const branchName = request.body.branch_name;
      const countrySpecificBranchCode =
        request.body.country_specific_branch_code;
      const isPrimary = request.body.business_bank_detail_is_primary;
      const merchantBusinessProfile = request.body.merchant_business_profile;

      businessBankDetail.accountHolderName = accountHolderName;
      businessBankDetail.accountNumber = accountNumber;
      businessBankDetail.branchName = branchName;
      businessBankDetail.countrySpecificBranchCode = countrySpecificBranchCode;
      businessBankDetail.isPrimary = isPrimary;
      businessBankDetail.merchantBusinessProfile = merchantBusinessProfile;

      const newBusinessBankDetail: BusinessBankDetail | boolean =
        await businessBankDetailRepository.save(businessBankDetail);
      if (newBusinessBankDetail instanceof BusinessBankDetail) {
        next();
      } else {
        throw new InvalidInputException('Invalid Input in Bank Details');
      }
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * Get all Business Bank Detail
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next
   */
  public find = async (
      request: Request, response: Response, next: NextFunction) => {
    this._request = request;
    this._response = response;
    try {
      const businessBankDetailOptions: RepositoryParameter =
        new RepositoryParameter(
            'BusinessBankDetail',
            BusinessBankDetail,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const page: any = request.query.page;
      const size: any = request.query.size;
      const businessBankDetailRepository: BusinessBankDetails =
        new BusinessBankDetails(businessBankDetailOptions);
      businessBankDetailRepository.initializeAssociations();
      let businessBankDetail: BusinessBankDetail[] =
        await businessBankDetailRepository.find();
      if (businessBankDetail && businessBankDetail.length != 0) {
        response.setHeader('Content-Type', 'application/json');
        businessBankDetail =
          businessBankDetailRepository.toJson(businessBankDetail);
        const paginatedbusinessBankDetail =
          new Pagination().pagination(businessBankDetail, page, size);
        new ResponseService()
            .sendSuccessResponse(response, paginatedbusinessBankDetail);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * Get Business Bank Detail
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next
   */
  public get = async (
      request: Request, response: Response, next: NextFunction) => {
    this._request = request;
    this._response = response;
    try {
      const businessBankDetailOptions: RepositoryParameter =
        new RepositoryParameter(
            'BusinessBankDetail',
            BusinessBankDetail,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const businessBankDetailRepository: BusinessBankDetails =
        new BusinessBankDetails(businessBankDetailOptions);
      const id: string = request.params.id;
      let businessBankDetail: BusinessBankDetail[] =
        await businessBankDetailRepository
            .getOnCondition({_id: id});
      if (businessBankDetail && businessBankDetail.length != 0) {
        businessBankDetail =
          businessBankDetailRepository.toJson(businessBankDetail);
        new ResponseService()
            .sendSuccessResponse(response, businessBankDetail);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (error: any) {
      next(error);
    }
  };

  /**
     * Update Business Bank Detail.
     * @param{Request} request
     * @param{Response} response
     * @param{NextFunction} next Next Function
     */
  public update = async (
      request: Request, response: Response, next: NextFunction) => {
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
   * Update Business Bank Details By Merchant and Business Id
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next Next Function
   */
  public updateMerchantIdBusinessId = async (
      request: Request, response: Response, next: NextFunction) => {
    try {
      const id: string = request.params.id;
      const businessId: string = request.params.businessId;
      const isSaved: boolean =await this
          .updateOnCondition(request, response, next,
              {_id: id, _merchantBusinessProfile: businessId});
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
      next: NextFunction, condition: any): Promise<any>=>{
    this._request = request;
    this._response = response;
    try {
      const businessBankDetailOptions: RepositoryParameter =
        new RepositoryParameter(
            'BusinessBankDetail',
            BusinessBankDetail,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const businessBankDetailRepository: BusinessBankDetails =
        new BusinessBankDetails(businessBankDetailOptions);
      businessBankDetailRepository.initializeAssociations();

      let businessBankDetail: BusinessBankDetail[] =
        await businessBankDetailRepository
            .getOnCondition(condition);
      if (!businessBankDetail) {
        throw new DataNotFoundException(httpDataNotFound);
      }
      const updateBusinessBankDetail:BusinessBankDetail =
          new BusinessBankDetail;

      const accountHolderName = request.body.account_holder_name;
      const accountNumber = request.body.account_number;
      const branchName = request.body.branch_name;
      const countrySpecificBranchCode =
            request.body.country_specific_branch_code;
      const isPrimary = request.body.business_bank_detail_is_primary;
      const merchantBusinessProfile = request.body.merchant_business_profile;
      if (accountHolderName) {
        updateBusinessBankDetail.accountHolderName = accountHolderName;
      }
      if (accountNumber) {
        updateBusinessBankDetail.accountNumber = accountNumber;
      }
      if (branchName) {
        updateBusinessBankDetail.branchName = branchName;
      }
      if (countrySpecificBranchCode) {
        updateBusinessBankDetail.countrySpecificBranchCode =
          countrySpecificBranchCode;
      }
      if (typeof isPrimary !== undefined && isPrimary) {
        updateBusinessBankDetail.isPrimary = isPrimary;
      }
      if (merchantBusinessProfile) {
        updateBusinessBankDetail.merchantBusinessProfile =
          merchantBusinessProfile;
      }
      businessBankDetail = await businessBankDetailRepository
          .patchEntity(businessBankDetail, updateBusinessBankDetail);
      const updatebusinessBankDetail: UpdateResult =
          await businessBankDetailRepository
              .updateAll(businessBankDetail, condition);
      const noOfRowsAffected: number | undefined =
        updatebusinessBankDetail.affected;
      if (noOfRowsAffected) {
        return true;
      } else {
        const dataNotFoundException: DataNotFoundException =
            new DataNotFoundException(httpDataNotFound);
        next(dataNotFoundException);
      }
    } catch (err:any) {
      return err;
    }
  };
}
