import Auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import Color from './constants/color';
import firestore from '@react-native-firebase/firestore';
import Strings from './constants/strings';

/**
 * @description Function to get Set Inbox
 * @param uid
 * @param id
 * @param payload
 */

const updateInbox = (uid: string, id: string, payload: any) => {
  firestore()
    .collection('Users')
    .doc(uid)
    .collection('Inbox')
    .doc(id)
    .update(payload)
    .then(() => {})
    .catch((error: any) => showSnackBar(error.message));
};
/**
 * @description Function to get Set Inbox
 * @param uid
 * @param id
 * @param payload
 */

const setInbox = (uid: string, id: string, payload: any) => {
  firestore()
    .collection('Users')
    .doc(uid)
    .collection('Inbox')
    .doc(id)
    .set(payload)
    .then(() => {})
    .catch((error: any) => showSnackBar(error.message));
};

/**
 * @description Function to get Chat Snapshot
 * @param roomid
 * @param successCallback
 */
const getChatSnapshot = (roomid: string, successCallback: Function) => {
  firestore()
    .collection('Chats')
    .doc(roomid)
    .collection('Messages')
    .onSnapshot(documentSnapshot => {
      successCallback(documentSnapshot);
    });
};

/**
 * @function signOutWithFirebase
 * @param {*} successCallback
 * @param {*} failureCallback
 */
const signOutWithFirebase = (
  successCallback: Function,
  failureCallback: Function,
) => {
  Auth()
    .signOut()
    .then(() => {
      successCallback();
    })
    .catch(error => {
      failureCallback(error);
    });
};

/**
 * @function signInWithPhoneNumber
 * @param {*} PhoneNumber
 * @param {*} successCallback
 * @param {*} failureCallback
 */

const signInWithPhoneNumber = async (
  PhoneNumber: string,
  countryCode: string,
  successCallback: Function,
  failureCallback: Function,
) => {
  try {
    const confirmation = await Auth().signInWithPhoneNumber(
      countryCode + PhoneNumber,
    );
    successCallback(confirmation);
  } catch (error) {
    failureCallback(error);
  }
};

/**
 * @function confirmCode
 * @description Phone number Verification
 * @param {*} confirm
 * @param {*} verificationCode
 * @param {*} setVerifyPhone
 * @param {*} successCallback
 * @param {*} failureCallback
 */

const confirmCode = async (
  confirm: any,
  verificationCode: String,
  successCallback: Function,
  failureCallback: Function,
) => {
  try {
    let userDetails = await confirm.confirm(verificationCode);
    successCallback(userDetails);
  } catch (error) {
    failureCallback(error);
  }
};

/**
 * @function showSnackBar
 * @description Error display
 * @param message
 */

export const showSnackBar = (message: string) => {
  Snackbar.show({
    text: message,
    backgroundColor: Color.black,
    duration: 1000,
    textColor: Color.white,
  });
};

const addMessage = (roomid: string, messages: any) => {
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

/**
 * @description Function to get User's Typing Status
 * @param roomid
 * @param id
 */

const getTypingStatus = (
  roomid: string,
  id: string,
  successCallback: Function,
) => {
  firestore()
    .collection('Chats')
    .doc(roomid)
    .collection('TypingStatus')
    .doc(id)
    .onSnapshot(documentSnapshot => {
      if (documentSnapshot.data()) {
        successCallback(documentSnapshot?.data());
      }
    });
};

const batchUpdate = (
  roomid: string,
  uid: string,
  receiverId: string,
  chat: any,
) => {
  firestore()
    .collection('Chats')
    .doc(roomid)
    .collection('Messages')
    .get()
    .then((usersQuerySnapshot: any) => {
      if (usersQuerySnapshot) {
        const batch = firestore().batch();

        usersQuerySnapshot.forEach((documentSnapshot: any) => {
          if (documentSnapshot?.data()?.user?._id !== uid) {
            batch.update(documentSnapshot?.ref, {received: true});
          }
        });
        if (chat[0]) {
          if (chat[0]?.user?._id !== uid) {
            updateInbox(uid, receiverId, {
              lastMsg: chat[0],
            });
            updateInbox(receiverId, uid, {
              lastMsg: chat[0],
            });
          }
        }
        return batch.commit();
      }
    })
    .catch((error: any) => console.log('err', error));
};

const setTypingStatus = (roomid: string, uid: string, payload: boolean) => {
  firestore()
    .collection('Chats')
    .doc(roomid)
    .collection('TypingStatus')
    .doc(uid)
    .set({isTyping: payload})
    .then(() => {})
    .catch(err => showSnackBar(err.message));
};

const blockUser = (uid: string, recieverId: string, name: string) => {
  firestore()
    .collection('Users')
    .doc(uid)
    .collection('BlockList')
    .doc(recieverId)
    .set({
      id: recieverId,
      name: name,
    });
};

const unBlockContact = (blockedUid: string, uid: string) => {
  firestore()
    .collection('Users')
    .doc(uid)
    .collection('BlockList')
    .doc(blockedUid)
    .delete();
};

const onDeleteForEveryone = (
  message: any,
  roomid: string,
  uid: string,
  receiverId: string,
  chat: any,
) => {
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
    })
    .then(() => {
      if (message._id === chat[0]._id) {
        updateInbox(uid, receiverId, {
          lastMsg: chat[1],
        });
        updateInbox(receiverId, uid, {
          lastMsg: chat[1],
        });
      }
    })
    .catch((err: any) => {
      showSnackBar(err.message);
    });
};

const deleteForMe = (
  message: any,
  roomid: string,
  uid: string,
  receiverId: any,
  chat: any,
) => {
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
      if (chat.length > 0) {
        if (message._id === chat._id) {
          if (chat[1]) {
            updateInbox(uid, receiverId, {
              lastMsg: chat[1],
            });
          } else {
            updateInbox(uid, receiverId, {
              lastMsg: {...chat[1], text: ''},
            });
          }
        }
      }
    })
    .catch(() => {
      showSnackBar('Delete Failed');
    });
};

/**
 * @exports
 * @description
 */
export default {
  signOutWithFirebase,
  signInWithPhoneNumber,
  confirmCode,
  updateInbox,
  setInbox,
  getChatSnapshot,
  getTypingStatus,
  setTypingStatus,
  blockUser,
  batchUpdate,
  unBlockContact,
  onDeleteForEveryone,
  deleteForMe,
  addMessage,
};
