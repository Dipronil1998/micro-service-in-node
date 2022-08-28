
import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn,
  Generated,
} from 'typeorm';


@Entity({name: 'devices'})
/**
 * Entity for storing DeviceInfo developed in typeORM
 * @Entity Device
 */
export class Device {
  @PrimaryGeneratedColumn('uuid', {name: 'id'})
  private _id: string;
  @Column({name: 'category', nullable: true})
  private _category: string;

  @Column({name: 'os', nullable: true})
  private _os: string;

  @Column({name: 'os_version', nullable: true})
  private _osVersion: string;

  @Column({name: 'browser_type', nullable: true})
  private _browserType: string;

  @Column({name: 'browser_version', nullable: true})
  private _browserVersion: string;

  @Column({name: 'vendor', nullable: true})
  private _vendor: string;

  @Column({name: 'fingerprint', nullable: true})
  @Generated('uuid')
  private _fingerprint: string;

  @Column({name: 'hit_count', nullable: true})
  private _hitCount: number;

  @Column({name: 'client', nullable: true})
  private _client: string;

  @Column({name: 'platform', nullable: true})
  private _platform: string;

  @Column({name: 'source', nullable: true})
  private _source: string;

  @Column({name: 'is_bot', nullable: true})
  private _isBot: string;

  @Column({name: 'is_mobile', type: 'boolean', default: false})
  private _isMobile: boolean;

  @CreateDateColumn({name: 'created_on', type: 'timestamptz'})
  private _createdOn: Date;

  @Column({name: 'last_used', type: 'timestamptz'})
  private _lastUsed: Date;

  @Column({name: 'is_disabled', type: 'boolean', default: false})
  private _isDisabled: boolean;

  @Column({name: 'disable_upto', type: 'timestamptz', nullable: true})
  private _disableUpto: Date;

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
   * Getter category
   * @return{string} category
   */
  public get category(): string {
    return this._category;
  }
  /**
   * Setter category
   * @param{string} category
   */
  public set category(category: string) {
    this._category = category;
  }
  /**
   * Getter os
   * @return{string} os
   */
  public get os(): string {
    return this._os;
  }
  /**
   * Setter os
   * @param{string} os
   */
  public set os(os: string) {
    this._os = os;
  }
  /**
   * Getter os version
   * @return{string} osVersion
   */
  public get osVersion(): string {
    return this._osVersion;
  }
  /**
   * Setter os version
   * @param{string} osVersion
   */
  public set osVersion(osVersion: string) {
    this._osVersion = osVersion;
  }
  /**
   * Getter browser type
   * @return{string} browserType
   */
  public get browserType(): string {
    return this._browserType;
  }
  /**
   * Setter browser type
   * @param{string} browserType
   */
  public set browserType(browserType: string) {
    this._browserType = browserType;
  }
  /**
   * Getter browser version
   * @return{string} browserVersion
   */
  public get browserVersion(): string {
    return this._browserVersion;
  }
  /**
   * Setter browser version
   * @param{string} browserVersion
   */
  public set browserVersion(browserVersion: string) {
    this._browserVersion = browserVersion;
  }
  /**
   * Getter vendor
   * @return{string} vendor
   */
  public get vendor(): string {
    return this._vendor;
  }
  /**
   * Setter vendor
   * @param{string} vendor
   */
  public set vendor(vendor: string) {
    this._vendor = vendor;
  }
  /**
   * Getter fingerprint
   * @return{string} fingerprint
   */
  public get fingerprint(): string {
    return this._fingerprint;
  }
  /**
   * Setter fingerprint
   * @param{string} fingerprint
   */
  public set fingerprint(fingerprint: string) {
    this._fingerprint = fingerprint;
  }
  /**
   * Getter hit count
   * @return{number} hitCount
   */
  public get hitCount(): number {
    return this._hitCount;
  }
  /**
   * Setter hit count
   * @param{number} hitCount
   */
  public set hitCount(hitCount: number) {
    this._hitCount = hitCount;
  }
  /**
   * Getter client
   * @return{string} client
   */
  public get client(): string {
    return this._client;
  }
  /**
   * Setter client
   * @param{string} client
   */
  public set client(client: string) {
    this._client = client;
  }
  /**
   * Getter platform
   * @return{string} platform
   */
  public get platform(): string {
    return this._platform;
  }
  /**
   * Setter platform
   * @param{string} platform
   */
  public set platform(platform: string) {
    this._platform = platform;
  }
  /**
   * Getter source
   * @return{string} source
   */
  public get source(): string {
    return this._source;
  }
  /**
   * Setter source
   * @param{string} source
   */
  public set source(source: string) {
    this._source = source;
  }
  /**
   * Getter is bot
   * @return{string} isBot
   */
  public get isBot(): string {
    return this._isBot;
  }
  /**
   * Setter is bot
   * @param{string} isBot
   */
  public set isBot(isBot: string) {
    this._isBot = isBot;
  }
  /**
   * Getter is mobile
   * @return{boolean} isMobile
   */
  public get isMobile(): boolean {
    return this._isMobile;
  }
  /**
   * Setter is mobile
   * @param{boolean} isMobile
   */
  public set isMobile(isMobile: boolean) {
    this._isMobile = isMobile;
  }
  /**
   * Getter created
   * @return{date} createdOn
   */
  public get createdOn(): Date {
    return this._createdOn;
  }
  /**
   * Setter created
   * @param{date} createdOn
   */
  public set createdOn(createdOn: Date) {
    this._createdOn = createdOn;
  }

  /**
   * Getter last used
   * @return{date} lastUsed
   */
  public get lastUsed(): Date {
    return this._lastUsed;
  }
  /**
   * Setter last used
   * @param{date} lastUsed
   */
  public set lastUsed(lastUsed: Date) {
    this._lastUsed = lastUsed;
  }
  /**
   * Getter is disabled
   * @return{boolean} isDisabled
   */
  public get isDisabled(): boolean {
    return this._isDisabled;
  }
  /**
   * Setter is disabled
   * @param{boolean} isDisabled
   */
  public set isDisabled(isDisabled: boolean) {
    this._isDisabled = isDisabled;
  }
  /**
   * Getter disable upto
   * @return{date} disableUpto
   */
  public get disableUpto(): Date {
    return this._disableUpto;
  }
  /**
   * Setter disable upto
   * @param{date} disableUpto
   */
  public set disableUpto(disableUpto: Date) {
    this._disableUpto = disableUpto;
  }
}
