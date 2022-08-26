import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  AppState,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Strings from '../../../utils/constants/strings';
import {styles} from './styles';
import CommonFunctions, {showSnackBar} from '../../../utils/CommonFunctions';
import {useDispatch, useSelector} from 'react-redux';
import ComponentNames from '../../../utils/constants/componentNames';
import {useNavigation} from '@react-navigation/native';
import {signOut} from '../../../redux/chat/action';
import DefaultValues from '../../../utils/constants/defaultValues';
import Loader from '../../../components/loader';
import Color from '../../../utils/constants/color';
import LocalImages from '../../../utils/constants/localImages';
import ActionTypeName from '../../../utils/actionTypeName';
import firestore from '@react-native-firebase/firestore';

function ChatList() {
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation<any>();
  const {name} = useSelector((state: any) => state.authReducer);
  const dispatch = useDispatch<any>();
  const {uid} = useSelector((state: any) => state.authReducer);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    updateOnlineStatus();
    const subscription = AppState.addEventListener('change', nextAppState => {
      appState.current = nextAppState;
      updateOnlineStatus();
    });
    return () => {
      subscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateOnlineStatus = () => {
    firestore()
      .collection('Users')
      .doc(uid)
      .update({online: appState.current === 'active' ? true : false})
      .then(() => {
        dispatch({
          type: ActionTypeName.setOnlineStatus,
          payload: appState.current === 'active' ? true : false,
        });
      });
  };

  const onSignOutPress = () => {
    setLoading(true);
    CommonFunctions.signOutWithFirebase(
      () => {
        setLoading(false);
        dispatch(signOut());
        firestore().collection('Users').doc(uid).update({
          online: false,
        });
        navigation.reset({
          index: 0,
          routes: [{name: ComponentNames.Auth}],
        });
      },
      (error: any) => {
        setLoading(false);
        showSnackBar(error.code);
      },
    );
  };

  const onContactListPress = () => {
    navigation.navigate(ComponentNames.ContactList);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.innerContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.profileImgCont}>
            <Image
              source={{uri: DefaultValues.defaultImage}}
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>{name}</Text>
        </View>
        <View style={styles.searchView}>
          <TextInput
            placeholder={Strings.search}
            style={styles.searchBar}
            placeholderTextColor={Color.white}
          />
        </View>
        <View>
          <Text style={styles.inboxText}>{Strings.inbox}</Text>
        </View>
        <Text style={styles.signoutText} onPress={onSignOutPress}>
          {Strings.signOut}
        </Text>
        <TouchableOpacity
          activeOpacity={DefaultValues.activeOpacity}
          onPress={onContactListPress}
          style={styles.addMessageCont}>
          <Image
            source={LocalImages.message}
            style={styles.addMessageImg}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </SafeAreaView>
      {isLoading && <Loader />}
    </View>
  );
}

export default React.memo(ChatList);
