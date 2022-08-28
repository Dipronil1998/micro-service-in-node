// describe('Merchant Document Controller', ()=>{
//   test('Fake test', ()=>{
//     expect(true).toBe(true);
//   });
// });

import supertest from 'supertest';
import {app} from '../../../config/app';
import {DBService} from '../../service/DBService';
import {httpPageNotFoundMessage, httpDataNotFound, ormDBName}
  from '../../../config/bootstrap';
const App = supertest(app.app);
import {getConnection} from 'typeorm';

describe('Test for GET MerchantDocument', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect();
    await getConnection(ormDBName).manager
        .query(`INSERT INTO merchant_documents(document_type_text, 
          document_url, issuer, place_of_issue, valid_form, 
          valid_through) VALUES('Pdf','./FILESYSTEMDEV/example.png',
          'AGPAYTECH','AGPAYTECH','2021-01-24','2022-05-02')`);
  });
  test('GET /merchantdocument', async () => {
    const response = await App
        .get('/v1/merchant/merchantdocument/');
    expect(response.type).toEqual('application/json');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).not.toEqual(201);
  });
  test('GET error /merchantdocument/', async () => {
    const response = await App
        .get('/v1/merchants/merchantdocuments');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.errors.error)
        .toEqual(httpPageNotFoundMessage);
    expect(response.status).toEqual(404);
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(500);
  });
  test('GET /merchantdocument/merchantdocument/:issuer',
      async () => {
        const validMerchantDocumentId:string =
        (await getConnection(ormDBName).manager
            .query(`SELECT id from merchant_documents 
        where issuer= $1`, ['AGPAYTECH']))[0].id;
        const response = await App.get('/v1/merchant/merchantdocument/' +
           validMerchantDocumentId);
        expect(response.type).toEqual('application/json');
        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        const jsonResponse = JSON.parse(response.text);
        expect(jsonResponse.success).toEqual(true);
        expect(response.status).not.toEqual(201);
      });
  test('Retreving for invalid issuer GET //merchantdocument/:issuer',
      async () => {
        const validMerchantDocumentId: string =
        'e2cc5b58-7f06-4dc1-b68e-d7f3ea5a735c';
        const response = await App
            .get('/v1/merchant/merchantdocument/' + validMerchantDocumentId);
        const jsonResponse = JSON.parse(response.text);
        expect(jsonResponse.errors.error)
            .toEqual(httpDataNotFound);
        expect(response.status).toEqual(404);
        expect(jsonResponse.success).toEqual(false);
        expect(response.status).not.toEqual(500);
      });
  test('Retreving for DataNotFound GET /merchantdocument',
      async () => {
        await getConnection(ormDBName).manager
            .query('TRUNCATE TABLE merchant_documents CASCADE');
        const response = await App.get('/v1/merchant/merchantdocument/');
        const jsonResponse = JSON.parse(response.text);
        expect(jsonResponse.errors.error)
            .toEqual(httpDataNotFound);
        expect(response.status).toEqual(404);
        expect(jsonResponse.success).toEqual(false);
        expect(response.status).not.toEqual(500);
      });

  afterAll(async () => {
    await dbService.close();
  });
});
