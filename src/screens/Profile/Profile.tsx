import React from 'react';
import {View, Text, TouchableOpacity, auth} from '@components';
import {useCallback} from '@hooks';
import {navigate} from '@services';
import styles from './styles';

const Profile: React.FC = () => {
  const navigateTo = useCallback(
    (screen: string) => () => {
      navigate('ProfileNavigator', {screen});
    },
    [],
  );

  const logout = useCallback(async () => {
    try {
      await auth().signOut();
    } catch (error) {
      __DEV__ && console.log('logout error', error);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <TouchableOpacity style={styles.profileItem} onPress={navigateTo('ProfileInfo')}>
          <Text>Profile info</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileItem} onPress={navigateTo('Gallery')}>
          <Text>Gallery</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={logout}>
        <Text style={styles.logout}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
