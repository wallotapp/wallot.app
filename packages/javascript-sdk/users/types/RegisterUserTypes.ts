export type RegisterUserParams = {
	email: string;
	password: string;
	username: string;
};
export type RegisterUserResponse = {
	custom_token: string;
	redirect_url: string;
};
