import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

  /**
   * Email Notification class
   * @class{EmailNotification}
   */
  @Entity({name: 'email_notifications'})
  /**
    * Entity for storing EmailNotification developed in typeORM
    * @Entity EmailNotification
    */
export class EmailNotification {
      @PrimaryGeneratedColumn('uuid', {name: 'id'})
  private _id: string;

      @Column({name: 'alert_type'})
      private _alertType: string;

      @Column({name: 'recipient_name'})
      private _recipientName: string;

      @Column({name: 'recipient_email'})
      private _recipientEmail: string;

      @Column({name: 'cc_email_addresses'})
      private _ccEmailAddresses: string;

      @Column({name: 'bcc_email_addresses'})
      private _bccEmailAddresses: string;

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
       * Getter Alert Type
       * @return{string} alertType
       */
      public get alertType(): string {
        return this._alertType;
      }

      /**
       * Setter Alert Type
       * @param{string} alertType
       */
      public set alertType(alertType: string) {
        this._alertType = alertType;
      }

      /**
       * Getter Recipient Name
       * @return{string} recipientName
       */
      public get recipientName(): string {
        return this._recipientName;
      }

      /**
       * Setter Recipient Name
       * @param{string} recipientName
       */
      public set recipientName(recipientName: string) {
        this._recipientName = recipientName;
      }

      /**
       * Getter Recipient Email
       * @return{string} recipientEmail
       */
      public get recipientEmail(): string {
        return this._recipientEmail;
      }

      /**
       * Setter recipient Email
       * @param{string} recipientEmail
       */
      public set recipientEmail(recipientEmail: string) {
        this._recipientEmail = recipientEmail;
      }

      /**
       * Getter CC Email Addresses
       * @return{string} ccEmailAddresses
       */
      public get ccEmailAddresses(): string {
        return this._ccEmailAddresses;
      }

      /**
       * Setter CC Email Addresses
       * @param{string} ccEmailAddresses
       */
      public set ccEmailAddresses(ccEmailAddresses: string) {
        this._ccEmailAddresses = ccEmailAddresses;
      }

      /**
       * Getter Alert Type
       * @return{string} bccEmailAddresses
       */
      public get bccEmailAddresses(): string {
        return this._bccEmailAddresses;
      }

      /**
       * Setter Alert Type
       * @param{string} bccEmailAddresses
       */
      public set bccEmailAddresses(bccEmailAddresses: string) {
        this._bccEmailAddresses = bccEmailAddresses;
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
