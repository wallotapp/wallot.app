import { getEnum, EnumMember, Keys } from 'ergonomic';
import { idPrefixByResourceName } from './apiYupHelpers.js';

export const WallotResourceNameEnum = getEnum(Keys(idPrefixByResourceName));
export type WallotResourceName = EnumMember<typeof WallotResourceNameEnum>;
