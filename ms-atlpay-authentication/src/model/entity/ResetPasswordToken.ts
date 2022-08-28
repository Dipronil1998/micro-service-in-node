import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {AdminAuthentication} from './AdminAuthentication';
import {UserAuthentication} from './UserAuthentication';

@Entity({name: 'reset_password_tokens'})
/**
 * Reset password token entity
 * @class{ResetPasswordToken}
 * @Entity
 */
export class ResetPasswordToken {
  @PrimaryGeneratedColumn('uuid', {name: 'id'})
  private _id: string;

  @Column({name: 'token'})
  private _token: string;

  @ManyToOne(
      () => UserAuthentication,
      (userAuthentication) => userAuthentication.id,
      {nullable: true, onDelete: 'SET NULL'},
  )
  @JoinColumn({name: 'user_authentication_id'})
  private _userAuthentication: UserAuthentication;

  @ManyToOne(() => AdminAuthentication,
      (adminAuthentication) => adminAuthentication.id,
      {nullable: true, onDelete: 'SET NULL'})
  @JoinColumn({name: 'admin_authentication_id'})
  private _adminAuthentication: AdminAuthentication;

  @Column({name: 'is_valid_token', default: true})
  private _isValidToken: boolean;

  @Column({name: 'token_expire_time'})
  private _tokenExpireTime: Date;

  @CreateDateColumn({name: 'created_on'})
  private _createdOn: Date;

  @UpdateDateColumn({name: 'modified_on'})
  private _modifiedOn: Date;

  /**
   * Getter id
   * @return{string} id
   */
  public get id(): string {
    return this._id;
  }
  /**
   * Setter id
   * @param{string} id
   */
  public set id(id: string) {
    this._id = id;
  }
  /**
   * Getter token
   * @return{string} token
   */
  public get token(): string {
    return this._token;
  }
  /**
   * Setter token
   * @param{string} token
   */
  public set token(token: string) {
    this._token = token;
  }
  /**
   * Getter user authentication
   * @return{UserAuthentication} userAuthentication
   */
  public get userAuthentication(): UserAuthentication {
    return this._userAuthentication;
  }
  /**
   * Setter user authentication
   * @param{UserAuthentication} userAuthentication
   */
  public set userAuthentication(userAuthentication: UserAuthentication) {
    this._userAuthentication = userAuthentication;
  }
  /**
   * Getter admin Authentication
   * @return{AdminAuthentication} userAuthentication
   */
  public get adminAuthentication(): AdminAuthentication {
    return this._adminAuthentication;
  }
  /**
   * Setter admin Authentication
   * @param{AdminAuthentication} adminAuthentication
   */
  public set adminAuthentication(adminAuthentication: AdminAuthentication) {
    this._adminAuthentication = adminAuthentication;
  }
  /**
   * Getter is valid token
   * @return{boolean} isValidToken
   */
  public get isValidToken(): boolean {
    return this._isValidToken;
  }
  /**
   * Setter is valid token
   * @param{boolean} isValidToken
   */
  public set isValidToken(isValidToken: boolean) {
    this._isValidToken = isValidToken;
  }
  /**
   * Getter token expire time
   * @return{Date} tokenExpireTime
   */
  public get tokenExpireTime(): Date {
    return this._tokenExpireTime;
  }
  /**
   * Setter token expire time
   * @param{Date} tokenExpireTime
   */
  public set tokenExpireTime(tokenExpireTime: Date) {
    this._tokenExpireTime = tokenExpireTime;
  }
  /**
   * Getter create date
   * @return{Date} createdOn
   */
  public get createdOn(): Date {
    return this._createdOn;
  }
  /**
   * Setter create date
   * @param{Date} createdOn
   */
  public set createdOn(createdOn: Date) {
    this._createdOn = createdOn;
  }
  /**
   * Getter modified date
   * @return{Date} modifiedOn
   */
  public get modifiedOn(): Date {
    return this._modifiedOn;
  }
  /**
   * Setter modified date
   * @param{Date} modifiedOn
   */
  public set modifiedOn(modifiedOn: Date) {
    this._modifiedOn = modifiedOn;
  }
}
