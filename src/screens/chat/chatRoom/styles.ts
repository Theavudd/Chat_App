import {StyleSheet} from 'react-native';
import Color from '../../../utils/constants/color';
import Fonts from '../../../utils/constants/fonts';
import {vh, vw} from '../../../utils/Dimension';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.black,
  },
  arrowDown: {
    height: vh(20),
    width: vw(20),
  },
  composerContainer: {
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 3,
    },
    backgroundColor: Color.black,
    shadowOpacity: 0.2,
    shadowRadius: 5.46,

    elevation: 9,
    alignItems: 'center',
  },
  chatHeader: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    elevation: 1,
  },
  sendButton: {
    height: '90%',
    width: '90%',
  },
  sendBtnCont: {
    paddingRight: vw(16),
  },
  sendButtonContainer: {
    height: 30,
    width: 30,
    marginRight: vw(16),
  },
  bubbleContainer: {
    backgroundColor: Color.green,
  },
  bottomHeaderSeperator: {
    height: 1,
    backgroundColor: Color.lightGrey,
  },
  textInputStyle: {
    color: Color.white,
  },
  footerCont: {
    position: 'absolute',
    bottom: vh(20),
    alignSelf: 'center',
    borderColor: Color.white,
    borderWidth: vw(1),
    paddingHorizontal: vw(5),
    paddingVertical: vh(5),
    borderRadius: vw(10),
  },
  footerText: {
    color: Color.white,
    fontFamily: Fonts.Bold,
    fontSize: vw(20),
  },
  cantReplyText: {
    color: Color.white,
    fontFamily: Fonts.Regular,
    fontSize: vw(16),
    alignSelf: 'center',
    position: 'absolute',
    bottom: vh(20),
  },
});
