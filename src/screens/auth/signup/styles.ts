import {StyleSheet} from 'react-native';
import Color from '../../../utils/constants/color';
import Fonts from '../../../utils/constants/fonts';
import {vh, vw} from '../../../utils/Dimension';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.black,
  },
  header: {
    paddingHorizontal: vw(10),
    alignSelf: 'center',
    height: vh(50),
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerText: {
    top: vh(1),
    fontSize: vw(18),
    lineHeight: vh(28),
    fontFamily: Fonts.Bold,
    color: Color.white,
  },
  backbutton: {
    height: vh(30),
    width: vw(23),
    marginHorizontal: vw(10),
    justifyContent: 'center',
  },
  backbuttonImg: {
    height: '100%',
    width: '100%',
  },
  form: {
    marginTop: vh(20),
    paddingHorizontal: vw(16),
  },
  imagePickerImg: {
    height: vh(100),
    width: vh(100),
    borderRadius: vw(100),
    alignSelf: 'center',
  },
  imageButtonsView: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: vh(10),
  },
  addImageButton: {
    marginHorizontal: vw(5),
  },
  imageButtons: {
    fontSize: vw(14),
    fontFamily: Fonts.Medium,
    color: Color.white,
    opacity: 0.8,
  },
  nextButton: {
    marginHorizontal: vw(50),
    marginVertical: vh(20),
  },
});
