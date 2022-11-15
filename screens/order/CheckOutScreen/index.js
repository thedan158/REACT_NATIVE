import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  ImageBackground,
  Image,
} from 'react-native';
import React from 'react';
import styles from './style';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const imgTagSource = require('../../../assents/icons/Tag2.png');
const imgCloseSource = require('../../../assents/icons/close.png');

const CheckOutScreen = (item) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <ImageBackground source={imgTagSource} style={styles.imgTagSourceStyle}>
          <Text>{item.Name}</Text>
        </ImageBackground>

        <Image source={imgCloseSource} style={styles.imgCloseSourceStyle} />
      </View>
    </View>
  );
};

export default CheckOutScreen;
