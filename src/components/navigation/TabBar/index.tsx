import React, {useCallback} from 'react';
import {SafeAreaView, TouchableOpacity} from 'react-native';
import {BottomTabNavigationEventMap} from '@react-navigation/bottom-tabs';
import {NavigationHelpers, ParamListBase, TabNavigationState} from '@react-navigation/native';
import {Text} from '@components';
import {useMemo} from '@hooks';
import styles from './styles';

type TProps = {
  state: TabNavigationState<ParamListBase>;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
};

const tabsData = [
  {
    name: 'Home',
    navigate: 'Home',
  },
  {
    name: 'Profile',
    navigate: 'Profile',
  },
];

const TabBar: React.FC<TProps> = ({navigation, state}) => {
  const generalIndex: number = state?.index || 0;

  const jump = useCallback((routeName: string) => () => navigation.navigate(routeName), []);

  const tabs = useMemo(() => {
    return tabsData.map((tab, index) => (
      <TouchableOpacity
        key={index}
        disabled={generalIndex === index}
        style={styles.eachScreen}
        onPress={jump(tab.navigate)}>
        <Text style={[styles.text, generalIndex === index && styles.textActive]}>{tab.name}</Text>
      </TouchableOpacity>
    ));
  }, [generalIndex]);

  return <SafeAreaView style={styles.container}>{tabs}</SafeAreaView>;
};

export default TabBar;
