import {StyleSheet} from 'react-native';
import {colors, fonts} from '@constants'

export default StyleSheet.create({
  container: {
	flex: 1,
	backgroundColor: colors.white_FFFFFF
  },
  contentContainer: {
	flex: 1,
  },
  profileItem: {
	borderBottomWidth: 1,
	borderColor: colors.grey_9c9992,
	padding: 16
  },
  buttonContainer: {
	height: 50,
	borderRadius: 36,
	backgroundColor: colors.main_f0a776,
	justifyContent: 'center',
	alignItems: 'center',
	marginBottom: 32,
	marginHorizontal: 16,
  },
  logout: {
	fontSize: 17,
  },
});
