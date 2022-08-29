import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  AppState,
  FlatList,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Strings from '../../../utils/constants/strings';
import {styles} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import ComponentNames from '../../../utils/constants/componentNames';
import {useNavigation} from '@react-navigation/native';
import DefaultValues from '../../../utils/constants/defaultValues';
import Loader from '../../../components/loader';
import Header from './header';
import LocalImages from '../../../utils/constants/localImages';
import ActionTypeName from '../../../utils/actionTypeName';
import firestore from '@react-native-firebase/firestore';

function ChatList() {
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const {uid, inbox} = useSelector((state: any) => state.authReducer);
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

  useEffect(() => {
    setLoading(true);
    getInbox();
    const recentChatListener = getInbox;

    return () => recentChatListener();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getInbox = () => {
    firestore()
      .collection('Users')
      .doc(uid)
      .collection('Inbox')
      .onSnapshot(documentSnapshot => {
        setLoading(false);
        let temp = documentSnapshot.docs.map(item => {
          return item.data();
        });
        dispatch({type: 'Auth/updateInbox', payload: temp});
      });
  };

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

  const onContactListPress = () => {
    navigation.navigate(ComponentNames.ContactList);
  };

  const onRecentContactPress = (item: any) => {
    navigation.navigate(ComponentNames.ChatRoom, {
      roomid: item?.roomid,
      recieverName: item?.Name,
      receiverId: item?.id,
      avatar: item?.avatar,
    });
  };

  const _renderRecentChats = ({item}: any) => {
    return (
      <TouchableOpacity
        activeOpacity={DefaultValues.activeOpacity}
        onPress={() => onRecentContactPress(item)}
        style={styles.item}>
        <View style={styles.contactImageContainer}>
          <Image
            source={{
              uri:
                item?.avatar !== '' ? item?.avatar : DefaultValues.defaultImage,
            }}
            style={styles.contactImage}
            resizeMode={'contain'}
          />
        </View>
        <View style={styles.innerItemContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.contactNameText}>{item?.Name}</Text>
            <View style={styles.lastMsgContainer}>
              {item?.lastMsg?.user?._id === uid && (
                <Image source={LocalImages.sent} style={styles.sent} />
              )}
              <Text style={styles.lastMsgText}>{item?.lastMsg?.text}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const _itemSeperator = () => {
    return <View style={styles.itemSeperator} />;
  };

  return (
    <View style={styles.container}>
      <Header />
      <SafeAreaView style={styles.innerContainer}>
        <View>
          <Text style={styles.inboxText}>{Strings.inbox}</Text>
        </View>
        <FlatList
          data={inbox}
          renderItem={_renderRecentChats}
          ItemSeparatorComponent={_itemSeperator}
        />
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
