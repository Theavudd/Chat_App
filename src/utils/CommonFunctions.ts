import Auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import Color from './constants/color';
import firestore from '@react-native-firebase/firestore';

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
};
