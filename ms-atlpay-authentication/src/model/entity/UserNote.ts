import {AdminAuthentication} from './AdminAuthentication';
import {UserAuthentication} from './UserAuthentication';
/**
 * User Note entity
 * @class
 */
export class UserNote {
  private _id : string;
  private _user : UserAuthentication;
  private _owner : AdminAuthentication;
  private _createdOn : Date;
  private _modifiedOn : Date;

  /**
     * Getter id
     * @return {string}
     */
  public get id(): string {
    return this._id;
  }

  /**
     * Getter user
     * @return {UserAuthentication}
     */
  public get user(): UserAuthentication {
    return this._user;
  }
  /**
     * Getter owner
     * @return {AdminAuthentication}
     */
  public get owner(): AdminAuthentication {
    return this._owner;
  }

  /**
     * Getter createdOn
     * @return {Date}
     */
  public get createdOn(): Date {
    return this._createdOn;
  }

  /**
     * Getter modifiedOn
     * @return {Date}
     */
  public get modifiedOn(): Date {
    return this._modifiedOn;
  }

  /**
     * Setter id
     * @param {string} value
     */
  public set id(value: string) {
    this._id = value;
  }

  /**
     * Setter user
     * @param {UserAuthentication} value
     */
  public set user(value: UserAuthentication) {
    this._user= value;
  }

  /**
     * Setter owner
     * @param {AdminAuthentication} value
     */
  public set owner(value: AdminAuthentication) {
    this._owner = value;
  }

  /**
     * Setter createdOn
     * @param {Date} value
     */
  public set createdOn(value: Date) {
    this._createdOn = value;
  }

  /**
     * Setter modifiedOn
     * @param {Date} value
     */
  public set modifiedOn(value: Date) {
    this._modifiedOn = value;
  }
}
