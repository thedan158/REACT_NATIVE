import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  SafeAreaView,
  Easing,
  Animated,
  LogBox,
  Image,
} from 'react-native';

import {
  createStackNavigator,
  TransitionSpecs,
  HeaderStyleInterpolators,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import back from './assets/icons/search.png';

import { NavigationContainer } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import AccountForStaff from './screens/AccountForStaff';
import AccountForOwner from './screens/AccountForOwner';
import SplashScreen from './screens/SplashScreen';
import SignupScreen from './screens/SignupScreen';
import OnBoardingScreen from './screens/OnBoardingScreen';
import AppLoader from './screens/AppLoader';
import AppLoaderOwner from './screens/AppLoaderOwner';
import ForgotPassword from './screens/ForgotPassword';
import OTPsignup from './screens/OTPsignup';
import OTPforgotpass from './screens/OTPforgotpass';
import NewPassword from './screens/NewPassword';
import RestaurantInformation from './screens/RestaurantInformation';
import ChangeStaffPassword from './screens/ChangeStaffPassword';
import ChangeOwnerPassword from './screens/ChangeOwnerPassword';

import OrderScreen from './screens/OrderScreen';
import StarterMenuScreen from './screens/StarterMenuScreen';
import MainCourseMenuScreen from './screens/MainCourseMenuScreen';
import DrinkMenuScreen from './screens/DrinkMenuScreen';
import DesertMenuScreen from './screens/DesertMenuScreen';
import SelectedTable from './screens/SelectedTableScreen';

import CreateStaffAccount from './screens/CreateStaffAccount';
import RestaurantManagement from './screens/RestaurantManagement';
import TabForStaff from './custom component/TabForStaff';
import TabForOwner from './custom component/TabForOwner';
import TabForChef from './custom component/TabForChef';
import RePasswordSuccess from './screens/RePasswordSuccess';
import PermissionManager from './screens/PermissionManager';
import MenuScreen from './screens/MenuScreen';
import HomeScreen2ndFinal from './screens/HomeScreen2ndFinal';
import EditStaffProfile from './screens/EditStaffProfile';
import EditOwnerProfile from './screens/EditOwnerProfile';
import Button2Screen from './screens/Button2Screen';
import Button3Screen from './screens/Button3Screen';
import Button4Screen from './screens/Button4Screen';
import RestaurantKitchen from './screens/ReceiveOrder';
import AcceptedOrder from './screens/AcceptedOrder';
import CompletedOrder from './screens/CompletedOrder';
import OrderDetails from './custom component/OrderDetails';
import StaffInformation from './screens/StaffInformation';
import CheckOutTableScreen from './screens/CheckOutTableScreen';
import ListFood from './screens/ListFood';
import ListFoodDetails from './screens/ListFoodDetails';
import Analytics from './screens/Analytics';

const Stack = createStackNavigator();
// animation function
const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 250,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const closeConfig = {
  animation: 'timing',
  config: {
    duration: 200,
    easing: Easing.linear,
    toValue: 200,
  },
};

const customTransition = {
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
          {
            rotate: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: ['180deg', '0deg'],
            }),
          },
          {
            scale: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.7],
                })
              : 1,
          },
        ],
      },
      opacity: current.opacity,
    };
  },
};
// end animation function

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      >
        
        <Stack.Screen
          options={{ headerShown: false }}
          name="SplashScreen"
          component={SplashScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}

          name="OTPsignup"
          component={OTPsignup}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="ListFood"
          component={ListFood}
        />



        <Stack.Screen
          options={{ headerShown: false }}
          name="TabForOwner"
          component={TabForOwner}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Analytics"
          component={Analytics}
        />

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="AccountForStaff"
          component={AccountForStaff}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          name="ListFoodDetails"
          component={ListFoodDetails}
          options={{
            headerShown: false,
            gestureDirection: 'vertical',
            transitionSpec: {
              open: config,
              close: closeConfig,
            },
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
          }}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="CheckOutTableScreen"
          component={CheckOutTableScreen}
        />

        <Stack.Screen
          name="StaffInformation"
          component={StaffInformation}
          options={{ ...customTransition, headerShown: false }}
        />
        <Stack.Screen
          name="RestaurantManagement"
          options={{ headerShown: false }}
          component={RestaurantManagement}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="OnBoardingScreen"
          component={OnBoardingScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="AcceptedOrder"
          component={AcceptedOrder}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="CompletedOrder"
          component={CompletedOrder}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="OrderDetails"
          component={OrderDetails}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="RestaurantKitchen"
          component={RestaurantKitchen}
        />
        
        <Stack.Screen
          options={{ headerShown: false }}
          name="HomeScreen2ndFinal"
          component={HomeScreen2ndFinal}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="MenuScreen"
          component={MenuScreen}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="Button2Screen"
          component={Button2Screen}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="Button3Screen"
          component={Button3Screen}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="Button4Screen"
          component={Button4Screen}
        />
        
         <Stack.Screen
          options={{ headerShown: false }}
          name="Order"
          component={OrderScreen}
        />
            
        <Stack.Screen
          options={{ headerShown: false }}
          name="AppLoader"
          component={AppLoader}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="AppLoaderOwner"
          component={AppLoaderOwner}
        />

        <Stack.Screen
          options={{
            headerShown: false,
            gestureDirection: 'horizontal',
            transitionSpec: {
              open: config,
              close: closeConfig,
            },
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
          name="EditStaffProfile"
          component={EditStaffProfile}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            gestureDirection: 'horizontal',
            transitionSpec: {
              open: config,
              close: closeConfig,
            },
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
          name="EditOwnerProfile"
          component={EditOwnerProfile}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="AccountForOwner"
          component={AccountForOwner}
        />

        <Stack.Screen
          name="ChangeStaffPassword"
          options={{
            headerShown: false,
            gestureDirection: 'horizontal',
            transitionSpec: {
              open: config,
              close: closeConfig,
            },
            cardStyleInterpolator:
              CardStyleInterpolators.forModalPresentationIOS,
          }}
          component={ChangeStaffPassword}
        />
        <Stack.Screen
          name="ChangeOwnerPassword"
          options={{
            headerShown: false,
            gestureDirection: 'horizontal',
            transitionSpec: {
              open: config,
              close: closeConfig,
            },
            cardStyleInterpolator:
              CardStyleInterpolators.forModalPresentationIOS,
          }}
          component={ChangeOwnerPassword}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="Signup"
          component={SignupScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="TabForChef"
          component={TabForChef}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="TabForStaff"
          component={TabForStaff}
        />

        <Stack.Screen
          name="CreateStaffAccount"
          component={CreateStaffAccount}
          options={{
            headerShown: false,
            gestureDirection: 'horizontal',
            transitionSpec: {
              open: config,
              close: closeConfig,
            },
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          }}
        />
        <Stack.Screen
          name="PermissionManager"
          component={PermissionManager}
          options={{
            headerShown: false,
            gestureDirection: 'vertical',
            transitionSpec: {
              open: config,
              close: closeConfig,
            },
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="ForgotPassword"
          component={ForgotPassword}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="OTPforgotpass"
          component={OTPforgotpass}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="NewPassword"
          component={NewPassword}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="RePasswordSuccess"
          component={RePasswordSuccess}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="RestaurantInformation"
          component={RestaurantInformation}
        />


        <Stack.Screen
          options={{ headerShown: false }}
          name="StarterMenu"
          component={StarterMenuScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="MainMenu"
          component={MainCourseMenuScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="DrinkMenu"
          component={DrinkMenuScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="DesertMenu"
          component={DesertMenuScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SelectedTable"
          component={SelectedTable}
        />
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
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
