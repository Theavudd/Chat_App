import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './chatList/styles';
import Strings from '../../utils/constants/strings';
import Color from '../../utils/constants/color';
import DefaultValues from '../../utils/constants/defaultValues';
import LocalImages from '../../utils/constants/localImages';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Names from '../../utils/constants/componentNames';

export default function Header() {
  const navigation: any = useNavigation();
  const [search, setSearch] = useState<boolean>(false);
  const {avatar} = useSelector((state: any) => state.authReducer);

  const onSearchPress = () => {
    setSearch(!search);
  };

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
            onPress={onSearchPress}>
            <Image
              source={LocalImages.search}
              resizeMode={'contain'}
              style={[styles.profileImage, {tintColor: Color.white}]}
            />
          </TouchableOpacity>
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
      {search && (
        <View style={styles.searchView}>
          <TextInput
            placeholder={Strings.search}
            style={styles.searchBar}
            placeholderTextColor={Color.white}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
