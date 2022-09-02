import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import LocalImages from '../utils/constants/localImages';
import {vh, vw} from '../utils/Dimension';
import DefaultValues from '../utils/constants/defaultValues';
import Fonts from '../utils/constants/fonts';
import Color from '../utils/constants/color';
import {getStatusBarHeight} from 'react-native-status-bar-height';

interface Props {
  title?: string;
  image?: any;
  backButton?: boolean;
  style?: Object;
}

export default function BackHeader(props: Props) {
  const navigation = useNavigation();

  const onBackPress = () => {
    navigation.goBack();
  };

  return (
    <View
      style={[
        styles.container,
        props?.style,
        {
          height: getStatusBarHeight() + vh(45),
          paddingTop: getStatusBarHeight(),
        },
      ]}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBackPress}
        activeOpacity={DefaultValues.activeOpacity}>
        {props?.backButton && (
          <Image
            source={LocalImages.backbutton}
            resizeMode={'contain'}
            style={styles.backButtonImg}
          />
        )}
        {props.image && (
          <Image
            source={{uri: 'https://placeimg.com/140/140/any'}}
            style={styles.profileImg}
          />
        )}
      </TouchableOpacity>
      <Text style={styles.titleText}>{props?.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: vh(50),
    paddingHorizontal: vw(12),
    backgroundColor: Color.black,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImg: {
    height: vh(35),
    width: vw(35),
    borderRadius: vh(10),
    marginHorizontal: vw(10),
  },
  backButtonImg: {
    height: vh(30),
    tintColor: Color.white,
    width: vw(30),
  },
  titleText: {
    fontSize: vw(18),
    lineHeight: vh(21),
    marginLeft: vw(5),
    fontFamily: Fonts.Bold,
    color: Color.white,
  },
});
