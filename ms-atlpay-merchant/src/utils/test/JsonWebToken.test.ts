import {JsonWebTokenError} from 'jsonwebtoken';
import {JWT, Payload} from '../../interface/types/jwt';
import {JsonWebToken} from '../JsonWebToken';

describe('Test cases for generating JWT token', ()=>{
  const jwt = new JsonWebToken();
  test('Generate Valid JWT token', ()=>{
    const testPayLoad : Payload ={
      user_id: 'test',
      user_access_role_id: 2,
      user_email: 'test@test.com',
    };
    const token : JWT = jwt.generateAccessToken(testPayLoad);
    expect(token).toBeDefined();
    expect(token.token_type).toEqual('jwt');
    expect(token.expire_in).toEqual('3600');
  });
});

describe('Test cases for validating JWT token', ()=>{
  const jwt = new JsonWebToken();
  test('Verify JWT with valid token', ()=>{
    const testPayLoad : Payload ={
      user_id: 'test',
      user_access_role_id: 2,
      user_email: 'test@test.com',
    };
    const token : JWT = jwt.generateAccessToken(testPayLoad);
    const decode : any = jwt.verifyAccessToken(token.access_token);
    expect(decode).toBeDefined();
    expect(decode.user_id).toEqual('test');
    expect(decode.user_email).toEqual('test@test.com');
    expect(Object.keys(decode).length).toBeGreaterThan(0);
    expect(Object.keys(decode).length).toStrictEqual(5);
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
  const jwt = new JsonWebToken();
  test('Test case to refresh token', ()=>{
    const testPayLoad : Payload ={
      user_id: 'test',
      user_access_role_id: 2,
      user_email: 'test@test.com',
    };
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
