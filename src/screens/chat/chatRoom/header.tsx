import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import LocalImages from '../../../utils/constants/localImages';
import {vh, vw} from '../../../utils/Dimension';
import DefaultValues from '../../../utils/constants/defaultValues';
import Fonts from '../../../utils/constants/fonts';
import Color from '../../../utils/constants/color';
import Strings from '../../../utils/constants/strings';
import firestore from '@react-native-firebase/firestore';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import CommonFunctions, {showSnackBar} from '../../../utils/CommonFunctions';
import {useSelector} from 'react-redux';
import Call from '../../../components/audioVideoCall/modules/call';
import {getToken} from '../../../components/audioVideoCall/utils/services';

interface Props {
  title?: any;
  image?: any;
  roomid?: any;
  style?: Object;
  receiverId: string;
  id: string;
  blocked: boolean;
  sendCallMessage: any;
}

export default function Header(props: Props) {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const {blockList, name, uid} = useSelector((state: any) => state.authReducer);
  const {chat} = useSelector((state: any) => state.chatReducer);
  const [online, setOnline] = useState(false);
  const [type, setType] = useState('');
  const [token, setToken] = useState('');
  const onBackPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const activeListener = firestore()
      .collection('Users')
      .doc(props?.receiverId)
      .onSnapshot(documentSnapshot => {
        setOnline(documentSnapshot.data()?.online);
      });

    return () => activeListener();
  });
  const callStatus = useMemo(() => {
    if (chat[props.roomid]) {
      if (chat[props?.roomid][0]) {
        return chat[props?.roomid][0]?.connected;
      }
    }
    return false;
  }, [chat, props?.roomid]);

  useEffect(() => {
    if (callStatus) {
      setToken(chat[props.roomid][0].token);
    } else {
      getToken(
        props.roomid,
        '0',
        (response: any) => {
          setToken(response.data?.rtcToken);
        },
        (error: any) => {
          showSnackBar(error.message);
        },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callStatus]);

  const isBlocked = useMemo(
    () => blockList.findIndex((item: any) => item.id === props.receiverId),
    [blockList, props.receiverId],
  );

  const onOptionPress = () => {
    setModalVisible(true);
  };
  const onBackDropPress = () => {
    setModalVisible(false);
  };

  const renderModal = () => {
    return (
      <Modal
        isVisible={modalVisible}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        backdropColor={Color.transparent}
        onBackdropPress={onBackDropPress}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.modalItemView}
            onPress={() =>
              isBlocked !== 0 ? modalFunctions(0) : modalFunctions(2)
            }
            activeOpacity={DefaultValues.activeOpacity}>
            <Text style={styles.modalText}>
              {isBlocked !== 0 ? Strings.blockUser : Strings.unBlockuser}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalItemView}
            onPress={() => modalFunctions(1)}
            activeOpacity={DefaultValues.activeOpacity}>
            <Text style={styles.modalText}>{Strings.clearChat}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  const clearChat = () => {};

  const modalFunctions = (index: number) => {
    setModalVisible(false);
    switch (index) {
      case 0:
        CommonFunctions.blockUser(props.id, props.receiverId, props.title);
        break;
      case 1:
        clearChat();
        break;
      case 2:
        CommonFunctions.unBlockContact(props.receiverId, props.id);
        break;
    }
  };

  const onVideoCallPress = () => {
    setType('video');
    sendCallMessage();
  };

  const onAudioCallPress = () => {
    setType('audio');
    sendCallMessage();
  };
  const sendCallMessage = () => {
    if (!callStatus) {
      props.sendCallMessage([
        {
          _id: CommonFunctions.randomChatID(),
          createdAt: new Date().getTime(),
          deleteBy: '',
          deleteForEveryone: false,
          received: false,
          sent: true,
          token: token,
          type: type,
          connected: true,
          text: `${name} started ${type === 'audio' ? 'an' : 'a'} ${type} call`,
          user: {
            name: `${name}`,
            _id: uid,
          },
        },
      ]);
    }
  };

  const onEndCall = () => {
    firestore()
      .collection('Chats')
      .doc(props.roomid)
      .collection('Messages')
      .doc(chat[props.roomid][0]._id)
      .update({
        connected: false,
      });
  };

  return (
    <View style={[styles.container, props?.style]}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={onBackPress}
        activeOpacity={DefaultValues.activeOpacity}>
        <Image
          source={LocalImages.backbutton}
          resizeMode={'contain'}
          style={styles.backButtonImg}
        />
        <FastImage
          source={{
            uri:
              props?.image !== '' && !props.blocked
                ? props?.image
                : DefaultValues.defaultImage,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
          style={styles.profileImg}
        />
      </TouchableOpacity>
      <View style={styles.nameContainer}>
        <Text style={styles.titleText}>{props?.title}</Text>
        {online && !props.blocked && (
          <Text style={styles.subTitleText}>{Strings.online}</Text>
        )}
      </View>
      <Call
        config={{
          appId: '8c7c96fa8c0546db919c842a796cff88',
          channelId: props.roomid,
          token: token,
        }}
        callStatus={callStatus}
        type={type}
        onEndCall={onEndCall}
        onVideoCallPress={onVideoCallPress}
        onAudioCallPress={onAudioCallPress}
        audioCallIconStyle={styles.audioCallIcon}
        videoCallIconStyle={styles.videoCallIcon}
        profileName={props?.title}
        profileImage={props?.image ? props.image : DefaultValues.defaultImage}
      />
      <TouchableOpacity
        style={styles.videoCameraIconCont}
        onPress={onOptionPress}
        activeOpacity={DefaultValues.activeOpacity}>
        <Image
          source={LocalImages.options}
          resizeMode={'contain'}
          style={styles.videoIcon}
        />
      </TouchableOpacity>
      {renderModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: vh(50),
    backgroundColor: Color.black,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImg: {
    height: vh(40),
    width: vh(40),
    marginVertical: vh(5),
    borderRadius: vh(10),
    marginHorizontal: vw(10),
  },
  backButtonImg: {
    height: vh(30),
    tintColor: Color.white,
    width: vh(30),
  },
  titleText: {
    fontSize: vw(16),
    lineHeight: vh(18),
    fontFamily: Fonts.Regular,
    color: Color.white,
    marginRight: vw(15),
    width: vw(130),
  },
  phoneIconCont: {
    height: vh(19),
    width: vh(19),
    marginHorizontal: vw(10),
  },
  videoCameraIconCont: {
    height: vh(25),
    width: vh(25),
    marginHorizontal: vw(10),
  },
  videoIcon: {
    height: '100%',
    width: '100%',
    tintColor: Color.white,
  },
  phoneIcon: {
    height: '100%',
    width: '100%',
    tintColor: Color.white,
  },
  subTitleText: {
    fontSize: vw(12),
    lineHeight: vh(21),
    fontFamily: Fonts.Light,
    color: Color.white,
  },
  nameContainer: {
    marginHorizontal: vw(10),
  },
  modalView: {
    width: vw(130),
    position: 'absolute',
    top: vh(12),
    right: 0,
    backgroundColor: Color.darkGrey,
    borderRadius: vw(5),
  },
  modalItemView: {
    paddingHorizontal: vw(10),
    paddingVertical: vh(10),
  },
  modalText: {
    color: Color.white,
    fontFamily: Fonts.Regular,
    fontSize: vw(14),
  },
  audioCallIcon: {
    tintColor: Color.white,
  },
  videoCallIcon: {
    tintColor: Color.white,
  },
});
