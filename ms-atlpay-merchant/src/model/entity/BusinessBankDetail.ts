import {Column, CreateDateColumn, Entity, JoinColumn,
  ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {MerchantBusinessProfile} from './MerchantBusinessProfile';

/**
 * Entity for BusinessBankDetails developed in typeORM
 * @Entity BusinessBankDetails
 */
@Entity({name: 'business_bank_details'})
/**
 * BusinessBankDetail entity class
 * @class{BusinessBankDetail}
 */
export class BusinessBankDetail {
    @PrimaryGeneratedColumn('uuid', {name: 'id'})
  private _id: string;
    @ManyToOne(()=>MerchantBusinessProfile,
        (merchnatBusinessProfile)=>merchnatBusinessProfile.id)
    @JoinColumn({name: 'merchant_business_profile_id'})
    private _merchantBusinessProfile : MerchantBusinessProfile;

    @Column({name: 'account_holder_name'})
    private _accountHolderName: string;

    @Column({name: 'account_number'})
    private _accountNumber: string;

    @Column({name: 'branch_name'})
    private _branchName: string;

    @Column({name: 'country_specific_branch_code'})
    private _countrySpecificBranchCode: string;

    @Column({name: 'is_primary'})
    private _isPrimary: boolean;

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
     * Getter Account Holder Name
     * @return{string} accountHolderName
     */
    public get accountHolderName(): string {
      return this._accountHolderName;
    }

    /**
     * Setter Account Holder Name
     * @param{string} accountHolderName
     */
    public set accountHolderName(accountHolderName: string) {
      this._accountHolderName = accountHolderName;
    }

    /**
     * Getter Account Number
     * @return{string} accountNumber
     */
    public get accountNumber(): string {
      return this._accountNumber;
    }

    /**
     * Setter Account Number
     * @param{string} accountNumber
     */
    public set accountNumber(accountNumber: string) {
      this._accountNumber = accountNumber;
    }

    /**
     * Getter Branch Name
     * @return{string} branchName
     */
    public get branchName(): string {
      return this._branchName;
    }

    /**
     * Setter Branch Name
     * @param{string} branchName
     */
    public set branchName(branchName: string) {
      this._branchName = branchName;
    }

    /**
     * Getter Country Specific Branch Code
     * @return{string} countrySpecificBranchCode
     */
    public get countrySpecificBranchCode(): string {
      return this._countrySpecificBranchCode;
    }

    /**
     * Setter Country Specific Branch Code
     * @param{string} countrySpecificBranchCode
     */
    public set countrySpecificBranchCode(countrySpecificBranchCode: string) {
      this._countrySpecificBranchCode = countrySpecificBranchCode;
    }

    /**
     * Getter Is Primary
     * @return{boolean} isPrimary
     */
    public get isPrimary(): boolean {
      return this._isPrimary;
    }

    /**
     * Setter Is Primary
     * @param{boolean} isPrimary
     */
    public set isPrimary(isPrimary: boolean) {
      this._isPrimary = isPrimary;
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
