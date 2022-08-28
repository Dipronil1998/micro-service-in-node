import {AdminAuthentication} from './AdminAuthentication';
import {CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn} from 'typeorm';

@Entity()
/**
 * Admin Note entity
 * @Entity
 * @class
 */
export class AdminNote {
    @PrimaryGeneratedColumn('uuid', {name: 'id'})
  private _id : string;
    @ManyToOne(()=> AdminAuthentication,
        (admin)=>admin.id,
        {onDelete: 'SET NULL'})
    @JoinColumn({name: 'admin_id'})
    private _admin : AdminAuthentication;
    @ManyToOne(()=> AdminAuthentication,
        (owner)=>owner.id,
        {onDelete: 'SET NULL'})
    @JoinColumn({name: 'owner_id'})
    private _owner : AdminAuthentication;

    private _note: string;
    @CreateDateColumn({name: 'created_on'})
    private _createdOn : Date;
    @UpdateDateColumn({name: 'modified_on'})
    private _modifiedOn : Date;
    /**
     * Getter id
     * @return {string}
     */
    public get id(): string {
      return this._id;
    }

    /**
     * Getter admin
     * @return {AdminAuthentication}
     */
    public get admin(): AdminAuthentication {
      return this._admin;
    }

    /**
     * Getter owner
     * @return {AdminAuthentication}
     */
    public get owner(): AdminAuthentication {
      return this._owner;
    }

    /**
     * Getter $note
     * @return {string}
     */
    public get note(): string {
      return this._note;
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
     * Setter admin
     * @param {AdminAuthentication} value
     */
    public set admin(value: AdminAuthentication) {
      this._admin = value;
    }

    /**
     * Setter owner
     * @param {AdminAuthentication} value
     */
    public set owner(value: AdminAuthentication) {
      this._owner = value;
    }
    /**
     * Setter note
     * @param {string} value
     */
    public set note(value: string) {
      this._note = value;
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
