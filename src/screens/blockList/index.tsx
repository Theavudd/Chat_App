import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import BackHeader from '../../components/backHeader';
import Strings from '../../utils/constants/strings';
import {styles} from './styles';
import DefaultValues from '../../utils/constants/defaultValues';
import LocalImages from '../../utils/constants/localImages';
import {useSelector} from 'react-redux';
import CommonFunctions from '../../utils/CommonFunctions';

export default function BlockList() {
  const {uid, blockList} = useSelector((state: any) => state.authReducer);

  const onBlockedContactPress = (item: any) => {
    // setSelected(item);
    Alert.alert(
      '',
      `Are you sure you want to unblock ${item.name}`,
      [
        {
          text: 'Unblock',
          onPress: () => {
            CommonFunctions.unBlockContact(item.id, uid);
          },
          style: 'destructive',
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  const renderBlockList = ({item}: any) => {
    return (
      <TouchableOpacity
        activeOpacity={DefaultValues.activeOpacity}
        onPress={() => onBlockedContactPress(item)}
        style={styles.listItem}>
        <View style={styles.contactImageContainer}>
          <Image
            source={LocalImages.defaultUser}
            style={styles.contactImage}
            resizeMode={'cover'}
          />
        </View>
        <View style={styles.innerItemContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.contactNameText}>{item?.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const _listEmptyComponent = () => {
    return (
      <View style={styles.listEmptyCont}>
        <Text style={styles.emptyTextHeader}>{Strings.emptyBlockList}</Text>
      </View>
    );
  };

  const ItemSeparator = () => {
    return <View style={styles.itemSeparator} />;
  };

  // const renderModal = () => {
  //   return (
  //     <Modal isVisible={showModal}>
  //       <View style={styles.modal}>
  //         <TouchableOpacity style={styles.modalTouchable}>
  //           <Text style={styles.modalText}>{Strings.cancel}</Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity style={styles.modalTouchable}>
  //           <Text style={styles.modalText}>{Strings.unblock}</Text>
  //         </TouchableOpacity>
  //       </View>
  //     </Modal>
  //   );
  // };

  return (
    <View style={styles.container}>
      <BackHeader backButton={true} title={Strings.blockList} />
      <FlatList
        data={blockList}
        renderItem={renderBlockList}
        bounces={false}
        ItemSeparatorComponent={ItemSeparator}
        ListEmptyComponent={_listEmptyComponent}
      />
    </View>
  );
}
