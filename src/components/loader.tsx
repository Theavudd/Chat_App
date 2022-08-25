import {StyleSheet, View} from 'react-native';
import React from 'react';
import Color from '../utils/constants/color';
import {vh, vw} from '../utils/Dimension';
import Spinner from 'react-native-spinkit';

export default function Loader() {
  return (
    <View style={styles.container}>
      <Spinner
        isVisible={true}
        size={vh(50)}
        type={'FadingCircleAlt'}
        color={Color.green}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: vh(400),
    right: vw(165),
  },
});
