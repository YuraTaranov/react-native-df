import React from 'react';
import {View, Text, TouchableOpacity, Input, ButtonUsual, FirebaseAuthTypes} from '@components';
import {colors} from '@constants';
import {useState, useCallback, useMemo, useAppSelector} from '@hooks';
import {selectAdditional} from '@reducers/additional';
import {fbConfirmPhone, fbSignInPhone, fbSignUpEmail, replace} from '@services';
import {TSignInType} from '@types';
import styles from './styles';

const SignUp: React.FC = () => {
  const {authLoading} = useAppSelector(selectAdditional);
  const [signInType, setSignInType] = useState<TSignInType>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [secureTextEntryPass, setSecureTextEntryPass] = useState(true);
  const [secureTextEntryConfPass, setSecureTextEntryConfPass] = useState(true);
  const [code, setCode] = useState('');
  const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const [phoneAuthCondition, setPhoneAuthCondition] = useState<1 | 2>(1);

  const onPressEmail = useCallback(() => {
    setSignInType('email');
  }, []);

  const onPressPhone = useCallback(() => {
    setSignInType('phone');
  }, []);

  const showPass = useCallback(() => {
    setSecureTextEntryPass(!secureTextEntryPass);
  }, [secureTextEntryPass]);

  const showConfPass = useCallback(() => {
    setSecureTextEntryConfPass(!secureTextEntryConfPass);
  }, [secureTextEntryConfPass]);

  const navigateToSignIn = useCallback(() => {
    replace('SignIn');
  }, []);

  const signUpEmail = useCallback(async () => {
    fbSignUpEmail(email, password);
  }, [email, password]);

  const signInPhone = useCallback(async () => {
    fbSignInPhone(setConfirm, phone, setPhoneAuthCondition);
  }, [phone, code]);

  const confirmPhone = useCallback(async () => {
    confirm && fbConfirmPhone(confirm, code);
  }, [confirm, code]);

  const buttonDisabledEmail = useMemo(() => {
    return !email || !password || password !== confirmPassword;
  }, [email, password, confirmPassword]);

  const buttonDisabledPhone = useMemo(() => {
    if (phoneAuthCondition === 1) {
      return !phone || phone.length !== 10;
    }
    if (phoneAuthCondition === 2) {
      return !phone || !code || code.length !== 6;
    }
  }, [phone, code, phoneAuthCondition]);

  return (
    <View style={styles.container}>
      <View style={styles.inputsContainer}>
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={{
              ...styles.tabItem,
              backgroundColor: signInType === 'email' ? colors.main_f0a776 : colors.grey_eeeeee,
            }}
            onPress={onPressEmail}
            activeOpacity={1}>
            <Text style={styles.tabItemTitle}>Email and password</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.tabItem,
              backgroundColor: signInType === 'phone' ? colors.main_f0a776 : colors.grey_eeeeee,
            }}
            onPress={onPressPhone}
            activeOpacity={1}>
            <Text style={styles.tabItemTitle}>Phone number</Text>
          </TouchableOpacity>
        </View>
        {signInType === 'email' ? (
          <>
            <Input value={email} setValue={setEmail} placeholder="Email" keyboardType="email-address" />
            <Input
              value={password}
              setValue={setPassword}
              placeholder="Password"
              secureTextEntry={secureTextEntryPass}
              showButtonVisible
              onPressShow={showPass}
            />
            <Input
              value={confirmPassword}
              setValue={setConfirmPassword}
              placeholder="Confirm password"
              secureTextEntry={secureTextEntryConfPass}
              showButtonVisible
              onPressShow={showConfPass}
            />
          </>
        ) : (
          <>
            <Input
              value={phone}
              setValue={setPhone}
              placeholder="0XX XXX XX XX"
              maxLength={10}
              keyboardType="number-pad"
              editable={phoneAuthCondition === 1}
            />
            {phoneAuthCondition === 2 ? (
              <Input value={code} setValue={setCode} placeholder="XXXXXX" maxLength={6} keyboardType="number-pad" />
            ) : null}
          </>
        )}
      </View>
      <View style={styles.haveAccContainer}>
        <Text style={styles.haveAccText}>Already registered?</Text>
        <TouchableOpacity onPress={navigateToSignIn} style={styles.signInContainer}>
          <Text style={styles.signIn}>Sign In</Text>
        </TouchableOpacity>
      </View>
      {signInType === 'email' ? (
        <ButtonUsual
          title="Sign Up"
          onPress={signUpEmail}
          disabled={buttonDisabledEmail}
          activeOpacity={0.8}
          loading={authLoading}
          marginBottom={32}
        />
      ) : (
        <ButtonUsual
          title={phoneAuthCondition === 1 ? 'Sign In' : 'Confirm code'}
          onPress={phoneAuthCondition === 1 ? signInPhone : confirmPhone}
          disabled={buttonDisabledPhone}
          activeOpacity={0.8}
          loading={authLoading}
          marginBottom={32}
        />
      )}
    </View>
  );
};

export default SignUp;
