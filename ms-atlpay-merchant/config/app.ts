import {Application} from '../src/BaseApplication/Application';
import {ErrorHandlerMiddleware} from '../src/middleware/ErrorHandlerMiddleware';
import {PageNotFoundMiddleware} from '../src/middleware/PageNotFoundMiddleware';
import bodyParser from 'body-parser';
import useragent from 'express-useragent';
import cookieParser from 'cookie-parser';
import {MerchantRoute} from '../src/routes/MerchantRoute';
import cors from 'cors';
import {MerchantBusinessProfileRoute}
  from '../src/routes/MerchantBusinessProfileRoute';
import {BusinessOwnerRoute} from '../src/routes/BusinessOwnerRoute';
import {BusinessBankDetailRoute} from '../src/routes/BusinessBankDetailRoute';
import {MerchantWalletRoute} from '../src/routes/MerchantWalletRoute';
import {MerchantDocumentRoute} from '../src/routes/MerchantDocumentRoute';
import {BusinessRepresentativeRoute} from
  '../src/routes/BusinessRepresentativeRoute';
export const app : Application = new Application();
app.middleware(cors());
app.middleware(useragent.express());
app.middleware(cookieParser());
app.middlewares([bodyParser.urlencoded({extended: false}), bodyParser.json()]);
app.routes([new MerchantBusinessProfileRoute(
    '/merchant/merchantbusinessprofile')]);
app.routes([new BusinessOwnerRoute('/merchant/businessowner')]);
app.routes([new BusinessRepresentativeRoute(
    '/merchant/businessrepresentative')]);
app.routes([new MerchantDocumentRoute('/merchant/merchantdocument')]);
app.routes([new BusinessBankDetailRoute('/merchant/businessbankdetails')]);
app.routes([new MerchantWalletRoute('/merchant/merchantwallet')]);
app.routes([new MerchantRoute('/merchant')]);
app.use(new PageNotFoundMiddleware().pageNotFound);
app.use(new ErrorHandlerMiddleware().errorHandler);
