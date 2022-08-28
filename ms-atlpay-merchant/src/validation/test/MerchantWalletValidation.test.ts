import express, {NextFunction, Request, Response} from 'express';
import supertest from 'supertest';
import bodyParser from 'body-parser';
import {MerchantWalletValidation} from '../MerchantWalletValidation';
const app: express.Application = express();
app.use(bodyParser.json());

app.post('/test-merchant-wallet',
    new MerchantWalletValidation('Merchant Wallet Validation')
        .validationChain,
    new MerchantWalletValidation('Merchant Wallet Validation')
        .validationErrorHandle,
    (req: Request, res: Response, next: NextFunction) => {
      res.send('Success');
    },
);
app.get('/test-merchant-wallet/:id',
    new MerchantWalletValidation('MerchantWalletValidation')
        .paramValidateChain,
    new MerchantWalletValidation('MerchantWalletValidation')
        .validationErrorHandle,
    (req: Request, res: Response, next: NextFunction) => {
      res.send('Success');
    },
);
app.put('/test-update-merchant-wallet/:id',
    new MerchantWalletValidation('MerchantWalletValidation')
        .updateValidationChanin,
    new MerchantWalletValidation('MerchantWalletValidation')
        .validationErrorHandle,
    (req: Request, res: Response, next: NextFunction) => {
      res.send('Success');
    },
);

const testApp = supertest(app);

describe('Test Merchant Wallet Param', () => {
  test('Correct Param of Merchant Wallet', async () => {
    const response = await testApp
    // eslint-disable-next-line
      .get('/test-merchant-wallet/06411238-131a-42dd-b716-81adb2d834c4');
    expect(response.text).toEqual('Success');
  });
});

describe(' Test Merchant Wallet Validation', () => {
  test('Correct input of Merchant Wallet', async () => {
    const requestMerchantWallet = {
      'credit': 20,
      'balance': 5000,
      'remote_balance': 100,
      'recomended_balance': 500,
      'merchant_wallets_is_primary': true,
    };
    const response = await testApp
        .post('/test-merchant-wallet')
        .send(requestMerchantWallet);
    expect(response.text).toEqual('Success');

    const requestMerchantWallet1 = {
      'credit': 20.205,
      'balance': 5000.10,
      'remote_balance': 100.30,
      'recomended_balance': 500.62,
      'merchant_wallets_is_primary': false,
    };
    const response1 = await testApp
        .post('/test-merchant-wallet')
        .send(requestMerchantWallet1);
    expect(response1.text).toEqual('Success');
  });
  test('Empty input of Merchant Wallet', async () => {
    const requestMerchantWallet = {

    };
    const response = await testApp
        .post('/test-merchant-wallet')
        .send(requestMerchantWallet);
    expect(response.body).toBeDefined();
    expect(response.body.success).toBeDefined();
    expect(response.body.success).toEqual(false);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors.error)
    // eslint-disable-next-line
        .toEqual(`Merchant Wallet Credit Should not be Empty. Merchant Wallet Balance Should not be Empty. Merchant Wallet Remote Balance Should not be Empty. Merchant Wallet Recomended Balance Should not be Empty. Merchant Wallet Merchant Wallet isPrimary Flag Should not be Empty.`);
  });

  test('Test Cases for Merchant Wallet Credit', async () => {
    const invalidMerchantWallet1 = {
      'balance': 5000,
      'remote_balance': 100,
      'recomended_balance': 500,
      'merchant_wallets_is_primary': false,
    };
    const response1 = await testApp
        .post('/test-merchant-wallet')
        .send(invalidMerchantWallet1);
    expect(response1.body).toBeDefined();
    expect(response1.body.success).toBeDefined();
    expect(response1.body.success).toEqual(false);
    expect(response1.body.errors).toBeDefined();
    expect(response1.body.errors.error)
        .toEqual(`Merchant Wallet Credit Should not be Empty.`);

    const invalidMerchantWallet2 = {
      'credit': 'creadit',
      'balance': 5000,
      'remote_balance': 100,
      'recomended_balance': 500,
      'merchant_wallets_is_primary': false,
    };
    const response2 = await testApp
        .post('/test-merchant-wallet')
        .send(invalidMerchantWallet2);
    expect(response2.body).toBeDefined();
    expect(response2.body.success).toBeDefined();
    expect(response2.body.success).toEqual(false);
    expect(response2.body.errors).toBeDefined();
    expect(response2.body.errors.error)
    // eslint-disable-next-line
        .toEqual(`Merchant Wallet Credit should be Numeric and Non-Zero Value.`);

    const invalidMerchant5 = {
      'credit': 0,
      'balance': 5000,
      'remote_balance': 104,
      'recomended_balance': 500,
      'merchant_wallets_is_primary': false,
    };
    const response5 = await testApp
        .post('/test-merchant-wallet')
        .send(invalidMerchant5);
    expect(response5.body).toBeDefined();
    expect(response5.body.success).toBeDefined();
    expect(response5.body.success).toEqual(false);
    expect(response5.body.errors).toBeDefined();
    expect(response5.body.errors.error)
    // eslint-disable-next-line
        .toEqual(`Merchant Wallet Credit should be Numeric and Non-Zero Value.`);

    const invalidMerchant6 = {
      'credit': 0.00,
      'balance': 5000,
      'remote_balance': 104,
      'recomended_balance': 500,
      'merchant_wallets_is_primary': false,
    };
    const response6 = await testApp
        .post('/test-merchant-wallet')
        .send(invalidMerchant6);
    expect(response6.body).toBeDefined();
    expect(response6.body.success).toBeDefined();
    expect(response6.body.success).toEqual(false);
    expect(response6.body.errors).toBeDefined();
    expect(response6.body.errors.error)
    // eslint-disable-next-line
        .toEqual(`Merchant Wallet Credit should be Numeric and Non-Zero Value.`);

    const invalidMerchant7 = {
      'credit': -200,
      'balance': 5000,
      'remote_balance': 104,
      'recomended_balance': 500,
      'merchant_wallets_is_primary': false,
    };
    const response7 = await testApp
        .post('/test-merchant-wallet')
        .send(invalidMerchant7);
    expect(response7.body).toBeDefined();
    expect(response7.body.success).toBeDefined();
    expect(response7.body.success).toEqual(false);
    expect(response7.body.errors).toBeDefined();
    expect(response7.body.errors.error)
    // eslint-disable-next-line
        .toEqual(`Merchant Wallet Credit should be Numeric and Non-Zero Value.`);
  });

  test('Test Cases for Merchant Wallet Balance', async () => {
    const invalidMerchantWallet1 = {
      'credit': 5000,
      'remote_balance': 100,
      'recomended_balance': 500,
      'merchant_wallets_is_primary': false,
    };
    const response1 = await testApp
        .post('/test-merchant-wallet')
        .send(invalidMerchantWallet1);
    expect(response1.body).toBeDefined();
    expect(response1.body.success).toBeDefined();
    expect(response1.body.success).toEqual(false);
    expect(response1.body.errors).toBeDefined();
    expect(response1.body.errors.error)
        .toEqual(`Merchant Wallet Balance Should not be Empty.`);

    const invalidMerchantWallet2 = {
      'credit': 600,
      'balance': 'creadit',
      'remote_balance': 100,
      'recomended_balance': 500,
      'merchant_wallets_is_primary': false,
    };
    const response2 = await testApp
        .post('/test-merchant-wallet')
        .send(invalidMerchantWallet2);
    expect(response2.body).toBeDefined();
    expect(response2.body.success).toBeDefined();
    expect(response2.body.success).toEqual(false);
    expect(response2.body.errors).toBeDefined();
    expect(response2.body.errors.error)
    // eslint-disable-next-line
        .toEqual(`Merchant Wallet Balance should be Numeric and Non-Zero Value.`);

    const invalidMerchant5 = {
      'credit': 100,
      'balance': 0,
      'remote_balance': 104,
      'recomended_balance': 500,
      'merchant_wallets_is_primary': false,
    };
    const response5 = await testApp
        .post('/test-merchant-wallet')
        .send(invalidMerchant5);
    expect(response5.body).toBeDefined();
    expect(response5.body.success).toBeDefined();
    expect(response5.body.success).toEqual(false);
    expect(response5.body.errors).toBeDefined();
    expect(response5.body.errors.error)
    // eslint-disable-next-line
        .toEqual(`Merchant Wallet Balance should be Numeric and Non-Zero Value.`);

    const invalidMerchant6 = {
      'credit': 5500,
      'balance': 0.00,
      'remote_balance': 104,
      'recomended_balance': 500,
      'merchant_wallets_is_primary': false,
    };
    const response6 = await testApp
        .post('/test-merchant-wallet')
        .send(invalidMerchant6);
    expect(response6.body).toBeDefined();
    expect(response6.body.success).toBeDefined();
    expect(response6.body.success).toEqual(false);
    expect(response6.body.errors).toBeDefined();
    expect(response6.body.errors.error)
    // eslint-disable-next-line
        .toEqual(`Merchant Wallet Balance should be Numeric and Non-Zero Value.`);

    const invalidMerchant7 = {
      'credit': 200,
      'balance': -5000,
      'remote_balance': 104,
      'recomended_balance': 500,
      'merchant_wallets_is_primary': false,
    };
    const response7 = await testApp
        .post('/test-merchant-wallet')
        .send(invalidMerchant7);
    expect(response7.body).toBeDefined();
    expect(response7.body.success).toBeDefined();
    expect(response7.body.success).toEqual(false);
    expect(response7.body.errors).toBeDefined();
    expect(response7.body.errors.error)
    // eslint-disable-next-line
        .toEqual(`Merchant Wallet Balance should be Numeric and Non-Zero Value.`);
  });

  test('Test Cases for Merchant Wallet Remote Balance', async () => {
    const invalidMerchantWallet1 = {
      'credit': 5000,
      'balance': 100,
      'recomended_balance': 500,
      'merchant_wallets_is_primary': false,
    };
    const response1 = await testApp
        .post('/test-merchant-wallet')
        .send(invalidMerchantWallet1);
    expect(response1.body).toBeDefined();
    expect(response1.body.success).toBeDefined();
    expect(response1.body.success).toEqual(false);
    expect(response1.body.errors).toBeDefined();
    expect(response1.body.errors.error)
        .toEqual(`Merchant Wallet Remote Balance Should not be Empty.`);

    const invalidMerchantWallet2 = {
      'credit': 600,
      'balance': 500,
      'remote_balance': 'credit',
      'recomended_balance': 500,
      'merchant_wallets_is_primary': false,
    };
    const response2 = await testApp
        .post('/test-merchant-wallet')
        .send(invalidMerchantWallet2);
    expect(response2.body).toBeDefined();
    expect(response2.body.success).toBeDefined();
    expect(response2.body.success).toEqual(false);
    expect(response2.body.errors).toBeDefined();
    expect(response2.body.errors.error)
    // eslint-disable-next-line
        .toEqual(`Merchant Wallet Remote Balance should be Numeric and Non-Zero Value.`);

    const invalidMerchant5 = {
      'credit': 100,
      'balance': 120,
      'remote_balance': 0,
      'recomended_balance': 500,
      'merchant_wallets_is_primary': false,
    };
    const response5 = await testApp
        .post('/test-merchant-wallet')
        .send(invalidMerchant5);
    expect(response5.body).toBeDefined();
    expect(response5.body.success).toBeDefined();
    expect(response5.body.success).toEqual(false);
    expect(response5.body.errors).toBeDefined();
    expect(response5.body.errors.error)
    // eslint-disable-next-line
        .toEqual(`Merchant Wallet Remote Balance should be Numeric and Non-Zero Value.`);

    const invalidMerchant6 = {
      'credit': 5500,
      'balance': 600,
      'remote_balance': 0.00,
      'recomended_balance': 500,
      'merchant_wallets_is_primary': false,
    };
    const response6 = await testApp
        .post('/test-merchant-wallet')
        .send(invalidMerchant6);
    expect(response6.body).toBeDefined();
    expect(response6.body.success).toBeDefined();
    expect(response6.body.success).toEqual(false);
    expect(response6.body.errors).toBeDefined();
    expect(response6.body.errors.error)
    // eslint-disable-next-line
        .toEqual(`Merchant Wallet Remote Balance should be Numeric and Non-Zero Value.`);

    const invalidMerchant7 = {
      'credit': 200,
      'balance': 5000,
      'remote_balance': -104,
      'recomended_balance': 500,
      'merchant_wallets_is_primary': false,
    };
    const response7 = await testApp
        .post('/test-merchant-wallet')
        .send(invalidMerchant7);
    expect(response7.body).toBeDefined();
    expect(response7.body.success).toBeDefined();
    expect(response7.body.success).toEqual(false);
    expect(response7.body.errors).toBeDefined();
    expect(response7.body.errors.error)
    // eslint-disable-next-line
        .toEqual(`Merchant Wallet Remote Balance should be Numeric and Non-Zero Value.`);
  });

  test('Test Cases for Merchant Wallet Recomended Balance', async () => {
    const invalidMerchantWallet1 = {
      'credit': 5000,
      'balance': 100,
      'remote_balance': 500,
      'merchant_wallets_is_primary': false,
    };
    const response1 = await testApp
        .post('/test-merchant-wallet')
        .send(invalidMerchantWallet1);
    expect(response1.body).toBeDefined();
    expect(response1.body.success).toBeDefined();
    expect(response1.body.success).toEqual(false);
    expect(response1.body.errors).toBeDefined();
    expect(response1.body.errors.error)
    // eslint-disable-next-line
        .toEqual(`Merchant Wallet Recomended Balance Should not be Empty.`);

    const invalidMerchantWallet2 = {
      'credit': 600,
      'balance': 500,
      'remote_balance': 400,
      'recomended_balance': 'credit',
      'merchant_wallets_is_primary': false,
    };
    const response2 = await testApp
        .post('/test-merchant-wallet')
        .send(invalidMerchantWallet2);
    expect(response2.body).toBeDefined();
    expect(response2.body.success).toBeDefined();
    expect(response2.body.success).toEqual(false);
    expect(response2.body.errors).toBeDefined();
    expect(response2.body.errors.error)
    // eslint-disable-next-line
        .toEqual(`Merchant Wallet Recomended Balance should be Numeric and Non-Zero Value.`);

    const invalidMerchant5 = {
      'credit': 100,
      'balance': 120,
      'remote_balance': 770,
      'recomended_balance': 0,
      'merchant_wallets_is_primary': false,
    };
    const response5 = await testApp
        .post('/test-merchant-wallet')
        .send(invalidMerchant5);
    expect(response5.body).toBeDefined();
    expect(response5.body.success).toBeDefined();
    expect(response5.body.success).toEqual(false);
    expect(response5.body.errors).toBeDefined();
    expect(response5.body.errors.error)
    // eslint-disable-next-line
        .toEqual(`Merchant Wallet Recomended Balance should be Numeric and Non-Zero Value.`);

    const invalidMerchant6 = {
      'credit': 5500,
      'balance': 600,
      'remote_balance': 400,
      'recomended_balance': 0.00,
      'merchant_wallets_is_primary': false,
    };
    const response6 = await testApp
        .post('/test-merchant-wallet')
        .send(invalidMerchant6);
    expect(response6.body).toBeDefined();
    expect(response6.body.success).toBeDefined();
    expect(response6.body.success).toEqual(false);
    expect(response6.body.errors).toBeDefined();
    expect(response6.body.errors.error)
    // eslint-disable-next-line
        .toEqual(`Merchant Wallet Recomended Balance should be Numeric and Non-Zero Value.`);

    const invalidMerchant7 = {
      'credit': 200,
      'balance': 5000,
      'remote_balance': 104,
      'recomended_balance': -500,
      'merchant_wallets_is_primary': false,
    };
    const response7 = await testApp
        .post('/test-merchant-wallet')
        .send(invalidMerchant7);
    expect(response7.body).toBeDefined();
    expect(response7.body.success).toBeDefined();
    expect(response7.body.success).toEqual(false);
    expect(response7.body.errors).toBeDefined();
    expect(response7.body.errors.error)
    // eslint-disable-next-line
        .toEqual(`Merchant Wallet Recomended Balance should be Numeric and Non-Zero Value.`);
  });

  test('Test cases for Merchant Wallet isPrimary', async ()=>{
    const invalidMerchantWallet1 = {
      'credit': 5000,
      'balance': 501,
      'remote_balance': 100,
      'recomended_balance': 500,
    };
    const response1 = await testApp
        .post('/test-merchant-wallet')
        .send(invalidMerchantWallet1);
    expect(response1.body).toBeDefined();
    expect(response1.body.success).toBeDefined();
    expect(response1.body.success).toEqual(false);
    expect(response1.body.errors).toBeDefined();
    expect(response1.body.errors.error)
    // eslint-disable-next-line
        .toEqual(`Merchant Wallet Merchant Wallet isPrimary Flag Should not be Empty.`);

    const invalidMerchantWallet2 = {
      'credit': 200,
      'balance': 500,
      'remote_balance': 100,
      'recomended_balance': 500,
      'merchant_wallets_is_primary': 'abcd',
    };
    const response2 = await testApp
        .post('/test-merchant-wallet')
        .send(invalidMerchantWallet2);
    expect(response2.body).toBeDefined();
    expect(response2.body.success).toBeDefined();
    expect(response2.body.success).toEqual(false);
    expect(response2.body.errors).toBeDefined();
    expect(response2.body.errors.error)
        .toEqual(
            `Merchant Wallet isPrimary Flag Should be True or False.`);

    const invalidMerchant5 = {
      'credit': 5000,
      'balance': 15451,
      'remote_balance': 100,
      'recomended_balance': 500,
      'merchant_wallets_is_primary': 1154,
    };
    const response5 = await testApp
        .post('/test-merchant-wallet')
        .send(invalidMerchant5);
    expect(response5.body).toBeDefined();
    expect(response5.body.success).toBeDefined();
    expect(response5.body.success).toEqual(false);
    expect(response5.body.errors).toBeDefined();
    expect(response5.body.errors.error)
        .toEqual(`Merchant Wallet isPrimary Flag Should be True or False.`);
  });

  describe(' Update Merchant Wallet Validation', () => {
    test('Correct input of Merchant Wallet', async () => {
      const requestMerchantWallet = {
        'credit': 20,
        'balance': 5000,
        'remote_balance': 100,
        'recomended_balance': 500,
        'merchant_wallets_is_primary': true,
      };
      const response = await testApp
      // eslint-disable-next-line
          .put('/test-update-merchant-wallet/06411238-131a-42dd-b716-81adb2d834c4')
          .send(requestMerchantWallet);
      expect(response.text).toEqual('Success');

      const requestMerchantWallet1 = {
        'credit': 20.205,
        'balance': 5000.10,
        'remote_balance': 100.30,
        'recomended_balance': 500.62,
        'merchant_wallets_is_primary': false,
      };
      const response1 = await testApp
      // eslint-disable-next-line
          .put('/test-update-merchant-wallet/06411238-131a-42dd-b716-81adb2d834c4')
          .send(requestMerchantWallet1);
      expect(response1.text).toEqual('Success');
    });

    test('Test Cases for Merchant Wallet Credit', async () => {
      const invalidMerchantWallet1 = {
        'balance': 5000,
        'remote_balance': 100,
        'recomended_balance': 500,
        'merchant_wallets_is_primary': false,
      };
      const response1 = await testApp
      // eslint-disable-next-line
          .put('/test-update-merchant-wallet/06411238-131a-42dd-b716-81adb2d834c4')
          .send(invalidMerchantWallet1);
      expect(response1.body.success).toEqual(undefined);

      const invalidMerchantWallet2 = {
        'credit': 'creadit',
        'balance': 5000,
        'remote_balance': 100,
        'recomended_balance': 500,
        'merchant_wallets_is_primary': false,
      };
      const response2 = await testApp
      // eslint-disable-next-line
          .put('/test-update-merchant-wallet/06411238-131a-42dd-b716-81adb2d834c4')
          .send(invalidMerchantWallet2);
      expect(response2.body).toBeDefined();
      expect(response2.body.success).toBeDefined();
      expect(response2.body.success).toEqual(false);
      expect(response2.body.errors).toBeDefined();
      expect(response2.body.errors.error)
      // eslint-disable-next-line
          .toEqual(`Merchant Wallet Credit should be Numeric and Non-Zero Value.`);

      const invalidMerchant5 = {
        'credit': 0,
        'balance': 5000,
        'remote_balance': 104,
        'recomended_balance': 500,
        'merchant_wallets_is_primary': false,
      };
      const response5 = await testApp
      // eslint-disable-next-line
          .put('/test-update-merchant-wallet/06411238-131a-42dd-b716-81adb2d834c4')
          .send(invalidMerchant5);
      expect(response5.body).toBeDefined();
      expect(response5.body.success).toBeDefined();
      expect(response5.body.success).toEqual(false);
      expect(response5.body.errors).toBeDefined();
      expect(response5.body.errors.error)
      // eslint-disable-next-line
          .toEqual(`Merchant Wallet Credit should be Numeric and Non-Zero Value.`);

      const invalidMerchant6 = {
        'credit': 0.00,
        'balance': 5000,
        'remote_balance': 104,
        'recomended_balance': 500,
        'merchant_wallets_is_primary': false,
      };
      const response6 = await testApp
      // eslint-disable-next-line
          .put('/test-update-merchant-wallet/06411238-131a-42dd-b716-81adb2d834c4')
          .send(invalidMerchant6);
      expect(response6.body).toBeDefined();
      expect(response6.body.success).toBeDefined();
      expect(response6.body.success).toEqual(false);
      expect(response6.body.errors).toBeDefined();
      expect(response6.body.errors.error)
      // eslint-disable-next-line
          .toEqual(`Merchant Wallet Credit should be Numeric and Non-Zero Value.`);

      const invalidMerchant7 = {
        'credit': -200,
        'balance': 5000,
        'remote_balance': 104,
        'recomended_balance': 500,
        'merchant_wallets_is_primary': false,
      };
      const response7 = await testApp
      // eslint-disable-next-line
          .put('/test-update-merchant-wallet/06411238-131a-42dd-b716-81adb2d834c4')
          .send(invalidMerchant7);
      expect(response7.body).toBeDefined();
      expect(response7.body.success).toBeDefined();
      expect(response7.body.success).toEqual(false);
      expect(response7.body.errors).toBeDefined();
      expect(response7.body.errors.error)
      // eslint-disable-next-line
          .toEqual(`Merchant Wallet Credit should be Numeric and Non-Zero Value.`);
    });

    test('Test Cases for Merchant Wallet Balance', async () => {
      const invalidMerchantWallet1 = {
        'credit': 5000,
        'remote_balance': 100,
        'recomended_balance': 500,
        'merchant_wallets_is_primary': false,
      };
      const response1 = await testApp
      // eslint-disable-next-line
          .put('/test-update-merchant-wallet/06411238-131a-42dd-b716-81adb2d834c4')
          .send(invalidMerchantWallet1);
      expect(response1.body.success).toEqual(undefined);

      const invalidMerchantWallet2 = {
        'credit': 600,
        'balance': 'creadit',
        'remote_balance': 100,
        'recomended_balance': 500,
        'merchant_wallets_is_primary': false,
      };
      const response2 = await testApp
      // eslint-disable-next-line
          .put('/test-update-merchant-wallet/06411238-131a-42dd-b716-81adb2d834c4')
          .send(invalidMerchantWallet2);
      expect(response2.body).toBeDefined();
      expect(response2.body.success).toBeDefined();
      expect(response2.body.success).toEqual(false);
      expect(response2.body.errors).toBeDefined();
      expect(response2.body.errors.error)
      // eslint-disable-next-line
          .toEqual(`Merchant Wallet Balance should be Numeric and Non-Zero Value.`);

      const invalidMerchant5 = {
        'credit': 100,
        'balance': 0,
        'remote_balance': 104,
        'recomended_balance': 500,
        'merchant_wallets_is_primary': false,
      };
      const response5 = await testApp
      // eslint-disable-next-line
          .put('/test-update-merchant-wallet/06411238-131a-42dd-b716-81adb2d834c4')
          .send(invalidMerchant5);
      expect(response5.body).toBeDefined();
      expect(response5.body.success).toBeDefined();
      expect(response5.body.success).toEqual(false);
      expect(response5.body.errors).toBeDefined();
      expect(response5.body.errors.error)
      // eslint-disable-next-line
          .toEqual(`Merchant Wallet Balance should be Numeric and Non-Zero Value.`);

      const invalidMerchant6 = {
        'credit': 5500,
        'balance': 0.00,
        'remote_balance': 104,
        'recomended_balance': 500,
        'merchant_wallets_is_primary': false,
      };
      const response6 = await testApp
      // eslint-disable-next-line
          .put('/test-update-merchant-wallet/06411238-131a-42dd-b716-81adb2d834c4')
          .send(invalidMerchant6);
      expect(response6.body).toBeDefined();
      expect(response6.body.success).toBeDefined();
      expect(response6.body.success).toEqual(false);
      expect(response6.body.errors).toBeDefined();
      expect(response6.body.errors.error)
      // eslint-disable-next-line
          .toEqual(`Merchant Wallet Balance should be Numeric and Non-Zero Value.`);

      const invalidMerchant7 = {
        'credit': 200,
        'balance': -5000,
        'remote_balance': 104,
        'recomended_balance': 500,
        'merchant_wallets_is_primary': false,
      };
      const response7 = await testApp
      // eslint-disable-next-line
          .put('/test-update-merchant-wallet/06411238-131a-42dd-b716-81adb2d834c4')
          .send(invalidMerchant7);
      expect(response7.body).toBeDefined();
      expect(response7.body.success).toBeDefined();
      expect(response7.body.success).toEqual(false);
      expect(response7.body.errors).toBeDefined();
      expect(response7.body.errors.error)
      // eslint-disable-next-line
          .toEqual(`Merchant Wallet Balance should be Numeric and Non-Zero Value.`);
    });

    test('Test Cases for Merchant Wallet Remote Balance', async () => {
      const invalidMerchantWallet1 = {
        'credit': 5000,
        'balance': 100,
        'recomended_balance': 500,
        'merchant_wallets_is_primary': false,
      };
      const response1 = await testApp
      // eslint-disable-next-line
          .put('/test-update-merchant-wallet/06411238-131a-42dd-b716-81adb2d834c4')
          .send(invalidMerchantWallet1);
      expect(response1.body.success).toEqual(undefined);

      const invalidMerchantWallet2 = {
        'credit': 600,
        'balance': 500,
        'remote_balance': 'credit',
        'recomended_balance': 500,
        'merchant_wallets_is_primary': false,
      };
      const response2 = await testApp
      // eslint-disable-next-line
          .put('/test-update-merchant-wallet/06411238-131a-42dd-b716-81adb2d834c4')
          .send(invalidMerchantWallet2);
      expect(response2.body).toBeDefined();
      expect(response2.body.success).toBeDefined();
      expect(response2.body.success).toEqual(false);
      expect(response2.body.errors).toBeDefined();
      expect(response2.body.errors.error)
      // eslint-disable-next-line
          .toEqual(`Merchant Wallet Remote Balance should be Numeric and Non-Zero Value.`);

      const invalidMerchant5 = {
        'credit': 100,
        'balance': 120,
        'remote_balance': 0,
        'recomended_balance': 500,
        'merchant_wallets_is_primary': false,
      };
      const response5 = await testApp
      // eslint-disable-next-line
          .put('/test-update-merchant-wallet/06411238-131a-42dd-b716-81adb2d834c4')
          .send(invalidMerchant5);
      expect(response5.body).toBeDefined();
      expect(response5.body.success).toBeDefined();
      expect(response5.body.success).toEqual(false);
      expect(response5.body.errors).toBeDefined();
      expect(response5.body.errors.error)
      // eslint-disable-next-line
          .toEqual(`Merchant Wallet Remote Balance should be Numeric and Non-Zero Value.`);

      const invalidMerchant6 = {
        'credit': 5500,
        'balance': 600,
        'remote_balance': 0.00,
        'recomended_balance': 500,
        'merchant_wallets_is_primary': false,
      };
      const response6 = await testApp
      // eslint-disable-next-line
          .put('/test-update-merchant-wallet/06411238-131a-42dd-b716-81adb2d834c4')
          .send(invalidMerchant6);
      expect(response6.body).toBeDefined();
      expect(response6.body.success).toBeDefined();
      expect(response6.body.success).toEqual(false);
      expect(response6.body.errors).toBeDefined();
      expect(response6.body.errors.error)
      // eslint-disable-next-line
          .toEqual(`Merchant Wallet Remote Balance should be Numeric and Non-Zero Value.`);

      const invalidMerchant7 = {
        'credit': 200,
        'balance': 5000,
        'remote_balance': -104,
        'recomended_balance': 500,
        'merchant_wallets_is_primary': false,
      };
      const response7 = await testApp
      // eslint-disable-next-line
          .put('/test-update-merchant-wallet/06411238-131a-42dd-b716-81adb2d834c4')
          .send(invalidMerchant7);
      expect(response7.body).toBeDefined();
      expect(response7.body.success).toBeDefined();
      expect(response7.body.success).toEqual(false);
      expect(response7.body.errors).toBeDefined();
      expect(response7.body.errors.error)
      // eslint-disable-next-line
          .toEqual(`Merchant Wallet Remote Balance should be Numeric and Non-Zero Value.`);
    });

    test('Test Cases for Merchant Wallet Recomended Balance', async () => {
      const invalidMerchantWallet1 = {
        'credit': 5000,
        'balance': 100,
        'remote_balance': 500,
        'merchant_wallets_is_primary': false,
      };
      const response1 = await testApp
      // eslint-disable-next-line
          .put('/test-update-merchant-wallet/06411238-131a-42dd-b716-81adb2d834c4')
          .send(invalidMerchantWallet1);
      expect(response1.body.success).toEqual(undefined);

      const invalidMerchantWallet2 = {
        'credit': 600,
        'balance': 500,
        'remote_balance': 400,
        'recomended_balance': 'credit',
        'merchant_wallets_is_primary': false,
      };
      const response2 = await testApp
      // eslint-disable-next-line
          .put('/test-update-merchant-wallet/06411238-131a-42dd-b716-81adb2d834c4')
          .send(invalidMerchantWallet2);
      expect(response2.body).toBeDefined();
      expect(response2.body.success).toBeDefined();
      expect(response2.body.success).toEqual(false);
      expect(response2.body.errors).toBeDefined();
      expect(response2.body.errors.error)
      // eslint-disable-next-line
          .toEqual(`Merchant Wallet Recomended Balance should be Numeric and Non-Zero Value.`);

      const invalidMerchant5 = {
        'credit': 100,
        'balance': 120,
        'remote_balance': 770,
        'recomended_balance': 0,
        'merchant_wallets_is_primary': false,
      };
      const response5 = await testApp
      // eslint-disable-next-line
          .put('/test-update-merchant-wallet/06411238-131a-42dd-b716-81adb2d834c4')
          .send(invalidMerchant5);
      expect(response5.body).toBeDefined();
      expect(response5.body.success).toBeDefined();
      expect(response5.body.success).toEqual(false);
      expect(response5.body.errors).toBeDefined();
      expect(response5.body.errors.error)
      // eslint-disable-next-line
          .toEqual(`Merchant Wallet Recomended Balance should be Numeric and Non-Zero Value.`);

      const invalidMerchant6 = {
        'credit': 5500,
        'balance': 600,
        'remote_balance': 400,
        'recomended_balance': 0.00,
        'merchant_wallets_is_primary': false,
      };
      const response6 = await testApp
      // eslint-disable-next-line
          .put('/test-update-merchant-wallet/06411238-131a-42dd-b716-81adb2d834c4')
          .send(invalidMerchant6);
      expect(response6.body).toBeDefined();
      expect(response6.body.success).toBeDefined();
      expect(response6.body.success).toEqual(false);
      expect(response6.body.errors).toBeDefined();
      expect(response6.body.errors.error)
      // eslint-disable-next-line
          .toEqual(`Merchant Wallet Recomended Balance should be Numeric and Non-Zero Value.`);

      const invalidMerchant7 = {
        'credit': 200,
        'balance': 5000,
        'remote_balance': 104,
        'recomended_balance': -500,
        'merchant_wallets_is_primary': false,
      };
      const response7 = await testApp
      // eslint-disable-next-line
          .put('/test-update-merchant-wallet/06411238-131a-42dd-b716-81adb2d834c4')
          .send(invalidMerchant7);
      expect(response7.body).toBeDefined();
      expect(response7.body.success).toBeDefined();
      expect(response7.body.success).toEqual(false);
      expect(response7.body.errors).toBeDefined();
      expect(response7.body.errors.error)
      // eslint-disable-next-line
          .toEqual(`Merchant Wallet Recomended Balance should be Numeric and Non-Zero Value.`);
    });

    test('Test cases for Merchant Wallet isPrimary', async ()=>{
      const invalidMerchantWallet1 = {
        'credit': 5000,
        'balance': 501,
        'remote_balance': 100,
        'recomended_balance': 500,
      };
      const response1 = await testApp
      // eslint-disable-next-line
          .put('/test-update-merchant-wallet/06411238-131a-42dd-b716-81adb2d834c4')
          .send(invalidMerchantWallet1);
      expect(response1.body.success).toEqual(undefined);

      const invalidMerchantWallet2 = {
        'credit': 200,
        'balance': 500,
        'remote_balance': 100,
        'recomended_balance': 500,
        'merchant_wallets_is_primary': 'abcd',
      };
      const response2 = await testApp
      // eslint-disable-next-line
          .put('/test-update-merchant-wallet/06411238-131a-42dd-b716-81adb2d834c4')
          .send(invalidMerchantWallet2);
      expect(response2.body).toBeDefined();
      expect(response2.body.success).toBeDefined();
      expect(response2.body.success).toEqual(false);
      expect(response2.body.errors).toBeDefined();
      expect(response2.body.errors.error)
          .toEqual(
              `Merchant Wallet isPrimary Flag Should be True or False.`);

      const invalidMerchant3 = {
        'credit': 5000,
        'balance': 15451,
        'remote_balance': 100,
        'recomended_balance': 500,
        'merchant_wallets_is_primary': 1154,
      };
      const response5 = await testApp
      // eslint-disable-next-line
          .put('/test-update-merchant-wallet/06411238-131a-42dd-b716-81adb2d834c4')
          .send(invalidMerchant3);
      expect(response5.body).toBeDefined();
      expect(response5.body.success).toBeDefined();
      expect(response5.body.success).toEqual(false);
      expect(response5.body.errors).toBeDefined();
      expect(response5.body.errors.error)
          .toEqual(`Merchant Wallet isPrimary Flag Should be True or False.`);
    });
  });
});
