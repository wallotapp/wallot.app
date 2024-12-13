import { FundingAccount, fundingAccountsApi } from '../models/index.js';

describe('FundingAccount', () => {
  test('exampleFundingAccount', () => {
    const { apiResourceDefaultJson } = fundingAccountsApi;
    const exampleFundingAccount: FundingAccount = {
      ...apiResourceDefaultJson,
      category: 'default',
      name: 'My FundingAccount',
    };
    expect(exampleFundingAccount).toEqual<typeof exampleFundingAccount>({
      _id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
      _object: 'funding_account',
      category: 'default',
      _archived: false,
      _date_created: expect.any(String),
      _deleted: false,
      description: '',
      name: 'My FundingAccount',
    });
  });
});
