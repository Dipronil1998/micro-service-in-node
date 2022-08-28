import {Application} from '../src/BaseApplication/Application';
import {ErrorHandlerMiddleware} from '../src/middleware/ErrorHandlerMiddleware';
import {PageNotFoundMiddleware} from '../src/middleware/PageNotFoundMiddleware';
import bodyParser from 'body-parser';
import useragent from 'express-useragent';
import cookieParser from 'cookie-parser';
import cors from 'cors';

export const app : Application = new Application();
app.middleware(useragent.express());
app.middleware(cors());
app.middleware(cookieParser());
app.middlewares([bodyParser.urlencoded({extended: false}), bodyParser.json()]);

app.use(new PageNotFoundMiddleware().pageNotFound);
app.use(new ErrorHandlerMiddleware().errorHandler);

