import {
  Entity, Column,
  CreateDateColumn, UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

/**
 * Continent entity
 * @class{Continent}
 */
@Entity({name: 'continents'})
/**
 * Entity for storing Continent, developed in typeORM
 * @Entity Continent
 */
export class Continent {
    @PrimaryGeneratedColumn('uuid', {name: 'id'})
  private _id: string;

    @Column({name: 'code'})
    private _code: string;

    @Column({name: 'name'})
    private _name: string;

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
   * Getter name
   * @return{string} name
   */
    public get name(): string {
      return this._name;
    }
    /**
   * Setter name
   * @param{string} name
   */
    public set name(name: string) {
      this._name = name;
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
