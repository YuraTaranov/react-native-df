import React from 'react';
import {View, Image, TouchableOpacity, FlatList, ButtonUsual, firestore, Alert} from '@components';
import {useState, useCallback, useAppSelector, useEffect} from '@hooks';
import {selectProfile} from '@reducers/profile';
import {navigate} from '@services';
import styles from './styles';

type TImage = {
  id: string;
  url: string;
};

const Gallery: React.FC = () => {
  const {user} = useAppSelector(selectProfile);
  const [images, setImages] = useState<TImage[]>([]);

  useEffect(() => {
    getImages();
  }, []);

  const getImages = useCallback(async () => {
    if (user?.uid) {
      firestore()
        .collection('users')
        .doc(user.uid)
        .onSnapshot(snapshot => {
          const galleryData = snapshot?.data()?.gallery || [];
          setImages(galleryData);
        });
    }
  }, [user?.uid]);

  const deleteImage = useCallback(async (image: TImage) => {
    try {
      await firestore()
        .doc(`users/${user?.uid}`)
        .update({
          gallery: firestore.FieldValue.arrayRemove(image),
        });
    } catch (error) {
      __DEV__ && console.log('delete image error', error);
    }
  }, []);

  const onPressImage = useCallback(
    (image: TImage) => () => {
      Alert.alert('', 'Delete image', [
        {
          text: 'Yes',
          onPress: () => deleteImage(image),
        },
        {
          text: 'No',
          onPress: () => {},
        },
      ]);
    },
    [],
  );

  const navigateToUploadImage = useCallback(() => {
    navigate('UploadImage');
  }, []);

  const renderItem = useCallback(
    ({item}: {item: TImage}) => (
      <TouchableOpacity onPress={onPressImage(item)}>
        <Image source={{uri: item.url}} style={styles.image} />
      </TouchableOpacity>
    ),
    [],
  );

  const keyExtractor = useCallback((item: TImage) => item.id, []);

  return (
    <View style={styles.container}>
      <ButtonUsual title="Add image" onPress={navigateToUploadImage} />
      <FlatList renderItem={renderItem} keyExtractor={keyExtractor} data={images} numColumns={3} />
    </View>
  );
};

export default Gallery;
