import { getEnum, EnumMember, Keys } from 'ergonomic';
import { idPrefixByCollection } from './apiYupHelpers.js';

export const WallotCollectionEnum = getEnum(Keys(idPrefixByCollection));
export type WallotCollection = EnumMember<typeof WallotCollectionEnum>;
