import {NextFunction, Request, Response} from 'express';
import {getConnection} from 'typeorm';
import {adminNoteAdded,
  httpDataNotFound,
  invalidInputMessage,
  ormDBName} from '../../config/bootstrap';
import {DataNotFoundException} from '../exception/DataNotFoundException';
import {InvalidInputException} from '../exception/InvalidInputException';
import {AdminAuthentication} from '../model/entity/AdminAuthentication';
import {AdminNote} from '../model/entity/AdminNote';
import {AdminNotes} from '../model/repository/AdminNotes';
import {RepositoryParameter} from '../model/repository/AppRepository';
import {ResponseService} from '../service/ResponseService';
import {AppController} from './AppController';
/**
 * Admin note controller
 */
export class AdminNoteController extends AppController {
  private _dataBaseName : string;
  /**
   * Constructor Method.
   */
  constructor() {
    super('Admin note controller');
    this._dataBaseName = ormDBName;
  }
  /**
     * Crete new admin note
     * @param{Request} request
     * @param{Response} response
     * @param{NextFunction} next
     */
  public create = async (request: Request,
      response : Response,
      next: NextFunction) =>{
    const note : string = request.body.note;
    const adminId : string = request.body.admin_id;
    const ownerId: string = request.body.owner_id;
    try {
      const adminNoteRepositoryParameter: RepositoryParameter =
        new RepositoryParameter(
            'Admin Note',
            AdminNote,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const adminNoteRepo: AdminNotes =
        new AdminNotes(adminNoteRepositoryParameter);
      const admin : AdminAuthentication| boolean =
        await adminNoteRepo.getAdmin(adminId);
      const owner : AdminAuthentication| boolean =
        await adminNoteRepo.getOwner(ownerId);
      if (admin instanceof AdminAuthentication &&
            owner instanceof AdminAuthentication ) {
        const adminNote : AdminNote =adminNoteRepo.newEntity();
        adminNote.note = note;
        adminNote.admin = admin;
        adminNote.owner = owner;
        const savedAdminNote: AdminNote = await adminNoteRepo.save(adminNote);
        if (savedAdminNote instanceof AdminNote) {
          new ResponseService().sendSuccessResponse(response, adminNoteAdded);
        } else {
          throw new Error();
        }
      } else {
        throw new InvalidInputException(invalidInputMessage);
      }
    } catch (error: any) {
      next(error);
    }
  };
  /**
     * Get admin note by id
     * @param{Request} request
     * @param{Response} response
     * @param{NextFunction} next
     */
  public get = async (request: Request,
      response : Response,
      next: NextFunction) =>{
    try {
      const adminNoteId : string = request.params.id;
      const adminNoteRepositoryParameter: RepositoryParameter =
        new RepositoryParameter(
            'Admin Note',
            AdminNote,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const adminNoteRepo: AdminNotes =
        new AdminNotes(adminNoteRepositoryParameter);
      const adminNote : AdminNote = await adminNoteRepo.get(adminNoteId);
      if (!adminNote) {
        throw new DataNotFoundException(httpDataNotFound);
      }
      new ResponseService().sendSuccessResponse(
          response,
          adminNoteRepo.toJson(adminNote));
    } catch (error: any) {
      next(error);
    }
  };
}
