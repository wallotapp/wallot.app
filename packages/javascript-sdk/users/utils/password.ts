export const passwordRegex =
	/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*\-+?_=])[A-Za-z\d!@#$%^&*\-+?_=]{8,}$/;
export const isPassword = (password: unknown): password is string =>
	typeof password === 'string' && password.match(passwordRegex) !== null;
export const passwordRules = [
	'at least 8 characters long',
	'contain at least one uppercase letter',
	'contain at least one lowercase letter',
	'contain at least one number',
	'contain at least one special character (!@#$%^&*-+?_=)',
];
