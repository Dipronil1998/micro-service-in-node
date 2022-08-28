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
 * Country Kyc Setting class
 * @class{CountryPayoutChannelConfiguration}
 */
@Entity({name: 'country_payout_channel_configurations'})
/**
 * Entity for storing CountryPayoutChannelConfiguration
 * developed in typeORM
 * @Entity CountryPayoutChannelConfiguration
 */
export class CountryPayoutChannelConfiguration {
    @PrimaryGeneratedColumn('uuid', {name: 'id'})
  private _id: string;

    @ManyToOne(()=> CountryPayoutChannelConfiguration,
        (countryPayoutChannelConfiguration)=>
          countryPayoutChannelConfiguration.id,
        {nullable: true, onDelete: 'SET NULL'})
    @JoinColumn({name: 'country_payout_channel_id'})
    private _countryPayoutChannelId: CountryPayoutChannelConfiguration;

    @Column({name: 'type'})
    private _type: string;

    @Column({name: 'prefix_addon', nullable: true})
    private _prefixAddon: string;

    @Column({name: 'label'})
    private _label: string;

    @Column({name: 'slug'})
    private _slug: string;

    @Column({name: 'suffix_addon', nullable: true})
    private _suffixAddon: string;

    @Column({name: 'help_public', nullable: true})
    private _helpPublic: string;

    @Column({name: 'help_console', nullable: true})
    private _helpConsole: string;

    @Column({name: 'required', default: true})
    private _required: string;

    @Column({name: 'pattern', nullable: true})
    private _pattern: string;

    @Column({name: 'error', nullable: true})
    private _error: string;

    @Column({name: 'mask', nullable: true})
    private _mask: string;

    @Column({name: 'display_order'})
    private _displayOrder: number;

    @Column('jsonb', {name: 'meta'})
    private _meta: string;

    @Column({name: 'disabled'})
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
     * Getter Country Payout Channel Id
     * @return{CountryPayoutChannelConfiguration} countryPayoutChannelId
     */
    public get countryPayoutChannelId(): CountryPayoutChannelConfiguration {
      return this._countryPayoutChannelId;
    }

    /**
      * Setter Country Payout Channel Id
      * @param{CountryPayoutChannelConfiguration} countryPayoutChannelId
      */
    public set countryPayoutChannelId(
        countryPayoutChannelId: CountryPayoutChannelConfiguration) {
      this._countryPayoutChannelId = countryPayoutChannelId;
    }

    /**
     * Getter Type
     * @return{string} type
     */
    public get type(): string {
      return this._type;
    }

    /**
     * Setter Type
     * @param{string} type
     */
    public set type(type: string) {
      this._type = type;
    }

    /**
     * Getter Prefix Addon
     * @return{string} prefixAddon
     */
    public get prefixAddon(): string {
      return this._prefixAddon;
    }

    /**
     * Setter Prefix Addon
     * @param{string} prefixAddon
     */
    public set prefixAddon(prefixAddon: string) {
      this._prefixAddon = prefixAddon;
    }

    /**
     * Getter Label
     * @return{string} label
     */
    public get label(): string {
      return this._label;
    }

    /**
     * Setter Label
     * @param{string} label
     */
    public set label(label: string) {
      this._label = label;
    }

    /**
     * Getter Slug
     * @return{string} slug
     */
    public get slug(): string {
      return this._slug;
    }

    /**
     * Setter Slug
     * @param{string} slug
     */
    public set slug(slug: string) {
      this._slug = slug;
    }

    /**
     * Getter Suffix Addon
     * @return{string} suffixAddon
     */
    public get suffixAddon(): string {
      return this._suffixAddon;
    }

    /**
     * Setter Suffix Addon
     * @param{string} suffixAddon
     */
    public set suffixAddon(suffixAddon: string) {
      this._suffixAddon = suffixAddon;
    }

    /**
     * Getter Help Public
     * @return{string} helpPublic
     */
    public get helpPublic(): string {
      return this._helpPublic;
    }

    /**
     * Setter Help Public
     * @param{string} helpPublic
     */
    public set helpPublic(helpPublic: string) {
      this._helpPublic = helpPublic;
    }

    /**
     * Getter Help Console
     * @return{string} helpConsole
     */
    public get helpConsole(): string {
      return this._helpConsole;
    }

    /**
     * Setter Help Console
     * @param{string} helpConsole
     */
    public set helpConsole(helpConsole: string) {
      this._helpConsole = helpConsole;
    }

    /**
     * Getter Required
     * @return{string} required
     */
    public get required(): string {
      return this._required;
    }

    /**
     * Setter Required
     * @param{string} required
     */
    public set required(required: string) {
      this._required = required;
    }

    /**
     * Getter Pattern
     * @return{string} pattern
     */
    public get pattern(): string {
      return this._pattern;
    }

    /**
     * Setter Pattern
     * @param{string} pattern
     */
    public set pattern(pattern: string) {
      this._pattern = pattern;
    }

    /**
     * Getter Error
     * @return{string} error
     */
    public get error(): string {
      return this._error;
    }

    /**
     * Setter Error
     * @param{string} error
     */
    public set error(error: string) {
      this._error = error;
    }

    /**
     * Getter Mask
     * @return{string} mask
     */
    public get mask(): string {
      return this._mask;
    }

    /**
     * Setter Mask
     * @param{string} mask
     */
    public set mask(mask: string) {
      this._mask = mask;
    }

    /**
   * Setter Display Order
   * @return{number} displayOrder
   */
    public get displayOrder(): number {
      return this._displayOrder;
    }

    /**
   * Setter Display Order
   * @param{number} displayOrder
   */
    public set displayOrder(displayOrder: number) {
      this._displayOrder= displayOrder;
    }

    /**
     * Getter meta
     * @return{string} meta
     */
    public get meta(): string {
      return this._meta;
    }

    /**
     * Setter meta
     * @param{string} meta
     */
    public set meta(meta: string) {
      this._meta = meta;
    }

    /**
     * Getter disabled
     * @return{Date} disabled
     */
    public get disabled(): Date {
      return this._disabled;
    }

    /**
     * Setter disabled
     * @param{Date} disabled
     */
    public set disabled(disabled: Date) {
      this._disabled = disabled;
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
}
