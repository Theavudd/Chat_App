import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';
import DefaultValues from '../../utils/constants/defaultValues';

interface Props {
  Image: any;
  header: string;
  subHeader?: string;
  onPress: Function;
}

export default function SettingInnerTabs(props: Props) {
  return (
    <TouchableOpacity
      style={styles.innerSettingContainer}
      activeOpacity={DefaultValues.activeOpacity}
      onPress={props.onPress}>
      <View style={styles.settingTabIconCont}>
        <Image source={props.Image} style={styles.settingTabIcon} />
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.profileNameText}>{props.header}</Text>
        {props.subHeader && (
          <Text style={styles.profileStatusText} numberOfLines={1}>
            {props?.subHeader}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
