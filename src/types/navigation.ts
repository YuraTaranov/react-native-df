import {RouteProp} from '@react-navigation/native';

export type RootStackParamList = {
  // SCREEN PARAMS
UploadImage: undefined
Gallery: undefined
ProfileInfo: undefined
Profile: undefined
GoogleAuthenticator: undefined
SignInPhone: undefined
ResetPassword: undefined
SignUp: undefined
  Onboarding: undefined
  SignIn: undefined;
  Home: undefined;
};
// EXPORT SCREEN PARAMS
export type UploadImageRouteProp = RouteProp<RootStackParamList, 'UploadImage'>;
export type GalleryRouteProp = RouteProp<RootStackParamList, 'Gallery'>;
export type ProfileInfoRouteProp = RouteProp<RootStackParamList, 'ProfileInfo'>;
export type ProfileRouteProp = RouteProp<RootStackParamList, 'Profile'>;
export type GoogleAuthenticatorRouteProp = RouteProp<RootStackParamList, 'GoogleAuthenticator'>;
export type SignInPhoneRouteProp = RouteProp<RootStackParamList, 'SignInPhone'>;
export type ResetPasswordRouteProp = RouteProp<RootStackParamList, 'ResetPassword'>;
export type SignUpRouteProp = RouteProp<RootStackParamList, 'SignUp'>;
export type OnboardingRouteProp = RouteProp<RootStackParamList, 'Onboarding'>;
export type SignInRouteProp = RouteProp<RootStackParamList, 'SignIn'>;
export type HomeRouteProp = RouteProp<RootStackParamList, 'Home'>;
