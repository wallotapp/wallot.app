import { expressApp } from './expressApp.js';
import { secrets } from './secrets.js';
import serverVariablesLive from './serverVariables.live.json' assert { type: 'json' };
import serverVariablesTest from './serverVariables.test.json' assert { type: 'json' };

const { SECRET_CRED_DEPLOYMENT_ENVIRONMENT } = secrets;
const serverVariables =
	SECRET_CRED_DEPLOYMENT_ENVIRONMENT === 'live'
		? serverVariablesLive
		: serverVariablesTest;

expressApp.listen(serverVariables.SERVER_VAR_EXPRESS_PORT, () => {
	console.log(
		'Express app port:',
		serverVariables.SERVER_VAR_EXPRESS_PORT,
		'\nExpress app version:',
		process.env.PACKAGE_VERSION,
	);
});
