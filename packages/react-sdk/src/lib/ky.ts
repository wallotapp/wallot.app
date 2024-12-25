import { generalizedKyInstance, getAuthenticatedGeneralizedKyInstance } from 'ergonomic-react/src/lib/ky';
import { defaultKyOptions } from '@wallot/react/src/config/kyConfig';
import { User as FirebaseUser } from 'firebase/auth';

export const defaultKyInstance = generalizedKyInstance.extend(defaultKyOptions);
export const getAuthenticatedKyInstance = (firebaseUser: FirebaseUser) => getAuthenticatedGeneralizedKyInstance(firebaseUser, defaultKyInstance);
