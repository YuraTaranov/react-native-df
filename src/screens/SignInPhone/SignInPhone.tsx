import React from 'react';
import {ActivityIndicator, Alert} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {View, Text, TouchableOpacity, TextInput} from '@components';
import {colors} from '@constants';
import {animation} from '@helpers';
import {useState, useCallback, useMemo} from '@hooks';
import {replace} from '@services';
import styles from './styles';

const SignUp: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('0995431532');
  const [code, setCode] = useState('');
  const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const [condition, setCondition] = useState(1);

  const signIn = useCallback(async () => {
    try {
      setLoading(true);
      const confirmation = await auth().signInWithPhoneNumber(`+38${phone}`);
      setConfirm(confirmation);
      setCondition(2);
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        return Alert.alert('There is no user record corresponding to this identifier. The user may have been deleted');
      }
      if (error.code === 'auth/invalid-email') {
        return Alert.alert('That email address is invalid!');
      }
      if (error.code === 'auth/wrong-password') {
        return Alert.alert('The password is invalid or the user does not have a password.');
      }
      return Alert.alert(error.message);
    } finally {
      setLoading(false);
    }
  }, [phone]);

  const navigateToSignIn = useCallback(() => {
    replace('SignIn');
  }, []);

  const confirmPhone = useCallback(async () => {
    if (confirm) {
      try {
        setLoading(true);
        await confirm.confirm(code);
      } catch (error) {
        __DEV__ && console.log('phone confirm err', error);
      } finally {
        setLoading(false);
      }
    }
  }, [confirm, code]);

  const buttonDisabled = useMemo(() => {
    if (condition === 1) {
      return !phone || phone.length !== 10;
    }
    if (condition === 2) {
      return !phone || !code || code.length !== 6;
    }
  }, [phone, code, condition]);

  animation('ios');
  return (
    <View style={styles.container}>
      <View style={styles.inputsContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Phone 0XX XXX XX XX"
            maxLength={10}
            placeholderTextColor={colors.grey_9c9992}
            keyboardType="number-pad"
            editable={condition === 1}
          />
        </View>
        {condition === 2 ? (
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
        ) : null}
        <TouchableOpacity style={styles.withPhoneContainer} onPress={navigateToSignIn}>
          <Text style={styles.withPhone}>Sign in with email and password</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{...styles.buttonContainer, backgroundColor: buttonDisabled ? colors.grey_eeeeee : colors.main_f0a776}}
        onPress={condition === 1 ? signIn : confirmPhone}
        disabled={buttonDisabled}
        activeOpacity={0.8}>
        {loading ? (
          <ActivityIndicator size={'small'} color={colors.white_FFFFFF} />
        ) : (
          <Text style={styles.buttonText}>{condition === 1 ? 'Sign In' : 'Confirm code'}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
