import {StyleSheet} from 'react-native';
import {colors} from '@constants'

export default StyleSheet.create({
  container: {
    flex: 1,
	padding: 24,
	backgroundColor: colors.white_FFFFFF
  },
  inputsContainer: {
	height: 100,
	width: '100%',
	flex: 1
  },
  tabsContainer: {
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'space-around',
	height: 50,
	marginBottom: 24,
  },
  tabItem: {
	backgroundColor: colors.grey_eeeeee,
	paddingHorizontal: 12,
	paddingVertical: 8,
	borderRadius: 12
  },
  tabItemTitle: {
	fontSize: 15
  },
  haveAccContainer: {
	marginTop: 24,
	alignSelf: 'center',
	alignItems: 'center',
	marginBottom: 32
  },
  haveAccText: {
	fontSize: 16
  },
  signInContainer: {
	borderBottomWidth: 1.5,
  },
  signIn: {
	marginTop: 16,
	fontSize: 18,
  },
});
