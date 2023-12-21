import React from 'react';
import {ActivityIndicator, Text, TouchableOpacity} from '@components';
import {colors} from '@constants';
import styles from './styles';

type TProps = {
  title: string;
  onPress: () => void;
  width?: string | number;
  disabled?: boolean;
  loading?: boolean;
  activeOpacity?: number;
  marginTop?: number;
  marginBottom?: number;
};

const ButtonUsual: React.FC<TProps> = ({
  title,
  onPress,
  width = '100%',
  disabled,
  loading,
  activeOpacity = 0.7,
  marginTop,
  marginBottom,
}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        width,
        backgroundColor: disabled && !loading ? colors.grey_eeeeee : colors.main_f0a776,
        marginTop,
        marginBottom,
      }}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={activeOpacity}>
      {loading ? (
        <ActivityIndicator size={'small'} color={colors.white_FFFFFF} />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default ButtonUsual;
