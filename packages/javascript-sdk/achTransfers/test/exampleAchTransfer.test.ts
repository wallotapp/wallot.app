import { AchTransfer, achTransfersApi } from '../models/index.js';

describe('AchTransfer', () => {
	test('exampleAchTransfer', () => {
		const { apiResourceDefaultJson } = achTransfersApi;
		const exampleAchTransfer: AchTransfer = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My AchTransfer',
			bank_account: '',
		};
		expect(exampleAchTransfer).toEqual<typeof exampleAchTransfer>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'ach_transfer',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My AchTransfer',
			bank_account: '',
		});
	});
});
