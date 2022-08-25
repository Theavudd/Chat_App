import {StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import Fonts from '../../../utils/constants/fonts';
import {vw, vh} from '../../../utils/Dimension';
import Color from '../../../utils/constants/color';

export default function InputField(props: any) {
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  const _onChangeText = (text: string) => {
    props.setValue(text);
  };
  return (
    <View
      style={
        !showPlaceholder
          ? styles.container
          : [styles.container, {borderBottomColor: Color.grey}]
      }>
      <TextInput
        value={props.value}
        onChangeText={_onChangeText}
        placeholder={showPlaceholder ? props.placeholder : ''}
        onFocus={() => {
          setShowPlaceholder(false);
        }}
        onBlur={() => {
          setShowPlaceholder(true);
        }}
        style={styles.textInput}
        autoCorrect={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: vw(16),
    borderRadius: vh(5),
    borderB: vh(1),
    borderColor: Color.green,
    paddingVertical: vh(5),
    paddingHorizontal: vw(5),
    borderBottomWidth: vh(1),
  },
  inputView: {
    borderRadius: vh(5),
    borderWidth: vh(1),
    borderColor: Color.grey,
    paddingVertical: vh(5),
    paddingHorizontal: vw(5),
  },
  title: {
    marginHorizontal: vw(5),
    marginVertical: vh(5),
    fontFamily: Fonts.Regular,
    fontSize: vw(16),
  },
  textInput: {
    fontFamily: Fonts.Medium,
    textAlign: 'center',
    fontSize: vw(16),
    lineHeight: vh(20),
    color: Color.black,
  },
});
