import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import Strings from '../../utils/constants/strings';
import LocalImages from '../../utils/constants/localImages';
import {useDispatch, useSelector} from 'react-redux';
import SettingInnerTabs from './settingInnerTabs';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {signOut} from '../../redux/chat/action';
import CommonFunctions, {showSnackBar} from '../../utils/CommonFunctions';
import ComponentNames from '../../utils/constants/componentNames';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../components/loader';
import Header from './header';
import DefaultValues from '../../utils/constants/defaultValues';
import FastImage from 'react-native-fast-image';

export default function Settings() {
  const [isLoading, setLoading] = useState(false);
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const {uid, name, avatar, status} = useSelector(
    (state: any) => state.authReducer,
  );

  const onSignOutPress = () => {
    setLoading(true);
    CommonFunctions.signOutWithFirebase(
      () => {
        setLoading(false);
        dispatch(signOut());
        firestore()
          .collection('Users')
          .doc(uid)
          .update({
            online: false,
          })
          .then(() => {})
          .catch(error => showSnackBar(error.message));
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: ComponentNames.Auth}],
          }),
        );
      },
      (error: any) => {
        setLoading(false);
        showSnackBar(error.code);
      },
    );
  };

  const onProfilePress = () => {
    navigation.navigate(ComponentNames.Signup, {backButton: true});
  };

  return (
    <View style={styles.container}>
      <Header />
      <TouchableOpacity
        style={styles.profileBar}
        activeOpacity={DefaultValues.activeOpacity}
        onPress={onProfilePress}>
        <FastImage
          source={{
            uri: avatar !== '' ? avatar : DefaultValues.defaultImage,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
          style={styles.profileImg}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.profileNameText}>{name}</Text>
          <Text style={styles.profileStatusText} numberOfLines={1}>
            {status}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.settingsTab}>
        <SettingInnerTabs
          Image={LocalImages.account}
          header={Strings.account}
          subHeader={`${Strings.privacy}, ${Strings.security}`}
          onPress={() => {}}
        />
        <SettingInnerTabs
          Image={LocalImages.message}
          header={Strings.chats}
          subHeader={`${Strings.backup}, ${Strings.history}, ${Strings.wallpaper}`}
          onPress={() => {}}
        />
        <SettingInnerTabs
          Image={LocalImages.blockUser}
          header={Strings.blockList}
          subHeader={`${Strings.blockUsers}`}
          onPress={() => {
            navigation.navigate(ComponentNames.BlockList);
          }}
        />
        <SettingInnerTabs
          Image={LocalImages.bell}
          header={Strings.notification}
          subHeader={`${Strings.message}`}
          onPress={() => {}}
        />
        <SettingInnerTabs
          Image={LocalImages.stats}
          header={Strings.dataAndStorageUsage}
          subHeader={`${Strings.networkUsage}`}
          onPress={() => {}}
        />
        <SettingInnerTabs
          Image={LocalImages.help}
          header={Strings.faq}
          subHeader={`${Strings.faq}, ${Strings.contactus}`}
          onPress={() => {}}
        />
      </View>
      <View style={styles.profileBar}>
        <SettingInnerTabs
          Image={LocalImages.logout}
          header={Strings.signOut}
          onPress={onSignOutPress}
        />
      </View>
      {isLoading && <Loader />}
    </View>
  );
}
