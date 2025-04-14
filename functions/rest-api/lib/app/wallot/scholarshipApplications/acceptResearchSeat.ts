import { readFileSync } from 'fs';
import * as R from 'ramda';
import { DateTime } from 'luxon';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { default as fontkit } from '@pdf-lib/fontkit';
import { default as fs } from 'fs/promises';
import { default as ky } from 'ky-universal';
import { type DecodedIdToken as FirebaseUser } from 'firebase-admin/auth';
import { FunctionResponse, getEmailBody } from '@wallot/node';
import {
	AcceptResearchSeatFormDataParams,
	AcceptResearchSeatFormDataResponse,
	ResearchApplicationFormDataRouteParams,
	scholarshipApplicationsApi,
	ScholarshipApplication,
	usersApi,
	User,
	UpdateScholarshipApplicationParams,
	ResearchApplicationFormSchema,
	ResearchSeatCohortEnum,
} from '@wallot/js';
import { bucket, db, gmail } from '../../../services.js';
import { secrets } from '../../../secrets.js';
import { directoryPath } from '../../../directoryPath.js';

const isTest = secrets.SECRET_CRED_DEPLOYMENT_ENVIRONMENT === 'test';
const isLocal = secrets.SECRET_CRED_SERVER_PROTOCOL === 'http';
const emailTemplateRelativePath = 'sharp/acceptSeatConfirmationEmail.html';
const emailTemplateFullPath = `${directoryPath}/../assets/emails/${emailTemplateRelativePath}`;
const emailTemplate = readFileSync(emailTemplateFullPath, 'utf8');

export const acceptResearchSeat = async (
	params: AcceptResearchSeatFormDataParams,
	{ scholarshipApplicationId }: ResearchApplicationFormDataRouteParams,
	_query: Record<string, never>,
	_firebaseUser: FirebaseUser | null,
): Promise<FunctionResponse<AcceptResearchSeatFormDataResponse>> => {
	// Extract data from the incoming JSON payload.
	// Expected fields: name, parent_name, parent_relationship_to_student, date
	const {
		client_verification,
		date,
		parent_email,
		parent_name,
		parent_relationship_to_student,
		student_name,
	} = params;

	// Query application
	const researchApplicationRef = db
		.collection(scholarshipApplicationsApi.collectionId)
		.doc(scholarshipApplicationId);
	const researchApplicationDoc = await researchApplicationRef.get();
	if (!researchApplicationDoc.exists)
		throw new Error('Invalid scholarshipApplicationId');
	const researchApplication =
		researchApplicationDoc.data() as ScholarshipApplication;
	const {
		research_seat_cohort,
		research_seat_client_verification,
		user: userId,
	} = researchApplication;

	if (!research_seat_client_verification)
		throw new Error(
			'Invalid application - There is no research seat pending acceptance',
		);
	if (research_seat_client_verification !== client_verification)
		throw new Error('Invalid verification');
	if (!ResearchSeatCohortEnum.isMember(research_seat_cohort)) {
		await gmail.sendDeveloperAlert({
			subject:
				'[Wallot Developer Alerts] Error with Research Acceptance Letter',
			message: `Attempted to access an acceptance letter but no cohort is assigned.

${JSON.stringify({ researchApplication, client_verification }, null, 2)}
`,
		});

		throw new Error(
			'There was an error loading your acceptance letter. Please contact our program staff.',
		);
	}

	// Format the date to full format: "January 10, 1940"
	const fullFormattedDate = DateTime.fromISO(date).toFormat('MMMM d, yyyy');

	// URL of the original PDF stored in Cloud Storage
	const originalPdfUrl =
		research_seat_cohort === 'fall'
			? secrets.SECRET_CRED_RESEARCH_ACCEPTANCE_LETTER_DOWNLOAD_URL_FALL
			: secrets.SECRET_CRED_RESEARCH_ACCEPTANCE_LETTER_DOWNLOAD_URL_SUMMER;

	// Download the original PDF using ky-universal.
	// This returns an ArrayBuffer that is used to load the PDF.
	const pdfArrayBuffer = await ky.get(originalPdfUrl).arrayBuffer();

	// Load the PDF document from the downloaded buffer.
	const pdfDoc = await PDFDocument.load(pdfArrayBuffer);

	// // Register fontkit with PDFDocument
	pdfDoc.registerFontkit(fontkit);

	// Access the 21st page
	const page = pdfDoc.getPages()[20];

	if (page == null) throw new Error('No 21st page');

	// Load and embed the custom cursive font for the signature.
	const cursiveFontName = 'DancingScriptRegular.ttf';
	const cursiveFontPath = `${directoryPath}/../assets/fonts/${cursiveFontName}`;
	const cursiveFontBytes = await fs.readFile(cursiveFontPath);
	const cursiveFont = await pdfDoc.embedFont(cursiveFontBytes, {
		subset: true,
	});

	// Embed a standard font for printed text (using Helvetica).
	const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

	// *** Hard-coded coordinates (adjust these based on your PDF's layout) ***
	// 1. Student name (normal font)
	page.drawText(student_name, {
		x: 100,
		y: 375,
		size: 12,
		font: helveticaFont,
	});

	// 2. Student date (normal font)
	page.drawText(fullFormattedDate, {
		x: 100,
		y: 360,
		size: 12,
		font: helveticaFont,
	});

	// 3. Student signature (cursive font)
	// Here, we’re simply drawing the student’s name in cursive to simulate a signature.
	page.drawText(student_name, {
		x: 100,
		y: 315,
		size: 18,
		font: cursiveFont,
	});

	// 4. Parent name (normal font)
	page.drawText(parent_name, {
		x: 100,
		y: 240,
		size: 12,
		font: helveticaFont,
	});

	// 5. Parent relationship to student (normal font)
	page.drawText(parent_relationship_to_student, {
		x: 180,
		y: 220,
		size: 12,
		font: helveticaFont,
	});

	// 6. Parent date (normal font)
	page.drawText(fullFormattedDate, {
		x: 100,
		y: 205,
		size: 12,
		font: helveticaFont,
	});

	// 7. Parent signature (cursive font)
	// As with the student signature, we are using the parent's name in a cursive font.
	page.drawText(parent_name, {
		x: 100,
		y: 160,
		size: 18,
		font: cursiveFont,
	});

	// 8. Signature ID (normal font)
	page.drawText(`Wallot E-Signature ID: ${client_verification}`, {
		x: 20,
		y: 20,
		size: 8,
		font: helveticaFont,
		color: rgb(55 / 255, 65 / 255, 81 / 255),
	});

	// Save the updated PDF document to a byte array.
	const signedPdfBytes = await pdfDoc.save();

	// Make a temporary directory at path `${directoryPath}/../.temp/signed-docs` using mkdir -p so that the operation is safe
	const tempDir = `${directoryPath}/../.temp`;
	const signedDocsDirPath = `${tempDir}/signed-docs`;
	await fs.mkdir(signedDocsDirPath, { recursive: true });

	// Write the new signed PDF to temporary disk storage.
	const signedPdfPath = `${signedDocsDirPath}/SignedAcceptanceLetter_${Date.now()}.pdf`;
	await fs.writeFile(signedPdfPath, signedPdfBytes);

	// Define a destination path
	const studentName = encodeURI(student_name).replace(
		new RegExp('%20', 'g'),
		'+',
	);
	const suffix = isLocal ? '_' + Date.now() : '';
	const destination = `research/acceptance-letters/${studentName}+SHARP+Orientation+Guide+Signed${suffix}.pdf`;

	// Upload the signed PDF file to Cloud Storage.
	await bucket.upload(signedPdfPath, {
		destination,
		metadata: {
			contentType: 'application/pdf',
		},
	});

	// Generate a signed URL for the uploaded PDF.
	// Set the expiration date to 10 years from now.
	const file = bucket.file(destination);
	const expiresAt = new Date();
	expiresAt.setFullYear(expiresAt.getFullYear() + 10);
	const [downloadUrl] = await file.getSignedUrl({
		action: 'read',
		expires: expiresAt,
	});

	// Save the download URL
	const updateResearchApplicationParams: UpdateScholarshipApplicationParams = {
		research_seat_signed_acceptance_letter: downloadUrl,
	};
	await db
		.collection(scholarshipApplicationsApi.collectionId)
		.doc(scholarshipApplicationId)
		.update(updateResearchApplicationParams);

	// Delete the temporary directory
	if (!isLocal) await fs.rm(tempDir, { recursive: true });

	// Email the signed document
	const onFinished = async () => {
		// Query user
		const userRef = db.collection(usersApi.collectionId).doc(userId);
		const userDoc = await userRef.get();
		if (!userDoc.exists) throw new Error('Invalid userId');
		const user = userDoc.data() as User;

		// Query Research Application Form Data
		const researchApplicationFormDataDocRef = db
			.collection('_test')
			.doc('research_data_properties');
		const researchApplicationFormDataDoc =
			await researchApplicationFormDataDocRef.get();
		const researchApplicationFormData =
			researchApplicationFormDataDoc.data() as ResearchApplicationFormSchema;
		const { email: sender_email, name: sender_name } =
			researchApplicationFormData.program_lead;

		// Email params
		const minusQueryUnsafe = downloadUrl.split('.pdf')?.[0] ?? '';
		const minusQuery = minusQueryUnsafe ? minusQueryUnsafe + '.pdf' : '';
		const fileName = minusQuery.split('/')?.slice()?.pop() ?? '';
		const fileNamePretty = fileName
			.replace(/\+/g, ' ')
			.replace(/%2B/g, ' ')
			.replace(/%2b/g, ' ')
			.replace(' Signed', ' (Signed)');
		const testSubjectPrefix = isTest ? '[TEST] ' : '';
		const testSubjectSuffix = isTest ? ' - ' + Date.now().toString() : '';
		const body = getEmailBody(emailTemplate, {});

		await gmail.sendEmail({
			html_body: body,
			pdf: {
				url: downloadUrl,
				fileName: fileNamePretty,
			},
			recipient_email: R.uniq(
				[user.firebase_auth_email, parent_email]
					.map((email) => email?.trim()?.toLowerCase())
					.filter(Boolean),
			).join(),
			sender_email,
			sender_name,
			sender_user_id: sender_email,
			subject: `${testSubjectPrefix}Signed - Student and Parent E-Signature: SHARP Orientation Guide${testSubjectSuffix}`,
		});
	};

	return { json: {}, onFinished };
};
