import {getConnection} from 'typeorm';
import {ormDBName} from '../bootstrap';
import {RepositoryParameter} from '../../src/model/repository/AppRepository';
import {Merchant} from './../../src/model/entity/Merchant';
import {Merchants} from '../../src/model/repository/Merchants';
/**
 * Merchant Seed
 * @class
 */
export class MerchantsSeed {
  /**
     * Execute Seed.
     */
  public async run() {
    try {
      const dbName: any = ormDBName;
      const MerchantParameter: RepositoryParameter =
        new RepositoryParameter(
            'Merchant',
            Merchant,
            dbName,
            'none',
            getConnection(dbName),
        );
      const merchantRepo: Merchants =
        new Merchants(MerchantParameter);
      merchantRepo.initializeAssociations();

      const merchant: Merchant =
        merchantRepo.newEntity();
      merchant.title='System - Replace it with your company name';
      merchant.code='SYSTEM';
      const createMerchant:boolean=
      await merchantRepo.exists({_code: 'SYSTEM'});
      if (createMerchant===false) {
        await merchantRepo.save(merchant);
      }

      console.log('Merchant Seed Inserted');
    } catch (error) {
      console.log(error);
    }
  }
}
