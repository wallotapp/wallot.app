export const usernameRegex = /^(?![0-9]+$)(?!_+$)[a-z0-9_]{3,}$/;
export const isUsername = (username: unknown): username is string =>
	typeof username === 'string' && username.match(usernameRegex) !== null;
export const usernameRules = [
	'at least three characters',
	'lowercase letters, numbers or underscores',
	"can't be only numbers",
	"can't be only underscores",
];
