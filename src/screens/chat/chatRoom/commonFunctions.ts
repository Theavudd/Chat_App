import firestore from '@react-native-firebase/firestore';

const updateInbox = (uid: string, id: string, payload: any) => {
  firestore()
    .collection('Users')
    .doc(uid)
    .collection('Inbox')
    .doc(id)
    .update(payload);
};
const setInbox = (uid: string, id: string, payload: any) => {
  firestore()
    .collection('Users')
    .doc(uid)
    .collection('Inbox')
    .doc(id)
    .set(payload);
};
const getChatSnapshot = (roomid: string, successCallback: Function) => {
  firestore()
    .collection('Chats')
    .doc(roomid)
    .collection('Messages')
    .onSnapshot(documentSnapshot => {
      successCallback(documentSnapshot);
    });
};

export default {updateInbox, setInbox, getChatSnapshot};
