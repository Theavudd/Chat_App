import {StyleSheet} from 'react-native';
import Color from '../../../utils/constants/color';
import {vh, vw} from '../../../utils/Dimension';
import Fonts from '../../../utils/constants/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.black,
  },
  innerContainer: {
    flex: 1,
  },
  logoView: {
    marginTop: vh(130),
    alignItems: 'center',
  },
  logoImageCont: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: vh(117),
    width: vw(117),
  },
  logoImg: {},
  logoText: {
    marginTop: vh(35),
    fontSize: vw(24),
    color: Color.white,
    fontFamily: Fonts.Medium,
  },
  numberView: {
    flexDirection: 'row',
    marginTop: vh(22),
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberTextInput: {
    width: vw(200),
    height: vh(45),
    paddingHorizontal: vw(5),
  },
  countryCode: {
    width: vw(30),
    height: vh(45),
    marginHorizontal: vw(10),
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },
  underlineStyleBase: {
    width: vw(15),
    height: vh(45),
    borderWidth: 0,
    color: Color.white,
  },

  underlineStyleHighLighted: {
    width: vw(10),
    borderColor: '#03DAC6',
  },
  button: {
    marginTop: vh(40),
    marginHorizontal: vw(68),
  },
  phoneNumber: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: vh(20),
  },
  phoneNumberText: {
    fontSize: vw(16),
    fontFamily: Fonts.Regular,
    color: Color.white,
    marginTop: vh(20),
  },
  verify: {
    fontSize: vw(16),
    fontFamily: Fonts.Medium,
    color: Color.white,
  },
  resendBtn: {
    alignSelf: 'center',
  },
  resendBtnText: {
    fontFamily: Fonts.Bold,
    color: Color.green,
  },
  resendContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    width: vw(100),
    alignItems: 'center',
  },
  timer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  clockIcon: {
    height: vh(15),
    width: vw(15),
    marginRight: vw(5),
    tintColor: Color.white,
  },
  clockText: {
    color: Color.white,
    fontSize: vw(14),
  },
});
