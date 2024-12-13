import { Transaction, transactionsApi } from '../models/index.js';

describe('Transaction', () => {
  test('exampleTransaction', () => {
    const { apiResourceDefaultJson } = transactionsApi;
    const exampleTransaction: Transaction = {
      ...apiResourceDefaultJson,
      category: 'default',
      name: 'My Transaction',
    };
    expect(exampleTransaction).toEqual<typeof exampleTransaction>({
      _id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
      _object: 'transaction',
      category: 'default',
      _archived: false,
      _date_created: expect.any(String),
      _deleted: false,
      description: '',
      name: 'My Transaction',
    });
  });
});
