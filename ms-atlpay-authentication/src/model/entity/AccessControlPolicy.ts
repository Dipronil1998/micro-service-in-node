import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Access Control Policy entity class
 * @class{AccessControlPolicy}
 */
@Entity({name: 'access_control_policies'})
/**
  * Entity for storing AccessControlPolicy developed in typeORM
  * @Entity AccessControlPolicy
  */
export class AccessControlPolicy {
    @PrimaryGeneratedColumn('uuid', {name: 'id'})
  private _id: string;

    @Column('uuid', {name: 'access_control_id'})
    private _accessControlId: string;

    @Column({name: 'code'})
    private _code: string;

    @Column({name: 'title'})
    private _title: string;

    @Column('jsonb', {name: 'policy_object'})
    private _policyObject: string;

    @Column({name: 'disable', type: 'timestamptz', nullable: true})
    private _disable: Date;

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
      * Getter code
      * @return{string} code
      */
    public get code(): string {
      return this._code;
    }
    /**
     * Setter code
     * @param{string} code
     */
    public set code(code: string) {
      this._code = code;
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
    * Getter title
    * @return{string} title
    */
    public get title(): string {
      return this._title;
    }
    /**
     * Setter title
     * @param{string} title
     */
    public set title(title: string) {
      this._title = title;
    }
    /**
      * Getter policyObject
      * @return{string} policyObject
      */
    public get policyObject(): string {
      return this._policyObject;
    }
    /**
     * Setter policyObject
     * @param{string} policyObject
     */
    public set policyObject(policyObject: string) {
      this._policyObject = policyObject;
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
    /**
    * Getter disable
    * @return{date} disable
    */
    public get disable(): Date {
      return this._disable;
    }
    /**
     * Setter disable
     * @param{date} disable
     */
    public set disable(disable: Date) {
      this._disable = disable;
    }
}
