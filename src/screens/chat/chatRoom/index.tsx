/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {GiftedChat, InputToolbar} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import Clipboard from '@react-native-community/clipboard';
import {Platform, View, Dimensions, TouchableOpacity, Text} from 'react-native';
import {styles} from './styles';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Header from './header';
import {vh} from '../../../utils/Dimension';
import Color from '../../../utils/constants/color';
import CommonFunctions from '../../../utils/CommonFunctions';
import Strings from '../../../utils/constants/strings';
import {
  renderScrolToBottom,
  _renderSend,
  renderBubble,
  _renderComposer,
} from './chat';

export default function ChatRoom() {
  const params: any = useRoute().params;
  const {roomid, recieverName, receiverId, avatar}: any = params;
  const dispatch = useDispatch<any>();
  const [isTyping, setTyping] = useState(false);
  const {chat} = useSelector((state: any) => state.chatReducer);
  const [timer, setTimer] = useState(0);
  const [blocked, setBlocked] = useState(false);
  const {uid, name, blockList} = useSelector((state: any) => state.authReducer);

  useEffect(() => {
    const typingListener = CommonFunctions.getTypingStatus(
      roomid,
      receiverId,
      (typing: any) => {
        setTyping(typing.isTyping);
      },
    );

    return () => typingListener;
  }, []);

  useEffect(() => {
    const BlockListListener = firestore()
      .collection('Users')
      .doc(receiverId)
      .collection('BlockList')
      .onSnapshot((documentSnapshot: any) => {
        let temp = documentSnapshot.docs.map((item: any) => item.data());
        if (temp.find((element: any) => element.id === uid)) {
          setBlocked(true);
        } else {
          setBlocked(false);
        }
      });

    return BlockListListener;
  }, []);

  useEffect(() => {
    // let createdAt = firestore().collection('Chats').doc(roomid).get();
    CommonFunctions.getChatSnapshot(roomid, (documentSnapshot: any) => {
      if (documentSnapshot) {
        CommonFunctions.batchUpdate(roomid, uid, receiverId, chat[roomid]);
        let tempfilter = documentSnapshot.docs
          .filter((item: any) => {
            if (item.data()?.deleteBy) {
              if (item.data().deleteForEveryone) {
                return true;
              } else {
                return !item.data()?.deleteBy.includes(uid);
              }
            } else {
              return true;
            }
          })
          .map((item: any) => {
            return item.data();
          });
        tempfilter = tempfilter.sort(
          (a: any, b: any) => b.createdAt - a.createdAt,
        );
        if (chat[0]) {
          CommonFunctions.updateInbox(uid, receiverId, {
            lastMsg: tempfilter[0],
          });
          CommonFunctions.updateInbox(receiverId, uid, {
            lastMsg: tempfilter[0],
          });
        }
        dispatch({
          type: 'Chat/updateChat',
          payload: {roomid, data: tempfilter},
        });
      } else {
        dispatch({
          type: 'Chat/updateChat',
          payload: {roomid, data: []},
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
        .onSnapshot((documentSnapshot: any) => {
          CommonFunctions.batchUpdate(roomid, uid, receiverId, chat[roomid]);
          if (documentSnapshot) {
            let tempfilter = documentSnapshot.docs
              .filter((item: any) => {
                if (item.data()?.deleteBy) {
                  if (item.data().deleteForEveryone) {
                    return true;
                  } else {
                    if (item.data()?.deleteBy.includes(uid)) {
                      return false;
                    } else {
                      return true;
                    }
                  }
                } else {
                  return true;
                }
              })
              .map((item: any) => {
                return item.data();
              });
            tempfilter = tempfilter.sort(
              (a: any, b: any) => b.createdAt - a.createdAt,
            );
            dispatch({
              type: 'Chat/updateChat',
              payload: {roomid, data: tempfilter},
            });
          } else {
            dispatch({
              type: 'Chat/updateChat',
              payload: {roomid, data: []},
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
        sent: true,
      });
      CommonFunctions.setInbox(receiverId, uid, {
        Name: name,
        id: uid,
        roomid: roomid,
        avatar: avatar,
        sent: true,
      });
    }
    CommonFunctions.updateInbox(uid, receiverId, {
      avatar: avatar,
      lastMsg: {...messages[0], sent: true, received: false},
    });
    CommonFunctions.updateInbox(receiverId, uid, {
      lastMsg: {...messages[0], sent: true, received: false},
    });
    CommonFunctions.addMessage(roomid, messages);
  };

  const renderHeader = () => {
    return (
      <Header
        title={recieverName}
        receiverId={receiverId}
        image={avatar}
        roomid={roomid}
        id={uid}
        blocked={blocked}
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

  const renderFooter = () => {
    let index = blockList.findIndex((item: any) => item.id === receiverId);
    return index !== -1 ? (
      <TouchableOpacity
        style={styles.footerCont}
        onPress={() => CommonFunctions.unBlockContact(receiverId, uid)}>
        <Text style={styles.footerText}>{Strings.unblock}</Text>
      </TouchableOpacity>
    ) : (
      blocked && <Text style={styles.cantReplyText}>{Strings.cantReply}</Text>
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

  const onMessageLongPress = (context: any, message: any) => {
    let options;
    let cancelButtonIndex;
    if (message.user._id === uid && message.text !== Strings.deletedMessage) {
      options = ['Copy Text', 'Delete For Me', 'Delete For Everyone', 'Cancel'];
      cancelButtonIndex = options.length - 1;
      context.actionSheet().showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
        },
        (buttonIndex: any) => {
          switch (buttonIndex) {
            case 0:
              Clipboard.setString(message.text);
              break;
            case 1:
              CommonFunctions.deleteForMe(
                message,
                roomid,
                uid,
                receiverId,
                chat[roomid],
              );
              break;
            case 2:
              CommonFunctions.onDeleteForEveryone(
                message,
                roomid,
                uid,
                receiverId,
                chat[roomid],
              );
              break;
          }
        },
      );
    } else {
      options = ['Copy Text', 'Delete For Me', 'Cancel'];
      cancelButtonIndex = options.length - 1;
      context.actionSheet().showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
        },
        (buttonIndex: any) => {
          switch (buttonIndex) {
            case 0:
              Clipboard.setString(message.text);
              break;
            case 1:
              CommonFunctions.deleteForMe(
                message,
                roomid,
                uid,
                receiverId,
                chat[roomid],
              );
              break;
          }
        },
      );
    }
  };

  const _renderTextInput = (props: any) => {
    let index = blockList.findIndex((item: any) => item.id === receiverId);
    return index === -1 && !blocked ? (
      <InputToolbar containerStyle={styles.composerContainer} {...props} />
    ) : null;
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      <View
        style={[
          styles.bottomHeaderSeperator,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            paddingTop:
              Dimensions.get('screen').height < 700 ? getStatusBarHeight() : 0,
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
        onLongPress={onMessageLongPress}
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
      {renderFooter()}
    </View>
  );
}
