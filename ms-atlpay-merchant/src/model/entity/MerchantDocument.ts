import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';
import {MerchantBusinessProfile} from './MerchantBusinessProfile';

/**
 * Entity for Merchant Document developed in typeORM
 * @Entity MerchantDocument
 */
@Entity({name: 'merchant_documents'})
/**
 * MerchantDocument entity class
 * @class{MerchantDocument}
 */
export class MerchantDocument {
  @PrimaryGeneratedColumn('uuid', {name: 'id'})
  private _id: string;

  @Column({name: 'document_type_text', nullable: true})
  private _documentTypeText: string;

  @Column({name: 'document_url', nullable: true})
  private _documentUrl: string;

  @Column({name: 'issuer', nullable: true})
  private _issuer: string;

  @Column({name: 'place_of_issue', nullable: true})
  private _placeOfIssue: string;

  @Column({name: 'valid_form', type: 'timestamptz', nullable: true})
  private _validForm: Date;

  @Column({name: 'valid_through', type: 'timestamptz', nullable: true})
  private _validThrough: Date;

  @CreateDateColumn({name: 'created_on', type: 'timestamptz'})
  private _createdOn: Date;

  @UpdateDateColumn({name: 'modified_on', type: 'timestamptz'})
  private _modifiedOn: Date;

  @ManyToOne(()=>MerchantBusinessProfile,
      (merchantBusinessProfile) =>merchantBusinessProfile.id)
  @JoinColumn({name: 'merchant_business_profile_id'})
  private _merchantBusinessProfile : MerchantBusinessProfile;
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
   * Getter documentTypeText
   * @return{string} documentTypeText
   */
  public get documentTypeText(): string {
    return this._documentTypeText;
  }
  /**
   * Setter documentTypeText
   * @param{string} documentTypeText
   */
  public set documentTypeText(documentTypeText: string) {
    this._documentTypeText = documentTypeText;
  }
  /**
   * Getter documentUrl
   * @return{string} documentUrl
   */
  public get documentUrl(): string {
    return this._documentUrl;
  }
  /**
   * Setter documentUrl
   * @param{string} documentUrl
   */
  public set documentUrl(documentUrl: string) {
    this._documentUrl = documentUrl;
  }
  /**
   * Getter issuer
   * @return{string} issuer
   */
  public get issuer(): string {
    return this._issuer;
  }
  /**
   * Setter issuer
   * @param{string} issuer
   */
  public set issuer(issuer: string) {
    this._issuer = issuer;
  }
  /**
   * Getter placeOfIssue
   * @return{string} placeOfIssue
   */
  public get placeOfIssue(): string {
    return this._placeOfIssue;
  }
  /**
   * Setter placeOfIssue
   * @param{string} placeOfIssue
   */
  public set placeOfIssue(placeOfIssue: string) {
    this._placeOfIssue = placeOfIssue;
  }
  /**
   * Getter valid Form
   * @return{Date} validForm
   */
  public get validForm(): Date {
    return this._validForm;
  }
  /**
   * Setter valid Form
   * @param{Date} validForm
   */
  public set validForm(validForm: Date) {
    this._validForm = validForm;
  }
  /**
   * Getter valid Through
   * @return{Date} validThrough
   */
  public get validThrough(): Date {
    return this._validThrough;
  }
  /**
   * Setter valid Through
   * @param{Date} validThrough
   */
  public set validThrough(validThrough: Date) {
    this._validThrough = validThrough;
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
   * Getter Merchant business Profile
   * @return{MerchantBusinessProfile} merchantBusinessProfile
   */
  public get merchantBusinessProfile(): MerchantBusinessProfile {
    return this._merchantBusinessProfile;
  }
  /**
   * Setter Merchant business Profile
   * @param{MerchantBusinessProfile} merchantBusinessProfile
   */
  public set merchantBusinessProfile(
      merchantBusinessProfile: MerchantBusinessProfile) {
    this._merchantBusinessProfile = merchantBusinessProfile;
  }
}
