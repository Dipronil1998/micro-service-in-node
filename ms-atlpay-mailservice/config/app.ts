import {Application} from '../src/BaseApplication/Application';
import {ErrorHandlerMiddleware} from '../src/middleware/ErrorHandlerMiddleware';
import {PageNotFoundMiddleware} from '../src/middleware/PageNotFoundMiddleware';
import bodyParser from 'body-parser';
import {MailRoute} from '../src/routes/MailRoute';
export const app : Application = new Application();
app.middlewares([bodyParser.urlencoded({extended: false}), bodyParser.json()]);
app.routes([new MailRoute('/mail')]);
app.middleware(new PageNotFoundMiddleware().pageNotFound);
app.middleware(new ErrorHandlerMiddleware().errorHandler);
