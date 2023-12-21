import {GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';
import {Alert, auth, FirebaseAuthTypes, appleAuth, LoginManager, AccessToken, DeviceInfo, firestore} from '@components';
import {setAuthLoading} from '@reducers/additional';
import {setIsAuthorized, setToken} from '@reducers/global';
import {setProfile} from '@reducers/profile';
import {navigate} from '@services';
import {IUser} from '@types';
import {store} from '../store';
import {AppleRequestResponse} from '@invertase/react-native-apple-authentication';

enum EFirebaseAuthErrors {
  UserNotFound = 'auth/user-not-found',
  InvalidEmail = 'auth/invalid-email',
  WrongPassword = 'auth/wrong-password',
  EmailUsed = 'auth/email-already-in-use',
  WeakPassword = 'auth/weak-password',
}

const fbSignInEmail = async (email: string, password: string) => {
  try {
    store.dispatch(setAuthLoading(true));
    const user = await auth().signInWithEmailAndPassword(email, password);
    authorizeUser(user.user);
    __DEV__ && console.log(`AUTH ---> Firebase sign in via Email and Pass: ${JSON.stringify(user)}`);
    return user;
  } catch (error: any) {
    store.dispatch(setAuthLoading(false));
    if (error.code === EFirebaseAuthErrors.UserNotFound) {
      return Alert.alert('There is no user record corresponding to this identifier. The user may have been deleted');
    }
    if (error.code === EFirebaseAuthErrors.InvalidEmail) {
      return Alert.alert('That email address is invalid!');
    }
    if (error.code === EFirebaseAuthErrors.WrongPassword) {
      return Alert.alert('The password is invalid or the user does not have a password.');
    }
    return Alert.alert(error.message);
  }
};

const fbSignUpEmail = async (email: string, password: string) => {
  try {
    store.dispatch(setAuthLoading(true));
    const user = await auth().createUserWithEmailAndPassword(email, password);
    if (user && user.additionalUserInfo?.isNewUser) {
      saveUserToDB(user.user);
    } else {
      authorizeUser(user.user);
    }
    __DEV__ && console.log(`AUTH ---> Firebase sign up via Email and Pass: ${JSON.stringify(user)}`);
    return user;
  } catch (error: any) {
    store.dispatch(setAuthLoading(false));
    if (error.code === EFirebaseAuthErrors.EmailUsed) {
      return Alert.alert('That email address is already in use!');
    }
    if (error.code === EFirebaseAuthErrors.InvalidEmail) {
      return Alert.alert('That email address is invalid!');
    }
    if (error.code === EFirebaseAuthErrors.WeakPassword) {
      return Alert.alert('Password must be at least 6 characters');
    }
    return Alert.alert(error.message);
  }
};

const fbSignInPhone = async (
  setConfirm: (val: FirebaseAuthTypes.ConfirmationResult) => void,
  phone: string,
  setPhoneAuthCondition: (val: 1 | 2) => void,
) => {
  try {
    store.dispatch(setAuthLoading(true));
    const confirmation: FirebaseAuthTypes.ConfirmationResult = await auth().signInWithPhoneNumber(`+38${phone}`);
    setConfirm(confirmation);
    setPhoneAuthCondition(2);
  } catch (error: any) {
    if (error.code === EFirebaseAuthErrors.UserNotFound) {
      return Alert.alert('There is no user record corresponding to this identifier. The user may have been deleted');
    }
    if (error.code === EFirebaseAuthErrors.InvalidEmail) {
      return Alert.alert('That email address is invalid!');
    }
    if (error.code === EFirebaseAuthErrors.WrongPassword) {
      return Alert.alert('The password is invalid or the user does not have a password.');
    }
    return Alert.alert(error.message);
  } finally {
    store.dispatch(setAuthLoading(false));
  }
};

const fbConfirmPhone = async (confirm: FirebaseAuthTypes.ConfirmationResult, code: string) => {
  try {
    store.dispatch(setAuthLoading(true));
    const user = await confirm.confirm(code);
    if (user) {
      if (user.additionalUserInfo?.isNewUser) {
        saveUserToDB(user.user);
      } else {
        authorizeUser(user.user);
      }
    }
    __DEV__ && console.log(`AUTH ---> Firebase authenticated via phone: ${JSON.stringify(user)}`);
    return user;
  } catch (error) {
    store.dispatch(setAuthLoading(false));
    __DEV__ && console.log('phone confirm err', error);
  }
};

const fbGoogleSignIn = async () => {
  try {
    store.dispatch(setAuthLoading(true));
    const hasPlayServices = await GoogleSignin.hasPlayServices();
    if (hasPlayServices) {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential: FirebaseAuthTypes.UserCredential = await auth().signInWithCredential(googleCredential);
      if (userCredential.additionalUserInfo?.isNewUser) {
        saveUserToDB(userCredential.user);
      } else {
        authorizeUser(userCredential.user);
      }
      __DEV__ && console.log(`AUTH ---> Firebase authenticated via Google: ${JSON.stringify(userCredential)}`);
      return userCredential.user;
    } else {
      Alert.alert('Error', 'Play services not available or outdated');
    }
  } catch (error: any) {
    store.dispatch(setAuthLoading(false));
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      __DEV__ && console.log('user cancelled the login flow');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      __DEV__ && console.log('operation (e.g. sign in) is in progress already');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      __DEV__ && console.log('play services not available or outdated');
    } else {
      __DEV__ && console.log('google sign in', error);
    }
  }
};

const fbAppleSignIn = async () => {
  try {
    store.dispatch(setAuthLoading(true));
    const appleAuthRequestResponse: AppleRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });
    const {identityToken, nonce} = appleAuthRequestResponse;
    if (identityToken) {
      const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
      const userCredential: FirebaseAuthTypes.UserCredential = await auth().signInWithCredential(appleCredential);
      if (userCredential.additionalUserInfo?.isNewUser) {
        saveUserToDB(userCredential.user);
      } else {
        authorizeUser(userCredential.user);
      }
      __DEV__ && console.log(`AUTH ---> Firebase authenticated via Apple: ${JSON.stringify(userCredential)}`);
      return userCredential.user;
    } else {
      __DEV__ && console.log('apple sign in, no identityToken...');
    }
  } catch (error) {
    store.dispatch(setAuthLoading(false));
    __DEV__ && console.log('apple sign in error', error);
  }
};

const fbFacebookSignIn = async () => {
  try {
    store.dispatch(setAuthLoading(true));
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
    const userCredential: FirebaseAuthTypes.UserCredential = await auth().signInWithCredential(facebookCredential);
    if (userCredential.additionalUserInfo?.isNewUser) {
      saveUserToDB(userCredential.user);
    } else {
      authorizeUser(userCredential.user);
    }
    __DEV__ && console.log(`AUTH ---> Firebase authenticated via Facebook: ${JSON.stringify(userCredential)}`);
    return userCredential;
  } catch (error: any) {
    store.dispatch(setAuthLoading(false));
    error.message && Alert.alert('Error', error.message);
    __DEV__ && console.warn('facebook sign in error', error);
  }
};

const saveUserToDB = async (currentUser: FirebaseAuthTypes.User) => {
  try {
    const ip = await DeviceInfo.getIpAddress();
    const phoneId = await DeviceInfo.getUniqueId();
    const phoneModel = DeviceInfo.getModel();
    const token = await currentUser.getIdToken();

    const newUser: IUser = {
      uid: currentUser.uid,
      email: currentUser.email,
      phone: currentUser.phoneNumber,
      ip,
      phoneId,
      phoneModel,
      is2FAEnabled: false,
    };
    await firestore().collection('users').doc(currentUser.uid).set(newUser);
    store.dispatch(setToken(token));
    store.dispatch(setProfile(newUser));
    navigate('GoogleAuthenticator');
  } catch (error) {
    __DEV__ && console.warn('save user to db error', error);
  } finally {
    store.dispatch(setAuthLoading(false));
  }
};

const authorizeUser = async (currentUser: FirebaseAuthTypes.User) => {
  try {
    const token = await currentUser.getIdToken();
    store.dispatch(setToken(token));

    const userRef = await firestore().collection('users').where('uid', '==', currentUser.uid).get();
    userRef.docs.forEach(el => {
      const userFromDB = el.data() as IUser;
      if (userFromDB) {
        store.dispatch(setProfile(userFromDB));
        store.dispatch(setIsAuthorized(true));
        userFromDB.is2FAEnabled && navigate('GoogleAuthenticator');
      }
    });
  } catch (error) {
    __DEV__ && console.log('authorizeUser error', error);
  } finally {
    store.dispatch(setAuthLoading(false));
  }
};

export {fbSignInEmail, fbSignUpEmail, fbSignInPhone, fbConfirmPhone, fbGoogleSignIn, fbAppleSignIn, fbFacebookSignIn};
