import {
  View,
  Text,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import React, {useEffect} from 'react';
import Names from '../../utils/constants/componentNames';
import {StackActions, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import LocalImages from '../../utils/constants/localImages';
import Strings from '../../utils/constants/strings';
import Color from '../../utils/constants/color';
import Fonts from '../../utils/constants/fonts';
import {vh, vw} from '../../utils/Dimension';

export default function SplashScreen() {
  const {name} = useSelector((state: any) => state.authReducer);
  const navigation = useNavigation();
  useEffect(() => {
    console.log('Name is', name);
    setTimeout(() => {
      if (name === '') {
        navigation.dispatch(StackActions.replace(Names.Auth));
      } else {
        navigation.dispatch(StackActions.replace(Names.Chat));
      }
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ImageBackground source={LocalImages.background} style={styles.container}>
      <SafeAreaView style={styles.innerContainer}>
        <View style={styles.logoView}>
          <ImageBackground
            source={LocalImages.logoContainer}
            style={styles.logoImageCont}
            resizeMode={'contain'}>
            <Image
              source={LocalImages.logo}
              style={styles.logoImg}
              resizeMode={'contain'}
            />
          </ImageBackground>
          <Text style={styles.logoText}>{Strings.welcomeToWhatsapp}</Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.darkGrey,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImageCont: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: vh(117),
    width: vw(117),
  },
  logoImg: {},
  logoText: {
    color: Color.white,
    marginTop: vh(35),
    fontSize: vw(24),
    fontFamily: Fonts.Medium,
  },
});
