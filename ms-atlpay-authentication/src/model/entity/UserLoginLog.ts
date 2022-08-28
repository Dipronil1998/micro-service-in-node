import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import {Device} from './Device';
import {UserAuthentication} from './UserAuthentication';

@Entity({name: 'user_login_logs'})
/**
 * Entity for storing UserLoginLog developed in typeORM
 */
export class UserLoginLog {
  @PrimaryGeneratedColumn('uuid', {name: 'id'})
  private _id: string;

  @Column({name: 'session'})
  private _session: string;

  @Column({name: 'ip_address'})
  private _ipAddress: string;

  @Column({name: 'lat', type: 'real', nullable: true})
  private _lat: number;

  @Column({name: 'lng', type: 'real', nullable: true})
  private _lng: number;

  @Column({name: 'city', nullable: true})
  private _city: string;

  @Column({name: 'region', nullable: true})
  private _region: string;

  @Column({name: 'country_name', nullable: true})
  private _countryName: string;

  @Column({name: 'country_iso2', nullable: true})
  private _CountryIso2: string;

  @Column({name: 'user_agent', nullable: true})
  private _userAgent: string;

  @Column({name: 'postal_code', nullable: true})
  private _postalCode: string;

  @Column({name: 'asn', nullable: true})
  private _asn: string;

  @Column({name: 'asn_name', nullable: true})
  private _asnName: string;

  @Column({name: 'asn_domain', nullable: true})
  private _asnDomain: string;

  @Column({name: 'asn_type', nullable: true})
  private _asnType: string;

  @Column({name: 'company_name', nullable: true})
  private _companyName: string;

  @Column({name: 'company_domain', nullable: true})
  private _companyDomain: string;

  @Column({name: 'company_type', nullable: true})
  private _companyType: string;

  @Column({name: 'carrier_name', nullable: true})
  private _carrierName: string;

  @Column({name: 'is_bot', type: 'boolean', nullable: true})
  private _isBot: boolean;

  @Column({name: 'accessed', type: 'timestamptz', nullable: true})
  private _accessed: Date;

  @Column({name: 'expiry', nullable: true})
  private _expiry: Date;

  @ManyToOne(
      () => UserAuthentication,
      (userAuthentication) => userAuthentication.id,
      {onDelete: 'SET NULL'},
  )
  @JoinColumn({name: 'user_authentication_id'})
  private _userAuthentication: UserAuthentication;

  @ManyToOne(() => Device, (device) => device.id, {onDelete: 'SET NULL'})
  @JoinColumn({name: 'device_id'})
  private _device: Device;

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
   * Setter Id
   * @param{string} id Id
   */
  public set id(id: string) {
    this._id = id;
  }

  /**
   * Getter IPAddress
   * @return{string} ipAddress
   */
  public get ipAddress(): string {
    return this._ipAddress;
  }

  /**
   * Setter IPAddress
   * @param{string} ipAddress IPAddress
   */
  public set ipAddress(ipAddress: string) {
    this._ipAddress = ipAddress;
  }

  /**
   * Getter Session
   * @return{string} session
   */
  public get session(): string {
    return this._session;
  }
  /**
   * Setter Session
   * @param{string} session
   */
  public set session(session: string) {
    this._session = session;
  }

  /**
   * Getter Latitude
   * @return{number} lat
   */
  public get lat(): number {
    return this._lat;
  }

  /**
   * Setter Latitude
   * @param{number} lat Latitude
   *
   */
  public set lat(lat: number) {
    this._lat = lat;
  }

  /**
   * Getter Longitude
   * @return{number} lng
   */
  public get lng(): number {
    return this._lng;
  }

  /**
   * Setter Longitude
   * @param{number} lng Longitude
   */
  public set lng(lng: number) {
    this._lng = lng;
  }

  /**
   * Getter City
   * @return{string} city
   */
  public get city(): string {
    return this._city;
  }

  /**
   * Setter City
   * @param{string} city City
   */
  public set city(city: string) {
    this._city = city;
  }

  /**
   * Getter Region
   * @return{string} region
   */
  public get region(): string {
    return this._region;
  }

  /**
   * Setter Region
   * @param{string} region Region
   */
  public set region(region: string) {
    this._region = region;
  }
  /**
   * Getter countryName
   * @return {string}
   */
  public get countryName(): string {
    return this._countryName;
  }

  /**
   * Setter countryName
   * @param {string} value
   */
  public set countryName(value: string) {
    this._countryName = value;
  }
  /**
     * Getter CountryIso2
     * @return {string}
     */
  public get CountryIso2(): string {
    return this._CountryIso2;
  }

  /**
       * Setter CountryIso2
       * @param {string} value
       */
  public set CountryIso2(value: string) {
    this._CountryIso2 = value;
  }

  /**
   * Getter Useragent
   * @return{string} userAgent
   */
  public get userAgent(): string {
    return this._userAgent;
  }

  /**
   * Setter Useragent
   * @param{string} userAgent Useragent
   */
  public set userAgent(userAgent: string) {
    this._userAgent = userAgent;
  }

  /**
   * Getter Postalcode
   * @return{string} postalCode
   */
  public get postalCode(): string {
    return this._postalCode;
  }

  /**
   * Setter Postalcode
   * @param{string} postalCode Postalcode
   */
  public set postalCode(postalCode: string) {
    this._postalCode = postalCode;
  }

  /**
   * Getter asn
   * @return{string} asn
   */
  public get asn(): string {
    return this._asn;
  }

  /**
   * Setter asn
   * @param{string} asn
   */
  public set asn(asn: string) {
    this._asn = asn;
  }

  /**
   * Getter Asn_name
   * @return{string} asnName
   */
  public get asnName(): string {
    return this._asnName;
  }

  /**
   * Setter Asn_name
   * @param{string} asnName
   */
  public set asnName(asnName: string) {
    this._asnName = asnName;
  }

  /**
   * Getting Asn Domain
   * @return{string} asnDomain
   */
  public get asnDomain(): string {
    return this._asnDomain;
  }

  /**
   * Setting A snDomain
   * @param{string} asnDomain
   */
  public set asnDomain(asnDomain: string) {
    this._asnDomain = asnDomain;
  }

  /**
   * Getter Asn Type
   * @return{string} asnType
   */
  public get asnType(): string {
    return this._asnType;
  }

  /**
   * Getter Asn Type
   * @param{string} asnType
   */
  public set asnType(asnType: string) {
    this._asnType = asnType;
  }

  /**
   * Getter Company Name
   * @return{string} companyName
   */
  public get companyName(): string {
    return this._companyName;
  }

  /**
   * Setter Company Name
   * @param{string} companyName
   */
  public set companyName(companyName: string) {
    this._companyName = companyName;
  }

  /**
   * Getting Company Domain
   * @return{string} companyDomain
   */
  public get companyDomain(): string {
    return this._companyDomain;
  }

  /**
   * Setting Company Domain
   * @param{string} companyDomain
   */
  public set companyDomain(companyDomain: string) {
    this._companyDomain = companyDomain;
  }

  /**
   * Setting Company Name
   * @return{string} companyType
   */
  public get companyType(): string {
    return this._companyType;
  }

  /**
   * Getting Company Name
   * @param{string} companyType
   */
  public set companyType(companyType: string) {
    this._companyType = companyType;
  }

  /**
   * Getting Carrier Name
   * @return{string} carrierName
   */
  public get carrierName(): string {
    return this._carrierName;
  }

  /**
   * Setting Carrier Name
   * @param{string} carrierName
   */
  public set carrierName(carrierName: string) {
    this._carrierName = carrierName;
  }

  /**
   * Getting is_bot
   * @return{boolean} isBot
   */
  public get isBot(): boolean {
    return this._isBot;
  }

  /**
   * Setting isBot
   * @param{boolean} isBot
   */
  public set isBot(isBot: boolean) {
    this._isBot = isBot;
  }

  /**
   * Getter Accessed
   * @return{Date} accessed
   */
  public get accessed(): Date {
    return this._accessed;
  }

  /**
   * Setter Accessed
   * @param{Date} accessed
   */
  public set accessed(accessed: Date) {
    this._accessed = accessed;
  }
  /**
   * Getter Expiry
   * @return{Date} expiry
   */
  public get expiry(): Date {
    return this._expiry;
  }
  /**
   * Setter Expiry
   * @param{Date} expiry
   */
  public set expiry(expiry: Date) {
    this._expiry = expiry;
  }

  /**
   * Getter CreatedOn
   * @return{Date} createdOn
   */
  public get createdOn(): Date {
    return this._createdOn;
  }
  /**
   * Setter CreatedOn
   * @param{Date} createdOn
   */
  public set createdOn(createdOn: Date) {
    this._createdOn = createdOn;
  }
  /**
   * Getter ModifiedOn
   * @return{Date} modifiedOn
   */
  public get modifiedOn(): Date {
    return this._modifiedOn;
  }
  /**
   * Setter ModifiedOn
   * @param{Date} modifiedOn
   */
  public set modifiedOn(modifiedOn: Date) {
    this._modifiedOn = modifiedOn;
  }

  /**
   * Getting User Authentication
   * @return{UserAuthentication} userAuthentication
   */
  public get userAuthentication(): UserAuthentication {
    return this._userAuthentication;
  }

  /**
   * Setting User Authentication
   * @param{UserAuthentication} userAuthentication
   */
  public set userAuthentication(userAuthentication: UserAuthentication) {
    this._userAuthentication = userAuthentication;
  }

  /**
   * Getting Device
   * @return{Device} device
   */
  public get device(): Device {
    return this._device;
  }

  /**
   * Setting Device
   * @param{Device} device Device
   */
  public set device(device: Device) {
    this._device = device;
  }
}
