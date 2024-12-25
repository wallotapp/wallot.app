/* eslint-disable @typescript-eslint/restrict-template-expressions */
import {
	AdminSiteRouteStaticId,
	AdminSiteRouteQueryParams,
} from './routeDefinitions.js';

export type GetAdminSiteRouteOptions<T extends AdminSiteRouteStaticId> = {
	includeOrigin?: boolean;
	origin: string | null | undefined;
	queryParams: AdminSiteRouteQueryParams[T];
	routeStaticId: T;
};

export const getAdminSiteRoute = <T extends AdminSiteRouteStaticId>(
	options: GetAdminSiteRouteOptions<T>,
) => {
	const { includeOrigin = false, origin, routeStaticId } = options;
	if (includeOrigin && !origin) {
		console.error('Origin is required');
		return '/';
	}

	const queries: string[] = [];

	if (routeStaticId === 'ADMIN_SITE__/INDEX') {
		const path = `/`;
		if (includeOrigin) return `${origin as string}${path}`;
		return path;
	}

	if (
		routeStaticId === 'ADMIN_SITE__/RESOURCE/[RESOURCE_NAME]/ALL' ||
		routeStaticId === 'ADMIN_SITE__/RESOURCE/[RESOURCE_NAME]/CREATE'
	) {
		const resourceRouteQueryParams = options.queryParams as
			| AdminSiteRouteQueryParams['ADMIN_SITE__/RESOURCE/[RESOURCE_NAME]/ALL']
			| AdminSiteRouteQueryParams['ADMIN_SITE__/RESOURCE/[RESOURCE_NAME]/CREATE'];
		const resourceName = resourceRouteQueryParams.resource_name;
		if (!resourceName) {
			console.error('resource_name is required');
			return '/';
		}
		const path = `/resource/${resourceName}${
			routeStaticId === 'ADMIN_SITE__/RESOURCE/[RESOURCE_NAME]/CREATE'
				? '/create'
				: '/all'
		}${queries.length ? `?${queries.join('&')}` : ''}`;
		if (includeOrigin) return `${origin as string}${path}`;
		return path;
	}

	if (
		routeStaticId === 'ADMIN_SITE__/RESOURCE/[RESOURCE_NAME]/[DOCUMENT_ID]/EDIT'
	) {
		const resourceRouteQueryParams =
			options.queryParams as AdminSiteRouteQueryParams['ADMIN_SITE__/RESOURCE/[RESOURCE_NAME]/[DOCUMENT_ID]/EDIT'];
		const resourceName = resourceRouteQueryParams.resource_name;
		const documentId = resourceRouteQueryParams.document_id;
		if (!resourceName || !documentId) {
			console.error('resource_name and document_id are required');
			return '/';
		}
		const path = `/resource/${resourceName}/${documentId}/edit${
			queries.length ? `?${queries.join('&')}` : ''
		}`;
		if (includeOrigin) return `${origin as string}${path}`;
		return path;
	}

	throw new Error('Invalid routeStaticId');
};
