import {
  Entity, Column,
  CreateDateColumn, UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

/**
 * Language entity
 * @class{Language}
 */
@Entity({name: 'languages'})
/**
 * Entity for storing Language, developed in typeORM
 * @Entity Language
 */
export class Language {
    @PrimaryGeneratedColumn('uuid', {name: 'id'})
  private _id: string;

    @Column({name: 'code'})
    private _code: string;

    @Column({name: 'language_family'})
    private _languageFamily: string;

    @Column({name: 'title'})
    private _title: string;

    @CreateDateColumn({name: 'created_on', type: 'timestamptz'})
    private _createdOn: Date;

    @UpdateDateColumn({name: 'modified_on', type: 'timestamptz'})
    private _modifiedOn: Date;

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
    * Getter languageFamily
    * @return{string} languageFamily
    */
    public get languageFamily(): string {
      return this._languageFamily;
    }
    /**
   * Setter languageFamily
   * @param{string} languageFamily
   */
    public set languageFamily(languageFamily: string) {
      this._languageFamily = languageFamily;
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
