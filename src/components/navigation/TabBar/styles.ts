import {StyleSheet} from 'react-native';
import {colors} from '@constants';

export default StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    flexDirection: 'row',
	backgroundColor: colors.grey_eeeeee
  },
  eachScreen: {
    paddingTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
  },
  textActive: {
    color: colors.main_f0a776,
  },
});
