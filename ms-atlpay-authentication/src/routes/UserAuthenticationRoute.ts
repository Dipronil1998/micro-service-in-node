import {DeviceController} from '../controller/DeviceController';
import {ResetPasswordController} from '../controller/ResetPasswordController';
import {TwoFactorAuthController} from '../controller/TwoFactorAuthController';
import {UserAuthenticationController}
  from '../controller/UserAuthenticationController';
import {UserDeviceController} from '../controller/UserDeviceController';
import {UserLoginLogController} from '../controller/UserLoginLogController';
import {AppPlatformMiddleware} from '../middleware/AppPlatformMiddleware';
import {UserAuthenticationValidation}
  from '../validation/UserAuthenticationValidation';
import {AppRoute} from './AppRoute';

/**
 * UserRoute class
 * @class
 */
export class UserAuthenticationRoute extends AppRoute {
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
    this._router.post(this._path + '/signup',
        new UserAuthenticationValidation('UserAuthentication validator')
            .validationChain,
        new UserAuthenticationValidation('UserAuthentication validator')
            .validationErrorHandle,
        new DeviceController().create,
        new UserAuthenticationController().signup,
        new UserDeviceController().create,
        new UserLoginLogController().create);

    this._router.post(this._path + '/login',
        new UserAuthenticationValidation('UserLoginAuthentication validator')
            .loginValidationChain,
        new UserAuthenticationValidation('UserLoginAuthentication validator')
            .validationErrorHandle,
        new DeviceController().create,
        new UserAuthenticationController().login,
        new UserDeviceController().create,
        new UserLoginLogController().create,
        new TwoFactorAuthController().create);

    this._router.get(this._path,
        new UserAuthenticationController().find);

    this._router.get(this._path + '/:id',
        new UserAuthenticationValidation('UserLoginAuthentication validator')
            .paramValidateChain,
        new UserAuthenticationValidation('UserLoginAuthentication validator')
            .validationErrorHandle,
        new UserAuthenticationController().get);

    this._router.put(this._path + '/:id',
        new UserAuthenticationValidation('UserUpdateAuthentication validator')
            .paramValidateChain,
        new UserAuthenticationValidation('UserUpdateAuthentication validator')
            .updateValidationChain,
        new UserAuthenticationValidation('UserUpdateAuthentication validator')
            .validationErrorHandle,
        new UserAuthenticationController().update);

    this._router.put(this._path + '/:id/password/change',
        new UserAuthenticationValidation('UserAuthentication Validation')
            .paramValidateChain,
        new UserAuthenticationValidation('UserAuthentication Validation')
            .updatePasswordValidationChain,
        new UserAuthenticationValidation('UserAuthentication Validation')
            .validationErrorHandle,
        new UserAuthenticationController().changePassword);

    this._router.put(this._path + '/password/forget',
        new UserAuthenticationValidation('UserAuthentication Validation')
            .emailValidateChain,
        new UserAuthenticationValidation('UserAuthentication Validation')
            .validationErrorHandle,
        new UserAuthenticationController().checkUserStatus,
        new ResetPasswordController().createResetPasswordToken,
        new ResetPasswordController().sendResetPasswordMail);

    this._router.put(this._path + '/password/reset/:token',
        new ResetPasswordController().checkResetToken,
        new UserAuthenticationValidation('UserAuthentication Validation')
            .updatePasswordValidationChain,
        new UserAuthenticationValidation('UserAuthentication Validation')
            .validationErrorHandle,
        new UserAuthenticationController().resetPassword,
        new ResetPasswordController().changeTokenStatus,
    );

    this._router.use(this._path + '/jwt/verify',
        new UserAuthenticationController().verifyJWToken);
    this._router.use(this._path + '/token/jwt/verify',
        new AppPlatformMiddleware().appPlatform,
        new UserAuthenticationController().verifyJWToken);

    this._router.put(this._path + '/:id/block',
        new UserAuthenticationValidation('UserAuthentication Validation')
            .blockUntilValidationChain,
        new UserAuthenticationValidation('UserAuthentication Validation')
            .validationErrorHandle,
        new UserAuthenticationController().blockUser);

    this._router.put(this._path + '/:id/unblock',
        new UserAuthenticationController().unBlockUser);

    this._router.put(this._path + '/:id/suspend',
        new UserAuthenticationController().suspend);

    this._router.get(this._path + '/email/:email/exist',
        new UserAuthenticationValidation('UserLoginAuthentication validator')
            .checkEmailExistsValidatationChain,
        new UserAuthenticationValidation('UserLoginAuthentication validator')
            .validationErrorHandle,
        new UserAuthenticationController().checkEmailExist);

    this._router.get(this._path + '/username/:username/exist',
        new UserAuthenticationController().checkUserNameExist);
  }
}
