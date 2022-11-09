import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  ImageBackground,
  Image,
} from 'react-native';
import React from 'react';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const imgTagSource = require('../../assents/icons/Tag2.png');
const imgCloseSource = require('../../assents/icons/close.png');

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    height: windowHeight - '10%',
  },
  containerHeader: {
    flex: 1,
    flexDirection: 'row',
    maxWidth: '90%',
  },
  imgTagSourceStyle: {
    position: 'absolute',
    zIndex: 1,
    flex: 4,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
    alignContent: 'center',
  },
  imgCloseSourceStyle: {
    flex: 1,
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
});
