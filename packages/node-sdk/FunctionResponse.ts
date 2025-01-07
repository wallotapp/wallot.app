export type FunctionResponse<TResponseBody> = {
	json: TResponseBody;
	onFinished?: () => Promise<void>;
};
