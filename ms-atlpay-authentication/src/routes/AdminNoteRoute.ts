import {AdminNoteController} from '../controller/AdminNoteController';
import {AdminNoteValidation} from '../validation/AdminNoteValidation';
import {AppRoute} from './AppRoute';

/**
 * Admin Note Route
 * @class
 * @extends{AppRoute}
 */
export class AdminNoteRoute extends AppRoute {
  /**
   * Constructor Method.
   * @param{string} path -Path
   */
  constructor(path: string) {
    super(path);
    this.initializeRoutes();
  }
  /**
   * Route Method
   */
  private initializeRoutes(): void {
    this._router.get(
        this._path + '/:id',
        new AdminNoteValidation('AdminNote Validation').paramValidateChain,
        new AdminNoteValidation('AdminNote Validation').validationErrorHandle,
        new AdminNoteController().get,
    );
  }
}
