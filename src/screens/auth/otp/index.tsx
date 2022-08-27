import {
  Text,
  SafeAreaView,
  Image,
  ImageBackground,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import LocalImages from '../../../utils/constants/localImages';
import Strings from '../../../utils/constants/strings';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Button from '../../../components/button';
import Color from '../../../utils/constants/color';
import {vh} from '../../../utils/Dimension';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../../components/loader';
import Names from '../../../utils/constants/componentNames';
import {getUID} from '../../../redux/auth/action';
import CommonFunctions, {showSnackBar} from '../../../utils/CommonFunctions';
import firestore from '@react-native-firebase/firestore';
import BackgroundTimer from 'react-native-background-timer';
import ActionTypeName from '../../../utils/actionTypeName';

export default function OTP() {
  const navigation = useNavigation<any>();
  const {countryCode, phoneNo, uid} = useSelector(
    (state: any) => state.authReducer,
  );
  const routes = useRoute<any>();
  const [otp, setOTP] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [enableReset, setEnableReset] = useState(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<any>();
  const [confirm, setConfirm] = useState(routes?.params?.confirm);

  useEffect(() => {
    startTimer();
    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, []);

  useEffect(() => {
    if (secondsLeft === 0) {
      setEnableReset(true);
      BackgroundTimer.stopBackgroundTimer();
    }
  }, [secondsLeft]);

  const startTimer = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      setSecondsLeft((sec: any) => {
        if (sec > 0) {
          return sec - 1;
        } else {
          return 0;
        }
      });
    }, 1000);
  };

  const clockify = () => {
    let minute = Math.floor((secondsLeft / 60) % 60);
    let seconds = Math.floor(secondsLeft % 60);

    let displayMinute = minute < 10 ? `0${minute}` : minute;
    let displaySeconds = seconds < 10 ? `0${seconds}` : seconds;

    return {
      displayMinute,
      displaySeconds,
    };
  };

  const verifyOtp = () => {
    setLoading(true);
    dispatch(
      getUID(
        otp,
        confirm,
        () => {
          setLoading(false);
          navigation.replace(Names.Signup);
        },
        (error: any) => {
          setLoading(false);
          console.log('error', error);
          showSnackBar(error.message);
        },
      ),
    );
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

  const renderPhoneNumber = () => {
    return (
      <View style={styles.phoneNumber}>
        <Text style={styles.verify}>{Strings.enterSMSCode}</Text>
        <Text
          style={styles.phoneNumberText}>{`${countryCode} - ${phoneNo}`}</Text>
      </View>
    );
  };

  const onResetPress = () => {
    setLoading(true);
    CommonFunctions.signInWithPhoneNumber(
      phoneNo,
      countryCode,
      (confirmation: any) => {
        setLoading(false);
        setSecondsLeft(60);
        setEnableReset(false);
        setConfirm(confirmation);
      },
      (error: any) => {
        showSnackBar(error.message);
      },
    );
  };

  const renderOTPInput = () => {
    return (
      <View style={styles.numberView}>
        <OTPInputView
          style={styles.numberTextInput}
          pinCount={6}
          code={otp}
          onCodeChanged={(code: string) => {
            setOTP(code);
          }}
          autoFocusOnLoad={false}
          placeholderCharacter={'-'}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
        />
      </View>
    );
  };

  const renderSubmitButton = () => {
    return (
      <View style={styles.button}>
        <Button
          text={Strings.next}
          onPressButton={verifyOtp}
          textColor={Color.white}
          bgColor={Color.green}
          disable={false}
          style={{borderRadius: vh(20)}}
        />
      </View>
    );
  };

  const renderTimer = () => {
    return (
      <View style={styles.resendContainer}>
        {secondsLeft === 0 && (
          <TouchableOpacity
            disabled={!enableReset}
            activeOpacity={0.8}
            style={styles.resendBtn}
            onPress={onResetPress}>
            <Text style={[styles.resendBtnText]}>{Strings.Resend_Code}</Text>
          </TouchableOpacity>
        )}
        {secondsLeft !== 0 && (
          <View style={styles.timer}>
            <Image
              source={LocalImages.clock}
              style={styles.clockIcon}
              resizeMode={'contain'}
            />
            <Text style={styles.clockText}>
              {clockify().displayMinute + ':' + clockify().displaySeconds}
            </Text>
          </View>
        )}
      </View>
    );
  };

  const renderLoader = () => isLoading && <Loader />;

  return (
    <ImageBackground source={LocalImages.background} style={styles.container}>
      <SafeAreaView style={styles.innerContainer}>
        {renderLogo()}
        {renderPhoneNumber()}
        {renderOTPInput()}
        {renderTimer()}
        {renderSubmitButton()}
        {renderLoader()}
      </SafeAreaView>
    </ImageBackground>
  );
}
