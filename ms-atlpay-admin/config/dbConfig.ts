import {ConnectionOptions} from 'typeorm';
import {dbType, dbHostName, dbport, dbUser,
  dbPassword, dbDatabase, ormDBName, environment} from './bootstrap';
let sourceFolder='src';
let extension='ts';
if (environment==='production') {
  sourceFolder='dist';
  extension='js';
} else {
  sourceFolder='src';
  extension='ts';
}

export const dbConfig : ConnectionOptions= {
  'name': ormDBName,
  'type': dbType,
  'host': dbHostName,
  'port': Number(dbport),
  'username': dbUser,
  'password': dbPassword,
  'database': dbDatabase,
  'synchronize': true,
  'logging': false,
  'entities': [
    sourceFolder+'/model/entity/**/*.'+extension,
  ],
  'migrations': [
    sourceFolder+'/model/migration/**/*.'+extension,
  ],
  'subscribers': [
    sourceFolder+'/model/subscriber/**/*.'+extension,
  ],
  'cli': {
    'entitiesDir': './src/model/entity',
    'migrationsDir': './src/model/migration',
    'subscribersDir': './src/model/subscriber',
  },
};
