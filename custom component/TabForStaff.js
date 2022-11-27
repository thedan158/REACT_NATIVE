import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import { Path } from 'react-native-svg';
import Svg from 'react-native-svg';
import AccountForStaff from '../screens/settings/staff/AccountForStaffScreen/index';
import order from '../assets/icons/order.png';
import home from '../assets/icons/home.png';
import account from '../assets/icons/user.png';
import notification from '../assets/icons/notification.png';
import HomeScreen2ndFinal from '../screens/home/HomeScreen/index';
import { useSelector } from 'react-redux';
import NotificationScreen from '../screens/notifications/NotificationScreen';
import OrderScreenUpdate1 from '../screens/order/OrderScreenVer2';

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({ accessibilityState, children, onPress }) => {
  const theme = useSelector((state) => state.setting.theme);
  var isSelected = accessibilityState.selected;

  if (isSelected) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          // shadowColor: '#000',
          // shadowOffset: {
          //   width: 0,
          //   height: 2,
          // },
          // shadowOpacity: 0.25,
          // shadowRadius: 3.84,

          // elevation: 5,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            top: 0,
            // backgroundColor: '#e0e0e0',
            // shadowColor: '#000',
            // shadowOffset: {
            //   width: 0,
            //   height: 2,
            // },
            // shadowOpacity: 0.25,
            // shadowRadius: 3.84,

            // elevation: 5,
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: theme.mode === 'light' ? 'white' : '#3D3C3F',
              borderTopWidth: 0.2,
              borderTopColor: theme.mode === 'light' ? '#F3F3F3' : '#3D3C3F',
            }}
          ></View>
          <Svg width={69} height={57} viewBox="0 0 75 61">
            <Path
              d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
              fill={theme.mode === 'light' ? 'white' : '#3D3C3F'}
            />
          </Svg>
          <View
            style={{
              flex: 1,
              backgroundColor: theme.mode === 'light' ? 'white' : '#3D3C3F',
              borderTopWidth: 0.2,
              borderTopColor: theme.mode === 'light' ? '#F3F3F3' : '#3D3C3F',
            }}
          ></View>
        </View>

        <TouchableOpacity
          style={{
            top: -22.5,
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: theme.mode === 'light' ? 'white' : '#3D3C3F',

            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
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
          backgroundColor: theme.mode === 'light' ? 'white' : '#3D3C3F',
          borderTopWidth: 0.2,
          borderTopColor: theme.mode === 'light' ? '#F3F3F3' : '#3D3C3F',
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
          position: 'absolute',
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
        name="Home"
        component={HomeScreen2ndFinal}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={home}
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
        name="Search"
        component={OrderScreenUpdate1}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={order}
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
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={notification}
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
        name="User"
        component={AccountForStaff}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={account}
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
