import { getEnum, EnumMember } from 'ergonomic';

// Home Web App
export const HomeWebAppRouteStaticIdEnum = getEnum([
	'HOME_WEB_APP__/ASSETS/[ASSET_ID]/CONGRATULATIONS',
	'HOME_WEB_APP__/ASSETS/[ASSET_ID]/TRACK',
	'HOME_WEB_APP__/INDEX',
	'HOME_WEB_APP__/GET_STARTED',
	'HOME_WEB_APP__/ORDERS/[ORDER_ID]/ASSETS',
	'HOME_WEB_APP__/ORDERS/[ORDER_ID]/CART',
	'HOME_WEB_APP__/ORDERS/[ORDER_ID]/CHECKOUT',
]);
export type HomeWebAppRouteStaticId = EnumMember<
	typeof HomeWebAppRouteStaticIdEnum
>;

export type HomeWebAppRouteQueryParams = {
	'HOME_WEB_APP__/ASSETS/[ASSET_ID]/CONGRATULATIONS': {
		asset_id: string | undefined;
		client_token?: string | undefined;
	};
	'HOME_WEB_APP__/ASSETS/[ASSET_ID]/TRACK': {
		asset_id: string | undefined;
		client_token?: string | undefined;
	};
	'HOME_WEB_APP__/INDEX': {
		client_token?: string | undefined;
	};
	'HOME_WEB_APP__/GET_STARTED': {
		client_token?: string | undefined;
	};
	'HOME_WEB_APP__/ORDERS/[ORDER_ID]/ASSETS': {
		client_token?: string | undefined;
		order_id: string | undefined;
	};
	'HOME_WEB_APP__/ORDERS/[ORDER_ID]/CART': {
		client_token?: string | undefined;
		order_id: string | undefined;
	};
	'HOME_WEB_APP__/ORDERS/[ORDER_ID]/CHECKOUT': {
		client_token?: string | undefined;
		order_id: string | undefined;
	};
};

// Admin Web App
export const AdminWebAppRouteStaticIdEnum = getEnum([
	'ADMIN_WEB_APP__/INDEX',
	'ADMIN_WEB_APP__/RESOURCE/[RESOURCE_NAME]/ALL',
	'ADMIN_WEB_APP__/RESOURCE/[RESOURCE_NAME]/CREATE',
	'ADMIN_WEB_APP__/RESOURCE/[RESOURCE_NAME]/[DOCUMENT_ID]/EDIT',
]);
export type AdminWebAppRouteStaticId = EnumMember<
	typeof AdminWebAppRouteStaticIdEnum
>;

export type AdminWebAppRouteQueryParams = {
	'ADMIN_WEB_APP__/INDEX': {
		//
	};
	'ADMIN_WEB_APP__/RESOURCE/[RESOURCE_NAME]/ALL': {
		resource_name: string | undefined;
	};
	'ADMIN_WEB_APP__/RESOURCE/[RESOURCE_NAME]/CREATE': {
		resource_name: string | undefined;
	};
	'ADMIN_WEB_APP__/RESOURCE/[RESOURCE_NAME]/[DOCUMENT_ID]/EDIT': {
		document_id: string | undefined;
		resource_name: string | undefined;
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
	'SSO_WEB_APP__/LOGIN',
	'SSO_WEB_APP__/LOGOUT',
	'SSO_WEB_APP__/REGISTER',
]);
export type SsoWebAppRouteStaticId = EnumMember<
	typeof SsoWebAppRouteStaticIdEnum
>;

export type SsoWebAppRouteQueryParams = {
	'SSO_WEB_APP__/INDEX': {
		dest?: string | undefined;
	};
	'SSO_WEB_APP__/LOGIN': {
		dest?: string | undefined;
	};
	'SSO_WEB_APP__/LOGOUT': {
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
