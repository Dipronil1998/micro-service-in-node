import {
  Entity, PrimaryColumn, Column, ManyToOne,
  JoinColumn, UpdateDateColumn, CreateDateColumn,
}
  from 'typeorm';
import {Currency} from './Currency';

/**
 * Country entity
 * @class{Country}
 */
@Entity({name: 'countries'})
/**
 * Entity for storing Country developed in typeORM
 * @Entity Country
 */
export class Country {
  @Column({name: 'continent_code'})
  private _continentCode: string;

  @ManyToOne(
      () => Currency,
      (officialCurrencyCode) => officialCurrencyCode.iso,
      {onDelete: 'SET NULL'},
  )
  @JoinColumn({name: 'official_currency_code'})
  private _officialCurrencyCode: Currency;

  @Column({name: 'iso_2'})
  private _iso2: string;

  @Column({name: 'iso_3'})
  private _iso3: string;

  @PrimaryColumn({name: 'iso_numeric'})
  private _isoNumeric: number;

  @Column({name: 'fips_code'})
  private _fipsCode: string;

  @Column({name: 'isd_code'})
  private _isdCode: number;

  @Column({name: 'common_name'})
  private _commonName: string;

  @Column({name: 'official_name'})
  private _officialName: string;

  @Column({name: 'endonym'})
  private _endonym: string;

  @Column({name: 'demonym'})
  private _demonym: string;

  @Column({name: 'is_blocked', type: 'boolean', default: false})
  private _isBlocked: boolean;

  @CreateDateColumn({name: 'created_on', type: 'timestamptz'})
  private _createdOn: Date;

  @UpdateDateColumn({name: 'modified_on', type: 'timestamptz'})
  private _modifiedOn: Date;

  /**
   * Getter official Currency Code
   * @return{Currency} officialCurrencyCode
   */
  public get officialCurrencyCode(): Currency {
    return this._officialCurrencyCode;
  }
  /**
   * Setter official Currency Code
   * @param{Currency} officialCurrencyCode
   */
  public set officialCurrencyCode(officialCurrencyCode: Currency) {
    this._officialCurrencyCode = officialCurrencyCode;
  }
  /**
   * Getter ContinentCode
   * @return{string} continentCode
   */
  public get continentCode(): string {
    return this._continentCode;
  }
  /**
     * Setter ContinentCode
     * @param{string} continentCode
     */
  public set continentCode(continentCode: string) {
    this._continentCode = continentCode;
  }
  /**
   * Getter iso2
   * @return{string} iso2
   */
  public get iso2(): string {
    return this._iso2;
  }
  /**
   * Setter iso2
   * @param{string} iso2
   */
  public set iso2(iso2: string) {
    this._iso2 = iso2;
  }
  /**
   * Getter Is iso3
   * @return{string} iso3
   */
  public get iso3(): string {
    return this._iso3;
  }
  /**
   * Setter iso3
   * @param{string} iso3
   */
  public set iso3(iso3: string) {
    this._iso3 = iso3;
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
   * Getter Is fipsCode
   * @return{string} fipsCode
   */
  public get fipsCode(): string {
    return this._fipsCode;
  }
  /**
   * Setter fipsCode
   * @param{string} fipsCode
   */
  public set fipsCode(fipsCode: string) {
    this._fipsCode = fipsCode;
  }
  /**
   * Getter isdCode
   * @return{number} isdCode
   */
  public get isdCode(): number {
    return this._isdCode;
  }
  /**
   * Setter isdCode
   * @param{number} isdCode
   */
  public set isdCode(isdCode: number) {
    this._isdCode = isdCode;
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
  * Getter endonym
  * @return{string} endonym
 */
  public get endonym(): string {
    return this._endonym;
  }
  /**
   * Setter endonym
   * @param{string} endonym
   */
  public set endonym(endonym: string) {
    this._endonym = endonym;
  }
  /**
   * Getter demonym
   * @return{string} demonym
  */
  public get demonym(): string {
    return this._demonym;
  }
  /**
   * Setter demonym
   * @param{string} demonym
   */
  public set demonym(demonym: string) {
    this._demonym = demonym;
  }
  /**
   * Getter isBlocked
   * @return{boolean} isBlocked
  */
  public get isBlocked(): boolean {
    return this._isBlocked;
  }
  /**
   * Setter isBlocked
   * @param{boolean} isBlocked
   */
  public set isBlocked(isBlocked: boolean) {
    this._isBlocked = isBlocked;
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
