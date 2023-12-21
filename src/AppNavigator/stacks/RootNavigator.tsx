import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from '../TabNavigator';
import {HomeNavigator} from './HomeNavigator';
import {ProfileNavigator} from './ProfileNavigator';

const RootStack = createNativeStackNavigator();

export const RootNavigator: React.FC = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <RootStack.Screen name="TabNavigator" component={TabNavigator} />
      <RootStack.Screen name="HomeNavigator" component={HomeNavigator} />
      <RootStack.Screen name="ProfileNavigator" component={ProfileNavigator} />
    </RootStack.Navigator>
  );
};
