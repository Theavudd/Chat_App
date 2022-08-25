import firestore from '@react-native-firebase/firestore';

export const addMessage = (
  senderId: string,
  recieverId: string,
  message: string,
  timeStamp: Date,
  roomid: string,
  successCallback: Function,
  failureCallback: Function,
) => {
  return (dispatch: Function) => {
    let payload = {senderId, recieverId, message, timeStamp, roomid};
    firestore()
      .collection('Chats')
      .doc(payload.roomid)
      .collection(roomid)
      .add(payload)
      .then(() => {
        dispatch({type: 'Chat/addMessage', payload});
        successCallback();
      })
      .catch((error: any) => {
        failureCallback(error);
      });
  };
};

export const signOut = () => {
  return (dispatch: Function) => {
    dispatch({type: 'Auth/signOut'});
  };
};

export const createRoom = (payload: string) => {
  return (dispatch: Function) => {
    dispatch({type: 'Chat/addRoom', payload});
  };
};
