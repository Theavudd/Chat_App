import React from 'react';
import {Image, View} from 'react-native';
import {Bubble, Composer, Send} from 'react-native-gifted-chat';
import Color from '../../../utils/constants/color';
import LocalImages from '../../../utils/constants/localImages';
import {vw} from '../../../utils/Dimension';
import {styles} from './styles';

export const renderScrolToBottom = () => {
  return <Image source={LocalImages.arrow_Down} style={styles.arrowDown} />;
};
export const _renderSend = (props: any) => {
  return (
    <Send containerStyle={styles.sendButtonContainer} {...props}>
      <View style={styles.sendButtonContainer}>
        <Image
          source={LocalImages.sendButton}
          style={styles.sendButton}
          resizeMode={'contain'}
        />
      </View>
    </Send>
  );
};

export const renderBubble = (props: any) => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          marginRight: vw(5),
          backgroundColor: '#4FBC87',
        },
        left: {
          marginLeft: vw(5),
          backgroundColor: '#EFEEF4',
        },
      }}
    />
  );
};

export const _renderComposer = (props: any) => {
  return (
    <Composer
      {...props}
      placeholderTextColor={Color.lightGrey}
      textInputStyle={styles.textInputStyle}
    />
  );
};
