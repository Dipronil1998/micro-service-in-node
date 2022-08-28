import {FindCondition, Repository} from 'typeorm';
import {invalidInputMessage} from '../../../config/bootstrap';
import {InvalidInputException} from '../../exception/InvalidInputException';
import {Country} from '../entity/Country';
import {AppRepository, RepositoryParameter} from './AppRepository';
/**
 * countries class
 * @class
 */
export class Countries extends AppRepository {
  /**
   * Initializes a new instance
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }

  /**
   * getIsoNumericByCountryCode
   * @param{string} countryCode
   * @return{Promise<Country | undefined>}
   */
  public async getCountryByCountryIso2(countryCode: string)
    : Promise<Country | undefined> {
    const country: Country | undefined =
      await this.connection
          .getRepository(Country)
          .createQueryBuilder('country')
          .where('country.iso_2 = :iso_2', {iso_2: countryCode})
          .getOne();

    return country;
  }

  /**
   * get Country Name By IsoNumeric
   * @param{string} isoNumeric
   * @return{Promise<string | undefined>}
   */
  public async getCountryNameByIsoNumeric(isoNumeric: number)
     : Promise<string | undefined> {
    const country: Country | undefined =
       await this.connection
           .getRepository(Country)
           .createQueryBuilder('country')
           .where('country.iso_numeric = :iso_numeric',
               {iso_numeric: isoNumeric})
           .getOne();
    const countryName = country?.officialName;

    return countryName;
  }

  /**
   * getCountryByIsoNumeric
   * @param{number} isoNumeric
   * @return{Promise<Country | undefined>}
   */
  public async checkCountryStatusByIsoNumeric(isoNumeric: number)
    : Promise<boolean | undefined> {
    const country: Country | undefined =
      await this.connection
          .getRepository(Country)
          .createQueryBuilder('country')
          .where('country.iso_numeric = :iso_numeric',
              {iso_numeric: isoNumeric})
          .getOne();

    const status:boolean|undefined = country?.isBlocked;
    return status;
  }

  /**
   *
   * @param{FindCondition<any>} conditions
   * @return{Promise<any>}
   */
  public async findOnCondition(conditions: FindCondition<any>)
  : Promise<any> {
    const repository: Repository<any> =
    this._connection.getRepository(this._entityClass);
    try {
      const entity : any = await
      repository.find({where: conditions, relations: this.getRelations()});
      if (entity=== undefined) {
        return false;
      }
      return entity;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get countries based in status condition
   * @param{string} status
   * @return{Promise<Array<Country>>}
   */
  public async findbasedOnstatus(status: string): Promise<Array<Country>> {
    if (status==='BLOCKED') {
      return await this.findOnCondition({_isBlocked: true});
    } else if (status==='UNBLOCKED') {
      return await this.findOnCondition({_isBlocked: false});
    } else if (status==='ALL') {
      return await this.findOnCondition([{_isBlocked: false},
        {_isBlocked: true}]);
    } else {
      throw new InvalidInputException(invalidInputMessage);
    }
  }
}
