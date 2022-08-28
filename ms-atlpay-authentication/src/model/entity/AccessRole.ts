import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Access Role entity class
 * @class{AccessRole}
 */
@Entity({name: 'access_roles'})
/**
 * Entity for storing AccessRole developed in typeORM
 * @Entity AccessRole
 */
export class AccessRole {
  @PrimaryGeneratedColumn('uuid', {name: 'id'})
  private _id: string;

  @Column({name: 'title'})
  private _title: string;

  @Column({name: 'description', nullable: true})
  private _description: string;

  @Column({name: 'is_super_role', default: false})
  private _isSuperRole: boolean;

  @Column({name: 'is_system_role', default: false})
  private _isSystemRole: boolean;

  @Column({name: 'is_editable', default: true})
  private _isEditable: boolean;

  @Column({name: 'is_disabled', default: false})
  private _isDisabled: boolean;

  @Column({name: 'disable_upto', nullable: true})
  private _disableUpto: Date;

  @CreateDateColumn({name: 'created_on'})
  private _createdOn: Date;

  @UpdateDateColumn({name: 'modified_on'})
  private _modifiedOn: Date;

  @ManyToOne(() => AccessRole, (accessRole) => accessRole.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({name: 'access_role_id'})
  private _parent: AccessRole;

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
   * Setter Is Super Role
   * @return{boolean} isSuperRole
   */
  public get isSuperRole(): boolean {
    return this._isSuperRole;
  }

  /**
   * Setter Is Super Role
   * @param{boolean} isSuperRole
   */
  public set isSuperRole(isSuperRole: boolean) {
    this._isSuperRole = isSuperRole;
  }

  /**
   * Getter Is System Role
   * @return{boolean} isSystemRole
   */
  public get isSystemRole(): boolean {
    return this._isSystemRole;
  }

  /**
   * Setter Is System Role
   * @param{boolean} isSystemRole
   */
  public set isSystemRole(isSystemRole: boolean) {
    this._isSystemRole = isSystemRole;
  }

  /**
   * Getter Is Editable
   * @return{boolean} isEditable
   */
  public get isEditable(): boolean {
    return this._isEditable;
  }

  /**
   * Setter Is Editable
   * @param{boolean} isEditable
   */
  public set isEditable(isEditable: boolean) {
    this._isEditable = isEditable;
  }

  /** +
   * Getter Is Disabled
   * @return{boolean} isDisabled
   */
  public get isDisabled(): boolean {
    return this._isDisabled;
  }

  /**
   * Setter Is Disabled
   * @param{boolean} isDisabled
   */
  public set isDisabled(isDisabled: boolean) {
    this._isDisabled = isDisabled;
  }

  /**
   * Getter Disable Upto
   * @return{Date} disableUpto
   */
  public get disableUpto(): Date {
    return this._disableUpto;
  }

  /**
   * Setter Disable Upto
   * @param{Date} disableUpto
   */
  public set disableUpto(disableUpto: Date) {
    this._disableUpto = disableUpto;
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
   * Getter Parent
   * @return{AccessRole} parent
   */
  public get parent(): AccessRole {
    return this._parent;
  }

  /**
   * Setter Parent
   * @param{AccessRole} parent
   */
  public set parent(parent: AccessRole) {
    this._parent = parent;
  }
}
