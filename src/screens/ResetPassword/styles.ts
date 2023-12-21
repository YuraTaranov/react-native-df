import {StyleSheet} from 'react-native';
import {colors, fonts} from '@constants'

export default StyleSheet.create({
  container: {
    flex: 1,
	padding: 16,
	backgroundColor: colors.white_FFFFFF
  },
  contentContainer: {
	flex: 1
  },
  email: {
	textAlign: 'center',
	marginBottom: 16,
	fontSize: 17
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
	justifyContent: 'center',
	alignItems: 'center',
	marginBottom: 32,
  },
  buttonText: {
	fontSize: 18
  },
});
