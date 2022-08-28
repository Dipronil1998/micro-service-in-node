import {Application} from '../src/BaseApplication/Application';
import {ErrorHandlerMiddleware} from '../src/middleware/ErrorHandlerMiddleware';
import {PageNotFoundMiddleware} from '../src/middleware/PageNotFoundMiddleware';
import bodyParser from 'body-parser';
import useragent from 'express-useragent';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {BusinessRoleRoute} from '../src/routes/BusinessRoleRoute';
import {BusinessLegalEntityTypeRoute} from
  '../src/routes/BusinessLegalEntityTypeRoute';
import {BusinessSectorsRoute} from '../src/routes/BusinessSectorsRoute';
import {CivilStatusRoute} from '../src/routes/CivilStatusRoute';
import {ComplianceDocumentCategoryRoute}
  from '../src/routes/ComplianceDocumentCategoryRoute';
import {DocumentRejectReasonRoute}
  from '../src/routes/DocumentRejectReasonRoute';
import {HonoroficRoute} from '../src/routes/HonoroficRoute';
import {InstrumentChargeRoute} from '../src/routes/InstrumentChargeRoute';
import {PaymentInstrumentRoute} from '../src/routes/PaymentInstrumentRoute';
export const app: Application = new Application();
app.middleware(cors());
app.middleware(useragent.express());
app.middleware(cookieParser());
app.middlewares([bodyParser.urlencoded({extended: false}), bodyParser.json()]);
app.routes([new BusinessRoleRoute('/admin/businessrole')]);
app.routes([new BusinessLegalEntityTypeRoute(
    '/admin/businesslegalentitytype')]);
app.routes([new BusinessSectorsRoute('/admin/businesssectors')]);
app.routes([new CivilStatusRoute('/admin/civilstatus')]);
app.routes([new ComplianceDocumentCategoryRoute(
    '/admin/compliancedocumentcategory')]);
app.routes([new DocumentRejectReasonRoute('/admin/documentrejectreason')]);
app.routes([new HonoroficRoute('/admin/honorofic')]);
app.routes([new InstrumentChargeRoute('/admin/instrumentcharge')]);
app.routes([new PaymentInstrumentRoute('/admin/payment')]);
app.use(new PageNotFoundMiddleware().pageNotFound);
app.use(new ErrorHandlerMiddleware().errorHandler);
