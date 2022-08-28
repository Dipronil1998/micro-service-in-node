import swaggerUI from 'swagger-ui-express';
import {RequestHandler} from 'express';
import YAML from 'yamljs';
import path from 'path';
const swaggerDocumentPath = path.join(__dirname, './api.yml');
const swaggerDocument : any = YAML.load(swaggerDocumentPath);
export const swaggerSetup : RequestHandler = swaggerUI.setup(swaggerDocument);
export const swaggerServe : RequestHandler[] = swaggerUI.serve;
