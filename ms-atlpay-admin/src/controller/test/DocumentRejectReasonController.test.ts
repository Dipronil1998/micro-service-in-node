import supertest from 'supertest';
import {app} from '../../../config/app';
import {DBService} from '../../service/DBService';
import {httpPageNotFoundMessage, httpDataNotFound, ormDBName}
  from '../../../config/bootstrap';
import {DocumentRejectReasonSeed}
  from '../../../config/seeds/DocumentRejectReasonSeed';
import {getConnection} from 'typeorm';
const App = supertest(app.app);

describe('Test for GET DocumentRejectReason', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect().then(async ()=>{
      await new DocumentRejectReasonSeed().run();
    });
  });
  test('GET /admin/documentrejectreason', async () => {
    const response = await App.get('/v1/admin/documentrejectreason');
    expect(response.type).toEqual('application/json');
    expect(response.status).toEqual(200);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).not.toEqual(201);
  });
  test('GET error /admin/documentrejectreason', async () => {
    const response = await App.get('/v1/admin/documentrejectreasons');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.errors.error)
        .toEqual(httpPageNotFoundMessage);
    expect(response.status).toEqual(404);
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(500);
  });
  test('GET /admin/documentrejectreason/:id', async () => {
    const id:string = (await getConnection(ormDBName).manager
        .query(`
        SELECT id FROM document_reject_reasons where code='EXPIRED'`))[0].id;
    const response = await App.get('/v1/admin/documentrejectreason/' + id);
    expect(response.type).toEqual('application/json');
    expect(response.status).toEqual(200);
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).not.toEqual(201);
  });
  test('Retreving  for invalid id GET /admin/documentrejectreason/:id',
      async () => {
        const id: string = '02e28535-da44-4c84-85f6-2e795dcdfb8f';
        const response = await App.get('/v1/admin/documentrejectreason/' + id);
        const jsonResponse = JSON.parse(response.text);
        expect(jsonResponse.errors.error)
            .toEqual(httpDataNotFound);
        expect(response.status).toEqual(404);
        expect(jsonResponse.success).toEqual(false);
        expect(response.status).not.toEqual(500);
      });
  test('Retreving for DataNotFound GET /admin/documentrejectreason',
      async () => {
        await getConnection(ormDBName).manager
            .query('TRUNCATE TABLE document_reject_reasons CASCADE');
        const response = await App.get('/v1/admin/documentrejectreason/');
        const jsonResponse = JSON.parse(response.text);
        if (!jsonResponse) {
          expect(jsonResponse.errors.error)
              .toEqual(httpDataNotFound);
          expect(response.status).toEqual(404);
          expect(jsonResponse.success).toEqual(false);
          expect(response.status).not.toEqual(500);
        }
      });

  afterAll(async () => {
    await dbService.close();
  });
});
