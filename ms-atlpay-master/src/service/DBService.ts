import {Connection, createConnections} from 'typeorm';
import {logger} from '../utils/logger';
import {AppService} from './AppService';
/**
 * Database Service
 * @class
 * @extends{AppService}
 */
export class DBService extends AppService {
  /**
   * Connections
   * @var{Connection[]}
   */
  private _connections : Connection[];
  /**
   * Constructor Method.
   * @constructor
   */
  constructor() {
    super('DBService');
  }
  /**
   * Connect Database Method.
   * @function
   */
  public async connect(): Promise<void> {
    await createConnections().then((connections: Connection[])=>{
      this._connections = connections;
      logger.info('Database Connected');
    },
    ).catch((error)=>{
      logger.error('Datbase not Connected');
      throw error;
    });
  }
  /**
   * Close connections.
   * @function
   */
  public async close():Promise<void> {
    await this._connections.forEach(async (connection)=> {
      await connection.close();
    });
  }
}
