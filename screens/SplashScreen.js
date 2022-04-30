import React, { useState } from 'react';
import { Button, StyleSheet, View, Dimensions } from 'react-native';
import AnimatedLottieView from 'lottie-react-native';

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const SplashScreen = ({ navigation }) => {
  const [timePassed, setTimePassed] = useState(false);

  setTimeout(function () {
    setTimePassed(false);
  }, 3500);

  if (!timePassed) {
    return (
      <View style={styles.animationContainer}>
        <AnimatedLottieView
          style={{
            width: windowWidth,
            height: windowHeight,
          }}
          source={require('../assets/json/layer9.json')}
          loop={true}
          autoPlay
        />
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
});
