import {Entity, PrimaryColumn, Column,
  CreateDateColumn, UpdateDateColumn} from 'typeorm';

/**
 * Currency entity
 * @class{Currency}
 */
 @Entity({name: 'currencies'})
 /**
  * Entity for storing Currency developed in typeORM
  * @Entity Currency
  */
export class Currency {
    @PrimaryColumn({name: 'iso'})
  private _iso: string;

    @Column({name: 'iso_numeric', nullable: true})
    private _isoNumeric: number;

    @Column({name: 'common_name'})
    private _commonName: string;

    @Column({name: 'official_name'})
    private _officialName: string;

    @Column({name: 'icon'})
    private _icon: string;

    @CreateDateColumn({name: 'created_on', type: 'timestamptz'})
    private _createdOn : Date;

    @UpdateDateColumn({name: 'modified_on', type: 'timestamptz'})
    private _modifiedOn: Date;


    /**
   * Getter iso
   * @return{string} iso
   */
    public get iso(): string {
      return this._iso;
    }
    /**
   * Setter iso
   * @param{string} iso
   */
    public set iso(iso: string) {
      this._iso = iso;
    }
    /**
   * Getter isoNumeric
   * @return{number} isoNumeric
   */
    public get isoNumeric(): number {
      return this._isoNumeric;
    }
    /**
   * Setter isoNumeric
   * @param{number} isoNumeric
   */
    public set isoNumeric(isoNumeric: number) {
      this._isoNumeric = isoNumeric;
    }
    /**
   * Getter CommonName
   * @return{string} commonName
   */
    public get commonName(): string {
      return this._commonName;
    }
    /**
   * Setter commonName
   * @param{string} commonName
   */
    public set commonName(commonName: string) {
      this._commonName = commonName;
    }
    /**
   * Getter officialName
   * @return{string} officialName
   */
    public get officialName(): string {
      return this._officialName;
    }
    /**
   * Setter officialName
   * @param{string} officialName
   */
    public set officialName(officialName: string) {
      this._officialName = officialName;
    }
    /**
 * Getter icon
 * @return{string} icon
 */
    public get icon(): string {
      return this._icon;
    }
    /**
   * Setter icon
   * @param{string} icon
   */
    public set icon(icon: string) {
      this._icon = icon;
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
