import {getConnection} from 'typeorm';
import {ormDBName} from '../bootstrap';
import {RepositoryParameter} from '../../src/model/repository/AppRepository';
import {DocumentRejectReason}
  from '../../src/model/entity/DocumentRejectReason';
import {DocumentRejectReasons}
  from '../../src/model/repository/DocumentRejectReasons';

/**
 * Document Reject Reason Seed
 * @class
 */
export class DocumentRejectReasonSeed {
  /**
   * Run Method.
   * Write your database seeder using this method.
   * @return{void}
   */
  public async run(): Promise<void> {
    try {
      const dbName: any = ormDBName;
      const DocumentRejectReasonParameter: RepositoryParameter =
        new RepositoryParameter(
            'DocumentRejectReason',
            DocumentRejectReason,
            dbName,
            'none',
            getConnection(dbName),
        );
      const documentRejectReasonRepo: DocumentRejectReasons =
        new DocumentRejectReasons(DocumentRejectReasonParameter);
      documentRejectReasonRepo.initializeAssociations();

      let documentRejectReason: DocumentRejectReason =
        documentRejectReasonRepo.newEntity();
      documentRejectReason.code = 'CENSORED';
      documentRejectReason.title =
        'Part or all of the information is censored/cut out of the document.';
      documentRejectReason.displayOrder = 1;
      documentRejectReason.requireNote = true;
      let createDocumentRejectReason =
        await documentRejectReasonRepo.exists({_code: 'CENSORED'});
      if (createDocumentRejectReason === false) {
        await documentRejectReasonRepo.save(documentRejectReason);
      }

      documentRejectReason = documentRejectReasonRepo.newEntity();
      documentRejectReason.code = 'INCOMPLETE';
      documentRejectReason.title =
        `The document was not entirely submitted
        (missing pages, scan/picture not centered).`;
      documentRejectReason.displayOrder = 2;
      documentRejectReason.requireNote = true;
      createDocumentRejectReason =
        await documentRejectReasonRepo.exists({_code: 'INCOMPLETE'});
      if (createDocumentRejectReason === false) {
        await documentRejectReasonRepo.save(documentRejectReason);
      }

      documentRejectReason = documentRejectReasonRepo.newEntity();
      documentRejectReason.code = 'UNREADABLE';
      documentRejectReason.title =
        `An integral part of the document is unreadable
        (dark or blurry document).`;
      documentRejectReason.displayOrder = 3;
      documentRejectReason.requireNote = true;
      createDocumentRejectReason =
        await documentRejectReasonRepo.exists({_code: 'UNREADABLE'});
      if (createDocumentRejectReason === false) {
        await documentRejectReasonRepo.save(documentRejectReason);
      }

      documentRejectReason = documentRejectReasonRepo.newEntity();
      documentRejectReason.code = 'BAD_QUALITY';
      documentRejectReason.title = 'The scan or picture is of bad quality.';
      documentRejectReason.displayOrder = 4;
      documentRejectReason.requireNote = true;
      createDocumentRejectReason =
        await documentRejectReasonRepo.exists({_code: 'BAD_QUALITY'});
      if (createDocumentRejectReason === false) {
        await documentRejectReasonRepo.save(documentRejectReason);
      }

      documentRejectReason = documentRejectReasonRepo.newEntity();
      documentRejectReason.code = 'SINGLE_FACE_SUBMITTED';
      documentRejectReason.title =
        'Only one face of the document is submitted.';
      documentRejectReason.displayOrder = 5;
      documentRejectReason.requireNote = true;
      createDocumentRejectReason =
        await documentRejectReasonRepo.exists({_code: 'SINGLE_FACE_SUBMITTED'});
      if (createDocumentRejectReason === false) {
        await documentRejectReasonRepo.save(documentRejectReason);
      }

      documentRejectReason = documentRejectReasonRepo.newEntity();
      documentRejectReason.code = 'ISSUE_WITH_MRZ';
      documentRejectReason.title =
        `The MRZ (machine-readable zone)
        band is partially or totally cut out or masked.`;
      documentRejectReason.displayOrder = 6;
      documentRejectReason.requireNote = true;
      createDocumentRejectReason =
        await documentRejectReasonRepo.exists({_code: 'ISSUE_WITH_MRZ'});
      if (createDocumentRejectReason === false) {
        await documentRejectReasonRepo.save(documentRejectReason);
      }

      documentRejectReason = documentRejectReasonRepo.newEntity();
      documentRejectReason.code = 'INFO_DOES_NOT_MATCH';
      documentRejectReason.title =
        `Information on the document doesn\'t 
        match the data entered in the system.`;
      documentRejectReason.displayOrder = 7;
      documentRejectReason.requireNote = true;
      createDocumentRejectReason =
        await documentRejectReasonRepo.exists({_code: 'INFO_DOES_NOT_MATCH'});
      if (createDocumentRejectReason === false) {
        await documentRejectReasonRepo.save(documentRejectReason);
      }

      documentRejectReason = documentRejectReasonRepo.newEntity();
      documentRejectReason.code = 'UNSUPPORTED_LANGUAGE';
      documentRejectReason.title =
        'The document is in a language not supported.';
      documentRejectReason.displayOrder = 8;
      documentRejectReason.requireNote = true;
      createDocumentRejectReason =
        await documentRejectReasonRepo.exists({_code: 'UNSUPPORTED_LANGUAGE'});
      if (createDocumentRejectReason === false) {
        await documentRejectReasonRepo.save(documentRejectReason);
      }

      documentRejectReason = documentRejectReasonRepo.newEntity();
      documentRejectReason.code = 'UNSUPPORTED_DOCUMENT';
      documentRejectReason.title = 'The document is not accepted.';
      documentRejectReason.displayOrder = 9;
      documentRejectReason.requireNote = true;
      createDocumentRejectReason =
        await documentRejectReasonRepo.exists({_code: 'UNSUPPORTED_DOCUMENT'});
      if (createDocumentRejectReason === false) {
        await documentRejectReasonRepo.save(documentRejectReason);
      }

      documentRejectReason = documentRejectReasonRepo.newEntity();
      documentRejectReason.code = 'EMPTY_DOCUMENT';
      documentRejectReason.title = 'The document is empty.';
      documentRejectReason.displayOrder = 10;
      documentRejectReason.requireNote = true;
      createDocumentRejectReason =
        await documentRejectReasonRepo.exists({_code: 'EMPTY_DOCUMENT'});
      if (createDocumentRejectReason === false) {
        await documentRejectReasonRepo.save(documentRejectReason);
      }

      documentRejectReason = documentRejectReasonRepo.newEntity();
      documentRejectReason.code = 'EXPIRED';
      documentRejectReason.title =
        'The document has reached its expiration date.';
      documentRejectReason.displayOrder = 11;
      documentRejectReason.requireNote = true;
      createDocumentRejectReason =
        await documentRejectReasonRepo.exists({_code: 'EXPIRED'});
      if (createDocumentRejectReason === false) {
        await documentRejectReasonRepo.save(documentRejectReason);
      }

      documentRejectReason = documentRejectReasonRepo.newEntity();
      documentRejectReason.code = 'FALSIFIED';
      documentRejectReason.title =
        `The document has been verified as falsified by our operator.
        Another document has to be submitted.`;
      documentRejectReason.displayOrder = 12;
      documentRejectReason.requireNote = true;
      createDocumentRejectReason =
        await documentRejectReasonRepo.exists({_code: 'FALSIFIED'});
      if (createDocumentRejectReason === false) {
        await documentRejectReasonRepo.save(documentRejectReason);
      }

      console.log('DocumentRejectReasonSeed Inserted Successfully');
    } catch (error) {
      console.log(error);
    }
  }
}
