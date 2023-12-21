import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import i18n from 'i18next';
import {Alert, Linking} from '@components';
//Types
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  CameraOptions,
  Callback,
  Asset,
} from 'react-native-image-picker/lib/typescript/types';

export type ImagePickerTypes = {
  ImageLibraryOptions: ImageLibraryOptions;
  ImagePickerResponse: ImagePickerResponse;
  CameraOptions: CameraOptions;
  Callback: Callback;
  Asset: Asset;
};

const cameraIsDenied = i18n.t(
  'The application cannot open your camera because access is denied, do you want to enable it in the settings?',
);
const Yes = i18n.t('Yes');
const No = i18n.t('No');
const CameraUnavailable = i18n.t('Camera unavailable');
const PhotoLibraryGalleryIsDenied =
  'The app cannot open your gallery because access is denied. Do you want to change the application permissions in the device settings?';
const SomethingWrong = i18n.t('Something went wrong, try again');

const MaxSizeFile = 2000000; // 2 mb

const optionsDefault: ImageLibraryOptions = {
  mediaType: 'photo',
  selectionLimit: 1,
  quality: 0.7,
  maxHeight: 1920,
  maxWidth: 1080,
  includeBase64: true,
};

const checkCameraPermissions = (response: ImagePickerResponse, setImage: (imageData: Asset) => void) => {
  if (response.didCancel) {
    return;
  } else if (response.errorCode === 'camera_unavailable') {
    Alert.alert(CameraUnavailable);
    return;
  } else if (response.errorCode === 'permission') {
    return Alert.alert('', cameraIsDenied, [
      {
        text: Yes,
        onPress: () => Linking.openSettings(),
        style: 'default',
      },
      {
        text: No,
        onPress: () => {},
        style: 'cancel',
      },
    ]);
  } else if (response.errorCode === 'others') {
    return;
  }
  if (response?.assets?.length) {
    setImage({
      ...response.assets[0],
      base64: `data:image/png;base64,${response.assets[0].base64}`,
    });
  } else {
    Alert.alert(SomethingWrong);
  }
};

export const openPhotoPicker = (setImage: (imageData: Asset) => void, cameraOptions?: CameraOptions) => {
  const options: CameraOptions = {
    ...optionsDefault,
    ...cameraOptions,
  };
  launchCamera(options, response => checkCameraPermissions(response, setImage));
};

const checkPhotoLibraryPermissions = (response: ImagePickerResponse, setImage: (imageData: Asset) => void) => {
  if (response.didCancel) {
    return;
  } else if (response.errorCode === 'permission') {
    return Alert.alert('', PhotoLibraryGalleryIsDenied, [
      {
        text: Yes,
        onPress: () => Linking.openSettings(),
        style: 'default',
      },
      {
        text: No,
        onPress: () => {},
        style: 'cancel',
      },
    ]);
  } else if (response.errorCode === 'others') {
    return;
  } else if (response?.assets?.length) {
    if (response.assets[0].fileSize && response.assets[0].fileSize > MaxSizeFile) {
      return Alert.alert('', i18n.t('Image is too large'));
    }
  }
  if (response?.assets?.length) {
    setImage({
      ...response.assets[0],
      base64: `data:image/png;base64,${response.assets[0].base64}`,
    });
  } else {
    Alert.alert(SomethingWrong);
  }
};

export const openPhotoLibraryPicker = (setImage: (imageData: Asset) => void, cameraOptions?: CameraOptions) => {
  const options = {
    ...optionsDefault,
    ...cameraOptions,
  };
  launchImageLibrary(options, response => checkPhotoLibraryPermissions(response, setImage));
};

export const uploadImage = (setImage: (imageData: Asset) => void, cameraOptions?: CameraOptions) => {
  Alert.alert(
    i18n.t('Upload image'),
    '',
    [
      {
        text: i18n.t('Take photo'),
        onPress: () => openPhotoPicker(setImage, cameraOptions),
      },
      {
        text: i18n.t('Open library'),
        onPress: () => openPhotoLibraryPicker(setImage, cameraOptions),
      },
      {
        text: i18n.t('Cancel'),
        onPress: () => {},
        style: 'cancel',
      },
    ],
    {
      cancelable: true,
    },
  );
};
