/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import {showSnackBar} from '../../../utils/CommonFunctions';
import Clipboard from '@react-native-community/clipboard';
import {Platform, View, Dimensions} from 'react-native';
import {styles} from './styles';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Header from './header';
import {vh} from '../../../utils/Dimension';
import Color from '../../../utils/constants/color';
import CommonFunctions from '../../../utils/CommonFunctions';
import Strings from '../../../utils/constants/strings';
import {
  renderScrolToBottom,
  _renderTextInput,
  _renderSend,
  renderBubble,
  _renderComposer,
} from './chat';

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

    return () => typingListener;
  }, []);

  useEffect(() => {
    batchUpdate();
    CommonFunctions.getChatSnapshot(roomid, (documentSnapshot: any) => {
      if (documentSnapshot) {
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
        CommonFunctions.updateInbox(uid, receiverId, {
          lastMsg: tempfilter[0],
        });
        CommonFunctions.updateInbox(receiverId, uid, {
          lastMsg: tempfilter[0],
        });
        dispatch({
          type: 'Chat/updateChat',
          payload: {roomid, data: tempfilter},
        });
      }
    });
  }, []);

  const batchUpdate = async () => {
    const usersQuerySnapshot = await firestore()
      .collection('Chats')
      .doc(roomid)
      .collection('Messages')
      .get();
    const batch = firestore().batch();

    usersQuerySnapshot.forEach(documentSnapshot => {
      if (documentSnapshot.data()?.user?._id !== uid) {
        batch.update(documentSnapshot.ref, {received: true});
      }
    });

    if (chat[roomid][0]._id !== uid) {
      CommonFunctions.updateInbox(uid, receiverId, {
        lastMsg: chat[roomid][0],
      });
      CommonFunctions.updateInbox(receiverId, uid, {
        lastMsg: chat[roomid][0],
      });
    }

    return batch.commit();
  };

  useLayoutEffect(() => {
    if (!chat[`${roomid}`]) {
      dispatch({type: 'Chat/addRoom', roomid});
    } else {
      const subscriber = firestore()
        .collection('Chats')
        .doc(roomid)
        .collection('Messages')
        .onSnapshot((documentSnapshot: any) => {
          batchUpdate();
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
      lastMsg: {...messages[0], sent: true, received: false},
    });
    CommonFunctions.updateInbox(receiverId, uid, {
      lastMsg: {...messages[0], sent: true, received: false},
    });
    firestore()
      .collection('Chats')
      .doc(roomid)
      .collection('Messages')
      .doc(messages[0]?._id)
      .set({
        ...messages[0],
        sent: true,
        received: false,
        deleteBy: '',
        deleteForEveryone: false,
      })
      .then(() => {})
      .catch((err: any) => {
        showSnackBar(err.messages);
      });
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

  const onDeleteForMe = (message: any) => {
    firestore()
      .collection('Chats')
      .doc(roomid)
      .collection('Messages')
      .doc(message?._id)
      .update({
        deleteForEveryone: false,
        deleteBy: message.deleteBy ? roomid : uid,
      })
      .then(() => {
        if (chat[roomid].length > 0) {
          if (message._id === chat[roomid][0]._id) {
            if (chat[roomid][1]) {
              CommonFunctions.updateInbox(uid, receiverId, {
                lastMsg: chat[roomid][1],
              });
            } else {
              CommonFunctions.updateInbox(uid, receiverId, {
                lastMsg: {...chat[roomid][1], text: ''},
              });
            }
          }
        }
      })
      .catch(() => {
        showSnackBar('Delete Failed');
      });
  };

  const onDeleteForEveryone = (message: any) => {
    firestore()
      .collection('Chats')
      .doc(roomid)
      .collection('Messages')
      .doc(message?._id)
      .update({
        deletedMessage: message?.text,
        text: Strings.deletedMessage,
        received: false,
        sent: false,
        pending: false,
        deleteForEveryone: true,
        deleteBy: '',
      })
      .then(() => {
        if (message._id === chat[roomid][0]._id) {
          CommonFunctions.updateInbox(uid, receiverId, {
            lastMsg: chat[roomid][1],
          });
          CommonFunctions.updateInbox(receiverId, uid, {
            lastMsg: chat[roomid][1],
          });
        }
      })
      .catch((err: any) => {
        showSnackBar(err.message);
      });
  };

  const onMessageLongPress = (context: any, message: any) => {
    let options;
    let cancelButtonIndex;
    if (message.user._id === uid && message.text != Strings.deletedMessage) {
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
              onDeleteForMe(message);
              break;
            case 2:
              onDeleteForEveryone(message);
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
              onDeleteForMe(message);
              break;
          }
        },
      );
    }
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
    </View>
  );
}
