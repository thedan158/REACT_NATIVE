import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import StaffScreen from './StaffScreen';
import report from '../assets/icons/report.png';
import { useNavigation } from '@react-navigation/core';

const OrderDetails = () => {
  const navigation = useNavigation();
  return (
    <StaffScreen title={'Order'} icon={report} previousScreen={'Login'}>
      <View>
        <Text>abc</Text>
      </View>
    </StaffScreen>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({});
