import fileUpload from 'express-fileupload';
import {fileSize} from '../../config/bootstrap';
import {BusinessBankDetailController} from
  '../controller/BusinessBankDetailController';
import {BusinessOwnerController} from '../controller/BusinessOwnerController';
import {BusinessRepresentativeController} from
  '../controller/BusinessRepresentativeController';
import {MerchantBusinessProfileController} from
  '../controller/MerchantBusinessProfileController';
import {MerchantController} from '../controller/MerchantController';
import {MerchantDocumentController} from
  '../controller/MerchantDocumentController';
import {MerchantWalletController} from '../controller/MerchantWalletController';
import {FileSizeLimitAndExtensionHandler} from
  '../middleware/FileSizeLimitAndExtensionHandler';
import {BusinessBankDetailValidation} from
  '../validation/BusinessBankDetailValidation';
import {BusinessOwnerValidation} from '../validation/BusinessOwnerValidation';
import {BusinessRepresentativeValidation} from
  '../validation/BusinessRepresentativeValidation';
import {MerchantBusinessProfileValidation} from
  '../validation/MerchantBusinessProfileValidation';
import {MerchantDocumentValidation} from
  '../validation/MerchantDocumentValidation';
import {MerchantValidation} from '../validation/MerchantValidation';
import {AppRoute} from './AppRoute';

/**
 * MerchantRoute
 * @class
 */
export class MerchantRoute extends AppRoute {
  /**
   * Constructor
   * @param{string} path
   */
  constructor(path: string) {
    super(path);
    this.initializeRoutes();
  }
  /**
   * Router method
   */
  private initializeRoutes() {
    this._router.get(this._path, new MerchantController().find);
    this._router.get(this._path + '/:merchantId/bank',
        new MerchantController().getBankDetailByMerchantId);
    this._router.get(this._path + '/:merchantId/business/:businessProfileId',
        new MerchantController().getBusinessProfileByMerchantId);
    this._router.get(this._path +
        '/:merchantId/business/:businessProfileId/bank/:bankId',
    new MerchantController().getBusinessBankDetailByBusinessProfileId);
    this._router.get(this._path + '/:id',
        new MerchantController().get);

    this._router.post(this._path,
        fileUpload({
          createParentPath: true,
          limits: {fileSize: fileSize},
          limitHandler: new FileSizeLimitAndExtensionHandler().limitHandler,
        }),
        new FileSizeLimitAndExtensionHandler().fileExtensionhandler,
        new BusinessRepresentativeValidation(`Business Representative 
          validator`).validationChain,
        new MerchantValidation('merchnant validatior').validationChain,
        new MerchantBusinessProfileValidation('busiess profile validatior')
            .validationChain,
        new BusinessOwnerValidation('Business owner validatior')
            .validationChain,
        new BusinessBankDetailValidation('Business bank details validator')
            .validationChain,
        new MerchantDocumentValidation('Merchant Document validator')
            .validationChain,
        new MerchantDocumentValidation('Merchant Document validator')
            .validationErrorHandle,
        new BusinessRepresentativeController().create,
        new MerchantController().create,
        new MerchantBusinessProfileController().create,
        new BusinessOwnerController().create,
        new BusinessBankDetailController().create,
        new MerchantDocumentController().create,
        new MerchantWalletController().create,
    );

    this._router.put(this._path+'/:id',
        new MerchantValidation('MerchantValidation').updateValidationChain,
        new MerchantValidation('MerchantValidation').validationErrorHandle,
        new MerchantController().update,
    );
    this._router.put(this._path+
        '/:merchantId/business/:businessId/businessowner',
    new BusinessOwnerValidation('BusinessOwnerValidation')
        .updateValidationChain,
    new BusinessOwnerValidation('BusinessOwnerValidation')
        .validationErrorHandle,
    new BusinessOwnerController().updateMerchantBusinesOwner,
    );

    this._router.get(this._path+'/:merchantId/business/:businessId/bank',
        new MerchantController().getMerchantBusinessBankDetails);

    this._router.get(this._path+'/:merchantId/business/:businessId/document',
        new MerchantController().getMerchantBusinessDocuments);

    this._router.get(this._path+
      '/:merchantId/business/:businessId/document/:documentId',
    new MerchantController().getMerchantBusinessDocumentsById);

    this._router.get(this._path+
      '/:merchantId/business/:businessId/businessowner',
    new MerchantController().getMerchantBusinesOwner);

    this._router.get(this._path+
      '/:merchantId/business/:businessId/businessowner/:businessOwnerId',
    new MerchantController().getMerchantBusinesOwnerById);

    this._router.get(this._path+
      '/:merchantId/business/:businessId/businessrepresentative',
    new MerchantController().getBusinessRepresentation);

    this._router.put(this._path+
      '/:merchantId/business/:businessId/businessrepresentative',
    new BusinessRepresentativeValidation('BusinessRepresentativeValidation')
        .updateValidationChain,
    new BusinessRepresentativeValidation('BusinessRepresentativeValidation')
        .validationErrorHandle,
    new MerchantBusinessProfileController().checkMerchantBusiness,
    new BusinessRepresentativeController().updateBusinessRepresentation,
    );

    this._router.put(this._path+
      '/:merchantId/business/:id',
    new MerchantBusinessProfileValidation(
        'MerchantBusinessProfileValidation')
        .updateValidationChain,
    new MerchantBusinessProfileValidation(
        'MerchantBusinessProfileValidation')
        .validationErrorHandle,
    new MerchantBusinessProfileController().updateByMerchantId);

    this._router.put(this._path+
      '/:merchantId/business/:businessId/bank/:id',
    new BusinessBankDetailValidation('Business Bank Detail Validation')
        .updateValidationChain,
    new BusinessBankDetailValidation('Business Bank Detail Validation')
        .validationErrorHandle,
    new MerchantBusinessProfileController().checkMerchantBusiness,
    new BusinessBankDetailController().updateMerchantIdBusinessId);

    this._router.put(this._path +
      '/:merchantId/business/:businessId/enable',
    new MerchantBusinessProfileController().enable);

    this._router.put(this._path +
      '/:merchantId/business/:businessId/disable',
    new MerchantBusinessProfileController().disable);

    this._router.put(this._path +
      '/:merchantId/enable',
    new MerchantController().enable);

    this._router.put(this._path +
      '/:merchantId/disable',
    new MerchantController().disable);
  }
}
