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
    height: vh(180),
    alignSelf: 'center',
  },
  logoImageCont: {
    top: vh(-30),
    tintColor: Color.black,
    position: 'absolute',
  },
  logoImg: {},
  logoText: {
    color: Color.white,
    marginTop: vh(35),
    fontSize: vw(24),
    fontFamily: Fonts.Medium,
    position: 'absolute',
    bottom: 0,
  },
  numberView: {
    backgroundColor: Color.darkGrey,
    marginHorizontal: vw(40),
    borderRadius: vh(10),
    flexDirection: 'row',
    marginTop: vh(42),
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberTextInput: {
    width: vw(200),
    height: vh(45),
    color: Color.white,
    paddingHorizontal: vw(5),
  },
  countryCode: {
    width: vw(40),
    height: vh(45),
    right: vw(15),
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
    marginTop: vh(60),
    marginHorizontal: vw(68),
  },
  errorText: {
    textAlign: 'center',
    color: Color.red,
  },
});
