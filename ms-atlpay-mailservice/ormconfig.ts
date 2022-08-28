// Database configuration file
const dotenv = require('dotenv');

const path = require('path')
//dotenv.config({ path: path.join(__dirname, './.env') });

/**
 * refer: https://medium.com/@shijin_nath/typescript-rest-api-with-express-js-mysql-and-typeorm-8331cea78b0c
 * IMPORTENT NOTE: Before executing script npm run build use "dist" value of sourceFolder
 * and "js" value of extension and execute npm run prod.
 * Executing script npm run dev (using ts-node) has to be followed by assigning 
 * sourceFolder value of "src" and extension by "ts".
 *  
 */

import {dbConfig} from "./config/dbConfig";
module.exports = [dbConfig];
