import {Column, CreateDateColumn,
  Entity, Generated,
  PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
/**
 * Platform Entity
 */
@Entity({name: 'platforms'})
/**
  * Entity for storing Platform developed in typeORM
  * @Entity Platform
  */
export class Platform {
    @PrimaryGeneratedColumn('uuid', {name: 'id'})
  private _id: string;

    @Column({type: 'uuid', name: 'app_token_id'})
    @Generated('uuid')
    private _appTokenId : string;

    @Column({name: 'app_secret_id'})
    @Generated('uuid')
    private _appSecretId : string;

    @Column({name: 'code'})
    private _code : string;

    @Column({name: 'icon_class'})
    private _iconClass : string;

    @Column({name: 'title'})
    private _title : string;

    @Column({name: 'description'})
    private _description : string;

    @Column({name: 'domain', nullable: true})
    private _domain : string;

    @Column({name: 'email_verification_url', nullable: true})
    private _emailVerificationUrl : string;

    @Column({name: 'emal_change_confirmation_url', nullable: true})
    private _emailChangeConfirmationUrl : string;

    @Column({name: 'forget_password_url', nullable: true})
    private _forgetPasswordUrl: string;

    @Column({name: 'reset_password_url', nullable: true})
    private _resetPasswordUrl: string;

    @Column({name: 'document_upload_url', nullable: true})
    private _documentUploadUrl: string;

    @Column({name: 'white_listed_ip_address', nullable: true})
    private _whiteListedIpAddress : string;

    @CreateDateColumn({name: 'created_on'})
    private _createdOn: Date;

    @UpdateDateColumn({name: 'modified_on'})
    private _modifiedOn: Date;

    @Column({default: false, name: 'is_enable'})
    private _isEnable: boolean;

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
     * Getter App Token Id
     * @return{string} _appTokenId
     */
    public get appTokenId(): string {
      return this._appTokenId;
    }

    /**
     * Setter App Token Id
     * @param{string} appTokenId
     */
    public set appTokenId(appTokenId: string) {
      this._appTokenId = appTokenId;
    }

    /**
     * Getter App Secret Id
     * @return{string} appSecretId
     */
    public get appSecretId(): string {
      return this._appSecretId;
    }

    /**
     * Setter App Secret Id
     * @param{string} appSecretId
     */
    public set appSecretId(appSecretId: string) {
      this._appSecretId = appSecretId;
    }

    /**
     * Getter Code
     * @return{string} code
     */
    public get code(): string {
      return this._code;
    }

    /**
     * Setter Code
     * @param{string} code
     */
    public set code(code: string) {
      this._code = code;
    }

    /**
     * Getter Icon Class
     * @return{string} iconClass
     */
    public get iconClass(): string {
      return this._iconClass;
    }

    /**
     * Setter Icon Class
     * @param{string} iconClass
     */
    public set iconClass(iconClass: string) {
      this._iconClass = iconClass;
    }

    /**
     * Getter Title
     * @return{string} title
     */
    public get title(): string {
      return this._title;
    }

    /**
     * Setter Title
     * @param{string} title
     */
    public set title(title: string) {
      this._title = title;
    }

    /**
     * Getter Description
     * @return{string} description
     */
    public get description(): string {
      return this._description;
    }

    /**
     * Setter Description
     * @param{string} description
     */
    public set description(description: string) {
      this._description = description;
    }

    /**
     * Getter Domain
     * @return{string} domain
     */
    public get domain(): string {
      return this._domain;
    }

    /**
     * Setter Domain
     * @param{string} domain
     */
    public set domain(domain: string) {
      this._domain = domain;
    }

    /**
     * Getter EmailVerificationUrl
     * @return{string} emailVerificationUrl
     */
    public get emailVerificationUrl(): string {
      return this._emailVerificationUrl;
    }

    /**
     * Setter EmailVerificationUrl
     * @param{string} emailVerificationUrl
     */
    public set emailVerificationUrl(emailVerificationUrl: string) {
      this._emailVerificationUrl = emailVerificationUrl;
    }

    /**
     * Getter EmailChangeConfirmationUrl
     * @return{string} emailChangeConfirmationUrl
     */
    public get emailChangeConfirmationUrl(): string {
      return this._emailChangeConfirmationUrl;
    }

    /**
     * Setter EmailChangeConfirmationUrl
     * @param{string} emailChangeConfirmationUrl
     */
    public set emailChangeConfirmationUrl(emailChangeConfirmationUrl: string) {
      this._emailChangeConfirmationUrl = emailChangeConfirmationUrl;
    }

    /**
     * Setter ForgetPasswordUrl
     * @return{string} forgetPasswordUrl
     */
    public get forgetPasswordUrl(): string {
      return this._forgetPasswordUrl;
    }

    /**
     * Setter ForgetPasswordUrl
     * @param{string} forgetPasswordUrl
     */
    public set forgetPasswordUrl(forgetPasswordUrl: string) {
      this._forgetPasswordUrl = forgetPasswordUrl;
    }

    /**
     * Getter ResetPasswordUrl
     * @return{string} resetPasswordUrl
     */
    public get resetPasswordUrl(): string {
      return this._resetPasswordUrl;
    }

    /**
     * Setter ResetPasswordUrl
     * @param{string} resetPasswordUrl
     */
    public set resetPasswordUrl(resetPasswordUrl: string) {
      this._resetPasswordUrl = resetPasswordUrl;
    }

    /**
     * Getter DocumentUploadUrl
     * @return{string} documentUploadUrl
     */
    public get documentUploadUrl(): string {
      return this._documentUploadUrl;
    }

    /**
     * Setter DocumentUploadUrl
     * @param{string} documentUploadUrl
     */
    public set documentUploadUrl(documentUploadUrl: string) {
      this._documentUploadUrl = documentUploadUrl;
    }

    /**
     * Getter WhiteListedIpAddress
     * @return{string} whiteListedIpAddress
     */
    public get whiteListedIpAddress(): string {
      return this._whiteListedIpAddress;
    }

    /**
     * Setter WhiteListedIpAddress
     * @param{string} whiteListedIpAddress
     */
    public set whiteListedIpAddress(whiteListedIpAddress: string) {
      this._whiteListedIpAddress = whiteListedIpAddress;
    }

    /**
     * Getter ModifiedOn
     * @return{date} modifiedOn
     */
    public get modifiedOn(): Date {
      return this._modifiedOn;
    }

    /**
     * Setter ModifiedOn
     * @param{date} modifiedOn
     */
    public set modifiedOn(modifiedOn: Date) {
      this._modifiedOn = modifiedOn;
    }

    /**
     * Getter CreatedOn
     * @return{date} createdOn
     */
    public get createdOn(): Date {
      return this._createdOn;
    }

    /**
     * Setter CreatedOn
     * @param{date} createdOn
     */
    public set createdOn(createdOn: Date) {
      this._createdOn = createdOn;
    }

    /**
     * Getter IsEnable
     * @return{boolean} isEnable
     */
    public get isEnable(): boolean {
      return this._isEnable;
    }

    /**
     * Setter IsEnable
     * @param{boolean} isEnable
     */
    public set isEnable(isEnable: boolean) {
      this._isEnable = isEnable;
    }
}
