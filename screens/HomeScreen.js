import { StyleSheet, Dimensions, TouchableOpacity, ScrollView, Text, View } from 'react-native'
import React, { Component } from 'react'
import CustomModal from '../custom component/CustomModal';
import { useNavigation } from '@react-navigation/core'


const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;


const HomeScreen = () => {
  const navigation = useNavigation()

  return (
    
    <View style={styles.container}>
      <Text>ABC</Text>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container:{
    flex:0.8,
    backgroundColor:'red'
  }
})