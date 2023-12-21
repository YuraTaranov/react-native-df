import {StyleSheet} from 'react-native';
import {colors, fonts} from '@constants'

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white_FFFFFF,
		padding: 16,
	  },
	  openPickerContainer: {
		width: '100%',
		height: 50,
		borderRadius: 36,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 32,
	  },
	  openPickerText: {
	
	  },
	  image: {
		width: '100%',
		height: 300,
		marginBottom: 24,
		borderRadius: 16
	  },
});
