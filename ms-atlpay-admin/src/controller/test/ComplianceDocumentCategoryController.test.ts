import supertest from 'supertest';
import {app} from '../../../config/app';
import {DBService} from '../../service/DBService';
import {httpPageNotFoundMessage, httpDataNotFound, ormDBName}
  from '../../../config/bootstrap';
import {ComplianceDocumentCategorySeed}
  from '../../../config/seeds/ComplianceDocumentCategorySeed';
import {getConnection} from 'typeorm';
const App = supertest(app.app);

describe('Test for GET ComplianceDocumentCategory', () => {
  const dbService: DBService = new DBService();
  beforeAll(async () => {
    await dbService.connect().then(async ()=>{
      await new ComplianceDocumentCategorySeed().run();
    });
  });
  test('GET /admin/compliancedocumentcategory', async () => {
    const response = await App.get('/v1/admin/compliancedocumentcategory');
    expect(response.type).toEqual('application/json');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).not.toEqual(201);
  });
  test('GET error /admin/compliancedocumentcategory', async () => {
    const response = await App.get('/v1/admin/compliancedocumentcategorys');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.errors.error)
        .toEqual(httpPageNotFoundMessage);
    expect(response.status).toEqual(404);
    expect(jsonResponse.success).toEqual(false);
    expect(response.status).not.toEqual(500);
  });
  test('GET /admin/compliancedocumentcategory/:code', async () => {
    const code: string = 'POI';
    const response = await App
        .get('/v1/admin/compliancedocumentcategory/' + code);
    expect(response.type).toEqual('application/json');
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    const jsonResponse = JSON.parse(response.text);
    expect(jsonResponse.success).toEqual(true);
    expect(response.status).not.toEqual(201);
  });
  test('Retreving invalid code GET /admin/compliancedocumentcategory/:code',
      async () => {
        const code: string = 'MZR';
        const response = await App
            .get('/v1/admin/compliancedocumentcategory/' + code);
        const jsonResponse = JSON.parse(response.text);
        expect(jsonResponse.errors.error)
            .toEqual(httpDataNotFound);
        expect(response.status).toEqual(404);
        expect(jsonResponse.success).toEqual(false);
        expect(response.status).not.toEqual(500);
      });
  test('Retreving  for DataNotFound GET /admin/compliancedocumentcategory',
      async () => {
        await getConnection(ormDBName).manager
            .query('TRUNCATE TABLE compliance_document_categories CASCADE');
        const response = await App.get('/v1/admin/compliancedocumentcategory/');
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
