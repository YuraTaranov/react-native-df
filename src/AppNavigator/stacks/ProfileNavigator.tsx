import React from 'react';
import {Button} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Gallery, ProfileInfo, UploadImage} from '@screens';
import {goBack} from '@services';

const ProfileStack = createNativeStackNavigator();

export const ProfileNavigator: React.FC = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileInfo"
        component={ProfileInfo}
        options={{
          headerLeft: () => <Button onPress={goBack} title="Back" />,
          headerTitle: 'Profile Info',
        }}
      />
      <ProfileStack.Screen
        name="Gallery"
        component={Gallery}
        options={{
          headerLeft: () => <Button onPress={goBack} title="Back" />,
        }}
      />
      <ProfileStack.Screen
        name="UploadImage"
        component={UploadImage}
        options={{
          headerLeft: () => <Button onPress={goBack} title="Back" />,
          headerTitle: 'Upload Image',
        }}
      />
    </ProfileStack.Navigator>
  );
};
