import { isNodeCool } from '@wallot/node';
import { expressApp } from './expressApp.js';
import { variables } from './variables.js';

expressApp.listen(variables.SERVER_VAR_EXPRESS_PORT, () => {
	console.log(
		'Running REST API on port:',
		variables.SERVER_VAR_EXPRESS_PORT,
		'By the way, is Node cool?',
		isNodeCool,
	);
});