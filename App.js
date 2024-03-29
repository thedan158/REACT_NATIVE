import React from "react";
import { Easing, LogBox, ActivityIndicator, View, Text } from "react-native";

import {
  createStackNavigator,
  TransitionSpecs,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { Provider, useSelector } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./screens/authentication/login/LoginScreen/index";
import AccountForStaff from "./screens/settings/staff/AccountForStaffScreen/index";
import AccountForOwner from "./screens/settings/owner/AccountForOwnerScreen/index";
import SplashScreen from "./screens/onboarding/SplashScreen/index";
import SignupScreen from "./screens/authentication/signup/SignUpScreen/index";
import OnBoardingScreen from "./screens/onboarding/OnBoardingScreen/index";
import AppLoader from "./custom component/AppLoader";
import AppLoaderOwner from "./custom component/AppLoaderOwner";
import ForgotPassword from "./screens/authentication/forgotpassword/ForgotPasswordScreen/index";
import OTPsignup from "./screens/authentication/signup/OTPSignUpScreen/index";
import OTPforgotpass from "./screens/authentication/forgotpassword/OTPForgotPasswordScreen/index";
import NewPassword from "./screens/authentication/changepassword/NewPasswordScreen/index";
import RestaurantInformation from "./screens/management/restaurantmanagement/RestaurantInformationScreen/index";
import ChangeStaffPassword from "./screens/authentication/changepassword/ChangeStaffPasswordScreen/index";
import ChangeOwnerPassword from "./screens/authentication/changepassword/ChangeOwnerPasswordScreen/index";
import AddingMenuItemScreen from "./screens/order/AddingMenuItem";
import OrderScreen from "./screens/order/OrderScreen/index";
import StarterMenuScreen from "./screens/order/StarterMenuScreen/index";
import MainCourseMenuScreen from "./screens/order/MainCourseMenuScreen/index";
import DesertMenuScreen from "./screens/order/DesertMenuScreen/index";

import SelectedTable from "./screens/order/SelectTableScreen";

import EditMenuScreen from "./screens/order/EditMenuScreen/index";
import CreateStaffAccount from "./screens/management/staffmanagement/CreateStaffAccountScreen/index";
import RestaurantManagement from "./screens/management/restaurantmanagement/RestaurantManagementScreen/index";
import TabForStaff from "./custom component/TabForStaff";
import TabForOwner from "./custom component/TabForOwner";
import RePasswordSuccess from "./screens/authentication/changepassword/RePasswordSuccessScreen/index";
import PermissionManager from "./screens/management/staffmanagement/PermissionManagerScreen/index";
import MenuScreen from "./screens/home/MenuScreen/index";
import HomeScreen2ndFinal from "./screens/home/HomeScreen/index";
import EditStaffProfile from "./screens/settings/staff/EditStaffProfileScreen/index";
import EditOwnerProfile from "./screens/settings/owner/EditOwnerProfileScreen/index";
import StarterMenuHome from "./screens/home/StarterMenuHome/index";
import DesertAndDrinkMenuHome from "./screens/home/DesertAndDrinkMenuHome/index";
import OrderDetails from "./custom component/OrderDetails";
import StaffInformation from "./screens/management/staffmanagement/StaffInformationScreen/index";
import CheckOutTableScreen from "./screens/order/CheckOutTableScreen/index";
import Analytics from "./screens/management/analytics/AnalyticsScreen/index";
import EditResProfile from "./screens/management/restaurantmanagement/EditRestaurantProfileScreen/index";
import AddingTable from "./screens/order/AddingTable/index";
import BillScreenForOwner from "./screens/order/BillScreenForOwner/index";
import EditTableInfo from "./screens/order/EditTableInfo/index";
import NotificationScreen from "./screens/notifications/NotificationScreen";
import OrderScreenUpdate1 from "./screens/order/OrderScreenVer2/index";
import EditTableInfoScreenRework1 from "./screens/order/EditTableInfoScreenVer2/index";
import MenuOrderScreen from "./screens/order/MenuOrderScreen/index";
import store from "./app/store";

const Stack = createStackNavigator();
// animation function
const config = {
  animation: "spring",
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
  animation: "timing",
  config: {
    duration: 200,
    easing: Easing.linear,
    toValue: 200,
  },
};

const customTransition = {
  gestureEnabled: true,
  gestureDirection: "horizontal",
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
              outputRange: ["180deg", "0deg"],
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

function Navigation() {
  const state = useSelector((state) => state);
  console.log("current state", state);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: "horizontal",
        }}
      >
        <Stack.Screen
          options={{ headerShown: false }}
          name="SplashScreen"
          component={SplashScreen}
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
          name="TabForOwner"
          component={TabForOwner}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="MenuOrderScreen"
          component={MenuOrderScreen}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="TabForStaff"
          component={TabForStaff}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="OrderScreenUpdate1"
          component={OrderScreenUpdate1}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="EditTableInfoScreenRework1"
          component={EditTableInfoScreenRework1}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="NotificationScreen"
          component={NotificationScreen}
        />

        <Stack.Screen
          name="StaffInformation"
          component={StaffInformation}
          options={{ ...customTransition, headerShown: false }}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="AccountForOwner"
          component={AccountForOwner}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="OnBoardingScreen"
          component={OnBoardingScreen}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="RestaurantInformation"
          component={RestaurantInformation}
        />

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="AccountForStaff"
          component={AccountForStaff}
        />
        <Stack.Screen
          name="RestaurantManagement"
          options={{ headerShown: false }}
          component={RestaurantManagement}
        />

        <Stack.Screen
          options={{
            headerShown: false,
            gestureDirection: "horizontal",
            transitionSpec: {
              open: config,
              close: closeConfig,
            },
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
          name="EditRestaurantProfile"
          component={EditResProfile}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="OTPsignup"
          component={OTPsignup}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="Analytics"
          component={Analytics}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="CheckOutTableScreen"
          component={CheckOutTableScreen}
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
          name="EditMenuScreen"
          component={EditMenuScreen}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="AddingMenuItemScreen"
          component={AddingMenuItemScreen}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="StarterMenuHome"
          component={StarterMenuHome}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="DesertAndDrinkMenuHome"
          component={DesertAndDrinkMenuHome}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="AddingTable"
          component={AddingTable}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="EditTableInfo"
          component={EditTableInfo}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="BillScreenForOwner"
          component={BillScreenForOwner}
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
            gestureDirection: "horizontal",
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
            gestureDirection: "horizontal",
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
          name="ChangeStaffPassword"
          options={{
            headerShown: false,
            gestureDirection: "horizontal",
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
            gestureDirection: "horizontal",
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
          name="CreateStaffAccount"
          component={CreateStaffAccount}
          options={{
            headerShown: false,
            gestureDirection: "horizontal",
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
            gestureDirection: "vertical",
            transitionSpec: {
              open: config,
              close: closeConfig,
            },
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
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
function LoadingAnimation() {
  const loading = useSelector((state) => state.setting.loading);
  if (!loading) return null;
  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(100, 100, 100, 0.6)",
      }}
    >
      <ActivityIndicator color="#bb5533" size="large" />
      <Text
        style={{
          fontSize: 18,
          marginTop: 12,
        }}
      >
        Loading ...
      </Text>
    </View>
  );
}
export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
      {<LoadingAnimation />}
    </Provider>
  );
}
