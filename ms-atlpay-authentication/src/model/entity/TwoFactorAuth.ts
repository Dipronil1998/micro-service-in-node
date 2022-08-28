import {Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from 'typeorm';
import {AdminLoginLog} from './AdminLoginLog';
import {UserLoginLog} from './UserLoginLog';

@Entity({name: 'two_factor_auths'})
/**
 * Entity for storing TwoFactorAuth developed in typeORM
 * @Entity TwoFactorAuth
 */
export class TwoFactorAuth {
  @PrimaryGeneratedColumn('uuid', {name: 'id'})
  private _id: string;

  @Column({name: 'otp'})
  private _otp: string;

  @Column({default: null, nullable: true, name: 'expiry'})
  private _expiry: Date;

  @ManyToOne(() => UserLoginLog, (userLoginLog)=>
    userLoginLog.id, {onDelete: 'SET NULL', nullable: true})
    @JoinColumn({name: 'user_login_log_id'})
  private _userLoginLog: UserLoginLog;

  @ManyToOne(() => AdminLoginLog, (adminLoginLog)=>
    adminLoginLog.id, {onDelete: 'SET NULL', nullable: true})
    @JoinColumn({name: 'admin_login_log_id'})
  private _adminLoginLog: AdminLoginLog;

  @Column({default: null, nullable: true, name: 'type'})
  private _type: string;

  @CreateDateColumn({name: 'created_on'})
  private _createdOn: Date;

  @UpdateDateColumn({nullable: true, name: 'modified_on'})
  private _modifiedOn: Date;

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
   * Getter otp
   * @return{string} otp
   */
  public get otp(): string {
    return this._otp;
  }
  /**
   * Setter otp
   * @param{string} otp
   */
  public set otp(otp: string) {
    this._otp = otp;
  }
  /**
   * Getter expiry
   * @return{date} expiry
   */
  public get expiry(): Date {
    return this._expiry;
  }
  /**
   * Setter expiry
   * @param{date} expiry
   */
  public set expiry(expiry: Date) {
    this._expiry = expiry;
  }
  /**
   * Getter user login log
   * @return{UserLoginLog} userLoginLog
   */
  public get userLoginLog(): UserLoginLog {
    return this._userLoginLog;
  }
  /**
   * Setter user login log
   * @param{user_login_log} userLoginLog
   */
  public set userLoginLog(userLoginLog: UserLoginLog) {
    this._userLoginLog = userLoginLog;
  }
  /**
   * Getter admin login log
   * @return{AdminLoginLog} userLoginLog
   */
  public get adminLoginLog(): AdminLoginLog {
    return this._adminLoginLog;
  }
  /**
   * Setter Admin login log
   * @param{adminLoginLog} adminLoginLog
   */
  public set adminLoginLog(adminLoginLog: AdminLoginLog) {
    this._adminLoginLog = adminLoginLog;
  }
  /**
   * Getter created on
   * @return{date} createdOn
   */
  public get createdOn(): Date {
    return this._createdOn;
  }
  /**
   * Setter created on
   * @param{date} createdOn
   */
  public set createdOn(createdOn: Date) {
    this._createdOn = createdOn;
  }
  /**
   * Getter type
   * @return{string} type
   */
  public get type(): string {
    return this._type;
  }
  /**
   * Setter type
   * @param{string} type
   */
  public set type(type: string) {
    this._type = type;
  }

  /**
   * Getter modified on
   * @return{date} modifiedOn
   */
  public get modifiedOn(): Date {
    return this._modifiedOn;
  }
  /**
   * Setter modified on
   * @param{date} modifiedOn
   */
  public set modifiedOn(modifiedOn: Date) {
    this._modifiedOn = modifiedOn;
  }
}
