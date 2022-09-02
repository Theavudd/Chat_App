import {StyleSheet} from 'react-native';
import Color from '../../utils/constants/color';
import Fonts from '../../utils/constants/fonts';
import {vh, vw} from '../../utils/Dimension';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.black,
  },
  listItem: {
    height: vh(40),
    marginVertical: vw(13),
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemText: {
    color: Color.white,
  },
  contactImageContainer: {
    height: vh(50),
    width: vh(50),
    borderRadius: vh(50),
    overflow: 'hidden',
    marginHorizontal: vw(15),
  },
  contactImage: {
    height: '100%',
    width: '100%',
  },
  contactNameText: {
    color: Color.white,
    fontSize: vw(18),
    fontFamily: Fonts.Bold,
    lineHeight: vh(21),
  },
  nameContainer: {},
  innerItemContainer: {},
  addImageCont: {
    height: vh(30),
    width: vh(30),
    alignSelf: 'center',
  },
  addImage: {
    height: '100%',
    width: '100%',
    tintColor: Color.white,
  },
  itemSeparator: {
    height: vh(1),
    marginHorizontal: vw(16),
    backgroundColor: Color.white,
    opacity: 0.25,
    marginVertical: vh(5),
  },
  toolTipContainer: {
    backgroundColor: Color.red,
    position: 'absolute',
    height: 30,
    width: 30,
    right: 90,
  },
  toolTipListView: {
    height: 100,
    width: 100,
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
