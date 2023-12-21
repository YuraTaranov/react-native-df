import {StyleSheet} from 'react-native';
import {colors} from '@constants';

export default StyleSheet.create({
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
	btn: {
		marginRight: 8,
		borderWidth: 1,
		borderColor: colors.main_f0a776,
		borderRadius: 50,
		paddingHorizontal: 6,
		paddingVertical: 4,
	},
	btnShow: {
		borderWidth: 1,
		borderColor: colors.main_f0a776,
		borderRadius: 50,
		paddingHorizontal: 6,
		paddingVertical: 4,
	}
});