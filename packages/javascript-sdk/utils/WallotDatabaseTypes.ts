import { getEnum, EnumMember, Keys } from 'ergonomic';
import { idPrefixByResourceName } from './apiYupHelpers.js';

export const WallotCollectionEnum = getEnum(Keys(idPrefixByResourceName));
export type WallotCollection = EnumMember<typeof WallotCollectionEnum>;
