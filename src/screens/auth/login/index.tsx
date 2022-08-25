import {Text, SafeAreaView, Image, ImageBackground, View} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import LocalImages from '../../../utils/constants/localImages';
import Strings from '../../../utils/constants/strings';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Button from '../../../components/button';
import Color from '../../../utils/constants/color';
import {vh} from '../../../utils/Dimension';
import {useNavigation} from '@react-navigation/native';
import Names from '../../../utils/constants/componentNames';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../../../redux/auth/action';
import Loader from '../../../components/loader';
import {showSnackBar} from '../../../utils/CommonFunctions';

export default function Login() {
  const navigation = useNavigation<any>();
  const [phoneNo, setPhoneNo] = useState<string>('');
  const [countryCode, setCountryCode] = useState<string>('+91');
  const store = useSelector(state => state);
  const dispatch = useDispatch<any>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [errorMsg, setError] = useState(false);

  console.log('state', store);

  const signIn = () => {
    if (phoneNo.length === 10) {
      setError(false);
      setLoading(true);
      dispatch(
        login(
          {countryCode: countryCode, phoneNo: phoneNo},
          (userDetails: any) => {
            setLoading(false);
            let confirm = userDetails;
            navigation.navigate(Names.OTP, {
              confirm: confirm,
            });
          },
          (error: any) => {
            setLoading(false);
            console.log('erroer', error);
            showSnackBar(error.code);
          },
        ),
      );
    } else {
      setError(true);
    }
  };

  const renderLogo = () => {
    return (
      <View style={styles.logoView}>
        <ImageBackground
          source={LocalImages.logoContainer}
          style={styles.logoImageCont}
          resizeMode={'contain'}>
          <Image source={LocalImages.logo} style={styles.logoImg} />
        </ImageBackground>
        <Text style={styles.logoText}>{Strings.welcomeToWhatsapp}</Text>
      </View>
    );
  };

  const renderNumberInput = () => {
    return (
      <View style={styles.numberView}>
        <OTPInputView
          autoFocusOnLoad={false}
          style={styles.countryCode}
          pinCount={3}
          code={countryCode}
          onCodeChanged={(code: string) => {
            setCountryCode(code);
          }}
          placeholderCharacter={'-'}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
        />
        <OTPInputView
          style={styles.numberTextInput}
          pinCount={10}
          code={phoneNo}
          onCodeChanged={(code: string) => {
            setPhoneNo(code);
          }}
          autoFocusOnLoad={false}
          placeholderCharacter={'-'}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
        />
      </View>
    );
  };

  const renderErrorMessage = () => {
    if (errorMsg) {
      return (
        <View>
          <Text style={styles.errorText}>{Strings.phoneNumberError}</Text>
        </View>
      );
    }
  };

  const renderButton = () => {
    return (
      <View style={styles.button}>
        <Button
          text={Strings.next}
          onPressButton={signIn}
          textColor={Color.white}
          bgColor={Color.green}
          disable={false}
          style={{borderRadius: vh(20)}}
        />
      </View>
    );
  };

  const renderLoader = () => isLoading && <Loader />;

  return (
    <ImageBackground source={LocalImages.background} style={styles.container}>
      <SafeAreaView style={styles.innerContainer}>
        {renderLogo()}
        {renderNumberInput()}
        {renderErrorMessage()}
        {renderButton()}
      </SafeAreaView>
      {renderLoader()}
    </ImageBackground>
  );
}
