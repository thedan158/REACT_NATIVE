import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import { Path } from 'react-native-svg';
import Svg from 'react-native-svg';
import HomeScreen from '../screens/HomeScreen2ndFinal';
import OrderScreen from '../screens/OrderScreen';
import RestaurantManagement from '../screens/RestaurantManagement';
import SelectedTable from '../screens/SelectedTableScreen';
import order from '../assets/icons/order.png';
import home from '../assets/icons/home.png';
import account from '../assets/icons/user.png';
import cash from '../assets/icons/cash.png';
import queen from '../assets/icons/queen.png';
import AccountForOwner from '../screens/AccountForOwner';
import BillScreen from '../screens/BillScreen';
import BillScreenForOwner from '../screens/BillScreenForOwner';

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({ accessibilityState, children, onPress }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center'}}>
      <View style={{ flexDirection: 'row', position: 'absolute', top: 0 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
          }}
        ></View>
        <Svg width={69} height={57} viewBox="0 0 75 61">
          <Path
            d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
            fill={'white'}
          />
        </Svg>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
          }}
        ></View>
      </View>

      <TouchableOpacity
        style={{
          top: -22.5,
          justifyContent: 'center',
          alignItems: 'center',
          width: 60,
          height: 60,
          borderRadius: 40,
          backgroundColor: '#4FA987',
        }}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
    </View>
  );
};

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: 'relative',
          left: 0,
          bottom: 0,
          right: 0,

          backgroundColor: '#FFFFFF',
          elevation: 0,
          height: 60,

          borderTopWidth: 0.2,
          borderTopColor: '#ced4da',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,

          tabBarIcon: ({ focused }) => (
            <Image
              source={home}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? '#4FA987' : '#CDCDD2',
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Order"
        component={OrderScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={order}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? '#4FA987' : '#CDCDD2',
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="RestaurantManagement"
        component={RestaurantManagement}
        options={{
          headerShown: false,

          tabBarIcon: ({ focused }) => (
            <Image
              source={queen}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? 'white' : 'white',
              }}
            />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />

      <Tab.Screen
        name="Bill"
        component={BillScreenForOwner}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={cash}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? '#4FA987' : '#CDCDD2',
              }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Account"
        component={AccountForOwner}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={account}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? '#4FA987' : '#CDCDD2',
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

