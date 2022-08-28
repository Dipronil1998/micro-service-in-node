import {SelectQueryBuilder} from 'typeorm';
import {BusinessBankDetail} from '../entity/BusinessBankDetail';
import {BusinessOwner} from '../entity/BusinessOwner';
import {BusinessRepresentative} from '../entity/BusinessRepresentative';
import {MerchantBusinessProfile} from '../entity/MerchantBusinessProfile';
import {MerchantDocument} from '../entity/MerchantDocument';
import {AppRepository, RepositoryParameter} from './AppRepository';

/**
 * Merchants Repository
 * @class Merchants
 * @extends AppRepository
 */
export class Merchants extends AppRepository {
  /**
   * Constructor Method.
   * @param{RepositoryParameter} parameter
   */
  constructor(parameter: RepositoryParameter) {
    super(parameter);
  }

  /**
   * Get Business Profile By Merchant
   * @param{string} merchantId
   * @param{string} businessProfileId
   * @return{Promise}
   */
  public async getBusinessProfileByMerchant(merchantId: string,
      businessProfileId: string): Promise<MerchantBusinessProfile[]> {
    const businessProfiles: MerchantBusinessProfile[] | any =
      await this.connection
          .getRepository(MerchantBusinessProfile)
          .createQueryBuilder('merchantBusinessProfiles')
          .where('merchant_id = :merchantId and id = :businessProfileId',
              {merchantId: merchantId, businessProfileId: businessProfileId})
          .getOne();

    return businessProfiles;
  }

  /**
   * get Merchant Bank By Merchnat Profile
   * @param{string} merchantId
   * @return{Promise}
   */
  public async getMerchantBankByMerchnatProfile(merchantId: string):
    Promise<BusinessBankDetail[]> {
    const queryBuilder: SelectQueryBuilder<BusinessBankDetail> = this.connection
        .getRepository(BusinessBankDetail)
        .createQueryBuilder('businessBankDetails');
    const merchantBanks: BusinessBankDetail[] =
      await queryBuilder
          .where(`businessBankDetails.merchant_business_profile_id IN` +
          queryBuilder
              .subQuery()
              .select('merchantBusinessProfile.id')
              .from(MerchantBusinessProfile, 'merchantBusinessProfile')
              .where(`merchantBusinessProfile.merchant_id=:merchantId`)
              .getQuery())
          .setParameters({merchantId: merchantId})
          .getMany();

    return merchantBanks;
  }

  /**
   * get Business Bank Detail By Business Profile
   * @param{string} merchantId
   * @param{string} businessProfileId
   * @param{string} bankId
   * @return{Promise}
   */
  public async getBusinessBankDetailByBusinessprofile(merchantId: string,
      businessProfileId: string, bankId: string):
    Promise<BusinessBankDetail[]> {
    const queryBuilder: SelectQueryBuilder<BusinessBankDetail> = this.connection
        .getRepository(BusinessBankDetail)
        .createQueryBuilder('businessBankDetails');
    const businessBankDetail: BusinessBankDetail[] =
      await queryBuilder
          .where(`businessBankDetails.id =:bankId and
          businessBankDetails.merchant_business_profile_id IN`+
          queryBuilder
              .subQuery()
              .select('merchantBusinessProfile.id')
              .from(MerchantBusinessProfile, 'merchantBusinessProfile')
              .where(`
              merchantBusinessProfile.merchant_id=:merchantId and
              merchantBusinessProfile.id=
                :businessProfileId`)
              .getQuery())
          .setParameters(
              {
                bankId: bankId,
                merchantId: merchantId,
                businessProfileId: businessProfileId,
              })
          .getMany();

    return businessBankDetail;
  }
  /**
   * Get Merchant Bank Details By merchantId and businessId
   * @param{string} merchantId
   * @param{string} businessId
   * @return{Promise}
   */
  public async getMerchantBusinessBankDetails(merchantId: string,
      businessId: string)
    : Promise<BusinessBankDetail[]> {
    const queryBuilder: SelectQueryBuilder<BusinessBankDetail> = this.connection
        .getRepository(BusinessBankDetail)
        .createQueryBuilder('businessBankDetail');

    const getMerchantBusinessBank: BusinessBankDetail[] = await queryBuilder
        .where('businessBankDetail.merchant_business_profile_id IN ' +
        queryBuilder
            .subQuery()
            .select('merchantBusinessProfile.id')
            .from(MerchantBusinessProfile, 'merchantBusinessProfile')
            .where(`merchantBusinessProfile.merchant_id=:merchantId and 
          merchantBusinessProfile.id = :businessId`)
            .getQuery())
        .setParameters({'merchantId': merchantId, 'businessId': businessId})
        .getMany();
    return getMerchantBusinessBank;
  }

  /**
   * Get Merchant Document By merchantId and businessId
   * @param{string} merchantId
   * @param{string} businessId
   * @return{Promise}
   */
  public async getMerchantBusinessDocuments(merchantId: string,
      businessId: string)
    : Promise<MerchantDocument[]> {
    const queryBuilder: SelectQueryBuilder<MerchantDocument> = this.connection
        .getRepository(MerchantDocument)
        .createQueryBuilder('merchantDocument');

    const getMerchantDocuments: MerchantDocument[] = await queryBuilder
        .where('merchantDocument.merchant_business_profile_id IN ' +
        queryBuilder
            .subQuery()
            .select('merchantBusinessProfile.id')
            .from(MerchantBusinessProfile, 'merchantBusinessProfile')
            .where(`merchantBusinessProfile.merchant_id=:merchantId and 
          merchantBusinessProfile.id = :businessId`)
            .getQuery())
        .setParameters({'merchantId': merchantId, 'businessId': businessId})
        .getMany();
    return getMerchantDocuments;
  }

  /**
   * Get Merchant Document By merchantId, businessId and documentId
   * @param{string} merchantId
   * @param{string} businessId
   * @param{string} documentId
   * @return{Promise<MerchantDocument[]>}
   */
  public async getMerchantBusinessDocumentsById(merchantId: string,
      businessId: string, documentId: string)
    : Promise<MerchantDocument[]> {
    const queryBuilder: SelectQueryBuilder<MerchantDocument> = this.connection
        .getRepository(MerchantDocument)
        .createQueryBuilder('merchantDocument');

    const getMerchantDocumentsById: MerchantDocument[] = await queryBuilder
        .where(`merchantDocument.id =:documentId and 
            merchantDocument.merchant_business_profile_id IN `+
        queryBuilder
            .subQuery()
            .select('merchantBusinessProfile.id')
            .from(MerchantBusinessProfile, 'merchantBusinessProfile')
            .where(`merchantBusinessProfile.merchant_id=:merchantId and 
           merchantBusinessProfile.id = :businessId`)
            .getQuery())
        .setParameters({
          'documentId': documentId,
          'merchantId': merchantId,
          'businessId': businessId,
        })
        .getMany();
    return getMerchantDocumentsById;
  }

  /**
   * Get Business Owner By merchantId and businessId
   * @param{string} merchantId
   * @param{string} businessId
   * @return{Promise}
   */
  public async getMerchantBusinessOwner(
      merchantId: string, businessId: string): Promise<BusinessOwner[]> {
    const queryBuilder: SelectQueryBuilder<BusinessOwner> = this.connection
        .getRepository(BusinessOwner)
        .createQueryBuilder('businessOwner');

    const getMerchantDocuments: BusinessOwner[] = await queryBuilder
        .where('businessOwner.merchant_business_profile_id IN ' +
        queryBuilder
            .subQuery()
            .select('merchantBusinessProfile.id')
            .from(MerchantBusinessProfile, 'merchantBusinessProfile')
            .where(`merchantBusinessProfile.merchant_id=:merchantId and 
           merchantBusinessProfile.id = :businessId`)
            .getQuery())
        .setParameters({'merchantId': merchantId, 'businessId': businessId})
        .getMany();
    return getMerchantDocuments;
  }

  /**
   * Get Business Owner By merchantId, businessId and businessOwnerId
   * @param{string} merchantId
   * @param{string} businessId
   * @param{string} businessOwnerId
   * @return{Promise}
   */
  public async getMerchantBusinesOwnerById(merchantId: string,
      businessId: string, businessOwnerId: string)
    : Promise<BusinessOwner[]> {
    const queryBuilder: SelectQueryBuilder<BusinessOwner> = this.connection
        .getRepository(BusinessOwner)
        .createQueryBuilder('businessOwner');

    const merchantBusinesOwnerById: BusinessOwner[] = await queryBuilder
        .where(`businessOwner.id =:businessOwnerId and 
      businessOwner.merchant_business_profile_id IN `+
        queryBuilder
            .subQuery()
            .select('merchantBusinessProfile.id')
            .from(MerchantBusinessProfile, 'merchantBusinessProfile')
            .where(`merchantBusinessProfile.merchant_id=:merchantId and 
         merchantBusinessProfile.id = :businessId`)
            .getQuery())
        .setParameters({
          'businessOwnerId': businessOwnerId,
          'merchantId': merchantId,
          'businessId': businessId,
        })
        .getMany();
    return merchantBusinesOwnerById;
  }

  /**
   * Get Business Representative By Merchant Id and Business Id
   * @param{string} merchantId
   * @param{string} businessId
   * @return{Promise}
   */
  public async getBusinessRepresentation(merchantId: string,
      businessId: string): Promise<any> {
    const queryBuilder: SelectQueryBuilder<BusinessRepresentative> =
    this.connection
        .getRepository(BusinessRepresentative)
        .createQueryBuilder('businessRepresentative');

    const businessRepresentation = await queryBuilder
        .where(`businessRepresentative.id IN ` +
      queryBuilder.subQuery()
          .select('merchantBusinessProfile.business_representative_id')
          .from(MerchantBusinessProfile, 'merchantBusinessProfile')
          .where(`merchantBusinessProfile.merchant_id=:merchantId and 
      merchantBusinessProfile.id = :businessId`)
          .getQuery())
        .setParameters({
          'merchantId': merchantId,
          'businessId': businessId,
        })
        .getMany();
    return businessRepresentation;
  }
}
