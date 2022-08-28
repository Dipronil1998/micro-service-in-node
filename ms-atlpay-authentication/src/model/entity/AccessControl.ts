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
 * Access Control entity
 * @class{AccessControl}
 */
@Entity({name: 'access_controls'})
/**
 * Entity for storing AccessControls developed in typeORM
 * @Entity AccessControls
 */
export class AccessControl {
  @PrimaryGeneratedColumn('uuid', {name: 'id'})
  private _id: string;

  @ManyToOne(() => AccessControl,
      (accessControl) => accessControl.id, {
        nullable: true,
        onDelete: 'SET NULL',
      })
  @JoinColumn({name: 'access_control_id'})
  private _parent: AccessControl;

  @Column({name: 'code'})
  private _code: string;

  @Column({name: 'title'})
  private _title: string;

  @Column({name: 'description'})
  private _description: string;

  @Column('jsonb', {name: 'read_access', nullable: true})
  private _readAccess: string;

  @Column('jsonb', {name: 'read_and_write_access', nullable: true})
  private _readAndWriteAccess: string;

  @Column({name: 'lft'})
  private _lft: number;

  @Column({name: 'rght'})
  private _rght: number;

  @Column({name: 'disabled', nullable: true})
  private _disabled: Date;

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
   * Getter Parent
   * @return{AccessControl} parent
   */
  public get parent(): AccessControl {
    return this._parent;
  }

  /**
   * Setter Parent
   * @param{AccessControl} parent
   */
  public set parent(parent: AccessControl) {
    this._parent = parent;
  }

  /**
   * Getter Code
   * @return{string} code
   */
  public get code(): string {
    return this._code;
  }

  /**
   * Setter Code
   * @param{string} code
   */
  public set code(code: string) {
    this._code = code;
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
   * Getter Read Access
   * @return{any} readAccess
   */
  public get readAccess(): string {
    return this._readAccess;
  }

  /**
   * Setter Read Access
   * @param{string} readAccess
   */
  public set readAccess(readAccess: string) {
    this._readAccess = readAccess;
  }

  /**
   * Getter Read And Write Access
   * @return{string} readAndWriteAccess
   */
  public get readAndWriteAccess(): string {
    return this._readAndWriteAccess;
  }

  /**
   * Setter Read And Write Access
   * @param{string} readAndWriteAccess
   */
  public set readAndWriteAccess(readAndWriteAccess: string) {
    this._readAndWriteAccess = readAndWriteAccess;
  }

  /**
   * Getter lft
   * @return{number} lft
   */
  public get lft(): number {
    return this._lft;
  }

  /**
   * Setter lft
   * @param{number} lft
   */
  public set lft(lft: number) {
    this._lft = lft;
  }

  /**
   * Getter rght
   * @return{number} rght
   */
  public get rght(): number {
    return this._rght;
  }

  /**
   * Setter rght
   * @param{number} rght
   */
  public set rght(rght: number) {
    this._rght = rght;
  }

  /**
   * Getter Disabled
   * @return{Date} disabled
   */
  public get disabled(): Date {
    return this._disabled;
  }

  /**
   * Setter Disabled
   * @param{Date} disabled
   */
  public set disabled(disabled: Date) {
    this._disabled = disabled;
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
