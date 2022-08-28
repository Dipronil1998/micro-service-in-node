import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import {MerchantWallet} from './MerchantWallet';

/**
 * Entity for Merchant Wallet Route developed in typeORM
 * @Entity MerchantWalletRoute
 */
@Entity({name: 'merchant_wallet_routes'})
/**
 * MerchantWalletRoute entity class
 * @class{MerchantWalletRoute}
 */
export class MerchantWalletRoute {
  @PrimaryGeneratedColumn('uuid', {name: 'id'})
  private _id: string;

  @CreateDateColumn({name: 'created_on', type: 'timestamptz'})
  private _createdOn: Date;

  @UpdateDateColumn({name: 'modified_on', type: 'timestamptz'})
  private _modifiedOn: Date;
  @ManyToOne(()=> MerchantWallet, (merchantWallet)=> merchantWallet.id)
  @JoinColumn({name: 'merchant_wallet_id'})
  private _merchantWallet: MerchantWallet;
  /**
   * Getter Id
   * @return{string} id
   */
  public get id(): string {
    return this._id;
  }
  /**
   * Setter Id
   * @param{string} id
   */
  public set id(id: string) {
    this._id = id;
  }

  /**
   * Getter CreatedOn
   * @return{Date} createdOn
   */
  public get createdOn(): Date {
    return this._createdOn;
  }
  /**
   * Setter CreatedOn
   * @param{Date} createdOn
   */
  public set createdOn(createdOn: Date) {
    this._createdOn = createdOn;
  }
  /**
   * Getter ModifiedOn
   * @return{Date} modifiedOn
   */
  public get modifiedOn(): Date {
    return this._modifiedOn;
  }
  /**
   * Setter ModifiedOn
   * @param{Date} modifiedOn
   */
  public set modifiedOn(modifiedOn: Date) {
    this._modifiedOn = modifiedOn;
  }

  /**
   * Getter Merchant wallet
   * @return{MerchantWallet} merchantWallet
   */
  public get merchantWallet(): MerchantWallet {
    return this._merchantWallet;
  }
  /**
   * Setter Merchant wallet
   * @param{MerchantWallet} merchantWallet
   */
  public set merchantWallet(merchantWallet: MerchantWallet) {
    this._merchantWallet = merchantWallet;
  }
}
