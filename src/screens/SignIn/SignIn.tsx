import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Input,
  ButtonUsual,
  FirebaseAuthTypes,
  GoogleSignin,
  appleAuth,
  Image,
} from '@components';
import {colors, firebaseWebClientId} from '@constants';
import {getBiometricTypeName} from '@helpers';
import {useState, useCallback, useMemo, useAppSelector} from '@hooks';
import {selectAdditional} from '@reducers/additional';
import {
  fbConfirmPhone,
  fbGoogleSignIn,
  fbSignInEmail,
  fbSignInPhone,
  fbAppleSignIn,
  navigate,
  replace,
  fbFacebookSignIn,
} from '@services';
import {TSignInType} from '@types';
import styles from './styles';

GoogleSignin.configure({
  webClientId: firebaseWebClientId,
});

const SignUp: React.FC = () => {
  const {authLoading} = useAppSelector(selectAdditional);
  const {biometricType} = useAppSelector(selectAdditional);
  const [signInType, setSignInType] = useState<TSignInType>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [code, setCode] = useState('');
  const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);
  const [phoneAuthCondition, setPhoneAuthCondition] = useState<1 | 2>(1);
  const biometricTypeName = getBiometricTypeName(biometricType);

  const onPressEmail = useCallback(() => {
    setSignInType('email');
  }, []);

  const onPressPhone = useCallback(() => {
    setSignInType('phone');
  }, []);

  const showPass = useCallback(() => {
    setSecureTextEntry(!secureTextEntry);
  }, [secureTextEntry]);

  const navigateToSignUp = useCallback(() => {
    replace('SignUp');
  }, []);

  const navigateToResetPass = useCallback(() => {
    navigate('ResetPassword');
  }, []);

  const signInEmail = useCallback(async () => {
    fbSignInEmail(email, password);
  }, [email, password]);

  const signInPhone = useCallback(async () => {
    fbSignInPhone(setConfirm, phone, setPhoneAuthCondition);
  }, [phone]);

  const confirmPhone = useCallback(async () => {
    confirm && fbConfirmPhone(confirm, code);
  }, [confirm, code]);

  const onGoogleButtonPress = useCallback(() => {
    fbGoogleSignIn();
  }, []);

  const onAppleButtonPress = useCallback(() => {
    fbAppleSignIn();
  }, []);

  const onFacebookButtonPress = useCallback(async () => {
    fbFacebookSignIn();
  }, []);

  const biometricSignIn = useCallback(() => {}, []);

  const buttonDisabledEmail = useMemo(() => {
    return !email || !password || authLoading;
  }, [email, password, authLoading]);

  const buttonDisabledPhone = useMemo(() => {
    if (phoneAuthCondition === 1) return !phone || phone.length !== 10;
    if (phoneAuthCondition === 2) return !phone || !code || code.length !== 6;
    return authLoading;
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
              secureTextEntry={secureTextEntry}
              showButtonVisible
              onPressShow={showPass}
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
        <Text style={styles.or}>or</Text>
        <Text style={styles.orUseGoogle}>Sign in with social</Text>
        <View style={styles.socialContainer}>
          <TouchableOpacity style={{...styles.socialIconContainer, marginLeft: 0}} onPress={onGoogleButtonPress}>
            <Image
              source={{
                uri: 'https://w7.pngwing.com/pngs/543/934/png-transparent-google-app-logo-google-logo-g-suite-google-text-logo-circle.png',
              }}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          {appleAuth.isSupported ? (
            <TouchableOpacity style={styles.socialIconContainer} onPress={onAppleButtonPress}>
              <Image
                source={{
                  uri: 'https://w7.pngwing.com/pngs/106/75/png-transparent-apple-logo-macbook-business-apple-heart-computer-logo.png',
                }}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity style={styles.socialIconContainer} onPress={onFacebookButtonPress}>
            <Image
              source={{uri: 'https://i.pinimg.com/originals/42/75/49/427549f6f22470ff93ca714479d180c2.png'}}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>
        {biometricType !== 'none' && biometricTypeName ? (
          <View style={{alignItems: 'center'}}>
            <Text style={styles.or}>or</Text>
            <Text style={styles.orUseGoogle}>Sign in with biometric</Text>
            <ButtonUsual title={biometricTypeName} onPress={biometricSignIn} width="40%" />
          </View>
        ) : null}
        <View style={styles.forgotPassContainer}>
          <View style={styles.haveAccContainer}>
            <Text style={styles.haveAccText}>Don't have an account?</Text>
            <TouchableOpacity onPress={navigateToSignUp} style={styles.signInContainer}>
              <Text style={styles.signIn}>Sign up</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={navigateToResetPass} style={styles.forgotPassButtonContainer}>
            <Text style={styles.forgotPass}>Forgot password</Text>
          </TouchableOpacity>
        </View>
      </View>
      {signInType === 'email' ? (
        <ButtonUsual
          title="Sign In"
          onPress={signInEmail}
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
