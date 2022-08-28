import {DBService} from '../DBService';

describe('Test case of Database Service', ()=>{
  test('Test case to create new DB service', ()=>{
    const dbService : DBService = new DBService();
    expect(dbService instanceof DBService);
  });

  test('Test different methods of DB Service', async ()=>{
    const dbService : DBService = new DBService();
    expect(dbService instanceof DBService);
    try {
      await dbService.connect();
      expect(true).toBe(true);
      await dbService.close();
      expect(true).toBe(true);
    } catch (error) {
      expect(false).toBe(true);
    }
  });
});
