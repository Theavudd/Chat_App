import {StyleSheet} from 'react-native';
import Color from '../../../utils/constants/color';
import Fonts from '../../../utils/constants/fonts';
import {vh, vw} from '../../../utils/Dimension';

export const styles = StyleSheet.create({
  container: {
    paddingTop: vh(20),
    flex: 1,
    backgroundColor: Color.black,
  },
  innerContainer: {
    flex: 1,
  },
  header: {
    height: vh(70),
    marginHorizontal: vw(24),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerRight: {
    flexDirection: 'row',
  },
  titleText: {
    fontSize: vw(30),
    lineHeight: vh(45),
    fontFamily: Fonts.BoldItalic,
    color: Color.white,
  },
  nameContainer: {},
  lastMsgContainer: {
    flexDirection: 'row',
  },
  userList: {
    height: vh(500),
  },
  profileImage: {
    height: '100%',
    width: '100%',
  },
  profileImgCont: {
    height: vh(24),
    width: vh(24),
    borderRadius: vh(40),
    overflow: 'hidden',
    marginHorizontal: vw(10),
  },
  searchView: {
    backgroundColor: Color.darkGrey,
    height: vh(40),
    marginHorizontal: vw(20),
    borderRadius: vw(10),
    paddingHorizontal: vw(15),
    marginVertical: vh(10),
  },
  searchBar: {
    height: '100%',
    width: '100%',
    color: Color.white,
  },
  signoutText: {
    color: Color.white,
  },
  addMessageCont: {
    height: vh(40),
    width: vh(40),
    borderRadius: vh(40),
    position: 'absolute',
    right: vw(30),
    alignItems: 'center',
    justifyContent: 'center',
    bottom: vh(40),
    backgroundColor: Color.green,
  },
  addMessageImg: {
    height: '70%',
    width: '70%',
    tintColor: Color.white,
  },
  inboxText: {
    fontSize: vw(20),
    fontFamily: Fonts.Bold,
    marginHorizontal: vw(16),
  },
  recentContact: {
    marginHorizontal: vw(16),
  },
  contactName: {
    color: Color.white,
    fontSize: vw(16),
    lineHeight: vh(24),
    fontFamily: Fonts.Bold,
  },
  itemSeperator: {
    backgroundColor: Color.white,
    height: vh(1),
    marginHorizontal: vw(16),
    opacity: 0.25,
    marginVertical: vh(5),
  },
  item: {
    height: vh(40),
    marginVertical: vw(13),
    flexDirection: 'row',
    alignItems: 'center',
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
  innerItemContainer: {},
  contactNameText: {
    color: Color.white,
    fontSize: vw(18),
    fontFamily: Fonts.Bold,
    lineHeight: vh(21),
  },
  lastMsgText: {
    color: Color.white,
    fontSize: vw(14),
    fontFamily: Fonts.Italic,
    lineHeight: vh(18),
  },
  sent: {
    tintColor: Color.white,
    alignSelf: 'center',
    height: vh(15),
    width: vh(15),
    marginRight: vw(5),
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
  timeText: {
    color: Color.white,
    fontFamily: Fonts.Medium,
    fontSize: vw(12),
    lineHeight: vw(24),
  },
});
