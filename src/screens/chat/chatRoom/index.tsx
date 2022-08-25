/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useLayoutEffect} from 'react';
import {
  Bubble,
  Composer,
  GiftedChat,
  InputToolbar,
  Send,
} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import {showSnackBar} from '../../../utils/CommonFunctions';
import {Image, Platform, View} from 'react-native';
import {styles} from './styles';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import LocalImages from '../../../utils/constants/localImages';
import Header from './header';
import {vh, vw} from '../../../utils/Dimension';
import Color from '../../../utils/constants/color';

export default function ChatRoom() {
  const {roomid, recieverName, receiverId}: any = useRoute().params;
  const dispatch = useDispatch<any>();
  const {chat} = useSelector((state: any) => state.chatReducer);
  const {uid, name} = useSelector((state: any) => state.authReducer);

  useEffect(() => {
    firestore()
      .collection('Chats')
      .doc(roomid)
      .collection(roomid)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot) {
          let tempArray: any = documentSnapshot.docs.map((item: any) => {
            return item.data();
          });
          tempArray = tempArray.sort(
            (a: any, b: any) => b.createdAt - a.createdAt,
          );
          if (tempArray.length === 0) {
            firestore()
              .collection('Users')
              .doc(uid)
              .collection('Inbox')
              .doc(receiverId)
              .set({
                Name: recieverName,
                userId: receiverId,
                roomid: roomid,
              });
          }
          dispatch({
            type: 'Chat/updateChat',
            payload: {roomid, data: tempArray},
          });
        }
      });
  }, []);

  useLayoutEffect(() => {
    if (!chat[`${roomid}`]) {
      dispatch({type: 'Chat/addRoom', roomid});
    } else {
      const subscriber = firestore()
        .collection('Chats')
        .doc(roomid)
        .collection(roomid)
        .onSnapshot(documentSnapshot => {
          if (documentSnapshot) {
            let tempArray: any = documentSnapshot.docs.map((item: any) => {
              return item.data();
            });
            dispatch({
              type: 'Chat/updateChat',
              payload: {roomid, data: tempArray},
            });
          }
        });

      return () => subscriber();
    }
  }, [roomid]);

  const onSend = (messages: any) => {
    messages[0].createdAt = new Date().getTime();
    let newArray = GiftedChat.append(chat[roomid], messages);
    dispatch({
      type: 'Chat/updateChat',
      payload: {roomid, data: newArray},
    });
    firestore()
      .collection('Chats')
      .doc(roomid)
      .collection(roomid)
      .doc(messages[0]?._id)
      .set(messages[0])
      .then(() => {})
      .catch((err: any) => {
        showSnackBar(err.messages);
      });
  };

  const renderScrolToBottom = () => {
    return <Image source={LocalImages.arrow_Down} style={styles.arrowDown} />;
  };

  const _renderTextInput = (props: any) => {
    return (
      <InputToolbar containerStyle={styles.composerContainer} {...props} />
    );
  };
  const _renderSend = (props: any) => {
    return (
      <Send containerStyle={styles.sendButtonContainer} {...props}>
        <View style={styles.sendButtonContainer}>
          <Image
            source={LocalImages.sendButton}
            style={styles.sendButton}
            resizeMode={'contain'}
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            marginRight: vw(5),
            backgroundColor: '#4FBC87',
          },
          left: {
            backgroundColor: '#EFEEF4',
          },
        }}
      />
    );
  };

  const _renderComposer = (props: any) => {
    return (
      <Composer
        {...props}
        placeholderTextColor={Color.lightGrey}
        textInputStyle={styles.textInputStyle}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title={recieverName}
        receiverId={receiverId}
        image={'e'}
        style={[
          styles.chatHeader,
          {
            height: getStatusBarHeight() + vh(45),
            paddingTop: getStatusBarHeight(),
          },
        ]}
      />
      <View
        style={[
          styles.bottomHeaderSeperator,
          {
            paddingTop:
              Platform.OS === 'ios'
                ? getStatusBarHeight()
                : getStatusBarHeight() + 45,
          },
        ]}
      />
      <GiftedChat
        messages={chat[roomid]}
        renderBubble={renderBubble}
        messagesContainerStyle={{
          backgroundColor: Color.black,
          paddingTop:
            Platform.OS === 'ios'
              ? getStatusBarHeight()
              : getStatusBarHeight() + 45,
        }}
        renderComposer={_renderComposer}
        scrollToBottom
        renderSend={_renderSend}
        renderInputToolbar={_renderTextInput}
        scrollToBottomComponent={renderScrolToBottom}
        onSend={(messages: any) => onSend(messages)}
        user={{
          _id: uid,
          name: name,
          avatar: 'https://placeimg.com/140/140/any',
        }}
      />
    </View>
  );
}
