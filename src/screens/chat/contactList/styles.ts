import {StyleSheet} from 'react-native';
import Color from '../../../utils/constants/color';
import Fonts from '../../../utils/constants/fonts';
import {vh, vw} from '../../../utils/Dimension';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: vh(20),
    backgroundColor: Color.black,
  },
  item: {
    height: vh(40),
    marginVertical: vw(13),
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactContainer: {},
  profileImage: {
    height: '100%',
    width: '100%',
  },
  profileImgCont: {
    height: vh(50),
    width: vh(50),
    borderRadius: vh(50),
    overflow: 'hidden',
    marginHorizontal: vw(15),
  },
  innerItemContainer: {},
  nameContainer: {},
  contactNameText: {
    color: Color.white,
    fontSize: vw(18),
    fontFamily: Fonts.Bold,
    lineHeight: vh(21),
  },
  statusText: {
    color: Color.white,
    fontSize: vw(14),
    fontFamily: Fonts.Italic,
    lineHeight: vh(18),
  },
  itemSeperator: {
    backgroundColor: Color.white,
    height: vh(1),
    marginHorizontal: vw(16),
    opacity: 0.25,
    marginVertical: vh(5),
  },
  listEmptyCont: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTextHeader: {
    color: Color.white,
    fontFamily: Fonts.Bold,
    fontSize: vw(16),
    lineHeight: vh(28),
  },
  emptyText: {
    color: Color.white,
    fontFamily: Fonts.Medium,
    fontSize: vw(12),
    lineHeight: vw(24),
  },
});
