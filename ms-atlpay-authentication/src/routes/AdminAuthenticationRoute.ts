import {AdminAuthenticationController}
  from '../controller/AdminAuthenticationController';
import {DeviceController} from '../controller/DeviceController';
import {AdminLoginLogController} from '../controller/AdminLoginLogController';
import {TwoFactorAuthController} from '../controller/TwoFactorAuthController';
import {AdminAuthenticationValidation}
  from '../validation/AdminAuthenticationValidation';
import {AppRoute} from './AppRoute';
import {AdminDeviceController} from '../controller/AdminDeviceController';
import {AdminResetPasswordController}
  from '../controller/AdminResetPasswordController';
import {AdminAccessControlMiddleware}
  from '../middleware/AdminAccessControlMiddleware';
import {AppPlatformMiddleware} from '../middleware/AppPlatformMiddleware';

/**
 * AminRoute class
 * @class
 * @extends
 */
export class AdminAuthenticationRoute extends AppRoute {
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
    this._router.get(this._path,
        new AdminAccessControlMiddleware().verifyToken,
        new AdminAuthenticationController().find);

    this._router.get(this._path+ '/logout',
        new AdminAccessControlMiddleware().verifyToken,
        new AdminLoginLogController().logout);

    this._router.get(this._path + '/:id',
        new AdminAccessControlMiddleware().verifyToken,
        new AdminAuthenticationValidation('AdminAuthentication Validation')
            .paramValidateChain,
        new AdminAuthenticationValidation('AdminAuthentication Validation')
            .validationErrorHandle,
        new AdminAuthenticationController().get);

    this._router.post(this._path + '/create',
        new AdminAccessControlMiddleware().verifyToken,
        new AdminAuthenticationValidation('AdminAuthentication Validation')
            .validationChain,
        new AdminAuthenticationValidation('AdminAuthentication Validation')
            .validationErrorHandle,
        new DeviceController().create,
        new AdminAuthenticationController().create,
    );

    this._router.post(this._path + '/login',
        new AdminAuthenticationValidation('AdminAuthentication Validation')
            .loginValidationChain,
        new AdminAuthenticationValidation('AdminAuthentication Validation')
            .validationErrorHandle,
        new DeviceController().create,
        new AdminAuthenticationController().login,
        new AdminDeviceController().create,
        new AdminLoginLogController().create,
        new TwoFactorAuthController().create);

    this._router.put(this._path + '/:id',
        new AdminAccessControlMiddleware().verifyToken,
        new AdminAuthenticationValidation('AdminAuthentication Validation')
            .paramValidateChain,
        new AdminAuthenticationValidation('AdminAuthentication Validation')
            .updateValidationChain,
        new AdminAuthenticationValidation('AdminAuthentication Validation')
            .validationErrorHandle,
        new AdminAuthenticationController().update);

    this._router.put(this._path + '/:id/password/change',
        new AdminAccessControlMiddleware().verifyToken,
        new AdminAuthenticationValidation('AdminAuthentication Validation')
            .paramValidateChain,
        new AdminAuthenticationValidation('AdminAuthentication Validation')
            .updatePasswordValidationChain,
        new AdminAuthenticationValidation('AdminAuthentication Validation')
            .validationErrorHandle,
        new AdminAuthenticationController().changePassword);

    this._router.put(this._path + '/password/forget',
        new AdminAuthenticationValidation('AdminAuthentication Validation')
            .emailValidateChain,
        new AdminAuthenticationValidation('AdminAuthentication Validation')
            .validationErrorHandle,
        new AdminAuthenticationController().checkAdminStatus,
        new AdminResetPasswordController().createResetPasswordToken,
        new AdminResetPasswordController().sendResetPasswordMail);

    this._router.put(this._path + '/password/reset/:token',
        new AdminResetPasswordController().checkResetToken,
        new AdminAuthenticationValidation('AdminAuthentication Validation')
            .updatePasswordValidationChain,
        new AdminAuthenticationValidation('AdminAuthentication Validation')
            .validationErrorHandle,
        new AdminAuthenticationController().resetPassword,
        new AdminResetPasswordController().changeTokenStatus,
    );

    this._router.put(this._path + '/:id/block',
        new AdminAccessControlMiddleware().verifyToken,
        new AdminAuthenticationValidation('AdminAuthentication Validation')
            .blockUntilValidationChain,
        new AdminAuthenticationValidation('AdminAuthentication Validation')
            .validationErrorHandle,
        new AdminAuthenticationController().blockAdmin);

    this._router.put(this._path + '/:id/unblock',
        new AdminAccessControlMiddleware().verifyToken,
        new AdminAuthenticationController().unBlockAdmin);

    this._router.put(this._path + '/:id/suspend',
        new AdminAccessControlMiddleware().verifyToken,
        new AdminAuthenticationController().suspend);

    this._router.get(this._path + '/email/:email/exist',
        new AdminAccessControlMiddleware().verifyToken,
        new AdminAuthenticationValidation('AdminAuthentication Validation')
            .checkEmailExistsValidatationChain,
        new AdminAuthenticationValidation('AdminAuthentication Validation')
            .validationErrorHandle,
        new AdminAuthenticationController().checkEmailExist);

    this._router.use(this._path + '/jwt/verify',
        new AdminAuthenticationController().verifyJWToken);

    this._router.use(this._path + '/token/jwt/verify',
        new AppPlatformMiddleware().appPlatform,
        new AdminAuthenticationController().verifyJWToken);
  }
}
