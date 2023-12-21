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
	flex: 1,
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
	marginVertical: 48,
	alignSelf: 'center',
	alignItems: 'center'
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
  or: {
	marginVertical: 16,
	textAlign: 'center',
	fontSize: 18
  },
  socialContainer: {
	flexDirection: 'row',
	justifyContent: 'center',
	alignItems: 'center',
	marginTop: 8,
  },
  orUseGoogle: {
	fontSize: 18,
	marginBottom: 8,
	textAlign: 'center'
  },
  appleButton: {
	width: 42, 
	height: 42, 
  },
  socialIconContainer: {
	height: 42, 
	width: 42, 
	borderWidth: 0.25, 
	borderRadius: 5,
	alignItems: 'center',
	justifyContent: 'center',
	marginLeft: 16
  },
  socialIcon: {
	width: 20,
	height: 20
  },
  forgotPassContainer: {
	marginVertical: 32,
	alignItems: 'center',
	flex: 1,
	justifyContent: 'flex-end'
  },
  forgotPassButtonContainer: {
	borderBottomWidth: 1.5,
  },
  forgotPass: {
	fontSize: 18,
  },
});
