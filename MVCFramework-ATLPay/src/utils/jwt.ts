import * as jwt from 'jsonwebtoken';
import {jwtSecretKey} from '../../config/bootstrap';
import {JWT, Payload} from '../interface/types/jwt';
/**
 * Generate JWT.
 * @param{Payload} payload
 * @return{JWT}
 */
export const generateAccessToken =
    (payload: Payload): JWT=>{
      const secret: any= jwtSecretKey;
      const algorithm : jwt.Algorithm = 'HS256';
      const accessToken: string =
        jwt.sign(payload, secret, {expiresIn: '1h', algorithm: algorithm});
      const jwtaccessToken : JWT =
        {access_token: accessToken, token_type: 'jwt', expire_in: '3600'};
      return jwtaccessToken;
    };
/**
 * Verify JWT
 * @param{string} accessToken
 * @return{string | jwt.JwtPayload}
 */
export const verifyAccessToken=
    (accessToken: string): string | jwt.JwtPayload=>{
      try {
        const secret : any = jwtSecretKey;
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
export const refreshAccessToken =
    (oldAccessToken: string): JWT =>{
      try {
        const payload : any= verifyAccessToken(oldAccessToken);
        const newpayLoad : Payload =
            {user_id: payload.user_id, user_email: payload.user_email};
        const newAccessToken: JWT = generateAccessToken(newpayLoad);
        return newAccessToken;
      } catch (error) {
        throw error;
      }
    };
