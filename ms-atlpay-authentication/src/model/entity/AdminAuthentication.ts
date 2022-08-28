import {Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn} from 'typeorm';
import {AccessRole} from './AccessRole';
@Entity({name: 'admin_authentications'})
/**
 * Entity for storing UserAuthentication developed in typeORM
 * @Entity UserAuthentication
 */
export class AdminAuthentication {
    @PrimaryGeneratedColumn('uuid', {name: 'id'})
  private _id: string;
    @Column({name: 'allow_login', type: 'boolean', default: true})
    private _allowLogin: boolean;
    @Column({name: 'first_name'})
    private _firstName: string;
    @Column({name: 'middle_name', nullable: true})
    private _middleName: string;
    @Column({name: 'last_name'})
    private _lastName: string;
    @Column({name: 'email'})
    private _email: string;
    @Column({name: 'account_status', default: 'LIVE'})
    private _accountStatus: string;
    @Column({name: 'block_until', type: 'timestamptz', nullable: true,
      default: null})
    private _blockUntil: Date;
    @Column({name: 'password'})
    private _password: string;
    @Column({name: 'last_password_modified', type: 'timestamptz',
      nullable: true})
    private _lastPasswordModified: Date;
    @ManyToOne(()=> AccessRole,
        (accessRole)=>accessRole.id, {onDelete: 'SET NULL'})
    @JoinColumn({name: 'access_role_id'})
    private _accessRole : AccessRole;
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
