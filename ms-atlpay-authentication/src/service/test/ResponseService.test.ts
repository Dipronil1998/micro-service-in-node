import express, {NextFunction, Request, Response} from 'express';
import supertest from 'supertest';
import bodyParser from 'body-parser';
import {PageNotFoundException} from '../../exception/PageNotFoundException';
import {ResponseService} from '../ResponseService';
import {invalidInputMessage} from '../../../config/bootstrap';
const app: express.Application = express();
app.use(bodyParser.json());
app.get('/test1', (request: Request,
    response : Response,
    next : NextFunction)=>{
  try {
    throw new PageNotFoundException('Page not Found', 400);
  } catch (error) {
    new ResponseService().sendErrorResponse(response, error);
  }
});
app.get('/test2', (request: Request,
    response : Response,
    next : NextFunction)=>{
  try {
    throw new Error();
  } catch (error) {
    new ResponseService().sendErrorResponse(response, error);
  }
});

app.get('/test3', (request: Request,
    response : Response,
    next : NextFunction)=>{
  new ResponseService().sendSuccessResponse(response, 'Success');
});

app.get('/test4', (request: Request,
    response : Response,
    next : NextFunction)=>{
  new ResponseService().sendSuccessResponse(response, {data: 'correct'});
});

app.get('/test5', (request: Request,
    response : Response,
    next : NextFunction)=>{
  response.status(200).send('Success');
  new ResponseService().endResponse(response);
});

app.get('/test6', (request: Request,
    response : Response,
    next : NextFunction)=>{
  try {
    throw new SyntaxError();
  } catch (error) {
    new ResponseService().sendErrorResponse(response, error);
  }
} );

const testApp = supertest(app);
describe('Test cases of Response Service', ()=>{
  test('Test case of Proper response service with error', async ()=>{
    const response = await testApp.get('/test1');
    expect(response.status).toEqual(400);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBe(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
  });

  test('Test case of without error message', async ()=>{
    const response = await testApp.get('/test2');
    expect(response.status).toEqual(500);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBe(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    expect(response.body.errors.error)
        .toEqual('Please try again after some time');
  });

  test('Test case of with Success Message', async ()=>{
    const response = await testApp.get('/test3');
    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBe(true);
    expect(response.body.info).toBeDefined();
    expect(response.body.info.message).toBeDefined();
    expect(response.body.info.message).toEqual('Success');
  });

  test('Test case of with Data', async ()=>{
    const response = await testApp.get('/test4');
    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBe(true);
    expect(response.body.info).toBeDefined();
    expect(response.body.info).toEqual({data: 'correct'});
  });

  test('Test case of end response function', async ()=>{
    const response = await testApp.get('/test5');
    expect(response.status).toEqual(200);
    expect(response.text).toEqual('Success');
  });

  test('Test case of Invalid Input', async ()=>{
    const response = await testApp.get('/test6');
    expect(response.status).toEqual(400);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBe(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error).toBeDefined();
    expect(response.body.errors.error)
        .toEqual(invalidInputMessage);
  });
});
