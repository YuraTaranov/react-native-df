import React from 'react';
import {View, ReactNativeBiometrics, ButtonUsual} from '@components';
import {useTranslation, useAppSelector} from '@hooks';
import {selectProfile} from '@reducers/profile';
import styles from './styles';

type TProps = {};

const Biometrics: React.FC<TProps> = ({}) => {
  const {t} = useTranslation();
  const {user} = useAppSelector(selectProfile);

  const rnBiometrics = new ReactNativeBiometrics();

  const createBioSignature = async () => {
    const biometricKeysExist = await rnBiometrics.biometricKeysExist();
    if (biometricKeysExist.keysExist) {
      // TODO:
      try {
        const createSignature = await rnBiometrics.createSignature({
          promptMessage: t('Вхід'),
          cancelButtonText: t('Скасувати'),
          payload: `${user?.phoneId}`,
        });
        const {success, signature} = createSignature;
        if (success) {
          // TODO:
        } else {
          // TODO:
        }
      } catch (error) {
        // TODO:
      }
    } else {
      // TODO:
    }
  };

  return (
    <View style={styles.container}>
      <ButtonUsual title="Create signature" onPress={createBioSignature} />
    </View>
  );
};

export default Biometrics;
