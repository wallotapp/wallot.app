import * as yup from 'yup';
import { getEnum, Keys } from 'ergonomic';

export const AlpacaOrderCategoryEnum = getEnum(['default']);
export type AlpacaOrderCategory = keyof typeof AlpacaOrderCategoryEnum.obj;

// Asset Class
export const AlpacaOrderAssetClassEnum = getEnum(['us_equity', 'us_option', 'crypto']);
export type AlpacaOrderAssetClass = keyof typeof AlpacaOrderAssetClassEnum.obj;

// Order Class
export const AlpacaOrderOrderClassEnum = getEnum(['simple', 'bracket', 'oco', 'oto']);
export type AlpacaOrderOrderClass = keyof typeof AlpacaOrderOrderClassEnum.obj;

// Order Type
export const AlpacaOrderOrderTypeEnum = getEnum(['market', 'limit', 'stop', 'stop_limit', 'trailing_stop']);
export type AlpacaOrderOrderType = keyof typeof AlpacaOrderOrderTypeEnum.obj;

// Side
export const AlpacaOrderSideEnum = getEnum(['buy', 'sell', 'buy_minus', 'sell_plus', 'sell_short', 'sell_short_exempt', 'undisclosed', 'cross', 'cross_short']);
export type AlpacaOrderSide = keyof typeof AlpacaOrderSideEnum.obj;

// Status
export const AlpacaOrderStatusEnum = getEnum([
	'new',
	'partially_filled',
	'filled',
	'done_for_day',
	'canceled',
	'expired',
	'replaced',
	'pending_cancel',
	'pending_replace',
	'accepted',
	'pending_new',
	'accepted_for_bidding',
	'stopped',
	'rejected',
	'suspended',
	'calculated',
]);
export type AlpacaOrderStatus = keyof typeof AlpacaOrderStatusEnum.obj;

// Time in Force
export const AlpacaOrderTimeInForceEnum = getEnum(['day', 'gtc', 'opg', 'cls', 'ioc', 'fok']);
export type AlpacaOrderTimeInForce = keyof typeof AlpacaOrderTimeInForceEnum.obj;

// Type
export const AlpacaOrderTypeEnum = getEnum(['market', 'limit', 'stop', 'stop_limit', 'trailing_stop']);
export type AlpacaOrderType = keyof typeof AlpacaOrderTypeEnum.obj;

export const alpacaOrderProperties = {
	alpaca_order_asset_class: AlpacaOrderAssetClassEnum.getOptionalSchema().nullable().default(null),
	alpaca_order_asset_id: yup.string().nullable().default(null),
	alpaca_order_canceled_at: yup.string().nullable().default(null),
	alpaca_order_client_order_id: yup.string().nullable().default(null),
	alpaca_order_created_at: yup.string().nullable().default(null),
	alpaca_order_expired_at: yup.string().nullable().default(null),
	alpaca_order_extended_hours: yup.boolean().nullable().default(null),
	alpaca_order_failed_at: yup.string().nullable().default(null),
	alpaca_order_filled_at: yup.string().nullable().default(null),
	alpaca_order_filled_avg_price: yup.string().nullable().default(null),
	alpaca_order_filled_qty: yup.string().nullable().default(null),
	alpaca_order_id: yup.string().nullable().default(null).meta({
		unique_key: true,
	}),
	alpaca_order_limit_price: yup.string().nullable().default(null),
	alpaca_order_notional: yup.string().nullable().default(null),
	alpaca_order_order_class: AlpacaOrderOrderClassEnum.getOptionalSchema().nullable().default(null),
	alpaca_order_order_type: AlpacaOrderOrderTypeEnum.getOptionalSchema().nullable().default(null),
	alpaca_order_qty: yup.string().nullable().default(null),
	alpaca_order_replaced_at: yup.string().nullable().default(null),
	alpaca_order_replaced_by: yup.string().nullable().default(null),
	alpaca_order_replaces: yup.string().nullable().default(null),
	alpaca_order_side: AlpacaOrderSideEnum.getOptionalSchema().nullable().default(null),
	alpaca_order_status: AlpacaOrderStatusEnum.getOptionalSchema().nullable().default(null),
	alpaca_order_stop_price: yup.string().nullable().default(null),
	alpaca_order_submitted_at: yup.string().nullable().default(null),
	alpaca_order_symbol: yup.string().nullable().default(null),
	alpaca_order_time_in_force: AlpacaOrderTimeInForceEnum.getOptionalSchema().nullable().default(null),
	alpaca_order_type: AlpacaOrderTypeEnum.getOptionalSchema().nullable().default(null),
	alpaca_order_updated_at: yup.string().nullable().default(null),
} as const;

export const AlpacaOrderPropertyNameEnum = getEnum(Keys(alpacaOrderProperties));
export type AlpacaOrderPropertyName = keyof typeof AlpacaOrderPropertyNameEnum.obj;

export type RemoveAlpacaOrderPrefix<T> = {
	[K in keyof T as K extends `alpaca_order_${infer Rest}` ? Rest : K]: T[K];
};
