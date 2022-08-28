import {NextFunction, Request, Response} from 'express';
import {getConnection} from 'typeorm';
import {httpDataNotFound, merchantCreatedMessage, ormDBName}
  from '../../config/bootstrap';
import {FileMetaData} from '../interface/types/File';
import {MerchantDocument} from '../model/entity/MerchantDocument';
import {RepositoryParameter} from '../model/repository/AppRepository';
import {MerchantDocuments} from '../model/repository/MerchantDocuments';
import {FileManager} from '../utils/FileManager';
import {AppController} from './AppController';
import fileUpload from 'express-fileupload';
import {ResponseService} from '../service/ResponseService';
import {DataNotFoundException} from '../exception/DataNotFoundException';
import {Pagination} from '../utils/Pagination';
import {InvalidInputException} from '../exception/InvalidInputException';
/**
 * Merchant document Controller
 * @class{MerchantDocumentController}
 * @extends{AppController}
 */
export class MerchantDocumentController extends AppController {
  private _dataBaseName: string;
  /**
     * Constructor Method.
     * @constructor
     */
  constructor() {
    super('MerchantDocumentController');
    this._dataBaseName = ormDBName;
  }
  /**
     * Upload Merchant Documents
     * @param{Request} request
     * @param{Response} response
     * @param{NextFunction} next
     */
  public create = async (
      request: Request,
      response: Response,
      next : NextFunction)=>{
    this._request = request;
    this._response = response;
    try {
      const merchantDocumentRepositoryOptions: RepositoryParameter =
        new RepositoryParameter(
            'merchant document',
            MerchantDocument,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const merchnatDocumentRepository: MerchantDocuments =
        new MerchantDocuments(merchantDocumentRepositoryOptions);
      const noOfDocuments : number = Number(request.body.no_of_documents);
      const fileManager : FileManager = new FileManager();
      for (let index= 1; index<=noOfDocuments && request.files; index++) {
        const documentFile: fileUpload.UploadedFile|fileUpload.UploadedFile[] =
          request.files['merchant_document_upload_'+index];
        const documentTitle: string =
          request.body['merchant_document_title_'+(index)];
        const issuer: string =
          request.body['merchant_document_issuer_'+(index)];
        const documentTextType : string =
          request.body['merchant_document_type_text_'+(index)];
        const placeOfIssue: string =
          request.body['merchant_document_place_of_issue_'+(index)];
        const validForm: Date =
          request.body['merchant_document_valid_from_'+(index)];
        const validThrough: Date =
          request.body['merchant_document_valid_through_'+(index)];
        const uploadedFileMetaData :FileMetaData| boolean = await
        fileManager.upload(documentFile);
        if (uploadedFileMetaData!=false) {
          const merchnatDocument: MerchantDocument =
            merchnatDocumentRepository.newEntity();
          merchnatDocument.documentUrl = Object.values(uploadedFileMetaData)[0];
          merchnatDocument.documentTypeText = documentTextType;
          merchnatDocument.issuer = issuer;
          merchnatDocument.placeOfIssue = placeOfIssue;
          merchnatDocument.validForm = validForm;
          merchnatDocument.validThrough = validThrough;
          merchnatDocument.merchantBusinessProfile =
            request.body.merchant_business_profile;
          await merchnatDocumentRepository.save(merchnatDocument);
        } else {
          throw new InvalidInputException(
              'Invalid Input input Merchant document');
        }
      }
      new ResponseService().sendSuccessResponse(
          response, merchantCreatedMessage);
    } catch (error: any) {
      next(error);
    }
  };

  /**
    * Get All Merchant Documents
    * @param{Request} request
    * @param{Response} response
    * @param{NextFunction} next
    */
  public find = async (
      request: Request,
      response: Response,
      next: NextFunction) => {
    this._request = request;
    this._response = response;
    try {
      const merchantDocumentRepositoryOptions: RepositoryParameter =
        new RepositoryParameter(
            'merchant document',
            MerchantDocument,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const page: any = request.query.page;
      const size: any = request.query.size;
      const merchnatDocumentRepository: MerchantDocuments =
        new MerchantDocuments(merchantDocumentRepositoryOptions);
      merchnatDocumentRepository.initializeAssociations();

      let merchantDocumentList: MerchantDocument[] =
        await merchnatDocumentRepository.find();
      if (merchantDocumentList.length !=0) {
        response.setHeader('Content-Type', 'application/json');
        merchantDocumentList = merchnatDocumentRepository
            .toJson(merchantDocumentList);
        const paginatedmerchantDocumentList =
        new Pagination().pagination(merchantDocumentList, page, size);
        new ResponseService()
            .sendSuccessResponse(response, paginatedmerchantDocumentList);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (error: any) {
      next(error);
    }
  };

  /**
   * Get Merchant Documents
   * @param{Request} request
   * @param{Response} response
   * @param{NextFunction} next
   */
  public get = async (
      request: Request, response: Response, next: NextFunction) => {
    this._request = request;
    this._response = response;
    try {
      const merchantDocumentRepositoryOptions: RepositoryParameter =
        new RepositoryParameter(
            'merchant document',
            MerchantDocument,
            this._dataBaseName,
            'none',
            getConnection(this._dataBaseName),
        );
      const merchnatDocumentRepository: MerchantDocuments =
        new MerchantDocuments(merchantDocumentRepositoryOptions);
      const id: string = request.params.id;
      let merchnatDocument: MerchantDocument[] =
        await merchnatDocumentRepository
            .get(id);
      if (merchnatDocument && merchnatDocument.length != 0) {
        merchnatDocument =
          merchnatDocumentRepository.toJson(merchnatDocument);
        new ResponseService()
            .sendSuccessResponse(response, merchnatDocument);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (error: any) {
      next(error);
    }
  };
}


