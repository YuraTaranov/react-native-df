import React from 'react';
import {KeyboardTypeOptions} from 'react-native';
import {View, TextInput, Text, TouchableOpacity} from '@components';
import {colors} from '@constants';
import styles from './styles';

type TProps = {
  value: string;
  setValue: (val: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  editable?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onPressSave?: () => void;
  onPressDelete?: () => void;
  onPressShow?: () => void;
  saveButtonVisible?: boolean;
  deleteButtonVisible?: boolean;
  showButtonVisible?: boolean;
  secureTextEntry?: boolean;
};

const Input: React.FC<TProps> = ({
  value,
  setValue,
  placeholder,
  keyboardType,
  maxLength,
  editable,
  onFocus,
  onBlur,
  onPressSave,
  onPressDelete,
  onPressShow,
  saveButtonVisible,
  deleteButtonVisible,
  showButtonVisible,
  secureTextEntry = false,
}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        placeholderTextColor={colors.grey_9c9992}
        keyboardType={keyboardType}
        maxLength={maxLength}
        editable={editable}
        onFocus={onFocus}
        onBlur={onBlur}
        secureTextEntry={secureTextEntry}
      />
      {saveButtonVisible ? (
        <TouchableOpacity style={styles.btn} onPress={onPressSave}>
          <Text>Save</Text>
        </TouchableOpacity>
      ) : null}
      {deleteButtonVisible ? (
        <TouchableOpacity style={styles.btn} onPress={onPressDelete}>
          <Text>Delete</Text>
        </TouchableOpacity>
      ) : null}
      {showButtonVisible ? (
        <TouchableOpacity style={styles.btnShow} onPress={onPressShow}>
          <Text>Show</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default Input;
