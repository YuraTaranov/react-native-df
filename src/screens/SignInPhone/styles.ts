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
  inputContainer: {
	flexDirection: 'row',
	alignItems: 'center',
	paddingHorizontal: 16,
	borderRadius: 16,
	borderWidth: 1,
	borderColor: colors.main_f0a776,
	marginBottom: 16,
  },
  input: {
	flex: 1,
	height: 40,
  },
  buttonContainer: {
	width: '100%',
	height: 50,
	borderRadius: 36,
	backgroundColor: colors.main_f0a776,
	justifyContent: 'center',
	alignItems: 'center',
	marginBottom: 32
  },
  buttonText: {
	fontSize: 18
  },
  haveAccContainer: {
	marginTop: 24,
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
  withPhoneContainer: {
	alignItems: 'center',
	borderBottomWidth: 1.5,
	width: 260,
	alignSelf: 'center',
	marginTop: 24
  },
  withPhone: {
	fontSize: 18
  },
  or: {
	marginVertical: 32,
	textAlign: 'center',
	fontSize: 18
  },
  socialContainer: {
	alignItems: 'center',
  },
  orUseGoogle: {
	fontSize: 18,
	marginBottom: 8
  },
  fogotPassContainer: {
	marginVertical: 32,
	alignItems: 'center',
	flex: 1,
	justifyContent: 'flex-end'
  },
  forgotPassContainer: {
	borderBottomWidth: 1.5,
  },
  forgotPass: {
	fontSize: 18,
  },
});
