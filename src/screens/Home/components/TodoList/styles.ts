import {StyleSheet} from 'react-native';
import {colors} from '@constants';

export default StyleSheet.create({
	container: {
		flex: 1
	},
	listTitle: {
		textAlign: 'center',
		fontSize: 18,
		marginBottom: 24,
	  },
	plusContainer: {
		alignSelf: 'center',
		borderWidth: 1,
		borderRadius: 50,
		height: 50,
		width: 50,
		alignItems: 'center',
		justifyContent: "center",
		borderColor: colors.main_f0a776
	  },
	  plus: {
		fontSize: 26,
		fontWeight: '500',
		color: colors.main_f0a776
	  },
});