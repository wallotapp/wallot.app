import { EnumMember, getEnum } from 'ergonomic';

export const SchoolMetroAreaEnum = getEnum([
	'Cape Coral-Fort Myers',
	'Fort Lauderdale',
	'Gainesville',
	'Jacksonville',
	'Lakeland-Winter Haven',
	'Miami-Dade County',
	'Orlando-Kissimmee-Sanford',
	'Panama City',
	'Pensacola-Ferry Pass-Brent',
	'Sarasota-North Port-Bradenton',
	'Tampa-St. Petersburg-Clearwater',
	'Tallahassee',
	'West Palm Beach',
]);
export type SchoolMetroArea = EnumMember<typeof SchoolMetroAreaEnum>;

export type School = {
	name: string;
	address: string;
	/**
	 * Sorted by proximity
	 */
	metro_areas: SchoolMetroArea[];
};
