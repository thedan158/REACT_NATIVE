import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import logo from '../../../../assets/images/logo_app.png';
import styles from './style';

const RePasswordSuccess = () => {
  const navigation = useNavigation();

  // *Region for OnPress Login
  const handleRePassword = () => {
    navigation.navigate('Login');
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Logo and title  */}
        <View style={styles.view1}>
          <View>
            <Image style={styles.logo} source={logo}></Image>
          </View>
          <View>
            <Text style={styles.textPleaseRegister}>Password Reset!</Text>
          </View>
        </View>

        {/* Notification  */}
        <View style={styles.view2}>
          <View>
            <Text style={styles.subtitle}>
              Your password has been reset, please login again!
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleRePassword} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default RePasswordSuccess;
