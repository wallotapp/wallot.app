import { getEnum, EnumMember } from 'ergonomic';

// Home Web App
export const HomeWebAppRouteStaticIdEnum = getEnum([
	'HOME_WEB_APP__/ASSETS',
	'HOME_WEB_APP__/CONFIRM-FINANCIAL-CONNECTION',
	'HOME_WEB_APP__/INDEX',
	'HOME_WEB_APP__/GET_STARTED',
	'HOME_WEB_APP__/ORDERS/[ORDER_ID]/CONFIRM',
	'HOME_WEB_APP__/RECOMMENDATIONS/[RECOMMENDATION_ID]/DETAILS',
]);
export type HomeWebAppRouteStaticId = EnumMember<
	typeof HomeWebAppRouteStaticIdEnum
>;

export type HomeWebAppRouteQueryParams = {
	'HOME_WEB_APP__/ASSETS': {
		//
	};
	'HOME_WEB_APP__/CONFIRM-FINANCIAL-CONNECTION': {
		//
	};
	'HOME_WEB_APP__/INDEX': {
		//
	};
	'HOME_WEB_APP__/GET_STARTED': {
		//
	};
	'HOME_WEB_APP__/ORDERS/[ORDER_ID]/CONFIRM': {
		order_id: string | undefined;
	};
	'HOME_WEB_APP__/RECOMMENDATIONS/[RECOMMENDATION_ID]/DETAILS': {
		client_token?: string | undefined;
		recommendation_id: string | undefined;
	};
};

// Admin Web App
export const AdminWebAppRouteStaticIdEnum = getEnum([
	'ADMIN_WEB_APP__/INDEX',
	'ADMIN_WEB_APP__/POSTS/[SLUG]/CONTENT',
]);
export type AdminWebAppRouteStaticId = EnumMember<
	typeof AdminWebAppRouteStaticIdEnum
>;

export type AdminWebAppRouteQueryParams = {
	'ADMIN_WEB_APP__/INDEX': {
		//
	};
	'ADMIN_WEB_APP__/POSTS/[SLUG]/CONTENT': {
		slug: string | undefined;
	};
};

// Blog Web App
export const BlogWebAppRouteStaticIdEnum = getEnum([
	'BLOG_WEB_APP__/INDEX',
	'BLOG_WEB_APP__/POSTS/[SLUG]/CONTENT',
]);
export type BlogWebAppRouteStaticId = EnumMember<
	typeof BlogWebAppRouteStaticIdEnum
>;

export type BlogWebAppRouteQueryParams = {
	'BLOG_WEB_APP__/INDEX': {
		//
	};
	'BLOG_WEB_APP__/POSTS/[SLUG]/CONTENT': {
		slug: string | undefined;
	};
};

// Knowledge Base Web App
export const KnowledgeBaseWebAppRouteStaticIdEnum = getEnum([
	'KNOWLEDGE_BASE_WEB_APP__/INDEX',
	'KNOWLEDGE_BASE_WEB_APP__/POSTS/[SLUG]/CONTENT',
]);
export type KnowledgeBaseWebAppRouteStaticId = EnumMember<
	typeof KnowledgeBaseWebAppRouteStaticIdEnum
>;

export type KnowledgeBaseWebAppRouteQueryParams = {
	'KNOWLEDGE_BASE_WEB_APP__/INDEX': {
		//
	};
	'KNOWLEDGE_BASE_WEB_APP__/POSTS/[SLUG]/CONTENT': {
		slug: string | undefined;
	};
};

// Referrals Web App
export const ReferralsWebAppRouteStaticIdEnum = getEnum([
	'REFERRALS_WEB_APP__/INDEX',
	'REFERRALS_WEB_APP__/POSTS/[SLUG]/CONTENT',
]);
export type ReferralsWebAppRouteStaticId = EnumMember<
	typeof ReferralsWebAppRouteStaticIdEnum
>;

export type ReferralsWebAppRouteQueryParams = {
	'REFERRALS_WEB_APP__/INDEX': {
		//
	};
	'REFERRALS_WEB_APP__/POSTS/[SLUG]/CONTENT': {
		slug: string | undefined;
	};
};

// SSO Web App
export const SsoWebAppRouteStaticIdEnum = getEnum([
	'SSO_WEB_APP__/INDEX',
	'SSO_WEB_APP__/REGISTER',
]);
export type SsoWebAppRouteStaticId = EnumMember<
	typeof SsoWebAppRouteStaticIdEnum
>;

export type SsoWebAppRouteQueryParams = {
	'SSO_WEB_APP__/INDEX': {
		//
	};
	'SSO_WEB_APP__/REGISTER': {
		dest?: string | undefined;
	};
};

// Status Web App
export const StatusWebAppRouteStaticIdEnum = getEnum([
	'STATUS_WEB_APP__/INDEX',
	'STATUS_WEB_APP__/POSTS/[SLUG]/CONTENT',
]);
export type StatusWebAppRouteStaticId = EnumMember<
	typeof StatusWebAppRouteStaticIdEnum
>;

export type StatusWebAppRouteQueryParams = {
	'STATUS_WEB_APP__/INDEX': {
		//
	};
	'STATUS_WEB_APP__/POSTS/[SLUG]/CONTENT': {
		slug: string | undefined;
	};
};

// Support Web App
export const SupportWebAppRouteStaticIdEnum = getEnum([
	'SUPPORT_WEB_APP__/INDEX',
	'SUPPORT_WEB_APP__/POSTS/[SLUG]/CONTENT',
]);
export type SupportWebAppRouteStaticId = EnumMember<
	typeof SupportWebAppRouteStaticIdEnum
>;

export type SupportWebAppRouteQueryParams = {
	'SUPPORT_WEB_APP__/INDEX': {
		//
	};
	'SUPPORT_WEB_APP__/POSTS/[SLUG]/CONTENT': {
		slug: string | undefined;
	};
};

export const RouteStaticIdEnum = getEnum([
	...HomeWebAppRouteStaticIdEnum.arr,
	...AdminWebAppRouteStaticIdEnum.arr,
	...BlogWebAppRouteStaticIdEnum.arr,
	...KnowledgeBaseWebAppRouteStaticIdEnum.arr,
	...ReferralsWebAppRouteStaticIdEnum.arr,
	...SsoWebAppRouteStaticIdEnum.arr,
	...StatusWebAppRouteStaticIdEnum.arr,
	...SupportWebAppRouteStaticIdEnum.arr,
]);
export type RouteStaticId = EnumMember<typeof RouteStaticIdEnum>;
