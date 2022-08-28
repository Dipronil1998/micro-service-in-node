import {NextFunction, Request, Response} from 'express';
import {Middleware} from 'express-validator/src/base';
import {AppController} from '../AppController';

describe('Test Cases For AppController', ()=>{
  test('Create Instance of AppController', ()=>{
    const appController = new AppController('AppController');
    expect(appController instanceof AppController).toBe(true);
    expect(appController.name).toEqual('AppController');
    expect(appController).toBeDefined();
  });

  test('Getter Methods', ()=>{
    const name: string = 'name';
    const autoRender: boolean = true;
    const middleware: Array<any> = [];
    const appController = new AppController(name);
    expect(appController.name).toEqual(name);
    expect(appController.middlewares).toEqual(middleware);
    expect(appController.autoRender).toEqual(autoRender);
  });

  test('Setter Methods', ()=>{
    const name: string = 'name';
    // @ts-ignore
    const request: Partial<Request> = {request: 'request'};
    // @ts-ignore
    const response: Partial<Response> = {response: 'response'};
    const pagination: Array<any> = [1, 'string'];
    const autoRender: boolean = true;
    const middleware: Partial<Middleware> = async (req: Request,
        res: Response, next: NextFunction)=>{
      next();
    };
    const appController = new AppController(name);
    appController.name = name;
    // @ts-ignore
    appController.request = request;
    // @ts-ignore
    appController.response = response;
    appController.pagination = pagination;
    appController.autoRender = autoRender;
    // @ts-ignore
    appController.middlewares = middleware;
    expect(appController.name).toEqual(name);
    expect(appController.request).toEqual(request);
    expect(appController.response).toEqual(response);
    expect(appController.pagination).toEqual(pagination);
    expect(appController.autoRender).toEqual(autoRender);
    expect(appController.middlewares).toEqual(middleware);
  });
});

describe('Test Cases of Different functionality of AppController', ()=>{
  test('Test For isAutoRenderEnabled Methods', ()=>{
    const name: string = 'name';
    const appController = new AppController(name);
    expect(appController.isAutoRenderEnabled()).toEqual(true);
    expect(appController.isAutoRenderEnabled()).not.toEqual(false);

    const autoRender = false;
    appController.autoRender = autoRender;
    expect(appController.isAutoRenderEnabled()).toEqual(false);
  });

  test('Test For enableAutoRender Methods', ()=>{
    const name: string = 'name';
    const appController = new AppController(name);
    expect(appController.enableAutoRender().autoRender).toEqual(true);
  });

  test('Test For disableAutoRender Methods', ()=>{
    const name: string = 'name';
    const appController = new AppController(name);
    expect(appController.disableAutoRender().autoRender).toEqual(false);
  });

  test('Test For addMiddleware Methods', ()=>{
    const name: string = 'name';
    const appController = new AppController(name);
    appController.addMiddleware('add');
    expect(appController.middlewares[0]).toEqual('add');
    expect(appController.middlewares.length).toEqual(1);
  });
});
