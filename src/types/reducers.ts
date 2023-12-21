import {IUser, TBiometricType} from './components';

export enum EDataLoadingStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected',
}

export type TGlobalState = {
  global: {
    token: string;
    isAuthorized: boolean;
    firstOpenApp: boolean;
    language: string;
  };
  additional: {
    loading: boolean;
    authLoading: boolean;
    currentRouteName: string;
    biometricType: TBiometricType;
  };
  profile: {
    user: IUser | null;
    isUserVerified: boolean;
  };
};
