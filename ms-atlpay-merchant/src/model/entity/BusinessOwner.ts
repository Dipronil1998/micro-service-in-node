import {Column, Entity, JoinColumn, ManyToOne,
  PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import {MerchantBusinessProfile} from './MerchantBusinessProfile';

/**
 * Entity for BusinessOwner developed in typeORM
 * @Entity BusinessOwner
 */
@Entity({name: 'business_owners'})
/**
 * BusinessOwner entity class
 * @class{BusinessOwner}
 */
export class BusinessOwner {
  @PrimaryGeneratedColumn('uuid', {name: 'id'})
  private _id: string;
  @ManyToOne(() => MerchantBusinessProfile,
      (merchnatBusinessProfile) => merchnatBusinessProfile.id)
  @JoinColumn({name: 'merchant_business_profile_id'})
  private _merchantBusinessProfile: MerchantBusinessProfile;

  @Column({name: 'first_name'})
  private _firstName: string;

  @Column({name: 'middle_name', nullable: true})
  private _middleName: string;

  @Column({name: 'last_name'})
  private _lastName: string;

  @Column({name: 'email'})
  private _email: string;

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
   * @param{string} id
   */
  public set id(id: string) {
    this._id = id;
  }

  /**
   * Getter First Name
   * @return{string} firstName
   */
  public get firstName(): string {
    return this._firstName;
  }
  /**
   * Setter First Name
   * @param{string} firstName
   */
  public set firstName(firstName: string) {
    this._firstName = firstName;
  }

  /**
   * Getter Middle Name
   * @return{string} middleName
   */
  public get middleName(): string {
    return this._middleName;
  }
  /**
   * Setter Middle Name
   * @param{string} middleName
   */
  public set middleName(middleName: string) {
    this._middleName = middleName;
  }

  /**
   * Getter Last Name
   * @return{string} lastName
   */
  public get lastName(): string {
    return this._lastName;
  }
  /**
   * Setter Last Name
   * @param{string} lastName
   */
  public set lastName(lastName: string) {
    this._lastName = lastName;
  }

  /**
   * Getter Email
   * @return{string} email
   */
  public get email(): string {
    return this._email;
  }
  /**
   * Setter Email
   * @param{string} email
   */
  public set email(email: string) {
    this._email = email;
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
   * Getter Merchant Business Profile
   * @return{MerchantBusinessProfile} merchantBusinessProfile
   */
  public get merchantBusinessProfile(): MerchantBusinessProfile {
    return this._merchantBusinessProfile;
  }

  /**
   * Setter Merchant Business Profile
   * @param{MerchantBusinessProfile} merchantBusinessProfile
   */
  public set merchantBusinessProfile(
      merchantBusinessProfile: MerchantBusinessProfile) {
    this._merchantBusinessProfile = merchantBusinessProfile;
  }
}
