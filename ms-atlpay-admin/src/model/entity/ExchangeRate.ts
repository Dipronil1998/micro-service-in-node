import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Exchange Rate
 * @class{ExchangeRate}
 */
@Entity({name: 'exchange_rates'})
/**
     * Entity for storing Exchange Rate developed in typeORM
     * @Entity Exchange Rate
     */
export class ExchangeRate {
    @PrimaryGeneratedColumn('uuid', {name: 'id'})
  private _id: string;

    @Column({name: 'currency_id'})
    private _currencyId: string;

    @CreateDateColumn({name: 'app_date'})
    private _appDate: Date;

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
     * Getter App Date
     * @return{Date} appDate
     */
    public get appDate(): Date {
      return this._appDate;
    }

    /**
         * Setter App Date
         * @param{Date} appDate
         */
    public set appDate(appDate: Date) {
      this._appDate = appDate;
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
