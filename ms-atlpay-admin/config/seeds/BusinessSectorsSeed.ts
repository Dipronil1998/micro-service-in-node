import {getConnection} from 'typeorm';
import {ormDBName} from '../bootstrap';
import {RepositoryParameter} from '../../src/model/repository/AppRepository';
import {BusinessSector} from './../../src/model/entity/BusinessSector';
import {BusinessSectors} from '../../src/model/repository/BusinessSectors';
/**
 * Business Sectors Seed
 * @class
 */
export class BusinessSectorsSeed {
  /**
   * Execute Seed.
   */
  public async run() {
    try {
      const dbName: any = ormDBName;
      const BusinessSectorParameter: RepositoryParameter =
        new RepositoryParameter(
            'BusinessSector',
            BusinessSector,
            dbName,
            'none',
            getConnection(dbName),
        );
      const businessSectorRepo: BusinessSectors =
        new BusinessSectors(BusinessSectorParameter);
      businessSectorRepo.initializeAssociations();
      let businessSector: BusinessSector =
      businessSectorRepo.newEntity();

      businessSector.title='Art Dealing';
      businessSector.code='ART_DEALING';
      businessSector.displayOrder=1;
      let createBusinessSector:boolean=
      await businessSectorRepo.exists({_code: 'ART_DEALING'});
      if (createBusinessSector===false) {
        await businessSectorRepo.save(businessSector);
      }

      businessSector =businessSectorRepo.newEntity();
      businessSector.title='Audio & Video';
      businessSector.code='AUDIO_AND_VIDEO';
      businessSector.displayOrder=2;
      createBusinessSector =await businessSectorRepo
          .exists({_code: 'AUDIO_AND_VIDEO'});
      if (createBusinessSector===false) {
        await businessSectorRepo.save(businessSector);
      }

      businessSector =businessSectorRepo.newEntity();
      businessSector.title='Automotive';
      businessSector.code='AUTOMOTIVE';
      businessSector.displayOrder=3;
      createBusinessSector =await businessSectorRepo
          .exists({_code: 'AUTOMOTIVE'});
      if (createBusinessSector===false) {
        await businessSectorRepo.save(businessSector);
      }

      businessSector =businessSectorRepo.newEntity();
      businessSector.title='Charity & Not-for-Profit';
      businessSector.code='CHARITY_AND_NOT-FOR-PROFIT';
      businessSector.displayOrder=4;
      createBusinessSector =await businessSectorRepo
          .exists({_code: 'CHARITY_AND_NOT-FOR-PROFIT'});
      if (createBusinessSector===false) {
        await businessSectorRepo.save(businessSector);
      }

      businessSector =businessSectorRepo.newEntity();
      businessSector.title='Consulting Services';
      businessSector.code='CONSULTING_SERVICES';
      businessSector.displayOrder=5;
      createBusinessSector =await businessSectorRepo
          .exists({_code: 'CONSULTING_SERVICES'});
      if (createBusinessSector===false) {
        await businessSectorRepo.save(businessSector);
      }

      businessSector =businessSectorRepo.newEntity();
      businessSector.title='Design';
      businessSector.code='DESIGN';
      businessSector.displayOrder=6;
      createBusinessSector =await businessSectorRepo.exists({_code: 'DESIGN'});
      if (createBusinessSector===false) {
        await businessSectorRepo.save(businessSector);
      }

      businessSector =businessSectorRepo.newEntity();
      businessSector.title='Education & Learning';
      businessSector.code='EDUCATION_AND_LEARNING';
      businessSector.displayOrder=7;
      createBusinessSector =await businessSectorRepo
          .exists({_code: 'EDUCATION_AND_LEARNING'});
      if (createBusinessSector===false) {
        await businessSectorRepo.save(businessSector);
      }

      businessSector =businessSectorRepo.newEntity();
      businessSector.title='Entertainment - Adult';
      businessSector.code='ENTERTAINMENT_ADULT';
      businessSector.displayOrder=8;
      createBusinessSector =await businessSectorRepo
          .exists({_code: 'ENTERTAINMENT_ADULT'});
      if (createBusinessSector===false) {
        await businessSectorRepo.save(businessSector);
      }

      businessSector =businessSectorRepo.newEntity();
      businessSector.title='Events & Entertainment';
      businessSector.code='EVENTS_AND_ENTERTAINMENT';
      businessSector.displayOrder=9;
      createBusinessSector =await businessSectorRepo
          .exists({_code: 'EVENTS_AND_ENTERTAINMENT'});
      if (createBusinessSector===false) {
        await businessSectorRepo.save(businessSector);
      }

      businessSector =businessSectorRepo.newEntity();
      businessSector.title='Financial Services';
      businessSector.code='FINANCIAL_SERVICES';
      businessSector.displayOrder=10;
      createBusinessSector =await businessSectorRepo
          .exists({_code: 'FINANCIAL_SERVICES'});
      if (createBusinessSector===false) {
        await businessSectorRepo.save(businessSector);
      }

      businessSector =businessSectorRepo.newEntity();
      businessSector.title='Gambling, Betting & Online Gaming';
      businessSector.code='GAMBLING_BETTING_AND_ONLINE_GAMING';
      businessSector.displayOrder=11;
      createBusinessSector =await businessSectorRepo
          .exists({_code: 'GAMBLING_BETTING_AND_ONLINE_GAMING'});
      if (createBusinessSector===false) {
        await businessSectorRepo.save(businessSector);
      }

      businessSector =businessSectorRepo.newEntity();
      businessSector.title='Health & Beauty';
      businessSector.code='HEALTH_AND_BEAUTY';
      businessSector.displayOrder=12;
      createBusinessSector =await businessSectorRepo
          .exists({_code: 'HEALTH_AND_BEAUTY'});
      if (createBusinessSector===false) {
        await businessSectorRepo.save(businessSector);
      }

      businessSector =businessSectorRepo.newEntity();
      businessSector.title='IT Services';
      businessSector.code='IT_SERVICES';
      businessSector.displayOrder=13;
      createBusinessSector =await businessSectorRepo
          .exists({_code: 'IT_SERVICES'});
      if (createBusinessSector===false) {
        await businessSectorRepo.save(businessSector);
      }

      businessSector =businessSectorRepo.newEntity();
      businessSector.title='Jewellery, Precious Metals & Stones';
      businessSector.code='JEWELLERY_PRECIOUS_METALS_AND_STONES';
      businessSector.displayOrder=14;
      createBusinessSector =await businessSectorRepo
          .exists({_code: 'JEWELLERY_PRECIOUS_METALS_AND_STONES'});
      if (createBusinessSector===false) {
        await businessSectorRepo.save(businessSector);
      }

      businessSector =businessSectorRepo.newEntity();
      businessSector.title='Legal Services';
      businessSector.code='LEGAL_SERVICES';
      businessSector.displayOrder=15;
      createBusinessSector =await businessSectorRepo
          .exists({_code: 'LEGAL_SERVICES'});
      if (createBusinessSector===false) {
        await businessSectorRepo.save(businessSector);
      }

      businessSector =businessSectorRepo.newEntity();
      businessSector.title='Manufacturing';
      businessSector.code='MANUFACTURING';
      businessSector.displayOrder=16;
      createBusinessSector =await businessSectorRepo
          .exists({_code: 'MANUFACTURING'});
      if (createBusinessSector===false) {
        await businessSectorRepo.save(businessSector);
      }

      businessSector =businessSectorRepo.newEntity();
      businessSector.title='Media & Communication';
      businessSector.code='MEDIA_AND_COMMUNICATION';
      businessSector.displayOrder=17;
      createBusinessSector =await businessSectorRepo
          .exists({_code: 'MEDIA_AND_COMMUNICATION'});
      if (createBusinessSector===false) {
        await businessSectorRepo.save(businessSector);
      }

      businessSector =businessSectorRepo.newEntity();
      businessSector.title='Military & Semi-Military Goods & Services';
      businessSector.code='MILITARY_AND_SEMI-MILITARY_GOODS_AND_SERVICES';
      businessSector.displayOrder=18;
      createBusinessSector =await businessSectorRepo
          .exists({_code: 'MILITARY_AND_SEMI-MILITARY_GOODS_AND_SERVICES'});
      if (createBusinessSector===false) {
        await businessSectorRepo.save(businessSector);
      }

      businessSector =businessSectorRepo.newEntity();
      businessSector.title='Pharmaceuticals, Medical & Dietary Supplements';
      businessSector.code='PHARMACEUTICALS_MEDICAL_AND_DIETARY_SUPPLEMENTS';
      businessSector.displayOrder=19;
      createBusinessSector =await businessSectorRepo
          .exists({_code: 'PHARMACEUTICALS_MEDICAL_AND_DIETARY_SUPPLEMENTS'});
      if (createBusinessSector===false) {
        await businessSectorRepo.save(businessSector);
      }

      businessSector =businessSectorRepo.newEntity();
      businessSector.title='Public Services';
      businessSector.code='PUBLIC_SERVICES';
      businessSector.displayOrder=20;
      createBusinessSector =await businessSectorRepo
          .exists({_code: 'PUBLIC_SERVICES'});
      if (createBusinessSector===false) {
        await businessSectorRepo.save(businessSector);
      }

      businessSector =businessSectorRepo.newEntity();
      businessSector.title='Real Estate & Construction';
      businessSector.code='REAL_ESTATE_AND_CONSTRUCTION';
      businessSector.displayOrder=21;
      createBusinessSector =await businessSectorRepo
          .exists({_code: 'REAL_ESTATE_AND_CONSTRUCTION'});
      if (createBusinessSector===false) {
        await businessSectorRepo.save(businessSector);
      }

      businessSector =businessSectorRepo.newEntity();
      businessSector.title='Restaurants & Catering';
      businessSector.code='RESTAURANTS_AND_CATERING';
      businessSector.displayOrder=22;
      createBusinessSector =await businessSectorRepo
          .exists({_code: 'RESTAURANTS_AND_CATERING'});
      if (createBusinessSector===false) {
        await businessSectorRepo.save(businessSector);
      }

      businessSector =businessSectorRepo.newEntity();
      businessSector.title='Retail & Trade';
      businessSector.code='RETAIL_AND_TRADE';
      businessSector.displayOrder=23;
      createBusinessSector =await businessSectorRepo
          .exists({_code: 'RETAIL_AND_TRADE'});
      if (createBusinessSector===false) {
        await businessSectorRepo.save(businessSector);
      }

      businessSector =businessSectorRepo.newEntity();
      businessSector.title='Sports';
      businessSector.code='SPORTS';
      businessSector.displayOrder=24;
      createBusinessSector =await businessSectorRepo.exists({_code: 'SPORTS'});
      if (createBusinessSector===false) {
        await businessSectorRepo.save(businessSector);
      }

      businessSector =businessSectorRepo.newEntity();
      businessSector.title='Tobacco & Alcohol';
      businessSector.code='TOBACCO_AND_ALCOHOL';
      businessSector.displayOrder=25;
      createBusinessSector =await businessSectorRepo
          .exists({_code: 'TOBACCO_AND_ALCOHOL'});
      if (createBusinessSector===false) {
        await businessSectorRepo.save(businessSector);
      }

      businessSector =businessSectorRepo.newEntity();
      businessSector.title='Transport Services';
      businessSector.code='TRANSPORT_SERVICES';
      businessSector.displayOrder=26;
      createBusinessSector =await businessSectorRepo
          .exists({_code: 'TRANSPORT_SERVICES'});
      if (createBusinessSector===false) {
        await businessSectorRepo.save(businessSector);
      }

      businessSector =businessSectorRepo.newEntity();
      businessSector.title='Travel';
      businessSector.code='TRAVEL';
      businessSector.displayOrder=27;
      createBusinessSector =await businessSectorRepo.exists({_code: 'TRAVEL'});
      if (createBusinessSector===false) {
        await businessSectorRepo.save(businessSector);
      }

      console.log('BusinessSectors Seed Inserted');
    } catch (error) {
      console.log(error);
    }
  }
}
