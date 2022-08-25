import {View, StyleSheet} from 'react-native';
import React from 'react';
import Color from '../utils/constants/color';
import {vh, vw} from '../utils/Dimension';

interface Props {
  marginHorizontal?: number;
}

export default function ItemSeparator({marginHorizontal = 0}: Props) {
  return (
    <View
      style={[styles.lineSeparator, {marginHorizontal: vw(marginHorizontal)}]}
    />
  );
}
const styles = StyleSheet.create({
  lineSeparator: {
    backgroundColor: Color.grey,
    height: vh(2),
  },
});
