import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Platform,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import Strings from '../../../utils/constants/strings';
import {styles} from './styles';
import {StackActions, useNavigation} from '@react-navigation/native';
import InputField from './inputField';
import {useDispatch, useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {vh} from '../../../utils/Dimension';
import {showSnackBar} from '../../../utils/CommonFunctions';
import LocalImages from '../../../utils/constants/localImages';
// import storage from '@react-native-firebase/storage';
import CustomButton from '../../../components/button';
import Color from '../../../utils/constants/color';
import ComponentNames from '../../../utils/constants/componentNames';
// import ImgToBase64 from 'react-native-image-base64';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../../components/loader';
import DefaultValues from '../../../utils/constants/defaultValues';

export default function SignUp() {
  const navigation = useNavigation<any>();
  const [Name, setName] = useState('');
  const [isLoading, setLoading] = useState(false);
  const {image, uid} = useSelector((state: any) => state.authReducer);
  const dispatch = useDispatch<any>();

  const onSelectImage = () => {
    ImagePicker.openPicker({
      width: vh(300),
      height: vh(300),
      cropping: true,
    })
      .then(img => {
        if (Platform.OS === 'ios') {
          // const reference = storage().ref(uid);
          // await reference.putFile(img.sourceURL);
          // ImgToBase64.getBase64String(img.sourceURL)
          //   .then((str: string) => {
          //     // storage
          //     // dispatch({type: 'Auth/StoreImage', payload: img.sourceURL});
          //   })
          // .catch((err: any) => showSnackBar(err.message));
        } else {
          dispatch({type: 'Auth/StoreImage', payload: img.path});
        }
      })
      .catch(() => {
        showSnackBar(Strings.imageCancel);
      });
  };

  const onRemoveImagePress = () => {
    dispatch({type: 'Auth/StoreImage', payload: ''});
  };

  const onNextPress = () => {
    setLoading(true);
    firestore()
      .collection('Users')
      .doc(uid)
      .update({
        Name: Name,
      })
      .then(() => {
        setLoading(false);
        dispatch({type: 'Auth/storeName', payload: Name});
        navigation.dispatch(StackActions.replace(ComponentNames.Chat));
      })
      .catch((error: any) => {
        setLoading(false);
        showSnackBar(error.code);
      });
  };

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{Strings.addDetails}</Text>
      </View>
    );
  };

  const renderSignupDetails = () => {
    return (
      <View style={styles.form}>
        <Image
          source={{uri: DefaultValues.defaultImage}}
          // source={{
          //   uri: image !== '' ? image : defaultImage,
          // }}
          style={styles.imagePickerImg}
        />
        <View style={styles.imageButtonsView}>
          <TouchableOpacity
            onPress={onSelectImage}
            style={styles.addImageButton}>
            <Text style={styles.imageButtons}>
              {image === '' ? Strings.addImage : Strings.updateImage}
            </Text>
          </TouchableOpacity>
          {image !== '' && (
            <TouchableOpacity
              onPress={onRemoveImagePress}
              style={styles.addImageButton}>
              <Text style={[styles.imageButtons, {color: Color.red}]}>
                {Strings.removeImage}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <InputField
          value={Name}
          setValue={setName}
          placeholder={Strings.enterName}
        />
      </View>
    );
  };

  const renderSubmitButton = () => {
    return (
      <View style={styles.nextButton}>
        <CustomButton
          bgColor={Color.green}
          text={Strings.next}
          textColor={Color.white}
          disableColor={Color.grey}
          disable={Name === ''}
          onPressButton={onNextPress}
        />
      </View>
    );
  };

  return (
    <ImageBackground source={LocalImages.background} style={styles.container}>
      <SafeAreaView style={styles.container}>
        {renderHeader()}
        {renderSignupDetails()}
        {renderSubmitButton()}
        {isLoading && <Loader />}
      </SafeAreaView>
    </ImageBackground>
  );
}
