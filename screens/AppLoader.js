import React, { useState } from 'react';
import { Button, StyleSheet, View, Dimensions, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import Colors from '../assets/Colors';

const AppLoader = ({ navigation }) => {
  const [timePassed, setTimePassed] = useState(false);

  // Set time end animation
  setTimeout(function () {
    setTimePassed(true);
  }, 5000);

  if (!timePassed) {
    return (
      <View style={[StyleSheet.absoluteFillObject, styles.animationContainer]}>
        {/* Animation  */}
        <LottieView
          style={{
            width: 200,
            height: 200,
          }}
          source={require('../assets/json/abcd.json')}
          loop={true}
          autoPlay
        />

        {/* Text Loading  */}

        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={styles.text}>Loading </Text>
          <Text style={styles.dot}>...</Text>
        </View> */}

        <LottieView
          style={{
            width: 300,
            height: 150,
          }}
          source={require('../assets/json/loading-text.json')}
          loop={true}
          autoPlay
        />
      </View>
    );
  }
  navigation.navigate('TabForStaff');
  return null;
};

export default AppLoader;

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  text: {
    lineHeight: 60,
    fontSize: 25,
    color: Colors.primary,

    fontWeight: 'bold',
  },
  dot: {
    lineHeight: 40,
    fontSize: 60,
    color: Colors.primary,

    fontWeight: 'bold',
  },
});
