import {StyleSheet} from 'react-native';
import {colors, width} from '@constants';

const imageWidth = width / 3 - 21.5;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white_FFFFFF,
    padding: 16,
  },
  image: {
    width: imageWidth,
    height: imageWidth,
    marginRight: 16,
    marginTop: 16,
    borderRadius: 16,
  },
});
