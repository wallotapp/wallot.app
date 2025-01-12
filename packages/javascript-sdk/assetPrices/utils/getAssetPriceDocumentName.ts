/**
 * getAssetPriceDocumentName
 *
 * Returns a standardized name of an asset price.
 *
 * This value is set as the `name` field on asset price documents (a unique key) and can be used to lookup an asset price.
 *
 * @param symbol - The symbol of the asset, e.g. 'AAPL'
 * @param timestamp - The timestamp of the asset price, e.g. '2021-01-01'
 * @returns The document name for the asset price
 *
 * @example
 * ```ts
 * getAssetPriceDocumentName('AAPL', '2021-01-01')
 * // Returns 'AAPL (2021-01-01)'
 * ```
 */
export const getAssetPriceDocumentName = (symbol: string, timestamp: string) =>
	`${symbol} (${timestamp})`;
