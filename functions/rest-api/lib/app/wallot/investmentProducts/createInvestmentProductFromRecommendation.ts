import { v4 } from 'uuid';
import {
	InvestmentProduct,
	Recommendation,
	Trade,
	Model as FinancialModel,
	modelsApi as financialModelsApi,
	ModelFamily as FinancialModelFamily,
	modelFamiliesApi as financialModelFamiliesApi,
	OpenAiModel,
	openAiModelsApi,
	OpenAiModelFamily,
	openAiModelFamiliesApi,
	getNewYorkDate,
} from '@wallot/js';
import { db } from '../../../services.js';

const financialModelsCollectionId = financialModelsApi.collectionId;
const financialModelFamiliesCollectionId =
	financialModelFamiliesApi.collectionId;
const openAiModelsCollectionId = openAiModelsApi.collectionId;
const openAiModelFamiliesCollectionId = openAiModelFamiliesApi.collectionId;

export const createInvestmentProductFromRecommendation = async (
	recommendation: Recommendation,
): Promise<InvestmentProduct> => {
	const {
		_date_created,
		best_investments,
		description,
		name,
		model: financialModelId,
	} = recommendation;
	const entryDate = getNewYorkDate(_date_created);

	// Query the financial model
	const financialModelSnapshot = await db
		.collection(financialModelsCollectionId)
		.doc(financialModelId)
		.get();
	if (!financialModelSnapshot.exists) {
		throw new Error('Financial model not found');
	}
	const financialModel = financialModelSnapshot.data() as FinancialModel;
	const { model_family: financialModelFamilyId, open_ai_model: openAiModelId } =
		financialModel;

	// Concurrently query the financial model family and the OpenAI model
	const [financialModelFamilySnapshot, openAiModelSnapshot] = await Promise.all(
		[
			db
				.collection(financialModelFamiliesCollectionId)
				.doc(financialModelFamilyId)
				.get(),
			db.collection(openAiModelsCollectionId).doc(openAiModelId).get(),
		],
	);
	if (!financialModelFamilySnapshot.exists) {
		throw new Error('Financial model family not found');
	}
	if (!openAiModelSnapshot.exists) {
		throw new Error('OpenAI model not found');
	}
	const financialModelFamily =
		financialModelFamilySnapshot.data() as FinancialModelFamily;
	const llm = openAiModelSnapshot.data() as OpenAiModel;
	const { open_ai_model_family: llmFamilyId } = llm;

	// Query the OpenAI model family
	const llmFamilySnapshot = await db
		.collection(openAiModelFamiliesCollectionId)
		.doc(llmFamilyId)
		.get();
	if (!llmFamilySnapshot.exists) {
		throw new Error('OpenAI model family not found');
	}
	const llmFamily = llmFamilySnapshot.data() as OpenAiModelFamily;

	// Construct the investment product
	const investmentProductId = v4();
	const investmentProduct: InvestmentProduct = {
		entry_date: entryDate,
		id: investmentProductId,
		model: {
			financial_model: financialModel,
			financial_model_family: financialModelFamily,
			llm: llm,
			llm_family: llmFamily,
		},
		title: name,
		description,
		trades: best_investments.map(
			({ amount, rationale, symbol }): Trade => ({
				amount,
				date: _date_created,
				id: v4(),
				rationale,
				symbol,
			}),
		),
	};

	return investmentProduct;
};
