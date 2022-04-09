import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Platform, SafeAreaView, Easing, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SplashScreen from './screens/SplashScreen';
import SignupScreen from './screens/SignupScreen';

import ForgotPassword from './screens/ForgotPassword';
import OTPsignup from './screens/OTPsignup';
import OTPforgotpass from './screens/OTPforgotpass';
import NewPassword from './screens/NewPassword';
import RestaurantInformation from './screens/RestaurantInformation';

import OrderScreen from './screens/OrderScreen';
import StarterMenuScreen from './screens/StarterMenuScreen';
import MainCourseMenuScreen from './screens/MainCourseMenuScreen';
import DrinkMenuScreen from './screens/DrinkMenuScreen';
import DesertMenuScreen from './screens/DesertMenuScreen';
import SelectedTable from './screens/SelectedTableScreen';

import { createStackNavigator, TransitionSpecs, HeaderStyleInterpolators, CardStyleInterpolators } from "@react-navigation/stack";
import CreateStaffAccount from './screens/CreateStaffAccount';
import RestaurantManagement from './screens/RestaurantManagement';
import Tab from './custom component/TabForStaff'
import tabBar from './custom component/TabForOwner'
import RePasswordSuccess from './screens/RePasswordSuccess';

const Stack = createNativeStackNavigator();



export default function App() {
  return (
        <NavigationContainer>
      <Stack.Navigator >
      <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />

      <Stack.Screen options={{headerShown: false}} name="Signup" component={SignupScreen} />
      <Stack.Screen options={{headerShown: false}} name="Tab" component={tabBar}/>

      <Stack.Screen options={{headerShown: false}} name="Dashboard" component={Tab} />


      <Stack.Screen name="RestaurantManagement" options={{headerShown: false}} component={RestaurantManagement} />
      <Stack.Screen name="CreateStaffAccount" options={{headerShown: false}} component={CreateStaffAccount} />

      


      <Stack.Screen options={{headerShown: false}} name="ForgotPassword" component={ForgotPassword}/>
      <Stack.Screen options={{headerShown: false}} name="OTPsignup" component={OTPsignup}/>
      <Stack.Screen options={{headerShown: false}} name="OTPforgotpass" component={OTPforgotpass}/>
      <Stack.Screen options={{headerShown: false}} name="NewPassword" component={NewPassword}/>
      <Stack.Screen options={{headerShown: false}} name="RePasswordSuccess" component={RePasswordSuccess}/>

      <Stack.Screen options={{headerShown: false}} name="RestaurantInformation" component={RestaurantInformation}/>
      <Stack.Screen options={{headerShown: false}} name="Order" component={OrderScreen} />




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
