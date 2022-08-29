import {StyleSheet} from 'react-native';
import Color from '../../utils/constants/color';
import Fonts from '../../utils/constants/fonts';
import {vh, vw} from '../../utils/Dimension';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.black,
  },
  backHeader: {
    paddingHorizontal: vw(20),
  },
  subHeader: {
    flexDirection: 'row',
    marginHorizontal: vw(24),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  yourProfileText: {
    color: Color.white,
    fontFamily: Fonts.ExtraBold,
    fontSize: vw(30),
    lineHeight: vh(45),
  },
  qrImageContainer: {
    height: vh(24),
    width: vh(24),
  },
  qrImage: {
    height: '100%',
    width: '100%',
  },
  profileBar: {
    height: vh(72),
    backgroundColor: Color.darkGrey,
    alignItems: 'center',
    marginTop: vh(18),
    flexDirection: 'row',
    marginHorizontal: vw(18),
    borderRadius: vw(15),
  },
  profileImg: {
    height: vh(56),
    width: vh(56),
    marginHorizontal: vw(8),
    borderRadius: vw(30),
  },
  nameContainer: {},
  profileNameText: {
    color: Color.white,
    fontSize: vw(16),
    lineHeight: vh(24),
    fontFamily: Fonts.Bold,
    marginHorizontal: vw(10),
  },
  profileStatusText: {
    color: Color.white,
    fontSize: vw(13),
    lineHeight: vh(18),
    fontFamily: Fonts.Regular,
    marginHorizontal: vw(10),
  },
  settingsTab: {
    backgroundColor: Color.darkGrey,
    marginVertical: vh(18),
    marginHorizontal: vw(18),
    borderRadius: vw(15),
  },
  innerSettingContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  settingTabIconCont: {
    height: vh(56),
    width: vh(56),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.white,
    opacity: 0.87,
    marginHorizontal: vw(8),
    marginVertical: vh(8),
    borderRadius: vw(10),
  },
  settingTabIcon: {
    tintColor: Color.darkBlue,
    height: '60%',
    width: '60%',
  },
});

export default styles;
