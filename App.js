import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Platform, SafeAreaView, Easing, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SplashScreen from './screens/SplashScreen';
import SignupScreen from './screens/SignupScreen';
import OrderScreen from './screens/OrderScreen';
import StarterMenuScreen from './screens/StarterMenuScreen';
import MainCourseMenuScreen from './screens/MainCourseMenuScreen';
import DrinkMenuScreen from './screens/DrinkMenuScreen';
import DesertMenuScreen from './screens/DesertMenuScreen';
import SelectedTable from './screens/SelectedTableScreen';

import { createStackNavigator, TransitionSpecs, HeaderStyleInterpolators, CardStyleInterpolators } from "@react-navigation/stack";

const Stack = createNativeStackNavigator();



export default function App() {
  return (
        <NavigationContainer>
      <Stack.Navigator>
        
        
        <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
        <Stack.Screen options={{headerShown: false}} name="Order" component={OrderScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen options={{headerShown: false}} name="StarterMenu" component={StarterMenuScreen} />
        <Stack.Screen options={{headerShown: false}} name="MainMenu" component={MainCourseMenuScreen} />
        <Stack.Screen options={{headerShown: false}} name="DrinkMenu" component={DrinkMenuScreen} />
        <Stack.Screen options={{headerShown: false}} name="DesertMenu" component={DesertMenuScreen} />
        <Stack.Screen options={{headerShown: false}} name="SelectedTable" component={SelectedTable} />
        
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
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
});
