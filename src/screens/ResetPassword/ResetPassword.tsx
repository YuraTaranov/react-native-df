import React from 'react';
import {View, Text, TouchableOpacity, TextInput, ActivityIndicator, auth, Alert} from '@components';
import {colors} from '@constants';
import {useState, useCallback} from '@hooks';
import {goBack} from '@services';
import styles from './styles';

const ResetPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const resetPass = useCallback(async () => {
    try {
      setLoading(true);
      await auth().sendPasswordResetEmail(email);
      Alert.alert('', 'A code has been sent to your email');
      goBack();
    } catch (error) {
      __DEV__ && console.log('reset pass error', error);
    } finally {
      setLoading(false);
    }
  }, [email]);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.email}>Enter your email</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor={colors.grey_9c9992}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>
      </View>
      <TouchableOpacity
        style={{...styles.buttonContainer, backgroundColor: !email ? colors.grey_eeeeee : colors.main_f0a776}}
        onPress={resetPass}
        disabled={!email}
        activeOpacity={0.8}>
        {loading ? (
          <ActivityIndicator size={'small'} color={colors.white_FFFFFF} />
        ) : (
          <Text style={styles.buttonText}>Reset password</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ResetPassword;
