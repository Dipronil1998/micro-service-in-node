import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne,
  CreateDateColumn, UpdateDateColumn, JoinColumn,
} from 'typeorm';
import {Device} from './Device';
import {UserAuthentication} from './UserAuthentication';

@Entity({name: 'user_account_requests'})
/**
 * Entity for storing UserAccountRequest developed in typeORM
 * @Entity UserAccountRequest
 */
export class UserAccountRequest {
    @PrimaryGeneratedColumn('uuid', {name: 'id'})
  private _id: string;

    @Column({name: 'action'})
    private _action: string;

    @Column({name: 'auth_token', nullable: true})
    private _authToken: string;

    @Column('jsonb', {name: 'auth_values', nullable: true})
    private _authValues: string;

    @Column({
      name: 'expiry', type: 'timestamptz',
      default: null, nullable: true,
    })
    private _expiry: Date;

    @CreateDateColumn({name: 'created_on', type: 'timestamptz'})
    private _createdOn: Date;

    @UpdateDateColumn({name: 'modified_on', type: 'timestamptz'})
    private _modifiedOn: Date;

    @ManyToOne(() => UserAuthentication,
        (userAuthentication) => userAuthentication.id, {onDelete: 'SET NULL'})
    @JoinColumn({name: 'user_authentication_id'})
    private _userAuthentication: UserAuthentication;

    @ManyToOne(() => Device, (device) => device.id, {onDelete: 'SET NULL'})
    @JoinColumn({name: 'device_id'})
    private _device: Device;

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
     * Getter string
     * @return{string} action
     */
    public get action(): string {
      return this._action;
    }
    /**
     * Setter action
     * @param{string} action
     */
    public set action(action: string) {
      this._action = action;
    }
    /**
     * Getter authToken
     * @return{string} authToken
     */
    public get authToken(): string {
      return this._authToken;
    }
    /**
       * Setter authToken
       * @param{string} authToken
    */
    public set authToken(authToken: string) {
      this._authToken = authToken;
    }
    /**
     * Getter authValues
     * @return{string} authValues
     */
    public get authValues(): string {
      return this._authValues;
    }
    /**
       * Setter authValues
       * @param{string} authValues
    */
    public set authValues(authValues: string) {
      this._authValues = authValues;
    }
    /**
       * Getter expiry
       * @return{Date} expiry
    */
    public get expiry(): Date {
      return this._expiry;
    }
    /**
       * Setter expiry
       * @param{Date} expiry
       */
    public set expiry(expiry: Date) {
      this._expiry = expiry;
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
     * Getter device
     * @return{Device} device
     */
    public get device(): Device {
      return this._device;
    }
    /**
     * Setter device
     * @param{Device} device
     */
    public set device(device: Device) {
      this._device = device;
    }
}
