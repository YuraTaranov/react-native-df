export {
  ActivityIndicator,
  Alert,
  FlatList,
  SectionList,
  Keyboard,
  Linking,
  PermissionsAndroid,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Share,
  StatusBar,
  Switch,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Pressable,
  ImageBackground,
  View,
} from 'react-native';

// MODULES
export {default as Modal} from 'react-native-modal';
export {default as Image} from 'react-native-fast-image';
export {default as auth, FirebaseAuthTypes} from '@react-native-firebase/auth'
export {default as firestore} from '@react-native-firebase/firestore';
export {default as firebase} from '@react-native-firebase/app';
export {GoogleSignin, GoogleSigninButton} from '@react-native-google-signin/google-signin';
export { appleAuth, AppleButton } from '@invertase/react-native-apple-authentication';
export { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk-next';
export {default as DeviceInfo} from 'react-native-device-info';
export {default as storage} from '@react-native-firebase/storage';
export {launchCamera, launchImageLibrary} from 'react-native-image-picker';
export {default as ReactNativeBiometrics, BiometryTypes} from 'react-native-biometrics';

// BEHAVIOR

// BUTTONS
export {default as ButtonUsual} from './buttons/ButtonUsual';

// CONTROL
export {default as Biometrics} from './control/Biometrics';

// DATAVIEW

// INPUTS
export {default as Input} from './inputs/Input';

// LAYOUT
export {KeyboardAvoidingView} from './layout/KeyboardAvoidingView/KeyboardAvoidingView';

// MODAL

// NAVIGATION
export {default as TabBar} from './navigation/TabBar';

// TYPOGRAPHY
export {Icon} from './typography/Icon/Icon';
export {default as Text} from './typography/Text';
export {default as TextInput} from './typography/TextInput';
