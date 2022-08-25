import Auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import Color from './constants/color';
import firestore from '@react-native-firebase/firestore';

/**
 * @function sign
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
 * @function addMsg
 * @description function to add messages to firestore
 * @param payload
 * @param successCallback
 * @param failureCallback
 */

export const addMessage = (
  payload: any,
  successCallback: Function,
  failureCallback: Function,
) => {
  firestore()
    .collection('Chats')
    .doc(payload.roomid)
    .collection(payload.roomid)
    .add(payload)
    .then(response => {
      console.log('response', response);
      // firestore()
      //   .collection('Chats')
      //   .doc(payload.roomid)
      //   .collection(payload.roomid)
      //   .doc(
      //     response?._documentPath?.parts()[
      //       response?.documentPath()?.parts().length - 1
      //     ],
      //   );
      successCallback(response);
    })
    .catch((error: any) => {
      failureCallback(error);
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
  addMessage,
};
