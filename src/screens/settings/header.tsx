import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import BackHeader from '../../components/backHeader';
import DefaultValues from '../../utils/constants/defaultValues';
import LocalImages from '../../utils/constants/localImages';
import Strings from '../../utils/constants/strings';
import styles from './styles';

export default function Header() {
  return (
    <View>
      <BackHeader style={styles.backHeader} backButton={true} />
      <View style={styles.subHeader}>
        <Text style={styles.yourProfileText}>{Strings.yourProfile}</Text>
        <TouchableOpacity
          style={styles.qrImageContainer}
          activeOpacity={DefaultValues.activeOpacity}>
          <Image
            source={LocalImages.qrCode}
            style={styles.qrImage}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
