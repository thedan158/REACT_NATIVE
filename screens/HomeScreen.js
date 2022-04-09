import { StyleSheet, Dimensions, TouchableOpacity, ScrollView, Text, View } from 'react-native'
import React, { Component } from 'react'


const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;


const HomeScreen = () => {
  return (
    <View style={{backgroundColor:'gray', flex:1}}>
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})