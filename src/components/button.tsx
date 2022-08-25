import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {vw, vh} from '../utils/Dimension';
import Fonts from '../utils/constants/fonts';

interface propInterface {
  textColor?: string;
  bgColor?: string;
  text?: string;
  onPressButton: Function;
  disable?: boolean;
  disableColor?: string;
  width?: number;
  style?: object;
}

export default function CustomButton(props: propInterface) {
  const {
    textColor,
    bgColor,
    text,
    onPressButton,
    disable = false,
    width = '100%',
    style = {},
  } = props;
  return (
    <TouchableOpacity
      style={[
        styles.signInWithEmail,
        {
          backgroundColor: disable ? props?.disableColor : bgColor,
        },
        {width: width},
        style,
      ]}
      activeOpacity={0.8}
      onPress={() => onPressButton()}
      disabled={disable}>
      <Text style={{...styles.signUpText, color: textColor}}>{text}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  signInWithEmail: {
    height: vh(42),
    marginTop: vh(16),
    width: '100%',
    borderRadius: vh(100),
    justifyContent: 'center',
  },
  signUpText: {
    fontSize: vw(14),
    lineHeight: vh(30),
    fontFamily: Fonts.Regular,
    textAlign: 'center',
  },
});
