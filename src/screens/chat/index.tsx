import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import Header from './header';
import Color from '../../utils/constants/color';
import Strings from '../../utils/constants/strings';
import DefaultValues from '../../utils/constants/defaultValues';
import {vw, vh} from '../../utils/Dimension';
import ChatList from './chatList';
import ContactList from './contactList';
import {useSelector, useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

export default function Chats() {
  const topHeader = [Strings.recentChats, Strings.contact];
  const dispatch = useDispatch();
  const [currentScreen, setCurrentScreen] = React.useState(0);
  const {uid} = useSelector((state: any) => state.authReducer);
  useEffect(() => {
    const BlockListListener = firestore()
      .collection('Users')
      .doc(uid)
      .collection('BlockList')
      .onSnapshot((documentSnapshot: any) => {
        if (documentSnapshot.docs) {
          let tempList = documentSnapshot?.docs.map((item: any) =>
            item?.data(),
          );
          dispatch({type: 'Auth/updateBlackList', payload: tempList});
        } else {
          dispatch({type: 'Auth/updateBlackList', payload: []});
        }
      });
    return () => BlockListListener();
  });

  const renderSubHeader = (item: any, index: number) => {
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={DefaultValues.activeOpacity}
        onPress={() => {
          setCurrentScreen(index);
        }}
        style={[
          styles.subsubheaderInnerContainer,
          {
            width: vw(327 / topHeader.length),
            backgroundColor:
              currentScreen === index ? Color.white : Color.darkGrey,
          },
        ]}>
        <Text
          style={[
            styles.subHeaderText,
            {color: currentScreen === index ? Color.darkGrey : Color.white},
          ]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderList = () => {
    switch (currentScreen) {
      case 0:
        return <ChatList />;
      case 1:
        return <ContactList />;
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.subHeaderContainer}>
        {topHeader.map((item, index) => {
          return renderSubHeader(item, index);
        })}
      </View>
      {renderList()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.black,
  },
  subHeaderContainer: {
    flexDirection: 'row',
    marginHorizontal: vw(18),
    justifyContent: 'space-evenly',
  },
  subsubheaderInnerContainer: {
    borderRadius: vw(10),
    alignItems: 'center',
  },
  subHeaderText: {
    color: Color.white,
    marginHorizontal: vw(24),
    marginVertical: vh(12),
  },
});
