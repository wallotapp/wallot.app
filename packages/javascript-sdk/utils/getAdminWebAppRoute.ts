/* eslint-disable @typescript-eslint/restrict-template-expressions */
import {
	AdminWebAppRouteStaticId,
	AdminWebAppRouteQueryParams,
} from './routeDefinitions.js';

export type GetAdminWebAppRouteOptions<T extends AdminWebAppRouteStaticId> = {
	includeOrigin?: boolean;
	origin: string | null | undefined;
	queryParams: AdminWebAppRouteQueryParams[T];
	routeStaticId: T;
};

export const getAdminWebAppRoute = <T extends AdminWebAppRouteStaticId>(
	options: GetAdminWebAppRouteOptions<T>,
) => {
	const { includeOrigin = false, origin, routeStaticId } = options;
	if (includeOrigin && !origin) {
		console.error('Origin is required');
		return '/';
	}

	const queries: string[] = [];

	if (routeStaticId === 'ADMIN_WEB_APP__/INDEX') {
		const path = `/`;
		if (includeOrigin) return `${origin as string}${path}`;
		return path;
	}

	if (
		routeStaticId === 'ADMIN_WEB_APP__/RESOURCES/[RESOURCE_NAME]/ALL' ||
		routeStaticId === 'ADMIN_WEB_APP__/RESOURCES/[RESOURCE_NAME]/CREATE'
	) {
		const resourceRouteQueryParams = options.queryParams as
			| AdminWebAppRouteQueryParams['ADMIN_WEB_APP__/RESOURCES/[RESOURCE_NAME]/ALL']
			| AdminWebAppRouteQueryParams['ADMIN_WEB_APP__/RESOURCES/[RESOURCE_NAME]/CREATE'];
		const resourceName = resourceRouteQueryParams.resource_name;
		if (!resourceName) {
			console.error('resource_name is required');
			return '/';
		}
		const path = `/resources/${resourceName}${
			routeStaticId === 'ADMIN_WEB_APP__/RESOURCES/[RESOURCE_NAME]/CREATE'
				? '/create'
				: '/all'
		}${queries.length ? `?${queries.join('&')}` : ''}`;
		if (includeOrigin) return `${origin as string}${path}`;
		return path;
	}

	if (
		routeStaticId ===
		'ADMIN_WEB_APP__/RESOURCES/[RESOURCE_NAME]/[DOCUMENT_ID]/EDIT'
	) {
		const resourceRouteQueryParams =
			options.queryParams as AdminWebAppRouteQueryParams['ADMIN_WEB_APP__/RESOURCES/[RESOURCE_NAME]/[DOCUMENT_ID]/EDIT'];
		const resourceName = resourceRouteQueryParams.resource_name;
		const documentId = resourceRouteQueryParams.document_id;
		if (!resourceName || !documentId) {
			console.error('resource_name and document_id are required');
			return '/';
		}
		const path = `/resources/${resourceName}/${documentId}/edit${
			queries.length ? `?${queries.join('&')}` : ''
		}`;
		if (includeOrigin) return `${origin as string}${path}`;
		return path;
	}

	throw new Error('Invalid routeStaticId');
};
