import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Entity for Merchant Wallet developed in typeORM
 * @Entity MerchantWallet
 */
@Entity({name: 'merchants_wallets'})
/**
 * MerchantWallet entity class
 * @class{MerchantWallet}
 */
export class MerchantWallet {
  @PrimaryGeneratedColumn('uuid', {name: 'id'})
  private _id: string;

  @Column({
    name: 'credit', type: 'decimal',
    precision: 32, scale: 2, default: 0,
  })
  private _credit: number;

  @Column({
    name: 'balance', type: 'decimal',
    precision: 32, scale: 2, default: 0,
  })
  private _balance: number;

  @Column({
    name: 'remote_balance', type: 'decimal',
    precision: 32, scale: 2, default: 0,
  })
  private _remoteBalance: number;

  @Column({
    name: 'recomended_balance', type: 'decimal',
    precision: 32, scale: 2, default: 0,
  })
  private _recomendedBalance: number;

  @Column({name: 'disabled_until', nullable: true})
  private _disabledUntil: Date;

  @CreateDateColumn({name: 'created_on', type: 'timestamptz'})
  private _createdOn: Date;

  @UpdateDateColumn({name: 'modified_on', type: 'timestamptz'})
  private _modifiedOn: Date;

  @Column({name: 'is_primary'})
  private _isPrimary: boolean;

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
   * Getter credit
   * @return{number} credit
   */
  public get credit(): number {
    return this._credit;
  }
  /**
   * Setter credit
   * @param{number} credit
   */
  public set credit(credit: number) {
    this._credit = credit;
  }
  /**
   * Getter balance
   * @return{number} balance
   */
  public get balance(): number {
    return this._balance;
  }
  /**
   * Setter balance
   * @param{number} balance
   */
  public set balance(balance: number) {
    this._balance = balance;
  }
  /**
   * Getter remoteBalance
   * @return{number} remoteBalance
   */
  public get remoteBalance(): number {
    return this._remoteBalance;
  }
  /**
   * Setter remoteBalance
   * @param{number} remoteBalance
   */
  public set remoteBalance(remoteBalance: number) {
    this._remoteBalance = remoteBalance;
  }
  /**
   * Getter recomendedBalance
   * @return{number} recomendedBalance
   */
  public get recomendedBalance(): number {
    return this._recomendedBalance;
  }
  /**
   * Setter recomendedBalance
   * @param{number} recomendedBalance
   */
  public set recomendedBalance(recomendedBalance: number) {
    this._recomendedBalance = recomendedBalance;
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
   * Getter is Primary
   * @return{boolean} isPrimary
   */
  public get isPrimary(): boolean {
    return this._isPrimary;
  }

  /**
   * Setter is Primary
   * @param{boolean} isPrimary
   */
  public set isPrimary(isPrimary: boolean) {
    this._isPrimary = isPrimary;
  }
}
