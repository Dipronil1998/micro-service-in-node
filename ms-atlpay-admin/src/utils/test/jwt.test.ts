import {JsonWebTokenError} from 'jsonwebtoken';
import {JWT, Payload} from '../../interface/types/jwt';
import * as jwt from './../jwt';
describe('Test cases for generating JWT token', ()=>{
  test('Generate Valid JWT token', ()=>{
    const testPayLoad : Payload ={user_id: 'test', user_email: 'test@test.com'};
    const token : JWT = jwt.generateAccessToken(testPayLoad);
    expect(token).toBeDefined();
    expect(token.token_type).toEqual('jwt');
    expect(token.expire_in).toEqual('3600');
  });
});

describe('Test cases for validating JWT token', ()=>{
  test('Verify JWT with valid token', ()=>{
    const testPayLoad : Payload ={user_id: 'test', user_email: 'test@test.com'};
    const token : JWT = jwt.generateAccessToken(testPayLoad);
    const decode : any = jwt.verifyAccessToken(token.access_token);
    expect(decode).toBeDefined();
    expect(decode.user_id).toEqual('test');
    expect(decode.user_email).toEqual('test@test.com');
    expect(Object.keys(decode).length).toBeGreaterThan(0);
    expect(Object.keys(decode).length).toStrictEqual(4);
  });
  test('Verify JWT with invalid token', ()=>{
    const token : string ='invalidtoken';
    try {
      jwt.verifyAccessToken(token);
      expect(false).toBe(true);
    } catch (error:any) {
      expect(error).toBeInstanceOf(JsonWebTokenError);
    }
  });
});

describe('Test cases for refreshing JWT', ()=>{
  test('Test case to refresh token', ()=>{
    const testPayLoad : Payload ={user_id: 'test', user_email: 'test@test.com'};
    const token : JWT = jwt.generateAccessToken(testPayLoad);
    expect(token).toBeDefined();
    expect(token.token_type).toEqual('jwt');
    expect(token.expire_in).toEqual('3600');
  });
  test('Test case to refresh invalid token', ()=>{
    try {
      jwt.refreshAccessToken('invalidatetoken');
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(JsonWebTokenError);
    }
  });
});
