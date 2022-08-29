import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import ComponentNames from '../../../utils/constants/componentNames';
import DefaultValues from '../../../utils/constants/defaultValues';
import {styles} from './styles';
import BackHeader from '../../../components/backHeader';
import Loader from '../../../components/loader';

export default function ContactList() {
  const dispatch = useDispatch();
  const {uid, contactList} = useSelector((state: any) => state.authReducer);
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .onSnapshot((documentSnapshot: any) => {
        setLoading(true);
        let userDetails = documentSnapshot.docs.map(async (item: any) => {
          let roomId;
          if (item.id < uid) {
            roomId = item.id + uid;
          } else {
            roomId = uid + item.id;
          }

          await firestore()
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
        setLoading(false);
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
    navigation.replace(ComponentNames.ChatRoom, {
      roomid,
      recieverName: item?.Name,
      receiverId: item?.id,
      avatar: item?.avatar,
    });
  };

  const renderUsers = useCallback(
    ({item}: any) => {
      console.log('item', item);
      if (item?.data?.id !== uid) {
        return (
          <View style={styles.contactContainer}>
            <TouchableOpacity
              activeOpacity={DefaultValues.activeOpacity}
              onPress={() => onContactPress(item.data)}
              style={styles.item}>
              <View style={styles.profileImgCont}>
                <Image
                  source={{
                    uri:
                      item?.data?.avatar !== ''
                        ? item?.data?.avatar
                        : DefaultValues.defaultImage,
                  }}
                  style={styles.profileImage}
                  resizeMode={'cover'}
                />
              </View>
              <View style={styles.innerItemContainer}>
                <View style={styles.nameContainer}>
                  <Text style={styles.contactNameText}>{item?.data?.Name}</Text>
                  <Text style={styles.statusText}>{item?.data?.status}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.itemSeperator} />
          </View>
        );
      } else {
        return null;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <View style={styles.container}>
      <BackHeader title={'ContactList'} />
      <FlatList data={contactList} renderItem={renderUsers} />
      {isLoading && <Loader />}
    </View>
  );
}
