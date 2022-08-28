import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import {AccessRole} from './AccessRole';

@Entity({name: 'user_authentications'})
/**
 * Entity for storing User Authentication developed in typeORM
 * @Entity UserAuthentication
 */
export class UserAuthentication {
  @PrimaryGeneratedColumn('uuid', {name: 'id'})
  private _id: string;

  @Column({name: 'uin', type: 'bigint'})
  private _uin: bigint;

  @Column({name: 'allow_login', type: 'boolean', default: true})
  private _allowLogin: boolean;

  @Column({name: 'first_name'})
  private _firstName: string;

  @Column({name: 'middle_name', nullable: true})
  private _middleName: string;

  @Column({name: 'last_name'})
  private _lastName: string;

  @Column({name: 'user_name'})
  private _userName: string;

  @Column({name: 'email'})
  private _email: string;

  @Column({name: 'recovery_email', nullable: true})
  private _recoveryEmail: string;

  @Column({name: 'password'})
  private _password: string;

  @Column({name: 'pin', nullable: true})
  private _pin: string;

  @Column({name: 'account_status', default: 'LIVE'})
  private _accountStatus: string;

  @Column({
    name: 'block_until',
    type: 'timestamptz',
    nullable: true,
    default: null,
  })
  private _blockUntil: Date;

  @Column({
    name: 'last_password_modified',
    type: 'timestamptz',
    nullable: true,
  })
  private _lastPasswordModified: Date;

  @Column({name: 'is_editable', type: 'boolean', default: true})
  private _isEditable: boolean;

  @Column({name: 'is_email_verified', type: 'boolean', default: false})
  private _isEmailVerified: boolean;

  @Column({name: 'isd_code'})
  private _isdCode: number;

  @Column({name: 'mobile_no', type: 'bigint'})
  private _mobileNo: bigint;

  @Column({name: 'is_mobile_no_verified', type: 'boolean', default: false})
  private _isMobileNoVerified: boolean;

  @Column({
    name: 'two_factor_otps_activated',
    type: 'boolean',
    default: false,
  })
  private _twoFactorOtpsActivated: boolean;

  @CreateDateColumn({name: 'created_on', type: 'timestamptz'})
  private _createdOn: Date;

  @UpdateDateColumn({name: 'modified_on', type: 'timestamptz'})
  private _modifiedOn: Date;

  @ManyToOne(() => AccessRole, (accessRole) => accessRole.id, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({name: 'access_role_id'})
  private _accessRole: AccessRole;

  /**
   * Getter Id
   * @return{string} id
   */
  public get id(): string {
    return this._id;
  }
  /**
   * Setter Id
   * @param{string} id Id
   */
  public set id(id: string) {
    this._id = id;
  }
  /**
   * Getter uin
   * @return{bigint} uin
   */
  public get uin(): bigint {
    return this._uin;
  }
  /**
   * Setter uid
   * @param{bigint} uin
   */
  public set uin(uin: bigint) {
    this._uin = uin;
  }
  /**
   * Getter allow login
   * @return{boolean} allowLogin
   */
  public get allowLogin(): boolean {
    return this._allowLogin;
  }
  /**
   * Setter allow login
   * @param{boolean} allowLogin
   */
  public set allowLogin(allowLogin: boolean) {
    this._allowLogin = allowLogin;
  }
  /**
   * Getter first name
   * @return{string} firstName
   */
  public get firstName(): string {
    return this._firstName;
  }
  /**
   * Setter first name
   * @param{string} firstName
   */
  public set firstName(firstName: string) {
    this._firstName = firstName;
  }
  /**
   * Getter middle name
   * @return{string} middleName
   */
  public get middleName(): string {
    return this._middleName;
  }
  /**
   * Setter middle name
   * @param{string} middleName
   */
  public set middleName(middleName: string) {
    this._middleName = middleName;
  }
  /**
   * Getter last name
   * @return{string} lastName
   */
  public get lastName(): string {
    return this._lastName;
  }
  /**
   * Setter last name
   * @param{string} lastName
   */
  public set lastName(lastName: string) {
    this._lastName = lastName;
  }
  /**
   * Getter user name
   * @return{string} userName
   */
  public get userName(): string {
    return this._userName;
  }
  /**
   * Setter user name
   * @param{string} userName
   */
  public set userName(userName: string) {
    this._userName = userName;
  }
  /**
   * Getter email
   * @return{string} email
   */
  public get email(): string {
    return this._email;
  }
  /**
   * Setter email
   * @param{string} email
   */
  public set email(email: string) {
    this._email = email;
  }
  /**
   * Getter recovery email
   * @return{string} recoveryEmail
   */
  public get recoveryEmail(): string {
    return this._recoveryEmail;
  }
  /**
   * Setter recovery email
   * @param{string} recoveryEmail
   */
  public set recoveryEmail(recoveryEmail: string) {
    this._recoveryEmail = recoveryEmail;
  }
  /**
   * Getter password
   * @return{string} password
   */
  public get password(): string {
    return this._password;
  }
  /**
   * Setter password
   * @param{string} password
   */
  public set password(password: string) {
    this._password = password;
  }
  /**
   * Getter pin
   * @return{string} pin
   */
  public get pin(): string {
    return this._pin;
  }
  /**
   * Setter pin
   * @param{string} pin
   */
  public set pin(pin: string) {
    this._pin = pin;
  }
  /**
   * Getter account status
   * @return{string} accountStatus
   */
  public get accountStatus(): string {
    return this._accountStatus;
  }
  /**
   * Setter account status
   * @param{string} accountStatus
   */
  public set accountStatus(accountStatus: string) {
    this._accountStatus = accountStatus;
  }
  /**
   * Getter block until
   * @return{date} blockUntil
   */
  public get blockUntil(): Date {
    return this._blockUntil;
  }
  /**
   * Setter block until
   * @param{date} blockUntil
   */
  public set blockUntil(blockUntil: Date) {
    this._blockUntil = blockUntil;
  }
  /**
   * Getter last password modified
   * @return{date} lastPasswordModified
   */
  public get lastPasswordModified(): Date {
    return this._lastPasswordModified;
  }
  /**
   * Setter last password modified
   * @param{date} lastPasswordModified
   */
  public set lastPasswordModified(lastPasswordModified: Date) {
    this._lastPasswordModified = lastPasswordModified;
  }
  /**
   * Getter is editable
   * @return{boolean} isEditable
   */
  public get isEditable(): boolean {
    return this._isEditable;
  }
  /**
   * Setter is editable
   * @param{boolean} isEditable
   */
  public set isEditable(isEditable: boolean) {
    this._isEditable = isEditable;
  }
  /**
   * Getter is email verified
   * @return{boolean} isEmailVerified
   */
  public get isEmailVerified(): boolean {
    return this._isEmailVerified;
  }
  /**
   * Setter is email verified
   * @param{boolean} isEmailVerified
   */
  public set isEmailVerified(isEmailVerified: boolean) {
    this._isEmailVerified = isEmailVerified;
  }
  /**
   * Getter isd code
   * @return{number} isdCode
   */
  public get isdCode(): number {
    return this._isdCode;
  }
  /**
   * Setter isd code
   * @param{number} isdCode
   */
  public set isdCode(isdCode: number) {
    this._isdCode = isdCode;
  }
  /**
   * Getter mobile no
   * @return{bigint} mobileNo
   */
  public get mobileNo(): bigint {
    return this._mobileNo;
  }
  /**
   * Setter mobile no
   * @param{bigint} mobileNo
   */
  public set mobileNo(mobileNo: bigint) {
    this._mobileNo = mobileNo;
  }
  /**
   * Getter is mobile no verified
   * @return{boolean} isMobileNoVerified
   */
  public get isMobileNoVerified(): boolean {
    return this._isMobileNoVerified;
  }
  /**
   * Setter is mobile no verified
   * @param{boolean} isMobileNoVerified
   */
  public set isMobileNoVerified(isMobileNoVerified: boolean) {
    this._isMobileNoVerified = isMobileNoVerified;
  }
  /**
   * Getter two factor otps activated
   * @return{boolean} twoFactorOtpsActivated
   */
  public get twoFactorOtpsActivated(): boolean {
    return this._twoFactorOtpsActivated;
  }
  /**
   * Setter two factor otps activated
   * @param{boolean} twoFactorOtpsActivated
   */
  public set twoFactorOtpsActivated(twoFactorOtpsActivated: boolean) {
    this._twoFactorOtpsActivated = twoFactorOtpsActivated;
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
   * Getter AccessRole
   * @return{AccessRole} AccessRole
   */
  public get accessRole(): AccessRole {
    return this._accessRole;
  }
  /**
   * Setter accessRole
   * @param{AccessRole} accessRole
   */
  public set accessRole(accessRole: AccessRole) {
    this._accessRole = accessRole;
  }
}
