import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

  /**
   * Partner Document Page class
   * @class{PartnerDocumentPage}
   */
  @Entity({name: 'partner_document_pages'})
  /**
    * Entity for storing PartnerDocumentPage developed in typeORM
    * @Entity PartnerDocumentPage
    */
export class PartnerDocumentPage {
      @PrimaryGeneratedColumn('uuid', {name: 'id'})
  private _id: string;


      @Column({name: 'display_order'})
      private _displayOrder: number;

      @Column({name: 'uri'})
      private _uri: string;

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
       * Getter Uri
       * @return{string} uri
       */
      public get uri(): string {
        return this._uri;
      }

      /**
     * Setter Uri
     * @param{string} uri
     */
      public set uri(uri: string) {
        this._uri = uri;
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
