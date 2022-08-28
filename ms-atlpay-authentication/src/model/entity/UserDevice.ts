import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import {Device} from './Device';
import {UserAuthentication} from './UserAuthentication';

@Entity({name: 'user_devices'})
/**
 * Entity for storing UserDevice developed in typeORM
 * @Entity UserDevice
 */
export class UserDevice {
  @PrimaryGeneratedColumn('uuid', {name: 'id'})
  private _id: string;

  @Column({name: 'is_disable', default: false})
  private _isDisable: boolean;

  @CreateDateColumn({name: 'created_on', type: 'timestamptz'})
  private _createdOn: Date;

  @UpdateDateColumn({name: 'modified_on', type: 'timestamptz'})
  private _modifiedOn: Date;

  @Column({
    name: 'last_used',
    type: 'timestamptz',
    default: null,
    nullable: true,
  })
  private _lastUsed: Date;

  @ManyToOne(() => UserAuthentication,
      (userAuthentication) => userAuthentication.id,
      {onDelete: 'SET NULL'})
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
   * Getter isDisable
   * @return{boolean} isDisable
   */
  public get isDisable(): boolean {
    return this._isDisable;
  }
  /**
   * Setter isDisable
   * @param{boolean} isDisable
   */
  public set isDisable(isDisable: boolean) {
    this._isDisable = isDisable;
  }
  /**
   * Getter last used
   * @return{date} lastUsed
   */
  public get lastUsed(): Date {
    return this._lastUsed;
  }
  /**
   * Setter last used
   * @param{date} lastUsed
   */
  public set lastUsed(lastUsed: Date) {
    this._lastUsed = lastUsed;
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
