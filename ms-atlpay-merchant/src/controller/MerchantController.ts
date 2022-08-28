import {NextFunction, Request} from 'express';
import {Response} from 'express-serve-static-core';
import {getConnection, UpdateResult} from 'typeorm';
import {httpDataNotFound, httpSuccessDataUpdate, ormDBName}
  from '../../config/bootstrap';
import {DataNotFoundException} from '../exception/DataNotFoundException';
import {InvalidInputException} from '../exception/InvalidInputException';
import {Merchant} from '../model/entity/Merchant';
import {RepositoryParameter} from '../model/repository/AppRepository';
import {Merchants} from '../model/repository/Merchants';
import {ResponseService} from '../service/ResponseService';
import {AppController} from './AppController';
import {Pagination} from '../utils/Pagination';
import {MerchantBusinessProfile} from '../model/entity/MerchantBusinessProfile';
import {BusinessBankDetail} from '../model/entity/BusinessBankDetail';
import {BusinessOwner} from '../model/entity/BusinessOwner';
import {BusinessRepresentative} from '../model/entity/BusinessRepresentative';

/**
 * Merchant controller
 * @class{MerchantController}
 * @extends{AppController}
 */
export class MerchantController extends AppController {
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
    super('Merchant Controller');
    this._dataBaseName = ormDBName;
  }
  /**
     * Create a new Merchant.
     * @param{Request} request
     * @param{Response} response
     * @param{NextFunction} next Next Function
     */
  public create = async (
      request: Request, response: Response, next: NextFunction) => {
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
      const newMerchant: Merchant = merchantRepository.newEntity();
      if (request.body.merchant_code) {
        newMerchant.code = request.body.merchant_code;
      }
      if (request.body.merchant_title) {
        newMerchant.title = request.body.merchant_title;
      }
      if (request.body.merchant_subcription_type) {
        newMerchant.subcriptionType = request.body.merchant_subcription_type;
      }
      if (request.body.merchant_logo) {
        newMerchant.logo = request.body.merchant_logo;
      }

      const savedMerchant: Merchant | boolean =
        await merchantRepository.save(newMerchant);
      if (savedMerchant instanceof Merchant) {
        request.body.merchant = savedMerchant;
        next();
      } else {
        throw new InvalidInputException('Invalid Input in merchant');
      }
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * Update Merchant.
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next Next Function
   */
  public update = async (request: Request, response: Response,
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
      const updateMerchant: Merchant = new Merchant;
      const id: string = request.params.id;
      let merchant: Merchant[] =
        await merchantRepository
            .getOnCondition({_id: id});
      if (!merchant) {
        throw new DataNotFoundException(httpDataNotFound);
      }

      if (request.body.merchant_code) {
        updateMerchant.code = request.body.merchant_code;
      }
      if (request.body.merchant_title) {
        updateMerchant.title = request.body.merchant_title;
      }
      if (request.body.merchant_subcription_type) {
        updateMerchant.subcriptionType = request.body.merchant_subcription_type;
      }
      if (request.body.merchant_logo) {
        updateMerchant.logo = request.body.merchant_logo;
      }
      merchant = await merchantRepository.patchEntity(merchant, updateMerchant);
      const updateResult: UpdateResult = await merchantRepository
          .updateAll(merchant, {_id: id});
      const noOfRowsAffected: number | undefined =
        updateResult.affected;
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

  /**
   * Get all Merchants
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next
   */
  public find = async (
      request: Request, response: Response, next: NextFunction) => {
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
      const page: any = request.query.page;
      const size: any = request.query.size;
      const merchantRepository: Merchants =
        new Merchants(merchantRepositoryOptions);
      let merchants: Merchant[] = await merchantRepository.find();
      if (merchants.length != 0) {
        merchants = merchantRepository.toJson(merchants);
        const paginatedmerchants =
          new Pagination().pagination(merchants, page, size);
        new ResponseService().sendSuccessResponse(response, paginatedmerchants);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * Get Merchant
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next
   */
  public get = async (
      request: Request, response: Response, next: NextFunction) => {
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
      const id: string = request.params.id.trim();
      let merchant: Merchant[] =
        await merchantRepository
            .getOnCondition({_id: id});
      if (merchant &&
        merchant.length != 0) {
        merchant = merchantRepository.toJson(merchant);
        new ResponseService()
            .sendSuccessResponse(response, merchant);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * Get Business Profile By Merchant Id
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next
   */
  public getBusinessProfileByMerchantId = async (
      request: Request, response: Response,
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
      const businessProfileId: string =
        request.params.businessProfileId;
      let businessProfileDetail: MerchantBusinessProfile[] =
        await merchantRepository
            .getBusinessProfileByMerchant(
                merchantId, businessProfileId);
      if (businessProfileDetail &&
        businessProfileDetail.length != 0) {
        businessProfileDetail = merchantRepository
            .toJson(businessProfileDetail);
        new ResponseService()
            .sendSuccessResponse(response, businessProfileDetail);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * Get Bank Detail By Merchant Id
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next
   */
  public getBankDetailByMerchantId = async (
      request: Request, response: Response,
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
      let bankDetail: BusinessBankDetail[] =
        await merchantRepository
            .getMerchantBankByMerchnatProfile(merchantId);
      if (bankDetail &&
        bankDetail.length != 0) {
        bankDetail =
          merchantRepository.toJson(bankDetail);
        new ResponseService()
            .sendSuccessResponse(response, bankDetail);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (error: any) {
      next(error);
    }
  };

  /**
 * Get Business Bank Detail By Business Profile Id
 * @param{Request} request
 * @param{Response} response
 * @param{NextFunction} next
 */
  public getBusinessBankDetailByBusinessProfileId = async (
      request: Request, response: Response, next: NextFunction) => {
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
      const businessProfileId: string = request.params.businessProfileId;
      const bankId: string = request.params.bankId;
      let bankDetail: BusinessBankDetail[] =
        await merchantRepository
            .getBusinessBankDetailByBusinessprofile(
                merchantId, businessProfileId, bankId);
      if (bankDetail &&
        bankDetail.length != 0) {
        bankDetail = merchantRepository.toJson(bankDetail);
        new ResponseService()
            .sendSuccessResponse(response, bankDetail);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * Get Merchant Business Bank Details By merchantId and businessId
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next
   */
  public getMerchantBusinessBankDetails =
    async (request: Request,
        response: Response, next: NextFunction) => {
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
        let merchantBusinessBanks = await merchantRepository
            .getMerchantBusinessBankDetails(merchantId, businessId);
        if (merchantBusinessBanks &&
          merchantBusinessBanks.length != 0) {
          merchantBusinessBanks = merchantRepository
              .toJson(merchantBusinessBanks);
          new ResponseService()
              .sendSuccessResponse(response, merchantBusinessBanks);
        } else {
          throw new DataNotFoundException(httpDataNotFound);
        }
      } catch (error: any) {
        next(error);
      }
    };

  /**
   * Get Merchant Documents Details By merchantId and businessId
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next
   */
  public getMerchantBusinessDocuments =
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
        let merchantDocuments = await merchantRepository
            .getMerchantBusinessDocuments(merchantId, businessId);
        if (merchantDocuments &&
          merchantDocuments.length != 0) {
          merchantDocuments = merchantRepository.toJson(merchantDocuments);
          new ResponseService()
              .sendSuccessResponse(response, merchantDocuments);
        } else {
          throw new DataNotFoundException(httpDataNotFound);
        }
      } catch (error: any) {
        next(error);
      }
    };

  /**
   * Get Merchant Documents Details By merchantId, businessId and documentId
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next
   */
  public getMerchantBusinessDocumentsById =
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
        const documentId: string = request.params.documentId;

        let merchantDocument = await merchantRepository
            .getMerchantBusinessDocumentsById(merchantId,
                businessId, documentId);
        if (merchantDocument &&
          merchantDocument.length != 0) {
          merchantDocument = merchantRepository.toJson(merchantDocument);
          new ResponseService()
              .sendSuccessResponse(response, merchantDocument);
        } else {
          throw new DataNotFoundException(httpDataNotFound);
        }
      } catch (error: any) {
        next(error);
      }
    };

  /**
   * Get Merchant Business Owner By merchantId and businessId
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next
   */
  public getMerchantBusinesOwner =
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
        let merchantBusinesOwner: BusinessOwner[] = await merchantRepository
            .getMerchantBusinessOwner(merchantId, businessId);
        if (merchantBusinesOwner &&
          merchantBusinesOwner.length != 0) {
          merchantBusinesOwner = merchantRepository
              .toJson(merchantBusinesOwner);
          new ResponseService()
              .sendSuccessResponse(response, merchantBusinesOwner);
        } else {
          throw new DataNotFoundException(httpDataNotFound);
        }
      } catch (error: any) {
        next(error);
      }
    };

  /**
   * Get Merchant Business Owner By merchantId, businessId and businessOwnerId
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next
   */
  public getMerchantBusinesOwnerById =
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
        const businessOwnerId: string = request.params.businessOwnerId;

        let merchantBusinesOwnerById: BusinessOwner[] = await merchantRepository
            .getMerchantBusinesOwnerById(merchantId,
                businessId, businessOwnerId);
        if (merchantBusinesOwnerById &&
          merchantBusinesOwnerById.length != 0) {
          merchantBusinesOwnerById = merchantRepository
              .toJson(merchantBusinesOwnerById);
          new ResponseService()
              .sendSuccessResponse(response, merchantBusinesOwnerById);
        } else {
          throw new DataNotFoundException(httpDataNotFound);
        }
      } catch (error: any) {
        next(error);
      }
    };

  /**
   * Get Business Representative By Merchant Id and Business Id
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next
   */
  public getBusinessRepresentation =
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

        let businessRepresentation: BusinessRepresentative[] =
          await merchantRepository
              .getBusinessRepresentation(merchantId, businessId);
        if (businessRepresentation && businessRepresentation.length != 0) {
          businessRepresentation = merchantRepository
              .toJson(businessRepresentation);
          new ResponseService()
              .sendSuccessResponse(response, businessRepresentation);
        } else {
          throw new DataNotFoundException(httpDataNotFound);
        }
      } catch (error: any) {
        next(error);
      }
    };

  // /**
  //  * Check Merchant Details By merchantId
  //  * @param{Request} request
  //  * @param{Response} response
  //  * @param{NextFunction} next
  //  */
  // public checkMerchant = async (
  //     request: Request, response: Response, next: NextFunction) => {
  //   this._request = request;
  //   this._response = response;
  //   try {
  //     const merchantRepositoryOptions: RepositoryParameter =
  //       new RepositoryParameter(
  //           'merchant',
  //           Merchant,
  //           this._dataBaseName,
  //           'none',
  //           getConnection(this._dataBaseName),
  //       );
  //     const merchantRepository: Merchants =
  //       new Merchants(merchantRepositoryOptions);
  //     const id: string = request.params.merchantId.trim();
  //     const merchant: Merchant[] =
  //       await merchantRepository
  //           .getOnCondition({_id: id});
  //     if (merchant &&
  //       merchant.length != 0) {
  //       next();
  //     } else {
  //       throw new DataNotFoundException(httpDataNotFound);
  //     }
  //   } catch (error: any) {
  //     next(error);
  //   }
  // };

  /**
     * Enable Merchant
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
   * Disable Merchant
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
      const updateResult: UpdateResult = await
      merchantRepository.updateAll({_disabledUntil: timeStamptz},
          {_id: merchantId});
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
