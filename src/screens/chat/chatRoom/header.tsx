import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import LocalImages from '../../../utils/constants/localImages';
import {vh, vw} from '../../../utils/Dimension';
import DefaultValues from '../../../utils/constants/defaultValues';
import Fonts from '../../../utils/constants/fonts';
import Color from '../../../utils/constants/color';
import Strings from '../../../utils/constants/strings';
import {useSelector} from 'react-redux';

interface Props {
  title?: string;
  image?: any;
  style?: Object;
}

export default function Header(props: Props) {
  const navigation = useNavigation();
  const {online} = useSelector((state: any) => state.authReducer);
  const onBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, props?.style]}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBackPress}
        activeOpacity={DefaultValues.activeOpacity}>
        <Image
          source={LocalImages.backbutton}
          resizeMode={'contain'}
          style={styles.backButtonImg}
        />
        {props.image && (
          <Image
            source={{uri: 'https://placeimg.com/140/140/any'}}
            style={styles.profileImg}
          />
        )}
      </TouchableOpacity>
      <View style={styles.nameContainer}>
        <Text style={styles.titleText}>{props?.title}</Text>
        {online && <Text style={styles.subTitleText}>{Strings.online}</Text>}
      </View>
      <TouchableOpacity
        style={styles.phoneIconCont}
        activeOpacity={DefaultValues.activeOpacity}>
        <Image
          source={LocalImages.phone}
          resizeMode={'contain'}
          style={styles.phoneIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.videoCameraIconCont}
        activeOpacity={DefaultValues.activeOpacity}>
        <Image
          source={LocalImages.video_Camera}
          resizeMode={'contain'}
          style={styles.videoIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: vh(50),
    backgroundColor: Color.black,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImg: {
    height: vh(40),
    width: vh(40),
    marginVertical: vh(5),
    borderRadius: vh(10),
    marginHorizontal: vw(10),
  },
  backButtonImg: {
    height: vh(30),
    tintColor: Color.white,
    width: vh(30),
  },
  titleText: {
    fontSize: vw(16),
    lineHeight: vh(18),
    fontFamily: Fonts.Regular,
    color: Color.white,
    marginRight: vw(40),
    width: vw(151),
  },
  phoneIconCont: {
    height: vh(19),
    width: vh(19),
    marginHorizontal: vw(10),
  },
  videoCameraIconCont: {
    height: vh(19),
    top: vh(2),
    width: vh(20),
    marginHorizontal: vw(10),
  },
  videoIcon: {
    height: '100%',
    width: '100%',
    tintColor: Color.white,
  },
  phoneIcon: {
    height: '100%',
    width: '100%',
    tintColor: Color.white,
  },
  subTitleText: {
    fontSize: vw(12),
    lineHeight: vh(21),
    fontFamily: Fonts.Light,
    color: Color.white,
  },
  nameContainer: {
    marginHorizontal: vw(10),
  },
});
