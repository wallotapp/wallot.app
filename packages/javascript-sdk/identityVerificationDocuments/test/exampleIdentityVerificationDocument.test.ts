import { IdentityVerificationDocument, identityVerificationDocumentsApi } from '../models/index.js';

describe('IdentityVerificationDocument', () => {
	test('exampleIdentityVerificationDocument', () => {
		const { apiResourceDefaultJson } = identityVerificationDocumentsApi;
		const exampleIdentityVerificationDocument: IdentityVerificationDocument = {
			...apiResourceDefaultJson,
			category: 'drivers_license',
			name: 'My IdentityVerificationDocument',
			image_back: 'gs://my-app.appspot.com/identity_verification_documents/image_back.jpg',
			image_front: 'gs://my-app.appspot.com/identity_verification_documents/image_front.jpg',
			user: '',
		};
		expect(exampleIdentityVerificationDocument).toEqual<typeof exampleIdentityVerificationDocument>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'identity_verification_document',
			category: 'drivers_license',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My IdentityVerificationDocument',
			image_back: 'gs://my-app.appspot.com/identity_verification_documents/image_back.jpg',
			image_front: 'gs://my-app.appspot.com/identity_verification_documents/image_front.jpg',
			user: '',
		});
	});
});
