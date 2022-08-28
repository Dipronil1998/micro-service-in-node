import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  UpdateDateColumn,
} from 'typeorm';
import {BusinessRepresentative} from './BusinessRepresentative';
import {Merchant} from './Merchant';

/**
 * Entity for Merchant Business Profile in typeORM
 * @Entity MerchantBusinessProfile
 */
@Entity({name: 'merchant_business_profiles'})
/**
 * MerchantBusinessProfile entity class
 * @class{MerchantBusinessProfile}
 */
export class MerchantBusinessProfile {
  @PrimaryGeneratedColumn('uuid', {name: 'id'})
  private _id: string;

  @Column({name: 'business_name'})
  private _businessName: string;

  @Column({name: 'registration_number'})
  private _registrationNumber: string;

  @Column({name: 'business_legal_entity_type', nullable: true})
  private _businessLegalEntityType: string;

  @Column({name: 'business_role_text', nullable: true})
  private _businessRoleText: string;

  @Column({name: 'business_website', nullable: true})
  private _businessWebsite: string;

  @Column({name: 'business_address_line_1'})
  private _businessAddressLine1: string;

  @Column({name: 'business_address_line_2', nullable: true})
  private _businessAddressLine2: string;

  @Column({name: 'business_address_line_3', nullable: true})
  private _businessAddressLine3: string;

  @Column({name: 'business_city', nullable: true})
  private _businessCity: string;

  @Column({name: 'business_region', nullable: true})
  private _businessRegion: string;

  @Column({name: 'business_post_code', nullable: true})
  private _businessPostCode: string;

  @Column({name: 'business_phone_number', type: 'bigint', nullable: true})
  private _businessPhoneNumber: BigInt;

  @Column({name: 'business_email', nullable: true})
  private _businessEmail: string;

  @Column({name: 'business_fax_number', type: 'bigint', nullable: true})
  private _businessFaxNumber: BigInt;

  @Column({name: 'disabled_until', nullable: true})
  private _disabledUntil: Date;

  @CreateDateColumn({name: 'created_on', type: 'timestamptz'})
  private _createdOn: Date;

  @UpdateDateColumn({name: 'modified_on', type: 'timestamptz'})
  private _modifiedOn: Date;

  @ManyToOne(()=>Merchant, (merchant)=> merchant.id)
  @JoinColumn({name: 'merchant_id'})
  private _merchant : Merchant;

  @OneToOne(()=> BusinessRepresentative)
  @JoinColumn({name: 'business_representative_id'})
  private _businessRepresentative : BusinessRepresentative;

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
   * Getter businessName
   * @return{string} businessName
   */
  public get businessName(): string {
    return this._businessName;
  }
  /**
   * Setter businessName
   * @param{string} businessName
   */
  public set businessName(businessName: string) {
    this._businessName = businessName;
  }
  /**
   * Getter registrationNumber
   * @return{string} registrationNumber
   */
  public get registrationNumber(): string {
    return this._registrationNumber;
  }
  /**
   * Setter registrationNumber
   * @param{string} registrationNumber
   */
  public set registrationNumber(registrationNumber: string) {
    this._registrationNumber = registrationNumber;
  }
  /**
   * Getter businessLegalEntityType
   * @return{string} businessLegalEntityType
   */
  public get businessLegalEntityType(): string {
    return this._businessLegalEntityType;
  }
  /**
   * Setter businessLegalEntityType
   * @param{string} businessLegalEntityType
   */
  public set businessLegalEntityType(businessLegalEntityType: string) {
    this._businessLegalEntityType = businessLegalEntityType;
  }
  /**
   * Getter businessRoleText
   * @return{string} businessRoleText
   */
  public get businessRoleText(): string {
    return this._businessRoleText;
  }
  /**
   * Setter businessRoleText
   * @param{string} businessRoleText
   */
  public set businessRoleText(businessRoleText: string) {
    this._businessRoleText = businessRoleText;
  }
  /**
   * Getter businessWebsite
   * @return{string} businessWebsite
   */
  public get businessWebsite(): string {
    return this._businessWebsite;
  }
  /**
   * Setter businessWebsite
   * @param{string} businessWebsite
   */
  public set businessWebsite(businessWebsite: string) {
    this._businessWebsite = businessWebsite;
  }
  /**
   * Getter businessAddressLine1
   * @return{string} businessAddressLine1
   */
  public get businessAddressLine1(): string {
    return this._businessAddressLine1;
  }
  /**
   * Setter businessAddressLine1
   * @param{string} businessAddressLine1
   */
  public set businessAddressLine1(businessAddressLine1: string) {
    this._businessAddressLine1 = businessAddressLine1;
  }
  /**
   * Getter businessAddressLine2
   * @return{string} businessAddressLine2
   */
  public get businessAddressLine2(): string {
    return this._businessAddressLine2;
  }
  /**
   * Setter businessAddressLine2
   * @param{string} businessAddressLine2
   */
  public set businessAddressLine2(businessAddressLine2: string) {
    this._businessAddressLine2 = businessAddressLine2;
  }
  /**
   * Getter businessAddressLine3
   * @return{string} businessAddressLine3
   */
  public get businessAddressLine3(): string {
    return this._businessAddressLine3;
  }
  /**
   * Setter businessAddressLine3
   * @param{string} businessAddressLine3
   */
  public set businessAddressLine3(businessAddressLine3: string) {
    this._businessAddressLine3 = businessAddressLine3;
  }
  /**
   * Getter businessCity
   * @return{string} businessCity
   */
  public get businessCity(): string {
    return this._businessCity;
  }
  /**
   * Setter businessCity
   * @param{string} businessCity
   */
  public set businessCity(businessCity: string) {
    this._businessCity = businessCity;
  }
  /**
   * Getter businessRegion
   * @return{string} businessRegion
   */
  public get businessRegion(): string {
    return this._businessRegion;
  }
  /**
   * Setter businessRegion
   * @param{string} businessRegion
   */
  public set businessRegion(businessRegion: string) {
    this._businessRegion = businessRegion;
  }
  /**
   * Getter businessPostCode
   * @return{string} businessPostCode
   */
  public get businessPostCode(): string {
    return this._businessPostCode;
  }
  /**
   * Setter businessPostCode
   * @param{string} businessPostCode
   */
  public set businessPostCode(businessPostCode: string) {
    this._businessPostCode = businessPostCode;
  }
  /**
   * Getter businessPhoneNumber
   * @return{BigInt} businessPhoneNumber
   */
  public get businessPhoneNumber(): BigInt {
    return this._businessPhoneNumber;
  }
  /**
   * Setter businessPhoneNumber
   * @param{BigInt} businessPhoneNumber
   */
  public set businessPhoneNumber(businessPhoneNumber: BigInt) {
    this._businessPhoneNumber = businessPhoneNumber;
  }
  /**
   * Getter businessEmail
   * @return{string} businessEmail
   */
  public get businessEmail(): string {
    return this._businessEmail;
  }
  /**
   * Setter businessEmail
   * @param{string} businessEmail
   */
  public set businessEmail(businessEmail: string) {
    this._businessEmail = businessEmail;
  }
  /**
   * Getter businessFaxNumber
   * @return{BigInt} businessFaxNumber
   */
  public get businessFaxNumber(): BigInt {
    return this._businessFaxNumber;
  }
  /**
   * Setter businessFaxNumber
   * @param{BigInt} businessFaxNumber
   */
  public set businessFaxNumber(businessFaxNumber: BigInt) {
    this._businessFaxNumber = businessFaxNumber;
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
   * Getter Method
   * @return{Merchant} merchnat
   */
  public get merchant(): Merchant {
    return this._merchant;
  }
  /**
   * Setter Method
   * @param{Merchant} merchant
   */
  public set merchant(merchant: Merchant) {
    this._merchant = merchant;
  }
  /**
   * Getter Business Representative.
   * @return{BusinessRepresentative} businessRepresentative
   */
  public get businessRepresentative(): BusinessRepresentative {
    return this._businessRepresentative;
  }
  /**
   * Setter Business Representative.
   * @param{BusinessRepresentative} businessRepresentative
   */
  public set businessRepresentative(
      businessRepresentative: BusinessRepresentative) {
    this._businessRepresentative = businessRepresentative;
  }
}
