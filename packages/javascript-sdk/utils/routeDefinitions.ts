import { getEnum, EnumMember } from 'ergonomic';

// Home Site
export const HomeSiteRouteStaticIdEnum = getEnum([
	'HOME_SITE__/ACCOUNT/BANKING',
	'HOME_SITE__/ACCOUNT/OVERVIEW',
	'HOME_SITE__/ACCOUNT/PLANS',
	'HOME_SITE__/ACCOUNT/POSITIONS',
	'HOME_SITE__/ACCOUNT/SETTINGS',
	'HOME_SITE__/ACCOUNT/STATEMENTS',
	'HOME_SITE__/ACCOUNT/TRANSACTIONS',
	'HOME_SITE__/INDEX',
	'HOME_SITE__/GET_STARTED',
	'HOME_SITE__/ORDERS/[ORDER_ID]/ASSETS',
	'HOME_SITE__/ORDERS/[ORDER_ID]/CART',
	'HOME_SITE__/ORDERS/[ORDER_ID]/CHECKOUT',
	'HOME_SITE__/ORDERS/[ORDER_ID]/CONGRATULATIONS',
	'HOME_SITE__/ORDERS/[ORDER_ID]/TRACK',
	'HOME_SITE__/PRIVACY',
	'HOME_SITE__/TERMS',
]);
export type HomeSiteRouteStaticId = EnumMember<
	typeof HomeSiteRouteStaticIdEnum
>;

export type HomeSiteRouteQueryParams = {
	'HOME_SITE__/ACCOUNT/BANKING': {
		client_token?: string | undefined;
	};
	'HOME_SITE__/ACCOUNT/OVERVIEW': {
		client_token?: string | undefined;
	};
	'HOME_SITE__/ACCOUNT/PLANS': {
		client_token?: string | undefined;
	};
	'HOME_SITE__/ACCOUNT/POSITIONS': {
		client_token?: string | undefined;
	};
	'HOME_SITE__/ACCOUNT/SETTINGS': {
		client_token?: string | undefined;
	};
	'HOME_SITE__/ACCOUNT/STATEMENTS': {
		client_token?: string | undefined;
	};
	'HOME_SITE__/ACCOUNT/TRANSACTIONS': {
		client_token?: string | undefined;
	};
	'HOME_SITE__/INDEX': {
		client_token?: string | undefined;
	};
	'HOME_SITE__/GET_STARTED': {
		client_token?: string | undefined;
	};
	'HOME_SITE__/ORDERS/[ORDER_ID]/ASSETS': {
		client_token?: string | undefined;
		order_id: string | undefined;
	};
	'HOME_SITE__/ORDERS/[ORDER_ID]/CART': {
		client_token?: string | undefined;
		order_id: string | undefined;
	};
	'HOME_SITE__/ORDERS/[ORDER_ID]/CHECKOUT': {
		client_token?: string | undefined;
		order_id: string | undefined;
	};
	'HOME_SITE__/ORDERS/[ORDER_ID]/CONGRATULATIONS': {
		client_token?: string | undefined;
		order_id: string | undefined;
	};
	'HOME_SITE__/ORDERS/[ORDER_ID]/TRACK': {
		client_token?: string | undefined;
		order_id: string | undefined;
	};
	'HOME_SITE__/PRIVACY': { client_token?: string | undefined };
	'HOME_SITE__/TERMS': { client_token?: string | undefined };
};

// Admin Site
export const AdminSiteRouteStaticIdEnum = getEnum([
	'ADMIN_SITE__/INDEX',
	'ADMIN_SITE__/RESOURCE/[RESOURCE_NAME]/ALL',
	'ADMIN_SITE__/RESOURCE/[RESOURCE_NAME]/CREATE',
	'ADMIN_SITE__/RESOURCE/[RESOURCE_NAME]/[DOCUMENT_ID]/EDIT',
]);
export type AdminSiteRouteStaticId = EnumMember<
	typeof AdminSiteRouteStaticIdEnum
>;

export type AdminSiteRouteQueryParams = {
	'ADMIN_SITE__/INDEX': {
		//
	};
	'ADMIN_SITE__/RESOURCE/[RESOURCE_NAME]/ALL': {
		resource_name: string | undefined;
	};
	'ADMIN_SITE__/RESOURCE/[RESOURCE_NAME]/CREATE': {
		resource_name: string | undefined;
	};
	'ADMIN_SITE__/RESOURCE/[RESOURCE_NAME]/[DOCUMENT_ID]/EDIT': {
		document_id: string | undefined;
		resource_name: string | undefined;
	};
};

// Blog Site
export const BlogSiteRouteStaticIdEnum = getEnum([
	'BLOG_SITE__/INDEX',
	'BLOG_SITE__/POSTS/[SLUG]/CONTENT',
]);
export type BlogSiteRouteStaticId = EnumMember<
	typeof BlogSiteRouteStaticIdEnum
>;

export type BlogSiteRouteQueryParams = {
	'BLOG_SITE__/INDEX': {
		//
	};
	'BLOG_SITE__/POSTS/[SLUG]/CONTENT': {
		slug: string | undefined;
	};
};

// Knowledge Base Site
export const KnowledgeBaseSiteRouteStaticIdEnum = getEnum([
	'KNOWLEDGE_BASE_SITE__/INDEX',
	'KNOWLEDGE_BASE_SITE__/POSTS/[SLUG]/CONTENT',
]);
export type KnowledgeBaseSiteRouteStaticId = EnumMember<
	typeof KnowledgeBaseSiteRouteStaticIdEnum
>;

export type KnowledgeBaseSiteRouteQueryParams = {
	'KNOWLEDGE_BASE_SITE__/INDEX': {
		//
	};
	'KNOWLEDGE_BASE_SITE__/POSTS/[SLUG]/CONTENT': {
		slug: string | undefined;
	};
};

// Referrals Site
export const ReferralsSiteRouteStaticIdEnum = getEnum([
	'REFERRALS_SITE__/INDEX',
	'REFERRALS_SITE__/POSTS/[SLUG]/CONTENT',
]);
export type ReferralsSiteRouteStaticId = EnumMember<
	typeof ReferralsSiteRouteStaticIdEnum
>;

export type ReferralsSiteRouteQueryParams = {
	'REFERRALS_SITE__/INDEX': {
		//
	};
	'REFERRALS_SITE__/POSTS/[SLUG]/CONTENT': {
		slug: string | undefined;
	};
};

// SSO Site
export const SsoSiteRouteStaticIdEnum = getEnum([
	'SSO_SITE__/INDEX',
	'SSO_SITE__/LOGIN',
	'SSO_SITE__/LOGOUT',
	'SSO_SITE__/REGISTER',
]);
export type SsoSiteRouteStaticId = EnumMember<typeof SsoSiteRouteStaticIdEnum>;

export type SsoSiteRouteQueryParams = {
	'SSO_SITE__/INDEX': {
		dest?: string | undefined;
	};
	'SSO_SITE__/LOGIN': {
		dest?: string | undefined;
	};
	'SSO_SITE__/LOGOUT': {
		//
	};
	'SSO_SITE__/REGISTER': {
		dest?: string | undefined;
	};
};

// Status Site
export const StatusSiteRouteStaticIdEnum = getEnum([
	'STATUS_SITE__/INDEX',
	'STATUS_SITE__/POSTS/[SLUG]/CONTENT',
]);
export type StatusSiteRouteStaticId = EnumMember<
	typeof StatusSiteRouteStaticIdEnum
>;

export type StatusSiteRouteQueryParams = {
	'STATUS_SITE__/INDEX': {
		//
	};
	'STATUS_SITE__/POSTS/[SLUG]/CONTENT': {
		slug: string | undefined;
	};
};

// Support Site
export const SupportSiteRouteStaticIdEnum = getEnum([
	'SUPPORT_SITE__/INDEX',
	'SUPPORT_SITE__/POSTS/[SLUG]/CONTENT',
]);
export type SupportSiteRouteStaticId = EnumMember<
	typeof SupportSiteRouteStaticIdEnum
>;

export type SupportSiteRouteQueryParams = {
	'SUPPORT_SITE__/INDEX': {
		//
	};
	'SUPPORT_SITE__/POSTS/[SLUG]/CONTENT': {
		slug: string | undefined;
	};
};

export const RouteStaticIdEnum = getEnum([
	...HomeSiteRouteStaticIdEnum.arr,
	...AdminSiteRouteStaticIdEnum.arr,
	...BlogSiteRouteStaticIdEnum.arr,
	...KnowledgeBaseSiteRouteStaticIdEnum.arr,
	...ReferralsSiteRouteStaticIdEnum.arr,
	...SsoSiteRouteStaticIdEnum.arr,
	...StatusSiteRouteStaticIdEnum.arr,
	...SupportSiteRouteStaticIdEnum.arr,
]);
export type RouteStaticId = EnumMember<typeof RouteStaticIdEnum>;
