import {StyleSheet} from 'react-native';
import Color from '../../../utils/constants/color';
import Fonts from '../../../utils/constants/fonts';
import {vh, vw} from '../../../utils/Dimension';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.darkGrey,
  },
  innerContainer: {
    flex: 1,
  },
  header: {
    height: vh(70),
    paddingHorizontal: vw(20),
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerText: {
    fontSize: vh(27),
    lineHeight: vh(31),
    color: Color.black,
  },
  nameContainer: {
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
    height: vh(45),
    width: vh(45),
    borderRadius: vh(40),
    overflow: 'hidden',
    marginHorizontal: vw(15),
  },
  searchView: {
    backgroundColor: Color.black,
    opacity: 0.25,
    height: vh(40),
    marginHorizontal: vw(25),
    borderRadius: vw(10),
    paddingHorizontal: vw(15),
  },
  searchBar: {
    height: '100%',
    width: '100%',
    color: Color.white,
  },
  signoutText: {
    color: Color.black,
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
});
