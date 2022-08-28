import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {AccessRole} from './AccessRole';
import {Permission} from './Permission';

/**
 * Access Role Permission
 * @class
 */
@Entity({name: 'access_role_permissions'})
/**
 * Entity for storing AccessRolePermission developed in typeORM
 * @Entity AccessRolePermission
 */
export class AccessRolePermission {
  @PrimaryGeneratedColumn('increment', {name: 'id'})
  private _id: string;

  @ManyToOne(() => AccessRole,
      (accessRole) => accessRole.id, {
        onDelete: 'CASCADE',
      })
  @JoinColumn({name: 'access_role_id'})
  private _accessRole: AccessRole;

  @ManyToOne(() => Permission,
      (permission) => permission.id, {
        onDelete: 'CASCADE',
      })
  @JoinColumn({name: 'permission_id'})
  private _permission: Permission;

  @CreateDateColumn()
  private _createdOn: Date;

  @UpdateDateColumn()
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
   * Getter AccessRole
   * @return{AccessRole} accessRole
   */
  public get accessRole(): AccessRole {
    return this._accessRole;
  }

  /**
   * Setter AccessRole
   * @param{AccessRole} accessRole
   */
  public set accessRole(accessRole: AccessRole) {
    this._accessRole = accessRole;
  }

  /**
   * Getter Permission
   * @return{Permission} permission
   */
  public get permission(): Permission {
    return this._permission;
  }

  /**
   * Setter Permission
   * @param{Permission} permission
   */
  public set permission(permission: Permission) {
    this._permission = permission;
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
