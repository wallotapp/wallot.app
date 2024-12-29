import { EnumMember, getEnum } from 'ergonomic';
import { HomeSiteRouteStaticIdEnum, getHomeSiteRoute } from '@wallot/js';

export const AccountDashboardRouteEnum = getEnum([
	HomeSiteRouteStaticIdEnum.obj['HOME_SITE__/ACCOUNT/OVERVIEW'],
	HomeSiteRouteStaticIdEnum.obj['HOME_SITE__/ACCOUNT/POSITIONS'],
	HomeSiteRouteStaticIdEnum.obj['HOME_SITE__/ACCOUNT/TRANSACTIONS'],
	HomeSiteRouteStaticIdEnum.obj['HOME_SITE__/ACCOUNT/STATEMENTS'],
	HomeSiteRouteStaticIdEnum.obj['HOME_SITE__/ACCOUNT/SETTINGS'],
	HomeSiteRouteStaticIdEnum.obj['HOME_SITE__/ACCOUNT/PLANS'],
	HomeSiteRouteStaticIdEnum.obj['HOME_SITE__/ACCOUNT/BANKING'],
]);
export type AccountDashboardRoute = EnumMember<
	typeof AccountDashboardRouteEnum
>;

const defaultRouteOptions = {
	includeOrigin: false,
	origin: null,
	queryParams: {},
};

export type AccountDashboardRouteConfig = {
	href: string;
	title: string;
};
export const accountDashboardConfigByRouteTyped: Record<
	AccountDashboardRoute,
	AccountDashboardRouteConfig
> = {
	'HOME_SITE__/ACCOUNT/OVERVIEW': {
		href: getHomeSiteRoute({
			...defaultRouteOptions,
			routeStaticId: 'HOME_SITE__/ACCOUNT/OVERVIEW',
		}),
		title: 'Overview',
	},
	'HOME_SITE__/ACCOUNT/POSITIONS': {
		href: getHomeSiteRoute({
			...defaultRouteOptions,
			routeStaticId: 'HOME_SITE__/ACCOUNT/POSITIONS',
		}),
		title: 'Positions',
	},
	'HOME_SITE__/ACCOUNT/TRANSACTIONS': {
		href: getHomeSiteRoute({
			...defaultRouteOptions,
			routeStaticId: 'HOME_SITE__/ACCOUNT/TRANSACTIONS',
		}),
		title: 'Transactions',
	},
	'HOME_SITE__/ACCOUNT/STATEMENTS': {
		href: getHomeSiteRoute({
			...defaultRouteOptions,
			routeStaticId: 'HOME_SITE__/ACCOUNT/STATEMENTS',
		}),
		title: 'Statements',
	},
	'HOME_SITE__/ACCOUNT/SETTINGS': {
		href: getHomeSiteRoute({
			...defaultRouteOptions,
			routeStaticId: 'HOME_SITE__/ACCOUNT/SETTINGS',
		}),
		title: 'Billing Information',
	},
	'HOME_SITE__/ACCOUNT/PLANS': {
		href: getHomeSiteRoute({
			...defaultRouteOptions,
			routeStaticId: 'HOME_SITE__/ACCOUNT/PLANS',
		}),
		title: 'Plans',
	},
	'HOME_SITE__/ACCOUNT/BANKING': {
		href: getHomeSiteRoute({
			...defaultRouteOptions,
			routeStaticId: 'HOME_SITE__/ACCOUNT/BANKING',
		}),
		title: 'Bank Accounts',
	},
};

export const accountDashboardConfigByRoute: Record<
	string,
	AccountDashboardRouteConfig
> = accountDashboardConfigByRouteTyped;
