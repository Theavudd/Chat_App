/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useLayoutEffect, useState} from 'react';
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
import CommonFunctions from '../../../utils/CommonFunctions';

export default function ChatRoom() {
  const params = useRoute().params;
  const {roomid, recieverName, receiverId}: any = params;
  const dispatch = useDispatch<any>();
  const [isTyping, setTyping] = useState(false);
  const {chat} = useSelector((state: any) => state.chatReducer);
  const [timer, setTimer] = useState(0);
  const {uid, name, avatar} = useSelector((state: any) => state.authReducer);

  useEffect(() => {
    const typingListener = CommonFunctions.getTypingStatus(
      roomid,
      receiverId,
      (typing: any) => {
        setTyping(typing.isTyping);
      },
    );
    // firestore().collection('Chats').doc(roomid).collection('TypingStatus').doc(uid)

    return () => typingListener;
  }, []);

  useEffect(() => {
    CommonFunctions.getChatSnapshot(roomid, (documentSnapshot: any) => {
      if (documentSnapshot) {
        let tempArray: any = documentSnapshot.docs.map((item: any) => {
          return item.data();
        });
        tempArray = tempArray.sort(
          (a: any, b: any) => b.createdAt - a.createdAt,
        );
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
        .collection('Messages')
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
    if (chat[roomid].length === 0) {
      CommonFunctions.setInbox(uid, receiverId, {
        Name: recieverName,
        id: receiverId,
        roomid: roomid,
        avatar: params?.avatar,
      });
      CommonFunctions.setInbox(receiverId, uid, {
        Name: name,
        id: uid,
        roomid: roomid,
        avatar: avatar,
      });
    }
    CommonFunctions.updateInbox(uid, receiverId, {lastMsg: messages[0]});
    CommonFunctions.updateInbox(receiverId, uid, {lastMsg: messages[0]});
    firestore()
      .collection('Chats')
      .doc(roomid)
      .collection('Messages')
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
  const renderHeader = () => {
    return (
      <Header
        title={recieverName}
        receiverId={receiverId}
        image={avatar}
        style={[
          styles.chatHeader,
          {
            height: getStatusBarHeight() + vh(45),
            paddingTop: getStatusBarHeight(),
          },
        ]}
      />
    );
  };

  const onChangeText = () => {
    CommonFunctions.setTypingStatus(roomid, uid, true);
    clearTimeout(timer);

    const newTimer = setTimeout(() => {
      CommonFunctions.setTypingStatus(roomid, uid, false);
    }, 2000);
    setTimer(newTimer);
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
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
        isTyping={isTyping}
        renderAvatar={null}
        onInputTextChanged={onChangeText}
        renderComposer={_renderComposer}
        scrollToBottom
        renderSend={_renderSend}
        renderInputToolbar={_renderTextInput}
        scrollToBottomComponent={renderScrolToBottom}
        onSend={(messages: any) => onSend(messages)}
        user={{
          _id: uid,
          name: name,
        }}
      />
    </View>
  );
}
