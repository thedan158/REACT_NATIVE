import React, { useState } from 'react';
import {
  Button,
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  Image,
} from 'react-native';
import LottieView from 'lottie-react-native';
import background from '../../../assets/images/background.png';
import logo from '../../../assets/images/logo_app.png';
import styles from './style';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const SplashScreen = ({ navigation }) => {
  const [timePassed, setTimePassed] = useState(false);

  setTimeout(function () {
    setTimePassed(true);
  }, 4000);

  if (!timePassed) {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={background}
          resizeMode="cover"
          style={{ flex: 1 }}
        >
          <Image
            source={logo}
            style={{
              height: 210,
              width: 225,
              alignSelf: 'center',
              marginTop: '40%',
            }}
          />
          <LottieView
            style={{
              width: 300,
              height: 200,
              marginTop: 30,
              alignSelf: 'center',
            }}
            source={require('../../../assets/json/loading%.json')}
            loop={false}
            autoPlay
          />
        </ImageBackground>
      </View>
    );
  }
  navigation.replace('OnBoardingScreen');
  return null;
};

export default SplashScreen;
