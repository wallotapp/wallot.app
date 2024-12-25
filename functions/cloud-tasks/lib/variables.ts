import { secrets } from './secrets.js';
import serverVariablesLive from './serverVariables.live.json' assert { type: 'json' };
import serverVariablesTest from './serverVariables.test.json' assert { type: 'json' };

const { SECRET_CRED_DEPLOYMENT_ENVIRONMENT, SECRET_CRED_SERVER_PROTOCOL } = secrets;

export const variables = SECRET_CRED_DEPLOYMENT_ENVIRONMENT === 'live' ? serverVariablesLive : serverVariablesTest;

export const siteOriginByTarget = {
	HOME_WEB_APP: variables.SERVER_VAR_SITE_ORIGIN_BY_PROTOCOL_BY_TARGET.HOME_WEB_APP[SECRET_CRED_SERVER_PROTOCOL],
	ADMIN_WEB_APP: variables.SERVER_VAR_SITE_ORIGIN_BY_PROTOCOL_BY_TARGET.ADMIN_WEB_APP[SECRET_CRED_SERVER_PROTOCOL],
	BLOG_WEB_APP: variables.SERVER_VAR_SITE_ORIGIN_BY_PROTOCOL_BY_TARGET.BLOG_WEB_APP[SECRET_CRED_SERVER_PROTOCOL],
	KNOWLEDGE_BASE_WEB_APP: variables.SERVER_VAR_SITE_ORIGIN_BY_PROTOCOL_BY_TARGET.KNOWLEDGE_BASE_WEB_APP[SECRET_CRED_SERVER_PROTOCOL],
	REFERRALS_WEB_APP: variables.SERVER_VAR_SITE_ORIGIN_BY_PROTOCOL_BY_TARGET.REFERRALS_WEB_APP[SECRET_CRED_SERVER_PROTOCOL],
	SSO_WEB_APP: variables.SERVER_VAR_SITE_ORIGIN_BY_PROTOCOL_BY_TARGET.SSO_WEB_APP[SECRET_CRED_SERVER_PROTOCOL],
	STATUS_WEB_APP: variables.SERVER_VAR_SITE_ORIGIN_BY_PROTOCOL_BY_TARGET.STATUS_WEB_APP[SECRET_CRED_SERVER_PROTOCOL],
	SUPPORT_WEB_APP: variables.SERVER_VAR_SITE_ORIGIN_BY_PROTOCOL_BY_TARGET.SUPPORT_WEB_APP[SECRET_CRED_SERVER_PROTOCOL],
};
