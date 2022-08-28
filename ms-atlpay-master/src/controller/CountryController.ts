import {NextFunction, Request, Response} from 'express';
import {DeleteResult, getConnection, UpdateResult} from 'typeorm';
import {
  httpDataNotFound, httpSuccessDataCreate, httpSuccessDataDelete,
  httpSuccessDataUpdate,
  locationNotFound,
  ormDBName,
} from '../../config/bootstrap';
import {Country} from '../model/entity/Country';
import {Currency} from '../model/entity/Currency';
import {RepositoryParameter} from '../model/repository/AppRepository';
import {Countries} from '../model/repository/Countries';
import {ResponseService} from '../service/ResponseService';
import {AppController} from './AppController';
import {DataNotFoundException} from '../exception/DataNotFoundException';
import {InvalidInputException} from '../exception/InvalidInputException';
import {LocationNotFoundException}
  from '../exception/LocationNotFoundException';
import {IpDataService} from '../service/IpDataService';

/**
 * CountryController
 * @class
 * @extends{AppController}
 */
export class CountryController extends AppController {
  /**
   * Database name
   * @var{string}
   */
  private _repositoryDBName: any;
  /**
   * Constructor of CountryController
   * @param{string} name
   */
  constructor(name: string) {
    super(name);
    this._repositoryDBName = ormDBName;
  }

  /**
 * Find all countries List
 * @param{Request} req - Request
 * @param{Response} res - Response
 * @param{NextFunction} next - next function
 */
  public find = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const countryParameter: RepositoryParameter = new RepositoryParameter(
          'country',
          Country,
          this._repositoryDBName,
          'none',
          getConnection(this._repositoryDBName),
      );
      const countryRepo: Countries = new Countries(countryParameter);
      countryRepo.initializeAssociations();
      let countryList: Country[] = await countryRepo.find();
      if (countryList.length != 0) {
        countryList = countryRepo.toJson(countryList);
        new ResponseService().sendSuccessResponse(res, countryList);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (err: any) {
      next(err);
    }
  };

  /**
   * Find Country by iso_numeric
   * @param{Request} req - Request
   * @param{Response} res - Response
   * @param{NextFunction} next - next function
   */
  public get = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const countryParameter: RepositoryParameter = new RepositoryParameter(
          'country',
          Country,
          this._repositoryDBName,
          'none',
          getConnection(this._repositoryDBName),
      );
      const isoNumeric: string = req.params.iso_numeric;
      const countryRepo: Countries = new Countries(countryParameter);
      countryRepo.initializeAssociations();
      let country: Country[] = await countryRepo.get(isoNumeric);
      if (country && country.length != 0) {
        country = countryRepo.toJson(country);
        new ResponseService().sendSuccessResponse(res, country);
      } else {
        throw new DataNotFoundException(httpDataNotFound);
      }
    } catch (err: any) {
      next(err);
    }
  };

  /**
 * Insert Country
 * @param{Request} req - Request
 * @param{Response} res - Response
 * @param{NextFunction} next - next function
 */
  public save = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const countryParameter: RepositoryParameter = new RepositoryParameter(
          'country',
          Country,
          this._repositoryDBName,
          'none',
          getConnection(this._repositoryDBName),
      );
      const countryRepo: Countries = new Countries(countryParameter);
      countryRepo.initializeAssociations();
      const country: Country = countryRepo.newEntity();

      const continentCode: string = req.body.continent_code;
      const iso2: string = req.body.iso_2;
      const iso3: string = req.body.iso_3;
      const isoNumeric: number = req.body.iso_numeric;
      const fipsCode: string = req.body.fips_code || '';
      const isdCode: number = req.body.isd_code;
      const commonName: string = req.body.common_name;
      const officialName: string = req.body.official_name;
      const endonym: string = req.body.endonym;
      const demonym: string = req.body.demonym || '';
      const officialCurrencyCode: string = req.body.official_currency_code;

      country.continentCode = continentCode;
      country.iso2 = iso2;
      country.iso3 = iso3;
      country.isoNumeric = isoNumeric;
      country.fipsCode = fipsCode;
      country.isdCode = isdCode;
      country.commonName = commonName;
      country.officialName = officialName;
      country.endonym = endonym;
      country.demonym = demonym;
      const currency = await countryRepo.query()
          .select('currency')
          .from(Currency, 'currency')
          .where('currency.iso = :id',
              {id: officialCurrencyCode}).getOne();
      if (currency !== undefined) {
        country.officialCurrencyCode = currency;
      }
      const createCountry: boolean = await countryRepo.save(country);
      if (createCountry) {
        new ResponseService().sendSuccessResponse(res, httpSuccessDataCreate);
      } else {
        throw new InvalidInputException('Invalid Input');
      }
    } catch (err: any) {
      next(err);
    }
  };

  /**
   * Find one currency List
   * @param{Request} req - Request
   * @param{Response} res - Response
   * @param{NextFunction} next - next function
 */
  public update = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const countryParameter: RepositoryParameter = new RepositoryParameter(
          'country',
          Country,
          this._repositoryDBName,
          'none',
          getConnection(this._repositoryDBName),
      );
      const isoNumeric: string = req.params.iso_numeric;
      if (req.body._isoNumeric && (isoNumeric !== req.body._isoNumeric)) {
        throw new InvalidInputException('Invalid iso Numeric');
      }
      const countryRepo: Countries = new Countries(countryParameter);
      countryRepo.initializeAssociations();
      let country: any = await countryRepo
          .getOnCondition({_isoNumeric: isoNumeric});
      const countryUpdate: Country = new Country();
      if (req.body.continent_code) {
        countryUpdate.continentCode = req.body.continent_code;
      } if (req.body.iso2) {
        countryUpdate.iso2 = req.body.iso2;
      } if (req.body.iso3) {
        countryUpdate.iso3 = req.body.iso3;
      } if (req.body.fips_code) {
        countryUpdate.fipsCode = req.body.fips_code;
      } if (req.body.isd_code) {
        countryUpdate.isdCode = req.body.isd_code;
      } if (req.body.common_name) {
        countryUpdate.commonName = req.body.common_name;
      } if (req.body.official_name) {
        countryUpdate.officialName = req.body.official_name;
      } if (req.body.endonym) {
        countryUpdate.endonym = req.body.endonym;
      } if (req.body.demonym) {
        countryUpdate.demonym = req.body.demonym;
      }

      country = countryRepo.
          patchEntity(country, countryUpdate);
      const updateCountryResult: UpdateResult = await countryRepo.
          updateAll(country, {_isoNumeric: isoNumeric});
      if (updateCountryResult.affected != 0) {
        new ResponseService().sendSuccessResponse(res, httpSuccessDataUpdate);
      } else {
        const dataNotFoundException: DataNotFoundException =
          new DataNotFoundException(httpDataNotFound);
        next(dataNotFoundException);
      }
    } catch (err: any) {
      next(err);
    }
  };

  /**
 * Find all countries List
 * @param{Request} req - Request
 * @param{Response} res - Response
 * @param{NextFunction} next - next function
 */
  public delete = async (req: Request, res: Response, next: NextFunction) => {
    this._request = req;
    this._response = res;
    try {
      const countryParameter: RepositoryParameter = new RepositoryParameter(
          'country',
          Country,
          this._repositoryDBName,
          'none',
          getConnection(this._repositoryDBName),
      );
      const isoNumeric: string = req.params.iso_numeric;
      const countryRepo: Countries = new Countries(countryParameter);
      countryRepo.initializeAssociations();

      const deleteCountryResult: DeleteResult =
        await countryRepo.deleteAll({_isoNumeric: isoNumeric});
      if (deleteCountryResult.affected != 0) {
        new ResponseService().sendSuccessResponse(res, httpSuccessDataDelete);
      } else {
        const dataNotFoundException: DataNotFoundException =
          new DataNotFoundException(httpDataNotFound);
        throw dataNotFoundException;
      }
    } catch (error) {
      next(error);
    }
  };

  /**
   * find Current Country by IP Method
   * @param{Request} req - Request
   * @param{Response} res - Response
   * @param{NextFunction} next - next function
   */
  public findCurrentCountryByIP =
    async (req: Request, res: Response, next: NextFunction) => {
      this._request = req;
      this._response = res;
      try {
        const countryParameter: RepositoryParameter = new RepositoryParameter(
            'country',
            Country,
            this._repositoryDBName,
            'none',
            getConnection(this._repositoryDBName),
        );
        const countryRepo: Countries = new Countries(countryParameter);
        countryRepo.initializeAssociations();
        const ipData = await new IpDataService().clientIpData();
        let country: Country | undefined =
          await countryRepo.getCountryByCountryIso2(ipData.country_code);
        if (country) {
          country = countryRepo.toJson(country);
        }

        const countryData = {
          city: ipData.city,
          region: ipData.region,
          region_code: ipData.region_code,
          country_name: ipData.country_name,
          country_code: ipData.country_code,
          continent_name: ipData.continent_name,
          continent_code: ipData.continent_code,
          postal: ipData.postal,
          calling_code: ipData.calling_code,
          flag: ipData.flag,
          emoji_flag: ipData.emoji_flag,
          languages: ipData.languages,
          currency: ipData.currency,
          time_zone: ipData.time_zone,
          country: country,
        };
        if (ipData) {
          new ResponseService().sendSuccessResponse(res, countryData);
        } else {
          throw new LocationNotFoundException(locationNotFound);
        }
      } catch (err: any) {
        next(err);
      }
    };

  /**
   * Block Unblock Country Method
   * @param{Request} req - Request
   * @param{Response} res - Response
   * @param{NextFunction} next - next function
   */
  public blockOrUnblockCountry =
    async (req: Request, res: Response, next: NextFunction) => {
      this._request = req;
      this._response = res;
      try {
        const countryParameter: RepositoryParameter = new RepositoryParameter(
            'country',
            Country,
            this._repositoryDBName,
            'none',
            getConnection(this._repositoryDBName),
        );
        const countryRepo: Countries = new Countries(countryParameter);
        countryRepo.initializeAssociations();
        const isoNumeric: number = req.body.iso_numeric;
        const blockCountry: boolean = req.body.block_country;

        let country: Country = await countryRepo
            .getOnCondition({_isoNumeric: isoNumeric});
        if (!country) {
          throw new DataNotFoundException(httpDataNotFound);
        }
        const countryName:string = country.officialName;
        
        let message;
        // @ts-ignore
        if (blockCountry==='true') {
          message = countryName+' has been disabled';
        } else {
          message = countryName+' has been enabled';
        }
        const countryUpdate: Country = new Country();
        if (req.body.iso_numeric) {
          countryUpdate.isBlocked = blockCountry;
        }
        country = countryRepo.
            patchEntity(country, countryUpdate);
        const updateCountryResult: UpdateResult = await countryRepo.
            updateAll(country, {_isoNumeric: isoNumeric});

        if (updateCountryResult.affected != 0) {
          new ResponseService().sendSuccessResponse(res, message);
        } else {
          throw new DataNotFoundException(httpDataNotFound);
        }
      } catch (err: any) {
        next(err);
      }
    };

  /**
     * Block Unblock Multiple Country Method
     * @param{Request} req - Request
     * @param{Response} res - Response
     * @param{NextFunction} next - next function
     */
  public blockOrUnblockMultipleCountry =
    async (req: Request, res: Response, next: NextFunction) => {
      this._request = req;
      this._response = res;
      try {
        const countryParameter: RepositoryParameter = new RepositoryParameter(
            'country',
            Country,
            this._repositoryDBName,
            'none',
            getConnection(this._repositoryDBName),
        );
        const countryRepo: Countries = new Countries(countryParameter);
        countryRepo.initializeAssociations();
        const reqBody: any = req.body;

        for (let index = 0; index < reqBody.length; index++) {
          const isoNumeric = reqBody[index].iso_numeric;
          const blockCountry = reqBody[index].block_country;

          let country: Country[] = await countryRepo
              .getOnCondition({_isoNumeric: isoNumeric});
          if (!country) {
            throw new DataNotFoundException(httpDataNotFound);
          }
          const countryUpdate: Country = new Country();
          countryUpdate.isBlocked = blockCountry;

          country = countryRepo.
              patchEntity(country, countryUpdate);
          await countryRepo.
              updateAll(country, {_isoNumeric: isoNumeric});
        }
        new ResponseService()
            .sendSuccessResponse(res, httpSuccessDataUpdate);
      } catch (err: any) {
        next(err);
      }
    };

  /**
   * Get Countries By Block Status
   * @param{Request} req - Request
   * @param{Response} res - Response
   * @param{NextFunction} next - next function
   */
  public findBasedOnStatus =
    async (req: Request, res: Response, next: NextFunction) =>{
      try {
        const countryParameter: RepositoryParameter = new RepositoryParameter(
            'country',
            Country,
            this._repositoryDBName,
            'none',
            getConnection(this._repositoryDBName),
        );
        const countryRepo: Countries = new Countries(countryParameter);
        countryRepo.initializeAssociations();
        // @ts-ignore
        const status : string = req.query.status || 'ALL';
        let countries : Array<Country>= await countryRepo
            .findbasedOnstatus(status);
        if (countries.length===0) {
          throw new DataNotFoundException(httpDataNotFound);
        } else {
          countries = countryRepo.toJson(countries);
          new ResponseService().sendSuccessResponse(res, countries);
        }
      } catch (error: any) {
        next(error);
      }
    };
}
