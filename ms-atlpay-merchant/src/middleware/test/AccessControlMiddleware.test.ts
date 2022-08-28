import {NextFunction, Request, Response} from 'express';
import Sinon from 'sinon';
import {AccessControlMiddleware} from '../AccessControlMiddleware';

describe('Test cases of Merchant access control middleware', ()=>{
  test('Test cases for successful Merchant access', async ()=>{
    const accessControlMiddleware : AccessControlMiddleware =
        new AccessControlMiddleware();
    Sinon.createSandbox().stub(
        accessControlMiddleware,
        'verifyAccessRole')
        .resolves(true);
    const request: Partial<Request> = {};
    const response : Partial<Response> = {};
    const nextFunction : Partial<NextFunction> = jest.fn();

    await accessControlMiddleware.verifyMerchantAccess(
        // @ts-ignore
        request,
        response,
        nextFunction);
    expect(nextFunction).toHaveBeenCalled();
    expect(nextFunction).toBeCalledWith();
    expect(nextFunction).toBeCalledTimes(1);
  });

  test('Test cases for invalid Merchant access', async ()=>{
    const accessControlMiddleware : AccessControlMiddleware =
        new AccessControlMiddleware();
    Sinon.createSandbox().stub(
        accessControlMiddleware,
        'verifyAccessRole')
        .resolves(false);
    const request: Partial<Request> = {};
    const response : Partial<Response> = {};
    const nextFunction : Partial<NextFunction> = jest.fn();
    // @ts-ignore
    await accessControlMiddleware.verifyMerchantAccess(request,
        response,
        nextFunction);
    expect(nextFunction).toHaveBeenCalled();
    expect(nextFunction).toBeCalledTimes(1);
    expect(nextFunction).toBeCalledWith(false);
  });

  test('Test cases for Invalid Merchant access with error', async ()=>{
    const accessControlMiddleware : AccessControlMiddleware =
        new AccessControlMiddleware();
    const error = new Error('Fake error');
    Sinon.createSandbox().stub(
        accessControlMiddleware,
        'verifyAccessRole').throws(error);
    const request: Partial<Request> = {};
    const response : Partial<Response> = {};
    const nextFunction : Partial<NextFunction> = jest.fn();

    await accessControlMiddleware.verifyMerchantAccess(
        // @ts-ignore
        request,
        response,
        nextFunction);
    expect(nextFunction).toHaveBeenCalled();
    expect(nextFunction).toBeCalledTimes(1);
    expect(nextFunction).toBeCalledWith(error);
  });

  afterAll(()=>{
    Sinon.createSandbox().restore();
  });
});


describe('Test cases of Merchant, Admin access control middleware', ()=>{
  test('Test cases for successful Merchant, Admin access', async ()=>{
    const accessControlMiddleware : AccessControlMiddleware =
        new AccessControlMiddleware();
    Sinon.createSandbox().stub(
        accessControlMiddleware,
        'verifyAccessRole').resolves(true);
    const request: Partial<Request> = {};
    const response : Partial<Response> = {};
    const nextFunction : Partial<NextFunction> = jest.fn();

    await accessControlMiddleware.
        verifyMerchantAndAdminAccess(
        // @ts-ignore
            request,
            response,
            nextFunction);
    expect(nextFunction).toHaveBeenCalled();
    expect(nextFunction).toBeCalledWith();
    expect(nextFunction).toBeCalledTimes(1);
  });

  test('Test cases for invalid Merchant, Admin access', async ()=>{
    const accessControlMiddleware : AccessControlMiddleware =
        new AccessControlMiddleware();
    Sinon.createSandbox().stub(
        accessControlMiddleware,
        'verifyAccessRole')
        .resolves(false);
    const request: Partial<Request> = {};
    const response : Partial<Response> = {};
    const nextFunction : Partial<NextFunction> = jest.fn();

    await accessControlMiddleware.verifyMerchantAndAdminAccess(
        // @ts-ignore
        request,
        response,
        nextFunction);
    expect(nextFunction).toHaveBeenCalled();
    expect(nextFunction).toBeCalledTimes(1);
    expect(nextFunction).toBeCalledWith(false);
  });

  test('Test cases for Invalid Merchant, Admin access', async ()=>{
    const accessControlMiddleware : AccessControlMiddleware =
        new AccessControlMiddleware();
    const error = new Error('Fake error');
    Sinon.createSandbox().stub(
        accessControlMiddleware,
        'verifyAccessRole').throws(error);
    const request: Partial<Request> = {};
    const response : Partial<Response> = {};
    const nextFunction : Partial<NextFunction> = jest.fn();
    // @ts-ignore
    await accessControlMiddleware.verifyMerchantAndAdminAccess(
        // @ts-ignore
        request,
        response,
        nextFunction);
    expect(nextFunction).toHaveBeenCalled();
    expect(nextFunction).toBeCalledTimes(1);
    expect(nextFunction).toBeCalledWith(error);
  });

  afterAll(()=>{
    Sinon.createSandbox().restore();
  });
});

describe('Test cases of Super admin access control middleware', ()=>{
  test('Test cases for successful  Super admin access', async ()=>{
    const accessControlMiddleware : AccessControlMiddleware =
        new AccessControlMiddleware();
    Sinon.createSandbox().stub(
        accessControlMiddleware,
        'verifyAccessRole').resolves(true);
    const request: Partial<Request> = {};
    const response : Partial<Response> = {};
    const nextFunction : Partial<NextFunction> = jest.fn();

    await accessControlMiddleware.verifySuperAdminAccess(
        // @ts-ignore
        request,
        response,
        nextFunction);
    expect(nextFunction).toHaveBeenCalled();
    expect(nextFunction).toBeCalledWith();
    expect(nextFunction).toBeCalledTimes(1);
  });

  test('Test cases for invalid  Super admin access', async ()=>{
    const accessControlMiddleware : AccessControlMiddleware =
        new AccessControlMiddleware();
    Sinon.createSandbox().stub(
        accessControlMiddleware,
        'verifyAccessRole')
        .resolves(false);
    const request: Partial<Request> = {};
    const response : Partial<Response> = {};
    const nextFunction : Partial<NextFunction> = jest.fn();

    await accessControlMiddleware.verifySuperAdminAccess(
        // @ts-ignore
        request,
        response,
        nextFunction);
    expect(nextFunction).toHaveBeenCalled();
    expect(nextFunction).toBeCalledTimes(1);
    expect(nextFunction).toBeCalledWith(false);
  });

  test('Test cases for Invalid  Super admin access', async ()=>{
    const accessControlMiddleware : AccessControlMiddleware =
        new AccessControlMiddleware();
    const error = new Error('Fake error');
    Sinon.createSandbox().stub(
        accessControlMiddleware,
        'verifyAccessRole').throws(error);
    const request: Partial<Request> = {};
    const response : Partial<Response> = {};
    const nextFunction : Partial<NextFunction> = jest.fn();

    await accessControlMiddleware.verifySuperAdminAccess(
        // @ts-ignore
        request,
        response,
        nextFunction);
    expect(nextFunction).toHaveBeenCalled();
    expect(nextFunction).toBeCalledTimes(1);
    expect(nextFunction).toBeCalledWith(error);
  });

  afterAll(()=>{
    Sinon.createSandbox().restore();
  });
});


describe('Test cases of admin access control middleware', ()=>{
  test('Test cases for successful admin access', async ()=>{
    const accessControlMiddleware : AccessControlMiddleware =
        new AccessControlMiddleware();
    Sinon.createSandbox().stub(
        accessControlMiddleware,
        'verifyAccessRole').resolves(true);
    const request: Partial<Request> = {};
    const response : Partial<Response> = {};
    const nextFunction : Partial<NextFunction> = jest.fn();

    await accessControlMiddleware.verifyAdminAccess(
        // @ts-ignore
        request,
        response,
        nextFunction);
    expect(nextFunction).toHaveBeenCalled();
    expect(nextFunction).toBeCalledWith();
    expect(nextFunction).toBeCalledTimes(1);
  });

  test('Test cases for invalid admin access', async ()=>{
    const accessControlMiddleware : AccessControlMiddleware =
        new AccessControlMiddleware();
    Sinon.createSandbox().stub(
        accessControlMiddleware,
        'verifyAccessRole').resolves(false);
    const request: Partial<Request> = {};
    const response : Partial<Response> = {};
    const nextFunction : Partial<NextFunction> = jest.fn();

    await accessControlMiddleware.verifyAdminAccess(
        // @ts-ignore
        request,
        response,
        nextFunction);
    expect(nextFunction).toHaveBeenCalled();
    expect(nextFunction).toBeCalledTimes(1);
    expect(nextFunction).toBeCalledWith(false);
  });

  test('Test cases for Invalid admin access', async ()=>{
    const accessControlMiddleware : AccessControlMiddleware =
        new AccessControlMiddleware();
    const error = new Error('Fake error');
    Sinon.createSandbox().stub(
        accessControlMiddleware,
        'verifyAccessRole').throws(error);
    const request: Partial<Request> = {};
    const response : Partial<Response> = {};
    const nextFunction : Partial<NextFunction> = jest.fn();

    await accessControlMiddleware.verifyAdminAccess(
        // @ts-ignore
        request,
        response,
        nextFunction);
    expect(nextFunction).toHaveBeenCalled();
    expect(nextFunction).toBeCalledTimes(1);
    expect(nextFunction).toBeCalledWith(error);
  });

  afterAll(()=>{
    Sinon.createSandbox().restore();
  });
});
