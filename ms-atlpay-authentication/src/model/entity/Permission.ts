import {Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn} from 'typeorm';

/**
 * Permission entity
 * @class{Permission}
 */
@Entity({name: 'permissions'})
/**
 * Entity for storing Permission developed in typeORM
 * @Entity Permission
 */
export class Permission {
    @PrimaryGeneratedColumn('increment', {name: 'id'})
  private _id: number;
    @Column({name: 'title'})
    private _title: string;
    @Column({name: 'description', nullable: true})
    private _description:string;
    @Column({name: 'is_disabled', default: false})
    private _isDisabled: boolean;
    @Column({name: 'disabled_upto', nullable: true})
    private _disabledUpto: Date;
    @CreateDateColumn({name: 'created_on'})
    private _createdOn: Date;
    @UpdateDateColumn({name: 'modified_on'})
    private _modifiedOn: Date;

    /**
     * Getter Id
     * @return{string} id
     */
    public get id(): number {
      return this._id;
    }

    /**
     * Setter Id
     * @param{string} id
     */
    public set id(id: number) {
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
    public get disabledUpto(): Date {
      return this._disabledUpto;
    }

    /**
     * Setter Disabled Upto
     * @param{Date} disabledUpto
     */
    public set disabledUpto(disabledUpto: Date) {
      this._disabledUpto = disabledUpto;
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
