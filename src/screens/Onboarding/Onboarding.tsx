import React from 'react';
import {Button} from 'react-native';
import {View, Text} from '@components';
import {useAppDispatch, useTranslation} from '@hooks';
import {setFirstOpenApp} from '@reducers/global';
import styles from './styles';

const Onboarding: React.FC = () => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Text style={{marginTop: 50}}>Welcome Screen</Text>
      <Button onPress={() => dispatch(setFirstOpenApp(false))} title="skip" />
    </View>
  );
};

export default Onboarding;
