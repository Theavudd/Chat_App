import {View, Text, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import React from 'react';
import {styles} from './chatList/styles';
import Strings from '../../utils/constants/strings';
import DefaultValues from '../../utils/constants/defaultValues';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Names from '../../utils/constants/componentNames';

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
            style={styles.profileImgCont}
            activeOpacity={DefaultValues.activeOpacity}
            onPress={onProfilePress}>
            <Image
              source={{
                uri: avatar !== '' ? avatar : DefaultValues.defaultImage,
              }}
              resizeMode={'cover'}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
