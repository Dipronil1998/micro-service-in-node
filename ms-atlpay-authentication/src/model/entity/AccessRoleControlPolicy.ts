import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

  /**
   * Access Role Control Policy entity class
   * @class{AccessRoleControlPolicy}
   */
  @Entity({name: 'access_role_control_policies'})
  /**
    * Entity for storing AccessRole developed in typeORM
    * @Entity AccessRoleControlPolicy
    */
export class AccessRoleControlPolicy {
      @PrimaryGeneratedColumn('uuid', {name: 'id'})
  private _id : string;

      @Column('uuid', {name: 'access_role_control_id'})
      private _accessRoleControlId : string;

      @Column('uuid', {name: 'access_control_policy_id'})
      private _accessControlPolicyId : string;

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
       * Getter AccessRoleControlId
       * @return{string} accessRoleControlId
       */
      public get accessRoleControlId(): string {
        return this._accessRoleControlId;
      }

      /**
       * Setter AccessRoleControlId
       * @param{string} accessRoleControlId
       */
      public set accessRoleControlId(accessRoleControlId: string) {
        this._accessRoleControlId = accessRoleControlId;
      }

      /**
       * Getter AccessControlPolicyId
       * @return{string} accessControlPolicyId
       */
      public get accessControlPolicyId(): string {
        return this._accessControlPolicyId;
      }

      /**
       * Setter AccessControlPolicyId
       * @param{string} accessControlPolicyId
       */
      public set accessControlPolicyId(accessControlPolicyId: string) {
        this._accessControlPolicyId = accessControlPolicyId;
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
