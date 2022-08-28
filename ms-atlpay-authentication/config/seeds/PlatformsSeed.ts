import {getConnection} from 'typeorm';
import {Platform} from '../../src/model/entity/Platform';
import {RepositoryParameter} from '../../src/model/repository/AppRepository';
import {Platforms} from '../../src/model/repository/Platforms';
import {ormDBName} from '../bootstrap';
/**
 * Platform seed.
 * @class
 */
export class PlatformsSeed {
  /**
   * Run Method.
   * Write your database seeder using this method.
   * @return{void}
   */
  public async run(): Promise<void> {
    try {
      const dbName:any=ormDBName;
      const platformParameter: RepositoryParameter = new RepositoryParameter(
          'Platform',
          Platform,
          dbName,
          'none',
          getConnection(dbName),
      );
      const platformRepo: Platforms = new Platforms(platformParameter);
      platformRepo.initializeAssociations();
      let platform: Platform = platformRepo.newEntity();
      platform.code='WWW';
      platform.iconClass='mdi mdi-desktop-mac';
      platform.title='Website';
      platform.description=`This is frontend of this software application and 
      your customer intract with your application using a web browser`;
      platform.emailVerificationUrl = '';
      platform.emailChangeConfirmationUrl = '';
      platform.forgetPasswordUrl = '';
      platform.resetPasswordUrl = 'www.reset.com';
      platform.documentUploadUrl = 'www.document.com';
      platform.whiteListedIpAddress = '127.0.0.1';
      platform.isEnable = true;
      let createPlatform:boolean=await
      platformRepo.exists({_code: 'WWW'});
      if (createPlatform===false) {
        await platformRepo.save(platform);
      }

      platform = platformRepo.newEntity();
      platform.code='APP';
      platform.iconClass='mdi mdi-cellphone-iphone';
      platform.title='Mobile Applications';
      platform.description=`This is frontend of this software 
                  application and your customers intract with your 
                  application with developed mobile apps.`;
      platform.emailVerificationUrl = '';
      platform.emailChangeConfirmationUrl = '';
      platform.forgetPasswordUrl = '';
      platform.resetPasswordUrl = 'www.reset.com';
      platform.documentUploadUrl = 'www.document.com';
      platform.whiteListedIpAddress = '127.0.0.1';
      platform.isEnable = true;
      createPlatform=await
      platformRepo.exists({_code: 'APP'});
      if (createPlatform===false) {
        await platformRepo.save(platform);
      }
      console.log('Platform Seed Inserted');
    } catch (error) {
      console.log(error);
    }
  }
}
