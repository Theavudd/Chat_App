import {StyleSheet} from 'react-native';
import Color from '../../../utils/constants/color';
import Fonts from '../../../utils/constants/fonts';
import {vh, vw} from '../../../utils/Dimension';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    height: vh(20),
    marginVertical: vw(13),
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    height: '100%',
    width: '100%',
  },
  profileImgCont: {
    height: vh(45),
    width: vh(45),
    borderRadius: vh(40),
    overflow: 'hidden',
    marginHorizontal: vw(15),
  },
  innerItemContainer: {},
  nameContainer: {
    flexDirection: 'row',
  },
  contactName: {
    color: Color.black,
    fontSize: vw(15),
    fontFamily: Fonts.Regular,
    lineHeight: vh(18),
  },
});
