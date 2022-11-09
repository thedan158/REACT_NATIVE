import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import StaffManagement from '../../staffmanagement/StaffManagementScreen/index';
import Analytics from '../../analytics/AnalyticsScreen';
import { useSelector } from 'react-redux';
import Colors from '../../../../assets/Colors';
import styles from './style';

const RestaurantManagement = () => {
  const Tab = createMaterialTopTabNavigator();
  const theme = useSelector((state) => state.themeReducer.theme);

  return (
    <View style={{ flex: 1 }}>
      {/* Title  */}
      <View
        style={[
          styles.viewText,
          { backgroundColor: theme.mode === 'light' ? 'white' : '#1D1D1D' },
        ]}
      >
        <Text style={styles.text}>Your Restaurant</Text>
      </View>

      {/* Top tab bar  */}
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
          tabBarStyle: {
            backgroundColor: theme.mode === 'light' ? 'white' : '#1D1D1D',
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          },
          tabBarPressColor: theme.mode === 'light' ? 'white' : '#1D1D1D',
          tabBarActiveTintColor: Colors.secondary,
          tabBarInactiveTintColor: theme.PRIMARY_TEXT_COLOR,
          tabBarIndicatorStyle: {
            height: 4,
            backgroundColor: Colors.secondary,
            borderRadius: 40,
            width: 110,
            marginLeft: 43,
          },
          tabBarIndicatorContainerStyle: {
            justifyContent: 'center',
            alignItems: 'center',
          },
          tabBarShowLabel: 'true',
        }}
        style={{ backgroundColor: theme.PRIMARY_BACKGROUND_COLOR }}
      >
        <Tab.Screen component={StaffManagement} name="Staffs" />
        <Tab.Screen component={Analytics} name="Analytics" />
      </Tab.Navigator>
    </View>
  );
};

export default RestaurantManagement;
