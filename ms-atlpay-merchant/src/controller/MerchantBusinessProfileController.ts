import {NextFunction, Request, Response} from 'express';
import {getConnection, UpdateResult} from 'typeorm';
import {httpDataNotFound, httpSuccessDataUpdate, ormDBName}
  from '../../config/bootstrap';
import {DataNotFoundException} from '../exception/DataNotFoundException';
import {BusinessRepresentative} from '../model/entity/BusinessRepresentative';
import {Merchant} from '../model/entity/Merchant';
import {MerchantBusinessProfile} from '../model/entity/MerchantBusinessProfile';
import {RepositoryParameter} from '../model/repository/AppRepository';
import {MerchantBusinessProfiles} from
  '../model/repository/MerchantBusinessProfiles';
import {ResponseService} from '../service/ResponseService';
import {AppController} from './AppController';
import {Pagination} from '../utils/Pagination';
import {InvalidInputException} from '../exception/InvalidInputException';

/**
 * Merchant Business Profile Controller
 * @class{MerchantBusinessProfileController}
 * @extends{AppController}
 */
export class MerchantBusinessProfileController extends AppController {
  private _dataBaseName: any;
  /**
   * Constructor Method.
   * @constructor
   */
  constructor() {
    super('Merchant Business Profile Controller');
    this._dataBaseName = ormDBName;
  }
  /**
     * Create a Merchant Business Profile
     * @param{Request} request
     * @param{Response} response
     * @param{NextFunction} next
     */
  public create = async (
      request: Request,
      response: Response,
      next: NextFunction) => {
    this._request = request;
    this._response = response;
    try {
      const merchantBusinessProfileRepositoryOptions: RepositoryParameter =
        new RepositoryParameter('merchantBusinessProfile',
            MerchantBusinessProfile,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName));
      const merchantBusinessProfileRepository: MerchantBusinessProfiles =
        new MerchantBusinessProfiles(merchantBusinessProfileRepositoryOptions);
      const businessName: string = request.body.business_name;
      const registrationNumber: string = request.body.registration_number;
      const businessLegalEntityType: string =
        request.body.business_legal_entity_type;
      const businessRoleText: string = request.body.business_role_text;
      const businessWebsite: string = request.body.business_website;
      const businessAddressLine1: string =
      request.body.merchant_business_profile_business_address_line_1;
      const businessAddressLine2: string =
        request.body.merchant_business_profile_business_address_line_2;
      const businessAddressLine3: string =
        request.body.merchant_business_profile_business_address_line_3;
      const businessCity: string = request.body.business_city;
      const businessRegion: string = request.body.business_region;
      const businessPostCode: string = request.body.business_post_code;
      const businessPhoneNumber: BigInt = request.body.business_phone_number;
      const businessEmail: string = request.body.business_email;
      const businessFaxNumber: BigInt = request.body.business_fax_number;
      const merchant: Merchant = request.body.merchant;
      const businessRepresentative: BusinessRepresentative =
        request.body.business_representative;

      const merchantBusinessProfile: MerchantBusinessProfile =
        merchantBusinessProfileRepository.newEntity();
      merchantBusinessProfile.businessName = businessName;
      merchantBusinessProfile.registrationNumber = registrationNumber;
      merchantBusinessProfile.businessLegalEntityType = businessLegalEntityType;
      merchantBusinessProfile.businessRoleText = businessRoleText;
      merchantBusinessProfile.businessWebsite = businessWebsite;
      merchantBusinessProfile.businessAddressLine1 = businessAddressLine1;
      merchantBusinessProfile.businessAddressLine2 = businessAddressLine2;
      merchantBusinessProfile.businessAddressLine3 = businessAddressLine3;
      merchantBusinessProfile.businessCity = businessCity;
      merchantBusinessProfile.businessRegion = businessRegion;
      merchantBusinessProfile.businessPostCode = businessPostCode;
      merchantBusinessProfile.businessPhoneNumber = businessPhoneNumber;
      merchantBusinessProfile.businessEmail = businessEmail;
      merchantBusinessProfile.businessFaxNumber = businessFaxNumber;
      merchantBusinessProfile.merchant = merchant;
      merchantBusinessProfile.businessRepresentative = businessRepresentative;
      const newmerchantBusinessProfile:
        MerchantBusinessProfile | boolean =
        await merchantBusinessProfileRepository
            .save(merchantBusinessProfile);
      if (newmerchantBusinessProfile instanceof MerchantBusinessProfile) {
        request.body.merchant_business_profile = newmerchantBusinessProfile;

        next();
      } else {
        throw new InvalidInputException(
            'Invalid Input in Merchant Business Profile');
      }
    } catch (error: any) {
      next(error);
    }
  };

  /**
     * Update Merchant Business Profile
     * @param{Request} request
     * @param{Response} response
     * @param{NextFunction} next
     */
  public update = async (
      request: Request,
      response: Response,
      next: NextFunction)=>{
    const id: string = request.params.id;
    try {
      const isSaved: boolean =await this
          .updateOnCondition(request, response, next, {_id: id});
      if (isSaved === true) {
        new ResponseService()
            .sendSuccessResponse(response, httpSuccessDataUpdate);
      } else {
        next(isSaved);
      }
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update Business Profile By Merchant Id
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next
   */
  public updateByMerchantId = async (
      request: Request,
      response: Response,
      next: NextFunction)=>{
    const id: string = request.params.id;
    const merchantId: string = request.params.merchantId;
    try {
      const isSaved: boolean = await this
          .updateOnCondition(request, response, next,
              {_id: id, _merchant: merchantId});
      if (isSaved === true) {
        new ResponseService()
            .sendSuccessResponse(response, httpSuccessDataUpdate);
      } else {
        next(isSaved);
      }
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get all Merchant Business Profile
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next
   */
  public find = async (
      request: Request, response: Response, next: NextFunction) => {
    this._request = request;
    this._response = response;
    try {
      const merchantBusinessProfileRepositoryOptions: RepositoryParameter =
        new RepositoryParameter('merchantBusinessProfile',
            MerchantBusinessProfile,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName));

      const page: any = request.query.page;
      const size: any = request.query.size;
      const merchantBusinessProfileRepository: MerchantBusinessProfiles =
        new MerchantBusinessProfiles(merchantBusinessProfileRepositoryOptions);
      merchantBusinessProfileRepository.initializeAssociations();

      let merchantBusinessProfileDetail: MerchantBusinessProfile[] =
        await merchantBusinessProfileRepository.find();
      if (merchantBusinessProfileDetail &&
        merchantBusinessProfileDetail.length != 0) {
        merchantBusinessProfileDetail =
          merchantBusinessProfileRepository
              .toJson(merchantBusinessProfileDetail);
        const paginatedmerchantBusinessProfileDetail =
          new Pagination()
              .pagination(merchantBusinessProfileDetail, page, size);
        new ResponseService()
            .sendSuccessResponse(response,
                paginatedmerchantBusinessProfileDetail);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * Get Merchant Business Profile
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next
   */
  public get = async (
      request: Request, response: Response, next: NextFunction) => {
    this._request = request;
    this._response = response;
    try {
      const merchantBusinessProfileRepositoryOptions: RepositoryParameter =
        new RepositoryParameter('merchantBusinessProfile',
            MerchantBusinessProfile,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName));
      const merchantBusinessProfileRepository: MerchantBusinessProfiles =
        new MerchantBusinessProfiles(merchantBusinessProfileRepositoryOptions);

      const id: string = request.params.id;
      let merchantBusinessProfileDetail: MerchantBusinessProfile[] =
      await merchantBusinessProfileRepository.get(id);
      if (merchantBusinessProfileDetail &&
        merchantBusinessProfileDetail.length != 0) {
        merchantBusinessProfileDetail =
          merchantBusinessProfileRepository
              .toJson(merchantBusinessProfileDetail);
        new ResponseService()
            .sendSuccessResponse(response, merchantBusinessProfileDetail);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * Update Data On Condition
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next
   * @param{any} condition
   * @return{Boolean}
   */
  public updateOnCondition = async (request: Request,
      response: Response,
      next: NextFunction,
      condition : any) : Promise<boolean>=>{
    this._request = request;
    this._response = response;
    try {
      const merchantBusinessProfileRepositoryOptions: RepositoryParameter =
        new RepositoryParameter('merchantBusinessProfile',
            MerchantBusinessProfile,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName));
      const merchantBusinessProfileRepository: MerchantBusinessProfiles =
        new MerchantBusinessProfiles(merchantBusinessProfileRepositoryOptions);
      const updateBusinessProfile:MerchantBusinessProfile =
        new MerchantBusinessProfile;
      let merchantBusinessProfile: Merchant[] =
        await merchantBusinessProfileRepository
            .getOnCondition(condition);
      if (!merchantBusinessProfile) {
        throw new DataNotFoundException(httpDataNotFound);
      }
      if (request.body.business_name) {
        updateBusinessProfile.businessName = request.body.business_name;
      } if (request.body.registration_number) {
        updateBusinessProfile.registrationNumber =
          request.body.registration_number;
      } if (request.body.business_legal_entity_type) {
        updateBusinessProfile.businessLegalEntityType =
          request.body.business_legal_entity_type;
      } if (request.body.business_role_text) {
        updateBusinessProfile.businessRoleText =
          request.body.business_role_text;
      } if (request.body.business_website) {
        updateBusinessProfile.businessWebsite= request.body.business_website;
      } if (request.body.merchant_business_profile_business_address_line_1) {
        updateBusinessProfile.businessAddressLine1=
          request.body.merchant_business_profile_business_address_line_1;
      } if (request.body.merchant_business_profile_business_address_line_2) {
        updateBusinessProfile.businessAddressLine2=
          request.body.merchant_business_profile_business_address_line_2;
      } if (request.body.merchant_business_profile_business_address_line_3) {
        updateBusinessProfile.businessAddressLine3=
          request.body.merchant_business_profile_business_address_line_3;
      } if (request.body.business_city) {
        updateBusinessProfile.businessCity=request.body.business_city;
      } if (request.body.business_region) {
        updateBusinessProfile.businessRegion=request.body.business_region;
      } if (request.body.business_post_code) {
        updateBusinessProfile.businessPostCode=request.body.business_post_code;
      } if (request.body.business_phone_number) {
        updateBusinessProfile.businessPhoneNumber=
          request.body.business_phone_number;
      } if (request.body.business_email) {
        updateBusinessProfile.businessEmail=request.body.business_email;
      } if (request.body.business_fax_number) {
        updateBusinessProfile.businessFaxNumber=
          request.body.business_fax_number;
      } if (request.body.merchant) {
        updateBusinessProfile.merchant=request.body.merchant;
      } if (request.body.business_representative) {
        updateBusinessProfile.businessRepresentative=
          request.body.business_representative;
      }

      merchantBusinessProfile = await merchantBusinessProfileRepository
          .patchEntity(merchantBusinessProfile, updateBusinessProfile);
      const updateBusinessProfileResult: UpdateResult =
        await merchantBusinessProfileRepository
            .updateAll(merchantBusinessProfile, condition);
      const noOfRowsAffected: number | undefined =
      updateBusinessProfileResult.affected;
      if (noOfRowsAffected) {
        return true;
      } else {
        const dataNotFoundException: DataNotFoundException =
          new DataNotFoundException(httpDataNotFound);
        throw (dataNotFoundException);
      }
    } catch (error: any) {
      return error;
    }
  };

  /**
   * Check Merchant Details By merchantId
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next
   */
  public checkMerchantBusiness = async (
      request: Request, response: Response, next: NextFunction) => {
    this._request = request;
    this._response = response;
    try {
      const merchantBusinessProfileRepositoryOptions: RepositoryParameter =
        new RepositoryParameter('merchantBusinessProfile',
            MerchantBusinessProfile,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName));
      const merchantBusinessProfileRepository: MerchantBusinessProfiles =
        new MerchantBusinessProfiles(merchantBusinessProfileRepositoryOptions);

      const merchantId: string = request.params.merchantId;
      const businessId: String = request.params.businessId;
      const merchantBusinessProfileDetail: MerchantBusinessProfile[] =
      await merchantBusinessProfileRepository
          .getOnCondition({_id: businessId, _merchant: merchantId});
      if (merchantBusinessProfileDetail &&
        merchantBusinessProfileDetail.length != 0) {
        next();
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (error: any) {
      next(error);
    }
  };

  /**
     * Enable Merchant Business Profile  by Merchant Id and Business Id
     * @param{Request} request - Request
     * @param{Response} response - Response
     * @param{NextFunction} next - Next Function
     */
  public enable = async (request: Request,
      response: Response,
      next: NextFunction) => {
    this._request = request;
    this._response = response;
    try {
      await this.changeDisabledUntil(request, response, null);
    } catch (error) {
      next(error);
    }
  };

  /**
     * Disable Merchant Business Profile  by Merchant Id and Business Id
     * @param{Request} request - Request
     * @param{Response} response - Response
     * @param{NextFunction} next - Next Function
     */
  public disable = async (request: Request,
      response: Response,
      next: NextFunction) => {
    this._request = request;
    this._response = response;
    try {
      await this.changeDisabledUntil(request, response, new Date());
    } catch (error) {
      next(error);
    }
  };

  /**
   * Change Status of disabled until Merchant Business Profile
   * @param{Request} request
   * @param{Response} response
   * @param{boolean} timeStamptz
   */
  private changeDisabledUntil = async (request: Request,
      response: Response,
      timeStamptz: Date | null) => {
    this._request = request;
    this._response = response;
    try {
      const merchantId: string = request.params.merchantId;
      const businessId: String = request.params.businessId;

      const merchantBusinessProfileRepositoryOptions: RepositoryParameter =
        new RepositoryParameter('merchantBusinessProfile',
            MerchantBusinessProfile,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName));
      const merchantBusinessProfileRepository: MerchantBusinessProfiles =
        new MerchantBusinessProfiles(merchantBusinessProfileRepositoryOptions);
      const updateResult: UpdateResult = await
      merchantBusinessProfileRepository.updateAll({_disabledUntil: timeStamptz},
          {_id: businessId, _merchant: merchantId});
      if (updateResult.affected !== 0) {
        new ResponseService().sendSuccessResponse(
            response, httpSuccessDataUpdate);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (error) {
      throw error;
    }
  };
}
