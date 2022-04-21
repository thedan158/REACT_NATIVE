import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

const SplashScreen = ({ navigation }) => {
  const [timePassed, setTimePassed] = useState(false);

  setTimeout(function () {
    setTimePassed(true);
  }, 3500);

  if (!timePassed) {
    return (
      <View style={styles.animationContainer}>
        <LottieView
          style={{
            width: 380,
            height: 'auto',
            backgroundColor: '#eee',
          }}
          source={require('../assets/json/data.json')}
          loop={false}
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
