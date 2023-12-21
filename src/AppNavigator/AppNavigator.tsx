import React from 'react';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ActivityIndicator, auth, firestore, View} from '@components';
import {colors} from '@constants';
import {clearUserCredentials, getBiometricType} from '@helpers';
import {useAppDispatch, useAppSelector, useCallback, useEffect, useState, useMemo, useDeviceInfo} from '@hooks';
import {selectGlobal} from '@reducers/global';
import {selectProfile, setProfile} from '@reducers/profile';
import {
  GoogleAuthenticator,
  Onboarding, // ADD NEW SCREEN
} from '@screens';
import {navigationRef, onStateChange} from '@services';
import {IUser} from '@types';
import {AuthNavigator} from './stacks/AuthNavigator';
import {RootNavigator} from './stacks/RootNavigator';
import styles from './styles';

const InitialStack = createNativeStackNavigator();

const AppNavigator: React.FC = () => {
  const dispatch = useAppDispatch();
  const {token, firstOpenApp, isAuthorized} = useAppSelector(selectGlobal);
  const {user, isUserVerified} = useAppSelector(selectProfile);
  const [loading, setLoading] = useState(true);
  const {ip, phoneId, phoneModel} = useDeviceInfo();

  useEffect(() => {
    getBiometricType();
  }, []);

  const onAuthStateChanged = useCallback(
    async (firebaseUser: FirebaseAuthTypes.User | null) => {
      if (!firebaseUser) {
        setLoading(false);
        clearUserCredentials();
        return;
      }
      if (firebaseUser && !isUserVerified) {
        try {
          const firestoreUser = await firestore().collection('users').doc(firebaseUser.uid).get();
          const userParsed: IUser | undefined = firestoreUser && (firestoreUser.data() as IUser);
          if (userParsed) {
            setLoading(false);
            dispatch(setProfile(userParsed));
            if (
              userParsed.is2FAEnabled &&
              ip &&
              phoneId &&
              phoneModel &&
              (userParsed.ip !== ip || userParsed.phoneId !== phoneId || userParsed.phoneModel !== phoneModel)
            ) {
              await auth().signOut();
            }
          }
        } catch (error) {
          __DEV__ && console.log('onAuthStateChanged', error);
        }
      }
    },
    [isUserVerified, ip, phoneId, phoneModel],
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [onAuthStateChanged]);

  const screens = useMemo(() => {
    // if (firstOpenApp) {
    //   return <InitialStack.Screen name={'Onboarding'} component={Onboarding} options={{headerShown: false}} />;
    // }
    if (token && isAuthorized && user) {
      if (user.is2FAEnabled && !isUserVerified) {
        return (
          <InitialStack.Screen
            name="GoogleAuthenticator"
            component={GoogleAuthenticator}
            options={{headerTitle: 'Google Authenticator', headerShown: true}}
          />
        );
      } else {
        return <InitialStack.Screen name="RootNavigator" component={RootNavigator} />;
      }
    } else {
      return <InitialStack.Screen name="AuthNavigator" component={AuthNavigator} />;
    }
  }, [firstOpenApp, token, isAuthorized, isUserVerified, user]);

  return (
    <NavigationContainer ref={navigationRef} onStateChange={onStateChange}>
      {loading ? (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color={colors.main_f0a776} />
        </View>
      ) : (
        <InitialStack.Navigator screenOptions={{headerShown: false, gestureEnabled: false}}>
          {screens}
        </InitialStack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
