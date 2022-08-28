import supertest from 'supertest';
import {app} from '../../../config/app';
import {DBService} from '../../service/DBService';
import {httpPageNotFoundMessage, httpDataNotFound, ormDBName}
  from '../../../config/bootstrap';
import {HonoroficSeed} from '../../../config/seeds/HonoroficSeed';
import {getConnection} from 'typeorm';
const App = supertest(app.app);

describe('Test for GET Honorofic', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect().then(async ()=>{
      await new HonoroficSeed().run();
    });
  });
  test('GET /admin/honorofic', async () => {
    const response = await App.get('/v1/admin/honorofic');
    expect(response.type).toEqual('application/json');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).not.toEqual(201);
  });
  test('GET error /admin/honorofic', async () => {
    const response = await App.get('/v1/admin/honorofics');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.errors.error)
        .toEqual(httpPageNotFoundMessage);
    expect(response.status).toEqual(404);
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(500);
  });
  test('GET /admin/honorofic/:code', async () => {
    const code: string = 'MR';
    const response = await App.get('/v1/admin/honorofic/' + code);
    expect(response.type).toEqual('application/json');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).not.toEqual(201);
  });
  test('Retreving /admin/honorofic for invalid code GET /admin/honorofic/:code',
      async () => {
        const code: string = 'MZ';
        const response = await App.get('/v1/admin/honorofic/' + code);
        const jsonResponse = JSON.parse(response.text);
        expect(jsonResponse.errors.error)
            .toEqual(httpDataNotFound);
        expect(response.status).toEqual(404);
        expect(jsonResponse.success).toEqual(false);
        expect(response.status).not.toEqual(500);
      });
  test('Retreving /admin/honorofic/ for DataNotFound GET /admin/honorofic',
      async () => {
        await getConnection(ormDBName).manager
            .query('TRUNCATE TABLE Honorofics CASCADE');
        const response = await App.get('/v1/admin/honorofic/');
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
