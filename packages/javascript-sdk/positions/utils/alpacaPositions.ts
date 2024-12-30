import * as yup from 'yup';
import { YupHelpers, getEnum, Keys } from 'ergonomic';

export const alpacaPositionProperties = {
	asset_class: yup.string().nullable().default(null),
	asset_id: yup.string().nullable().default(null),
	asset_marginable: YupHelpers.booleanDefaultFalse(),
	avg_entry_price: yup.string().nullable().default(null),
	change_today: yup.string().nullable().default(null),
	cost_basis: yup.string().nullable().default(null),
	current_price: yup.string().nullable().default(null),
	exchange: yup.string().nullable().default(null),
	lastday_price: yup.string().nullable().default(null),
	market_value: yup.string().nullable().default(null),
	qty: yup.string().nullable().default(null),
	qty_available: yup.string().nullable().default(null),
	side: yup.string().nullable().default(null),
	symbol: yup.string().defined().min(1),
	unrealized_intraday_pl: yup.string().nullable().default(null),
	unrealized_intraday_plpc: yup.string().nullable().default(null),
	unrealized_pl: yup.string().nullable().default(null),
	unrealized_plpc: yup.string().nullable().default(null),
} as const;
const alpacaPositionSchema = yup.object(alpacaPositionProperties);
export type AlpacaPosition = yup.InferType<typeof alpacaPositionSchema>;

export const AlpacaPositionPropertyNameEnum = getEnum(
	Keys(alpacaPositionProperties),
);
export type AlpacaPositionPropertyName =
	keyof typeof AlpacaPositionPropertyNameEnum.obj;

export type RemoveAlpacaPositionPrefix<T> = {
	[K in keyof T as K extends `alpaca_position_${infer Rest}` ? Rest : K]: T[K];
};
