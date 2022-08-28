import {BusinessSectorsController} from
  '../controller/BusinessSectorsController';
import {BusinessSectorsValidation} from
  '../validation/BusinessSectorsValidation';
import {AppRoute} from './AppRoute';

/**
 * BusinessSectorsRoute
 * @class
 */
export class BusinessSectorsRoute extends AppRoute {
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
    this._router.get(this._path, new BusinessSectorsController().find);
    this._router.get(this._path + '/:code',
        new BusinessSectorsValidation('Business Sectors')
            .paramValidateChain,
        new BusinessSectorsValidation('Business Sectors')
            .validationErrorHandle,
        new BusinessSectorsController().get);
  }
}
