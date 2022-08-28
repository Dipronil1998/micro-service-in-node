import {NextFunction, Request} from 'express';
import {Response} from 'express-serve-static-core';
import {getConnection, UpdateResult} from 'typeorm';
import {httpDataNotFound, httpSuccessDataUpdate, ormDBName}
  from '../../config/bootstrap';
import {DataNotFoundException} from '../exception/DataNotFoundException';
import {InvalidInputException} from '../exception/InvalidInputException';
import {RepositoryParameter} from '../model/repository/AppRepository';
import {ResponseService} from '../service/ResponseService';
import {AppController} from './AppController';
import {MerchantWallet} from '../model/entity/MerchantWallet';
import {MerchantWallets} from '../model/repository/MerchantWallets';
import {Pagination} from '../utils/Pagination';

/**
 * Merchant Wallet Controller
 * @class{MerchantWalletController}
 * @extends{AppController}
 */
export class MerchantWalletController extends AppController {
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
    super('MerchantWalletController');
    this._dataBaseName = ormDBName;
  }
  /**
   * Create a new Merchant.
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next Next Function
   */
  public create = async (
      request: Request,
      response: Response,
      next: NextFunction,
  ) => {
    this._request = request;
    this._response = response;
    try {
      const merchantWalletsRepositoryOptions: RepositoryParameter =
        new RepositoryParameter(
            'merchantWallet',
            MerchantWallet,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const merchantWalletsRepository: MerchantWallets =
        new MerchantWallets(merchantWalletsRepositoryOptions);
      const credit = request.body.credit;
      const balance = request.body.balance;
      const remoteBalance = request.body.remote_balance;
      const recomendedBalance = request.body.recomended_balance;
      const isPrimary = request.body.merchant_wallets_is_primary;

      const newMerchantWallet: MerchantWallet =
        merchantWalletsRepository.newEntity();
      newMerchantWallet.credit = credit;
      newMerchantWallet.balance = balance;
      newMerchantWallet.remoteBalance = remoteBalance;
      newMerchantWallet.recomendedBalance = recomendedBalance;
      newMerchantWallet.isPrimary = isPrimary;
      newMerchantWallet.disabledUntil = new Date();

      const savedMerchantWallet: MerchantWallet | boolean =
        await merchantWalletsRepository.save(newMerchantWallet);
      if (savedMerchantWallet instanceof MerchantWallet) {
        request.body.merchantWallet = savedMerchantWallet;
        next();
      } else {
        throw new InvalidInputException('Invalid Input in Wallet');
      }
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * Get all merchantWallets
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next
   */
  public find = async (
      request: Request,
      response: Response,
      next: NextFunction,
  ) => {
    this._request = request;
    this._response = response;
    try {
      const merchantWalletsRepositoryOptions: RepositoryParameter =
        new RepositoryParameter(
            'merchantWallet',
            MerchantWallet,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const page: any = request.query.page;
      const size: any = request.query.size;
      const merchantWalletRepository: MerchantWallets = new MerchantWallets(
          merchantWalletsRepositoryOptions);
      merchantWalletRepository.initializeAssociations();

      let merchantWallet: MerchantWallet[] =
        await merchantWalletRepository.find();
      if (merchantWallet && merchantWallet.length != 0) {
        merchantWallet = merchantWalletRepository.toJson(merchantWallet);
        const paginatedmerchantWallet =
          new Pagination().pagination(merchantWallet, page, size);
        new ResponseService()
            .sendSuccessResponse(response, paginatedmerchantWallet);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * Get Merchant Wallet
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next
   */
  public get = async (
      request: Request, response: Response, next: NextFunction) => {
    this._request = request;
    this._response = response;
    try {
      const merchantWalletsRepositoryOptions: RepositoryParameter =
        new RepositoryParameter(
            'merchantWallet',
            MerchantWallet,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const merchantWalletRepository: MerchantWallets = new MerchantWallets(
          merchantWalletsRepositoryOptions);
      merchantWalletRepository.initializeAssociations();

      const id: string = request.params.id;
      let merchantWalletDetail: MerchantWallet[] =
        await merchantWalletRepository
            .getOnCondition({_id: id});
      if (merchantWalletDetail &&
        merchantWalletDetail.length != 0) {
        merchantWalletDetail =
          merchantWalletRepository
              .toJson(merchantWalletDetail);
        new ResponseService()
            .sendSuccessResponse(response, merchantWalletDetail);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * Update Merchant Wallet.
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next Next Function
   */
  public update = async (
      request: Request,
      response: Response,
      next: NextFunction,
  ) => {
    this._request = request;
    this._response = response;
    try {
      const merchantWalletsRepositoryOptions: RepositoryParameter =
        new RepositoryParameter(
            'merchantWallet',
            MerchantWallet,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const merchantWalletRepository: MerchantWallets = new MerchantWallets(
          merchantWalletsRepositoryOptions);
      merchantWalletRepository.initializeAssociations();
      const id: string = request.params.id;
      let merchantWalletDetail: MerchantWallet[] =
        await merchantWalletRepository
            .getOnCondition({_id: id});
      if (!merchantWalletDetail) {
        throw new DataNotFoundException(httpDataNotFound);
      }
      const updateMerchantWalletDetail:MerchantWallet = new MerchantWallet;

      const credit = request.body.credit;
      const balance = request.body.balance;
      const remoteBalance = request.body.remote_balance;
      const recomendedBalance = request.body.recomended_balance;
      const isPrimary = request.body.merchant_wallets_is_primary;

      const disabledUntil = request.body.disabled_until;
      if (credit) {
        updateMerchantWalletDetail.credit = credit;
      } if (balance) {
        updateMerchantWalletDetail.balance = balance;
      } if (remoteBalance) {
        updateMerchantWalletDetail.remoteBalance = remoteBalance;
      } if (recomendedBalance) {
        updateMerchantWalletDetail.recomendedBalance = recomendedBalance;
      } if (isPrimary) {
        updateMerchantWalletDetail.isPrimary = isPrimary;
      } if (disabledUntil) {
        updateMerchantWalletDetail.disabledUntil = new Date();
      }

      merchantWalletDetail = await merchantWalletRepository
          .patchEntity(merchantWalletDetail, updateMerchantWalletDetail);
      const updateMerchantWallet: UpdateResult =
        await merchantWalletRepository
            .updateAll(merchantWalletDetail, {_id: id});
      const noOfRowsAffected: number | undefined =
      updateMerchantWallet.affected;
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
