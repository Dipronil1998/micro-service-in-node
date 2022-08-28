import {Column, CreateDateColumn, Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn} from 'typeorm';

/**
 * Entity for BusinessRepresentative developed in typeORM
 * @Entity BusinessRepresentative
 */
 @Entity({name: 'business_representatives'})
 /**
  * BusinessRepresentative entity class
  * @class{BusinessRepresentative}
  */
export class BusinessRepresentative {
  @PrimaryGeneratedColumn('uuid', {name: 'id'})
  private _id: string;

  @Column({name: 'first_name'})
  private _firstName: string;

  @Column({name: 'middle_name', nullable: true})
  private _middleName: string;

  @Column({name: 'last_name'})
  private _lastName: string;

  @Column({name: 'email'})
  private _email: string;

  @Column({name: 'job_title'})
  private _jobTitle: string;

  @Column({name: 'date_of_birth'})
  private _dateOfBirth: Date;

  @Column({name: 'business_address_line_1'})
  private _businessAddressLine1: string;

  @Column({name: 'business_address_line_2', nullable: true})
  private _businessAddressLine2: string;

  @Column({name: 'business_address_line_3', nullable: true})
  private _businessAddressLine3: string;

  @Column({name: 'phone_number', type: 'bigint'})
  private _phoneNumber: BigInt;

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
   * Setter id
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
   * Getter Job Title
   * @return{string} jobTitle
   */
  public get jobTitle(): string {
    return this._jobTitle;
  }

  /**
   * Setter Job Title
   * @param{string} jobTitle
   */
  public set jobTitle(jobTitle: string) {
    this._jobTitle = jobTitle;
  }

  /**
   * Getter date Of Birth
   * @return{Date} dateOfBirth
   */
  public get dateOfBirth(): Date {
    return this._dateOfBirth;
  }

  /**
   * Setter Date Of Birth
   * @param{Date} dateOfBirth
   */
  public set dateOfBirth(dateOfBirth: Date) {
    this._dateOfBirth = dateOfBirth;
  }

  /**
   * Getter Business Address Line 1
   * @return{string} businessAddressLine1
   */
  public get businessAddressLine1(): string {
    return this._businessAddressLine1;
  }

  /**
   * Setter Business Address Line 1
   * @param{string} businessAddressLine1
   */
  public set businessAddressLine1(businessAddressLine1: string) {
    this._businessAddressLine1 = businessAddressLine1;
  }

  /**
   * Getter Business Address Line 2
   * @return{string} businessAddressLine2
   */
  public get businessAddressLine2(): string {
    return this._businessAddressLine2;
  }

  /**
   * Setter Business Address Line 2
   * @param{string} businessAddressLine2
   */
  public set businessAddressLine2(businessAddressLine2: string) {
    this._businessAddressLine2 = businessAddressLine2;
  }

  /**
   * Getter Business Address Line 3
   * @return{string} businessAddressLine3
   */
  public get businessAddressLine3(): string {
    return this._businessAddressLine3;
  }

  /**
   * Setter Business Address Line 3
   * @param{string} businessAddressLine3
   */
  public set businessAddressLine3(businessAddressLine3: string) {
    this._businessAddressLine3 = businessAddressLine3;
  }

  /**
   * Getter Phone Number
   * @return{BigInt} phoneNumber
   */
  public get phoneNumber(): BigInt {
    return this._phoneNumber;
  }

  /**
   * Setter Phone Number
   * @param{BigInt} phoneNumber
   */
  public set phoneNumber(phoneNumber: BigInt) {
    this._phoneNumber = phoneNumber;
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
