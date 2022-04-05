import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Easing, StyleSheet, Text, View, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SplashScreen from './screens/SplashScreen';
import SignupScreen from './screens/SignupScreen';
import ForgotPassword from './screens/ForgotPassword';
import OTP from './screens/OTP';
import NewPassword from './screens/NewPassword';
import RestaurantInformation from './screens/RestaurantInformation';

const Stack = createNativeStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen options={{headerShown: false}} name="Signup" component={SignupScreen} />
        <Stack.Screen options={{headerShown: false}} name="ForgotPassword" component={ForgotPassword}/>
        <Stack.Screen options={{headerShown: false}} name="OTP" component={OTP}/>
        <Stack.Screen options={{headerShown: false}} name="NewPassword" component={NewPassword}/>
        <Stack.Screen options={{headerShown: false}} name="RestaurantInformation" component={RestaurantInformation}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
