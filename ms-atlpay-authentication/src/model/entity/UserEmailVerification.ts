import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import {UserAuthentication} from './UserAuthentication';

@Entity({name: 'user_email_verifications'})
/**
 * Entity for storing UserEmailVerification developed in typeORM
 */
export class UserEmailVerification {
  @PrimaryGeneratedColumn('uuid', {name: 'id'})
  private _id: string;

  @Column({name: 'otp'})
  private _otp: string;

  @Column({type: 'timestamptz', nullable: true})
  private _expire: Date;

  @ManyToOne(
      () => UserAuthentication,
      (userAuthentication) => userAuthentication.id,
      {onDelete: 'SET NULL'},
  )
  @JoinColumn({name: 'user_authentication_id'})
  private _user_authentication: UserAuthentication;

  @CreateDateColumn({name: 'created_on', type: 'timestamptz'})
  private _createdOn: Date;

  @UpdateDateColumn({name: 'modified_on', type: 'timestamptz'})
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
   * @param{string} id Id
   */
  public set id(id: string) {
    this._id = id;
  }

  /**
   * Getter OTP
   * @return{string} otp
   */
  public get otp(): string {
    return this._otp;
  }

  /**
   * Setter OTP
   * @param{string} otp OTP
   */
  public set otp(otp: string) {
    this._otp = otp;
  }

  /**
   * Getter Expire
   * @return{Date} expire
   */
  public get expire(): Date {
    return this._expire;
  }

  /**
   * Setter Expire
   * @param{Date} expire Expire
   */
  public set expire(expire: Date) {
    this._expire = expire;
  }

  /**
   * Getter Userauthentication
   * @return{UserAuthentication} userauthentication
   */
  public get userauthentication(): UserAuthentication {
    return this._user_authentication;
  }

  /**
   * Setter Userauthentication
   * @param{UserAuthentication} userauthentication UserAuthentication
   */
  public set userauthentication(userauthentication: UserAuthentication) {
    this._user_authentication = userauthentication;
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
}
