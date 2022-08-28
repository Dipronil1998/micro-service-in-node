import {
  Column, CreateDateColumn, Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

/**
 * Entity to store mail Information
 */
@Entity({name: 'Mails'})
/**
 * Entity for storing Mail developed in typeORM
  * @Entity Mail
  * @class
 */
export class Mail {
  @PrimaryGeneratedColumn('uuid', {name: 'id'})
  private _id: string;

  @Column({name: 'from'})
  private _from: string;

  @Column({name: 'to'})
  private _to: string;

  @Column({name: 'cc', nullable: true})
  private _cc: string;

  @Column({name: 'bcc', nullable: true})
  private _bcc: string;

  @Column({name: 'subject', nullable: true})
  private _subject: string;

  @Column({name: 'text', nullable: true})
  private _text: string;

  @Column({name: 'response', nullable: true})
  private _response: string;

  @Column({name: 'message_id', nullable: true})
  private _messageId: string;

  @CreateDateColumn({name: 'created_on'})
  private _createdOn: Date;

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
   * Getter from
   * @return{string} from
   */
  public get from(): string {
    return this._from;
  }
  /**
   * Setter from
   * @param{string} from
   */
  public set from(from: string) {
    this._from = from;
  }
  /**
   * Getter to
   * @return{string} to
   */
  public get to(): string {
    return this._to;
  }
  /**
   * Setter to
   * @param{string} to
   */
  public set to(to: string) {
    this._to = to;
  }
  /**
   * Getter cc
   * @return{string} cc
   */
  public get cc(): string {
    return this._cc;
  }
  /**
   * Setter cc
   * @param{string} cc
   */
  public set cc(cc: string) {
    this._cc = cc;
  }
  /**
   * Getter bcc
   * @return{string} bcc
  */
  public get bcc(): string {
    return this._bcc;
  }
  /**
   * Setter bcc
   * @param{string} bcc
   */
  public set bcc(bcc: string) {
    this._bcc = bcc;
  }
  /**
   * Getter subject
   * @return{string} subject
   */
  public get subject(): string {
    return this._subject;
  }
  /**
   * Setter subject
   * @param{string} subject
   */
  public set subject(subject: string) {
    this._subject = subject;
  }
  /**
   * Getter text
   * @return{string} text
   */
  public get text(): string {
    return this._text;
  }
  /**
   * Setter text
   * @param{string} text
   */
  public set text(text: string) {
    this._text = text;
  }
  /**
   * hasAttachments: boolean
   */
  private _hasAttachments: boolean;
  /**
   * Getter hasAttachments
   * @return{boolean} hasAttachments
   */
  public get hasAttachments(): boolean {
    return this._hasAttachments;
  }
  /**
   * Setter hasAttachments
   * @param{boolean} hasAttachments
   */
  public set hasAttachments(hasAttachments: boolean) {
    this._hasAttachments = hasAttachments;
  }
  /**
   * Getter response
   * @return{string} response
   */
  public get response(): string {
    return this._response;
  }
  /**
   * Setter response
   * @param{string} response
   */
  public set response(response: string) {
    this._response = response;
  }
  /**
   * Getter messageId
   * @return{string} messageId
   */
  public get messageId(): string {
    return this._messageId;
  }
  /**
   * Setter messageId
   * @param{string} messageId
   */
  public set messageId(messageId: string) {
    this._messageId = messageId;
  }
  /**
   * Getter createdOn
   * @return{Date} createdOn
   */
  public get createdOn(): Date {
    return this._createdOn;
  }
  /**
   * Setter createdOn
   * @param{Date} createdOn
   */
  public set createdOn(createdOn: Date) {
    this._createdOn = createdOn;
  }
}
