import {CountryController} from '../controller/CountryController';
import {CountryValidator} from '../validation/CountryValidator';
import {AppRoute} from './AppRoute';

/**
 * CountryRoute class
 * @class
 * @extends
 */
export class CountryRoute extends AppRoute {
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
    this._router.get(this._path+'/ip/current',
        new CountryController('country').findCurrentCountryByIP);

    this._router.get(this._path,
        new CountryController('Country Controller').findBasedOnStatus);

    this._router.get(this._path,
        new CountryController('country').find);

    this._router.put(this._path + '/changestatus',
        new CountryValidator('country validator').blockUnblockvalidationChain,
        new CountryValidator('country validator').validationErrorHandle,
        new CountryController('country').blockOrUnblockCountry);

    this._router.put(this._path + '/changestatus/country',
        new CountryController('country').blockOrUnblockMultipleCountry);

    this._router.get(this._path + '/:iso_numeric',
        new CountryValidator('country validator').paramValidateChain,
        new CountryValidator('country validator').validationErrorHandle,
        new CountryController('country').get);

    this._router.post(this._path,
        new CountryValidator('country validator').validationChain,
        new CountryValidator('country validator').validationErrorHandle,
        new CountryController('country').save);

    this._router.put(this._path + '/:iso_numeric',
        new CountryValidator('country validator').updateValidateChain,
        new CountryValidator('country validator').validationErrorHandle,
        new CountryController('country').update);

    this._router.delete(this._path + '/:iso_numeric',
        new CountryController('country').delete);
  }
}
