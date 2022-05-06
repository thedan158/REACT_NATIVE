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
import background from '../assets/images/background.png';
import logo from '../assets/images/logo_app.png';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const SplashScreen = ({ navigation }) => {
  const [timePassed, setTimePassed] = useState(false);

  setTimeout(function () {
    setTimePassed(true);
  }, 3500);

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
              height: 200,
              width: 200,
              alignSelf: 'center',
              marginTop: '40%',
            }}
          />
          <LottieView
            style={{
              width: 200,
              height: 200,
              alignSelf: 'center',
            }}
            source={require('../assets/json/abc.json')}
            loop={true}
            autoPlay
          />
        </ImageBackground>
      </View>
    );
  }
  navigation.navigate('OnBoardingScreen');
  return null;
};

export default SplashScreen;

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    height: windowHeight,
    width: windowWidth,
  },
});
