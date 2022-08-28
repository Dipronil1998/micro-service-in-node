import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Access Role Control entity class
 * @class{AccessRoleControl}
 */
@Entity({name: 'access_role_controls'})
/**
  * Entity for storing AccessRoleControl developed in typeORM
  * @Entity AccessRoleControl
  */
export class AccessRoleControl {
    @PrimaryGeneratedColumn('uuid', {name: 'id'})
  private _id: string;

    @Column('uuid', {name: 'access_role_id'})
    private _accessRoleId: string;

    @Column('uuid', {name: 'access_control_id'})
    private _accessControlId: string;

    @Column({name: 'read_access', default: false})
    private _readAccess: boolean;

    @Column({name: 'write_access', default: false})
    private _writeAccess: boolean;

    @CreateDateColumn({name: 'created_on'})
    private _createdOn: Date;

    @UpdateDateColumn({name: 'modified_on'})
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
      * Getter accessRoleId
      * @return{string} accessRoleId
      */
    public get accessRoleId(): string {
      return this._accessRoleId;
    }
    /**
     * Setter accessRoleId
     * @param{string} accessRoleId
     */
    public set accessRoleId(accessRoleId: string) {
      this._accessRoleId = accessRoleId;
    }
    /**
      * Getter accessControlId
      * @return{string} accessControlId
      */
    public get accessControlId(): string {
      return this._accessControlId;
    }
    /**
     * Setter accessControlId
     * @param{string} accessControlId
     */
    public set accessControlId(accessControlId: string) {
      this._accessControlId = accessControlId;
    }
    /**
    * Getter readAccess
    * @return{boolean} readAccess
    */
    public get readAccess(): boolean {
      return this._readAccess;
    }
    /**
     * Setter readAccess
     * @param{boolean} readAccess
     */
    public set readAccess(readAccess: boolean) {
      this._readAccess = readAccess;
    }
    /**
      * Getter writeAccess
      * @return{string} writeAccess
      */
    public get writeAccess(): boolean {
      return this._writeAccess;
    }
    /**
     * Setter writeAccess
     * @param{string} writeAccess
     */
    public set writeAccess(writeAccess: boolean) {
      this._writeAccess = writeAccess;
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
}
