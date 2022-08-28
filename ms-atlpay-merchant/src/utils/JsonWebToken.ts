import * as jwt from 'jsonwebtoken';
import {jwtSecretKey} from '../../config/bootstrap';
import {JWT, Payload} from '../interface/types/jwt';
/**
 * Json web token class for managing JWT
 * @class{JsonWebToken}
 */
export class JsonWebToken {
  /**
   * Generate JWT
   * @param{Payload} payload
   * @return{JWT}
   */
  public generateAccessToken =
    (payload: Payload): JWT => {
      const secret: any = jwtSecretKey;
      const algorithm: jwt.Algorithm = 'HS256';
      const accessToken: string =
        jwt.sign(payload, secret, {expiresIn: '1h', algorithm: algorithm});
      const jwtaccessToken: JWT =
        {access_token: accessToken, token_type: 'jwt', expire_in: '3600'};
      return jwtaccessToken;
    };
  /**
  * Verify JWT
  * @param{string} accessToken
  * @return{string | jwt.JwtPayload}
  */
  public verifyAccessToken =
    (accessToken: string): string | jwt.JwtPayload => {
      try {
        const secret: any = jwtSecretKey;
        const decode: string | jwt.JwtPayload = jwt.verify(accessToken, secret);
        return decode;
      } catch (error) {
        throw error;
      }
    };
  /**
  * Refresh JWT
  * @param{string} oldAccessToken
  * @return{string}
  */
  public refreshAccessToken =
    (oldAccessToken: string): JWT => {
      try {
        const payload: any = this.verifyAccessToken(oldAccessToken);
        const newpayLoad: Payload =
        {
          user_id: payload.user_id,
          user_access_role_id: payload.accessId,
          user_email: payload.user_email,
        };
        const newAccessToken: JWT = this.generateAccessToken(newpayLoad);
        return newAccessToken;
      } catch (error) {
        throw error;
      }
    };
}
