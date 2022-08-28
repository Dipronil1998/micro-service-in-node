import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';
import {MerchantWallet} from './MerchantWallet';

/**
 * Entity for Merchant developed in typeORM
 * @Entity Merchant
 */
@Entity({name: 'merchants'})
/**
 * Merchant entity class
 * @class{Merchant}
 */
export class Merchant {
  @PrimaryGeneratedColumn('uuid', {name: 'id'})
  private _id: string;

  @Column({name: 'code', nullable: true})
  private _code: string;

  @Column({name: 'title', nullable: true})
  private _title: string;

  @Column({name: 'subcription_type', default: 'BASIC'})
  private _subcriptionType: string;

  @Column({name: 'logo', nullable: true})
  private _logo: string;

  @Column({name: 'disabled_until', nullable: true})
  private _disabledUntil: Date;

  @CreateDateColumn({name: 'created_on', type: 'timestamptz'})
  private _createdOn: Date;

  @UpdateDateColumn({name: 'modified_on', type: 'timestamptz'})
  private _modifiedOn: Date;
  @OneToOne(()=>MerchantWallet)
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
   * Getter code
   * @return{string} code
   */
  public get code(): string {
    return this._code;
  }
  /**
   * Setter code
   * @param{string} code
   */
  public set code(code: string) {
    this._code = code;
  }
  /**
   * Getter title
   * @return{string} title
   */
  public get title(): string {
    return this._title;
  }
  /**
   * Setter title
   * @param{string} title
   */
  public set title(title: string) {
    this._title = title;
  }
  /**
   * Getter subcription_type
   * @return{string} subcription_type
   */
  public get subcriptionType(): string {
    return this._subcriptionType;
  }
  /**
   * Setter subcription_type
   * @param{string} subcriptionType
   */
  public set subcriptionType(subcriptionType: string) {
    this._subcriptionType = subcriptionType;
  }
  /**
   * Getter logo
   * @return{string} logo
   */
  public get logo(): string {
    return this._logo;
  }
  /**
   * Setter logo
   * @param{string} logo
   */
  public set logo(logo: string) {
    this._logo = logo;
  }
  /**
   * Getter disabled Until
   * @return{Date} disabledUntil
   */
  public get disabledUntil(): Date {
    return this._disabledUntil;
  }
  /**
   * Setter disabled Until
   * @param{Date} disabledUntil
   */
  public set disabledUntil(disabledUntil: Date) {
    this._disabledUntil = disabledUntil;
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
   * @return{MerchantWallet}
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
