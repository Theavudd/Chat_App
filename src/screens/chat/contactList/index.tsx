import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import ComponentNames from '../../../utils/constants/componentNames';
import DefaultValues from '../../../utils/constants/defaultValues';
import {styles} from './styles';
import Loader from '../../../components/loader';
import FastImage from 'react-native-fast-image';
import Strings from '../../../utils/constants/strings';

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
        let userDetails = documentSnapshot?.docs.map(async (item: any) => {
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

        Promise.all(userDetails)
          .then((response: any) => {
            console.log('res', response);
            const index = response.findIndex(
              (item: any) => item.data.id === uid,
            );
            let temp = response;
            temp.splice(index, 1);
            dispatch({type: 'Auth/updateUsers', payload: temp});
          })
          .catch((err: any) => console.log('error', err));
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
    navigation.navigate(ComponentNames.ChatRoom, {
      roomid,
      recieverName: item?.Name,
      receiverId: item?.id,
      avatar: item?.avatar,
    });
  };

  const renderUsers = useCallback(
    ({item}: any) => {
      if (item?.data?.id !== uid) {
        return (
          <View style={styles.contactContainer}>
            <TouchableOpacity
              activeOpacity={DefaultValues.activeOpacity}
              onPress={() => onContactPress(item.data)}
              style={styles.item}>
              <View style={styles.profileImgCont}>
                <FastImage
                  source={{
                    uri:
                      item?.data?.avatar !== ''
                        ? item?.data?.avatar
                        : DefaultValues.defaultImage,
                    priority: FastImage.priority.high,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                  style={styles.profileImage}
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
  const _listEmptyComponent = () => {
    return (
      <View style={styles.listEmptyCont}>
        <Text style={styles.emptyTextHeader}>{Strings.contactListEmpty}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contactList}
        renderItem={renderUsers}
        bounces={false}
        ListEmptyComponent={_listEmptyComponent}
      />
      {isLoading && <Loader />}
    </View>
  );
}
