import {StyleSheet} from 'react-native';
import {colors, fonts} from '@constants'

export default StyleSheet.create({
  container: {
    flex: 1,
	padding: 16,
	backgroundColor: colors.white_FFFFFF
  },
  switchContainer: {
	marginBottom: 24,
	flexDirection: 'row',
	justifyContent: 'space-between',
	alignItems: 'center',
	borderBottomWidth: 1,
	paddingBottom: 16
  },
  itemContainer: {
	height: 30,
  },
  itemName: {

  },
});
