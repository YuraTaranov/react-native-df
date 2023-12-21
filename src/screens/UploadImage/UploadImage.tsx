import React from 'react';
import {View, Image, storage, ButtonUsual, firestore} from '@components';
import {uploadImage} from '@helpers';
import {useState, useCallback, useAppSelector} from '@hooks';
import {selectProfile} from '@reducers/profile';
import {goBack} from '@services';
import styles from './styles';
import {ImagePickerTypes} from 'src/helpers/imagePicker';

type TAsset = ImagePickerTypes['Asset'];

const UploadImage: React.FC = () => {
  const {user} = useAppSelector(selectProfile);
  const [image, setImage] = useState<TAsset | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const imageRef = storage().ref(`users/${user?.uid}/${image?.fileName}`);

  const openPicker = useCallback(() => {
    uploadImage(setImage);
  }, []);

  const uploadImageFirebase = useCallback(async () => {
    const imagePath = image?.uri;
    if (imagePath) {
      try {
        setLoading(true);
        const uploadResponse = await imageRef.putFile(imagePath);
        const userRef = await firestore().collection('users').doc(user?.uid);
        const userData = await userRef.get();
        const userGallery = userData.data()?.gallery || [];
        const imageUrl = await imageRef.getDownloadURL();
        if (imageUrl && uploadResponse && userData) {
          await userRef.update({
            gallery: [
              ...userGallery,
              {
                id: uploadResponse.metadata.name,
                url: imageUrl,
              },
            ],
          });
          setImage(null);
          goBack();
        }
      } catch (error) {
        __DEV__ && console.warn('upload image error', error);
      } finally {
        setLoading(false);
      }
    }
  }, [image]);

  return (
    <View style={styles.container}>
      {image ? (
        <View>
          <Image source={{uri: image.base64}} style={styles.image} />
          <ButtonUsual title="Upload to server" onPress={uploadImageFirebase} loading={loading} />
        </View>
      ) : (
        <ButtonUsual title="Open picker" onPress={openPicker} />
      )}
    </View>
  );
};

export default UploadImage;
