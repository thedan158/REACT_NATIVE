import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import { Path } from 'react-native-svg';
import Svg from 'react-native-svg';
import receive from '../assets/icons/receive-food.png';
import accepted from '../assets/icons/clock.png';
import completed from '../assets/icons/checked.png';
import ReceiveOrder from '../screens/ReceiveOrder';
import AcceptedOrder from '../screens/AcceptedOrder';
import CompletedOrder from '../screens/CompletedOrder';

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({ accessibilityState, children, onPress }) => {
  var isSelected = accessibilityState.selected;

  if (isSelected) {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', position: 'absolute', top: 0 }}>
          <View style={{ flex: 1, backgroundColor: 'white' }}></View>
          <Svg width={69} height={57} viewBox="0 0 75 61">
            <Path
              d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
              fill={'white'}
            />
          </Svg>
          <View style={{ flex: 1, backgroundColor: 'white' }}></View>
        </View>

        <TouchableOpacity
          style={{
            top: -22.5,
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: 'white',
          }}
          onPress={onPress}
        >
          {children}
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          height: 50,
          backgroundColor: 'white',
        }}
        activeOpacity={1}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
    );
  }
};

const CustomTabBar = (props) => {
  return (
    <View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 30,
          backgroundColor: 'transparent',
        }}
      ></View>
      <BottomTabBar {...props.props} />
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
          // Fix absolute to relative to make it a distance from view to tab

          position: 'relative',
          left: 0,
          bottom: 0,
          right: 0,
          borderTopWidth: 0,
          backgroundColor: 'transparent',
          elevation: 0,
          display: 'flex',
        },
      }}
      tabBar={(props) => <CustomTabBar props={props} />}
    >
      <Tab.Screen
        name="ReceiveOrder"
        component={ReceiveOrder}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={receive}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? '#FC6D3F' : '#CDCDD2',
              }}
            />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />

      <Tab.Screen
        name="AcceptedOrder"
        component={AcceptedOrder}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={accepted}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? '#FC6D3F' : '#CDCDD2',
              }}
            />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />

      <Tab.Screen
        name="CompletedOrder"
        component={CompletedOrder}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={completed}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? '#FC6D3F' : '#CDCDD2',
              }}
            />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
