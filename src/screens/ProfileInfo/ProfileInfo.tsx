import React from 'react';
import {View, Text, Switch} from '@components';
import {createBiometricKeys, deleteBiometricKeys} from '@helpers';
import {useState, useCallback, useAppSelector} from '@hooks';
import {selectAdditional} from '@reducers/additional';
import {selectProfile} from '@reducers/profile';
import styles from './styles';

const ProfileInfo: React.FC = () => {
  const {user} = useAppSelector(selectProfile);
  const {biometricType} = useAppSelector(selectAdditional);
  const [faceIdEnable, setFaceIdEnable] = useState<boolean>(false);

  const toggleSwitch = () => setFaceIdEnable(previousState => !previousState);

  const toggleBiometricsSwitch = useCallback(async (value: boolean) => {
    // TODO:
    try {
      if (value) {
        const publicKey = await createBiometricKeys();
        setFaceIdEnable(true);
        return;
      }
      if (!value) {
        await deleteBiometricKeys();
        setFaceIdEnable(false);
      }
    } catch (error) {
      __DEV__ && console.log('bio switch error', error);
    }
  }, []);

  return (
    <View style={styles.container}>
      {biometricType !== 'none' ? (
        <View style={styles.switchContainer}>
          <Switch ios_backgroundColor="#3e3e3e" onValueChange={toggleSwitch} value={faceIdEnable} />
        </View>
      ) : null}
      {user?.email ? (
        <View style={styles.itemContainer}>
          <Text style={styles.itemName}>{`Email: ${user?.email}`}</Text>
        </View>
      ) : null}
      {user?.phone ? (
        <View style={styles.itemContainer}>
          <Text style={styles.itemName}>{`Phone: ${user?.phone}`}</Text>
        </View>
      ) : null}
      <View style={styles.itemContainer}>
        <Text style={styles.itemName}>{`PhoneId: ${user?.phoneId}`}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemName}>{`Phone model: ${user?.phoneModel}`}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemName}>{`IP: ${user?.ip}`}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemName}>{`UID: ${user?.uid}`}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.itemName}>{`Has 2FA: ${user?.is2FAEnabled ? 'Yes' : 'No'}`}</Text>
      </View>
      {user?.is2FAEnabled ? (
        <View style={styles.itemContainer}>
          <Text style={styles.itemName}>{`2FA Secret: ${user?.uid}`}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default ProfileInfo;
