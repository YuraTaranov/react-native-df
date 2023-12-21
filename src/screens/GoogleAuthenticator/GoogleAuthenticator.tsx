import React from 'react';
import {ActivityIndicator, Alert} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {View, Text, TouchableOpacity, TextInput, firestore} from '@components';
import {colors} from '@constants';
import {animation} from '@helpers';
import {useState, useCallback, useMemo, useAppDispatch, useAppSelector} from '@hooks';
import {selectGlobal, setIsAuthorized} from '@reducers/global';
import {selectProfile, setIsUserVerified} from '@reducers/profile';
import {httpPost} from '@services';
import styles from './styles';

const GoogleAuthenticator: React.FC = () => {
  const dispatch = useAppDispatch();
  const {isAuthorized} = useAppSelector(selectGlobal);
  const {user} = useAppSelector(selectProfile);
  const [loadingSecret, setLoadingSecret] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [code, setCode] = useState('');
  const [condition, setCondition] = useState(user?.is2FAEnabled ? 3 : 1);
  const [secret, setSecret] = useState({
    ascii: '',
    base32: '',
    hex: '',
    otpauth_url: '',
  });
  const userId = user?.uid;
  const has2fa = user?.is2FAEnabled;
  const twoFASecret = user?.twoFASecret;

  const createSecret = useCallback(async () => {
    // TODO: const {data} = await firebase.functions().httpsCallable('createSecret')();
    try {
      setLoadingSecret(true);
      const {data} = await httpPost('createSecret', {
        data: '',
      });
      setCondition(2);
      setSecret(data.result);
    } catch (error) {
      __DEV__ && console.log('google authenticator createSecret err', error);
      setCondition(1);
    } finally {
      setLoadingSecret(false);
    }
  }, []);

  const verify = useCallback(async () => {
    try {
      setLoadingVerify(true);
      const {data} = await httpPost('verifySecret', {
        data: {
          secret: has2fa && twoFASecret ? twoFASecret : secret.ascii,
          code,
        },
      });
      if (data.result === true) {
        if (!has2fa) {
          await firestore().collection('users').doc(userId).update({
            is2FAEnabled: true,
            twoFASecret: secret.ascii,
          });
        }
        dispatch(setIsAuthorized(true));
        dispatch(setIsUserVerified(true));
      } else {
        Alert.alert('Error', 'Code is invalid or expired');
      }
    } catch (error) {
      __DEV__ && console.log('google authenticator verify err', error);
    } finally {
      setLoadingVerify(false);
    }
  }, [code, secret, has2fa, twoFASecret]);

  const copyKey = useCallback(() => {
    Clipboard.setString(secret.base32);
    Alert.alert('', 'Text has been copied to the clipboard');
  }, [secret]);

  const changeCondition = useCallback(
    (cond: number) => () => {
      setCondition(cond);
    },
    [],
  );

  const skip = useCallback(() => {
    dispatch(setIsAuthorized(true));
  }, []);

  const content = useMemo(() => {
    if (condition === 1) {
      return (
        <TouchableOpacity style={styles.createButtonContainer} disabled={loadingSecret} onPress={createSecret}>
          {!loadingSecret ? (
            <Text style={styles.createButtonText}>Create new account for authenticator</Text>
          ) : (
            <ActivityIndicator size={'small'} color={colors.white_FFFFFF} />
          )}
        </TouchableOpacity>
      );
    }
    if (condition === 2) {
      return (
        <View style={styles.copyKeyContainer}>
          <Text style={styles.copyKeyDescription}>
            You need to copy this key and add it in the google authenticator app
          </Text>
          <TouchableOpacity style={styles.copyKeyBorder} onPress={copyKey}>
            <Text style={styles.copyKey}>{secret.base32}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.doneButton} onPress={changeCondition(3)}>
            <Text style={styles.createButtonText}>Done!</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (condition === 3) {
      return (
        <>
          <Text style={styles.enterCode}>Enter code from authenticator</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={code}
              onChangeText={setCode}
              placeholder="XXXXXX"
              placeholderTextColor={colors.grey_9c9992}
              maxLength={6}
              keyboardType="number-pad"
            />
          </View>
          {isAuthorized ? null : (
            <TouchableOpacity style={styles.backButton} onPress={changeCondition(2)}>
              <Text style={styles.createButtonText}>Back</Text>
            </TouchableOpacity>
          )}
        </>
      );
    }
  }, [condition, secret, loadingSecret, code]);

  const buttonDisabled = useMemo(() => {
    return condition !== 3 || code.length !== 6;
  }, [code, condition]);

  animation('ios');
  return (
    <View style={styles.container}>
      <View style={styles.inputsContainer}>{content}</View>
      {!has2fa && condition !== 3 ? (
        <TouchableOpacity style={styles.skipContainer} onPress={skip}>
          <View style={styles.skipBorder}>
            <Text style={styles.skip}>Skip</Text>
          </View>
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity
        style={{...styles.buttonContainer, backgroundColor: buttonDisabled ? colors.grey_eeeeee : colors.main_f0a776}}
        onPress={verify}
        disabled={buttonDisabled}
        activeOpacity={0.8}>
        {loadingVerify ? (
          <ActivityIndicator size={'small'} color={colors.white_FFFFFF} />
        ) : (
          <Text style={styles.buttonText}>{'Verify code'}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default GoogleAuthenticator;

//   const req = await fetch('http://127.0.0.1:5001/df-test-e1e78/us-central1/createSecret', {
//     method: 'POST',
//     body: JSON.stringify({data: ''}),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   const {result} = await req.json();

//   const req = await fetch('http://127.0.0.1:5001/df-test-e1e78/us-central1/verifySecret', {
//     method: 'POST',
//     body: JSON.stringify({
//       data: {
//         secret: secret.ascii,
//         code,
//       },
//     }),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   const {result} = await req.json();
