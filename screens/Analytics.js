import { StyleSheet, Text, View, Image,TouchableOpacity, Button, ImageBackground } from 'react-native'
import React from 'react'
import CustomModal from '../custom component/CustomModal'
import { useNavigation } from '@react-navigation/core';
import image from '../assets/images/background.png'

const Analytics = () => {
  
  return (
    <View style={styles.container}>
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <Text style={styles.text}>Inside</Text>
    </ImageBackground>
  </View>
);
  
}

export default Analytics

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0"
  }
})