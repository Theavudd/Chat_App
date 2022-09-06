import {
  Text,
  View,
  TouchableOpacity,
  Image,
  AppState,
  FlatList,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {styles} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import ComponentNames from '../../../utils/constants/componentNames';
import {useNavigation} from '@react-navigation/native';
import DefaultValues from '../../../utils/constants/defaultValues';
import LocalImages from '../../../utils/constants/localImages';
import ActionTypeName from '../../../utils/actionTypeName';
import firestore from '@react-native-firebase/firestore';
import FastImage from 'react-native-fast-image';
import Strings from '../../../utils/constants/strings';

function ChatList() {
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
          <FastImage
            source={{
              uri:
                item?.lastMsg?.avatar !== ''
                  ? item?.avatar
                  : DefaultValues.defaultImage,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
            style={styles.contactImage}
          />
        </View>
        <View style={styles.innerItemContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.contactNameText}>{item?.Name}</Text>
            <View style={styles.lastMsgContainer}>
              {item?.lastMsg?.user?._id === uid && (
                <Image
                  source={
                    !item.lastMsg.received ? LocalImages.sent : LocalImages.read
                  }
                  style={styles.sent}
                  resizeMode={'contain'}
                />
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

  const _listEmptyComponent = () => {
    return (
      <View style={styles.listEmptyCont}>
        <Text style={styles.emptyTextHeader}>{Strings.emptyChat}</Text>
        <Text style={styles.emptyText}>{Strings.emptyChatSubHeader}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={inbox}
        renderItem={_renderRecentChats}
        ListEmptyComponent={_listEmptyComponent}
        ItemSeparatorComponent={_itemSeperator}
        bounces={false}
      />
    </View>
  );
}

export default React.memo(ChatList);
