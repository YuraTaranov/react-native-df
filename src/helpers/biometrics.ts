import {BiometryTypes, ReactNativeBiometrics} from '@components';
import {errorHandler} from '@helpers';
import {setBiometricType} from '@reducers/additional';
import {TBiometricType} from '@types';
import {store} from '../store';

export type TBiometricTypeName = 'Touch ID' | 'Face ID' | 'Fingerprint' | 'None';

const saveBiometricType = (type: TBiometricType) => store.dispatch(setBiometricType(type));

const rnBiometrics = new ReactNativeBiometrics();

export const getBiometricType: () => void = () =>
  rnBiometrics.isSensorAvailable().then(resultObject => {
    const {available, biometryType} = resultObject;
    if (available && biometryType === BiometryTypes.TouchID) {
      saveBiometricType('touchId');
    } else if (available && biometryType === BiometryTypes.FaceID) {
      saveBiometricType('faceId');
    } else if (available && biometryType === BiometryTypes.Biometrics) {
      saveBiometricType('fingerprint');
      return 'Fingerprint';
    } else {
      saveBiometricType('none');
    }
  });

export const getBiometricTypeName: (biometricType: TBiometricType) => TBiometricTypeName = biometricType => {
  if (biometricType === 'faceId') {
    return 'Face ID';
  }
  if (biometricType === 'touchId') {
    return 'Touch ID';
  }
  if (biometricType === 'fingerprint') {
    return 'Fingerprint';
  }
  return 'None';
};

export const createBiometricKeys = async () => {
  try {
    const res = await rnBiometrics.createKeys();
    return res.publicKey;
    // TODO:
    //   const body = await httpPost(urls.biometricsAdd, {
    //     public_key: res.publicKey,
    //     device_id,
    //   });
  } catch (e: any) {
    __DEV__ && console.log('create keys error', e);
    errorHandler(e, 'createKeys error biometrics reg');
  }
};

export const deleteBiometricKeys = async () => {
  try {
    const res = await rnBiometrics.deleteKeys();
    return res;
  } catch (error) {
    __DEV__ && console.log('delete keys error', error);
  }
};
