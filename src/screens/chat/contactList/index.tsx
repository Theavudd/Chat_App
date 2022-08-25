import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import ComponentNames from '../../../utils/constants/componentNames';
import DefaultValues from '../../../utils/constants/defaultValues';
import {styles} from './styles';
import BackHeader from '../../../components/backHeader';

export default function ContactList() {
  const dispatch = useDispatch();
  const {uid, inbox} = useSelector((state: any) => state.authReducer);
  // const {users} = useSelector((state: any) => state.);
  const navigation = useNavigation<any>();
  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .onSnapshot((documentSnapshot: any) => {
        let userDetails = documentSnapshot.docs.map(async (item: any) => {
          let roomId;
          if (item.id < uid) {
            roomId = item.id + uid;
          } else {
            roomId = uid + item.id;
          }

          let temp = await firestore()
            .collection('Chats')
            .doc(roomId)
            .collection(roomId)
            .get();
          return {
            data: item.data(),
          };
        });
        Promise.all(userDetails).then((response: any) => {
          console.log('res', response);
          dispatch({type: 'Auth/updateUsers', payload: response});
        });
      });
    return () => subscriber();
  }, [dispatch, uid]);

  const onContactPress = (item: any) => {
    let roomid;
    if (item.id < uid) {
      roomid = item.id + uid;
    } else {
      roomid = uid + item.id;
    }
    navigation.navigate(ComponentNames.ChatRoom, {
      roomid,
      recieverName: item?.Name,
      receiverId: item?.id,
    });
  };

  const renderUsers = useCallback(
    ({item}: any) => {
      if (item.data.id !== uid) {
        return (
          <TouchableOpacity
            activeOpacity={DefaultValues.activeOpacity}
            onPress={() => onContactPress(item.data)}
            style={styles.item}>
            <View style={styles.profileImgCont}>
              <Image
                source={{uri: DefaultValues.defaultImage}}
                style={styles.profileImage}
                resizeMode={'contain'}
              />
            </View>
            <View style={styles.innerItemContainer}>
              <View style={styles.nameContainer}>
                <Text style={styles.contactName}>{item.data.Name}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      } else {
        return null;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <View>
      <BackHeader title={'ContactList'} />
      <FlatList
        data={inbox}
        renderItem={renderUsers}
        keyExtractor={item => {
          return item.data.id;
        }}
      />
    </View>
  );
}
