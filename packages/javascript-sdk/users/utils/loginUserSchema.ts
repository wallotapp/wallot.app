import * as R from 'ramda';
import * as yup from 'yup';
import { Keys, getFieldSpecByFieldKey } from 'ergonomic';
import { registerUserProperties } from './registerUserSchema.js';

export const loginUserProperties = R.pick(['email', 'password'], registerUserProperties);
export const loginUserSchema = yup.object(loginUserProperties);
export const loginUserSchemaFieldSpecByFieldKey = getFieldSpecByFieldKey(loginUserSchema, Keys(loginUserProperties));

export type LoginUserParams = yup.InferType<typeof loginUserSchema>;
export type LoginUserResponse = { custom_token: string };
