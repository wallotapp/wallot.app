import { expressApp } from './expressApp.js';
import { variables } from './variables.js';

expressApp.listen(variables.SERVER_VAR_EXPRESS_PORT, () => {
	console.log('Running Webhooks on port:', variables.SERVER_VAR_EXPRESS_PORT);
});
