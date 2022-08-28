import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

  @Entity({name: 'exchange_rate_definitions'})
  /**
   * Exchange Rate Definition entity
   * @class{ExchangeRateDefinitions}
   */
export class ExchangeRateDefinition {
    @PrimaryGeneratedColumn('uuid', {name: 'id'})
  private _id: string;

    @Column({
      name: 'exchange_rate_rule_id',
      nullable: true,
      default: null,
    })
    private _exchangeRateRuleId: string;

    @Column({name: 'currency_id'})
    private _currencyId: string;

    @Column({name: 'user_id'})
    private _userId: string;

    @Column({name: 'sell',
      type: 'decimal',
      precision: 20,
      scale: 12})
    private _sell: number;

    @Column({name: 'buy',
      type: 'decimal',
      precision: 20,
      scale: 12})
    private _buy: number;

    @Column({
      name: 'epoch',
      type: 'decimal',
      precision: 20,
      scale: 2,
      nullable: true,
      default: null,
    })
    private _epoch: number;

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
     * Getter exchangeRateRuleId
     * @return{string} exchangeRateRuleId
     */
    public get exchangeRateRuleId(): string {
      return this._exchangeRateRuleId;
    }
    /**
     * Setter exchangeRateRuleId
     * @param{string} exchangeRateRuleId
     */
    public set exchangeRateRuleId(exchangeRateRuleId: string) {
      this._exchangeRateRuleId = exchangeRateRuleId;
    }
    /**
     * Getter currencyId
     * @return{string} currencyId
     */
    public get currencyId(): string {
      return this._currencyId;
    }
    /**
     * Setter currencyId
     * @param{string} currencyId
     */
    public set currencyId(currencyId: string) {
      this._currencyId = currencyId;
    }
    /**
     * Getter userId
     * @return{string} userId
     */
    public get userId(): string {
      return this._userId;
    }
    /**
     * Setter userId
     * @param{number} userId
     */
    public set percentFees(userId: string) {
      this._userId = userId;
    }
    /**
     * Getter sell
     * @return{number} sell
     */
    public get sell(): number {
      return this._sell;
    }
    /**
     * Setter sell
     * @param{number} sell
     */
    public set minFees(sell: number) {
      this._sell = sell;
    }
    /**
     * Getter buy
     * @return{number} buy
     */
    public get buy(): number {
      return this._buy;
    }
    /**
     * Setter buy
     * @param{number} buy
     */
    public set buy(buy: number) {
      this._buy = buy;
    }
    /**
     * Getter epoch
     * @return{number} epoch
     */
    public get epoch(): number {
      return this._epoch;
    }
    /**
     * Setter epoch
     * @param{number} epoch
     */
    public set epoch(epoch: number) {
      this._epoch = epoch;
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
