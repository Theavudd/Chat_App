import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Strings from '../../../utils/constants/strings';
import {styles} from './styles';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import InputField from './inputField';
import {useDispatch, useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {vh} from '../../../utils/Dimension';
import {showSnackBar} from '../../../utils/CommonFunctions';
import LocalImages from '../../../utils/constants/localImages';
import CustomButton from '../../../components/button';
import Color from '../../../utils/constants/color';
import ComponentNames from '../../../utils/constants/componentNames';
import firestore from '@react-native-firebase/firestore';
import Loader from '../../../components/loader';
import DefaultValues from '../../../utils/constants/defaultValues';
import storage from '@react-native-firebase/storage';
import BackHeader from '../../../components/backHeader';

export default function SignUp() {
  const {avatar, uid, countryCode, phoneNo} = useSelector(
    (state: any) => state.authReducer,
  );
  const navigation = useNavigation<any>();
  const params = useRoute()?.params;
  const [Name, setName] = useState('');
  const [status, setStatus] = useState('Hey There, I am using Whatsapp');
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    firestore()
      .collection('Users')
      .doc(uid)
      .onSnapshot(documentSnapshot => {
        console.log('doc', documentSnapshot.data());
        if (documentSnapshot.data()) {
          setName(documentSnapshot?.data()?.Name);
          setStatus(documentSnapshot?.data()?.status);
          dispatch({
            type: 'Auth/storeUserDetails',
            payload: documentSnapshot.data(),
          });
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSelectImage = () => {
    ImagePicker.openPicker({
      width: vh(50),
      height: vh(50),
      compressImageQuality: 0.1,
      cropping: true,
    })
      .then(img => {
        const imageUri = Platform.OS === 'ios' ? img.sourceURL : img.path;
        setLoading(true);
        uploadImage(imageUri);
      })
      .catch(() => {
        showSnackBar(Strings.imageCancel);
      });
  };

  const uploadImage = (imagePath: any) => {
    storage()
      .ref(uid)
      .putFile(imagePath)
      .then((response: any) => {
        console.log('uploaded Successful', response);
        setLoading(false);
        console.log('response', response);
        if (response.state === 'success') {
          let url = storage().ref(uid).getDownloadURL();
          url
            .then(res => {
              console.log('res', res);
              dispatch({type: 'Auth/StoreImage', payload: res});
            })
            .catch(error => showSnackBar(error.message));
        }
      })
      .catch((err: any) => {
        setLoading(false);
        showSnackBar(err.message);
        console.log('error', err);
      });
  };

  const onRemoveImagePress = () => {
    setLoading(true);
    dispatch({type: 'Auth/StoreImage', payload: ''});
    storage()
      .ref(uid)
      .delete()
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onNextPress = () => {
    setLoading(true);
    firestore()
      .collection('Users')
      .doc(uid)
      .set({
        id: uid,
        Name: Name,
        CountryCode: countryCode,
        PhoneNo: phoneNo,
        avatar: avatar,
        online: true,
        status: status,
      })
      .then(() => {
        setName('');
        setLoading(false);
        dispatch({
          type: 'Auth/storeSignUpDetails',
          payload: {Name: Name, status: status},
        });
        navigation.dispatch(StackActions.replace(ComponentNames.Chat));
      })
      .catch((error: any) => {
        setLoading(false);
        showSnackBar(error.message);
      });
  };
  console.log('params', params);

  const renderHeader = () => {
    return (
      <BackHeader
        title={params?.backButton ? Strings.editDetails : Strings.addDetails}
        backButton={params?.backButton}
        style={!params?.backButton ? styles.topHeader : {}}
      />
    );
  };

  const renderSignupDetails = () => {
    return (
      <View style={styles.form}>
        <Image
          source={{
            uri: avatar !== '' ? avatar : DefaultValues.defaultImage,
          }}
          style={styles.imagePickerImg}
        />
        <View style={styles.imageButtonsView}>
          <TouchableOpacity
            onPress={onSelectImage}
            style={styles.addImageButton}>
            <Text style={styles.imageButtons}>
              {avatar === '' ? Strings.addImage : Strings.updateImage}
            </Text>
          </TouchableOpacity>
          {avatar !== '' && (
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
        <Text style={styles.statusText}>{Strings.status}</Text>
        <InputField
          value={status}
          setValue={setStatus}
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
      <View style={styles.container}>
        {renderHeader()}
        {renderSignupDetails()}
        {renderSubmitButton()}
        {isLoading && <Loader />}
      </View>
    </ImageBackground>
  );
}
