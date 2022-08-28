import {AppService} from './AppService';
import axios from 'axios';
import {exchangeRateAPI,
  exchangeRateAPIKey,
  generalServerErrorMessage,
  httpDataNotFound} from '../../config/bootstrap';
import {BaseException} from '../exception/BaseException';
import {DataNotFoundException} from '../exception/DataNotFoundException';
import {ExchangeRate} from '../interface/types/ExchangeRate';
/**
 * Exchange Rate service
 * @class{ExchangeRateService}
 * @extends{AppService}
 */
export class ExchangeRateService extends AppService {
  /**
   * Constructor Method
   */
  constructor() {
    super('Exchange rate service');
  }
  /**
   * Get exchange rate for base currency code
   * @param{string} baseCode
   * @return{Promise<ExchangeRate>} exchangeRate
   */
  public getExchangeRateFromBaseCurrencyCode=
    async (baseCode : string)
    : Promise<ExchangeRate> => {
      try {
        const exchangeRateResponse =
            await axios
                .get(exchangeRateAPI+'/'+
                    exchangeRateAPIKey+
                    '/latest/'+baseCode);
        const exchangeRate : ExchangeRate = {
          baseCode: exchangeRateResponse.data.base_code,
          conversionRates: exchangeRateResponse.data.conversion_rates,
        };

        return exchangeRate;
      } catch (error: any) {
        const errorStatus: number = error.response.status;
        if (errorStatus === 404) {
          throw new DataNotFoundException(httpDataNotFound);
        } else {
          throw new BaseException(generalServerErrorMessage);
        }
      }
    };
}
