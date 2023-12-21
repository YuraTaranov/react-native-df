import React from 'react';
import {BottomTabBarProps, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabBar} from '@components';
import {useCallback} from '@hooks';
import {Home, Profile} from '@screens';

const TabStack = createBottomTabNavigator();

type TProps = {};

const TabNavigator: React.FC<TProps> = ({}) => {
  const renderTab = useCallback((props: BottomTabBarProps) => <TabBar {...props} />, []);

  return (
    <TabStack.Navigator tabBar={renderTab}>
      <TabStack.Screen name={'Home'} component={Home} />
      <TabStack.Screen name={'Profile'} component={Profile} />
    </TabStack.Navigator>
  );
};

export default TabNavigator;
