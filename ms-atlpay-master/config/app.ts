import {Application} from '../src/BaseApplication/Application';
import {ErrorHandlerMiddleware} from '../src/middleware/ErrorHandlerMiddleware';
import {CurrencyRoute} from '../src/routes/CurrencyRoute';
import {CountryRoute} from '../src/routes/CountryRoute';
import {PageNotFoundMiddleware} from '../src/middleware/PageNotFoundMiddleware';
import bodyParser from 'body-parser';
import cors from 'cors';
import {swaggerServe, swaggerSetup} from './swagger/swagger';
import {ContinentRoute} from '../src/routes/ContinentRoute';
import {LanguageRoute} from '../src/routes/LanguageRoute';
export const app: Application = new Application();
app.use(cors());
app.initializeSwagger(swaggerServe, swaggerSetup);
app.middlewares([bodyParser.urlencoded({extended: false}), bodyParser.json()]);

app.routes([new CurrencyRoute('/base/currency')]);
app.routes([new CountryRoute('/base/country')]);
app.routes([new ContinentRoute('/base/continent')]);
app.routes([new LanguageRoute('/base/language')]);
app.use(new PageNotFoundMiddleware().pageNotFound);
app.use(new ErrorHandlerMiddleware().errorHandler);