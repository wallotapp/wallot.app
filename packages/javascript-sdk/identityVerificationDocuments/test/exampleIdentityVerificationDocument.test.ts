import {
	IdentityVerificationDocument,
	identityVerificationDocumentsApi,
} from '../models/index.js';

describe('IdentityVerificationDocument', () => {
	test('exampleIdentityVerificationDocument', () => {
		const { apiResourceDefaultJson } = identityVerificationDocumentsApi;
		const exampleIdentityVerificationDocument: IdentityVerificationDocument = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My IdentityVerificationDocument',
			user: '',
		};
		expect(exampleIdentityVerificationDocument).toEqual<
			typeof exampleIdentityVerificationDocument
		>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'identity_verification_document',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My IdentityVerificationDocument',
			user: '',
		});
	});
});
