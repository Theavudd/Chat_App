import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import React from 'react';
import {styles} from './chatList/styles';
import Strings from '../../utils/constants/strings';
import DefaultValues from '../../utils/constants/defaultValues';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Names from '../../utils/constants/componentNames';
import FastImage from 'react-native-fast-image';

export default function Header() {
  const navigation: any = useNavigation();
  const {avatar} = useSelector((state: any) => state.authReducer);

  const onProfilePress = () => {
    navigation.navigate(Names.Settings);
  };

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.titleText}>{Strings.appname}</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            style={styles.profileImgCont}
            activeOpacity={DefaultValues.activeOpacity}
            onPress={onProfilePress}>
            <FastImage
              source={{
                uri: avatar !== '' ? avatar : DefaultValues.defaultImage,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
