import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { SafeAreaView } from 'react-native-safe-area-context';
import logo from '../../../../assets/images/logo_app.png';
import CustomTextInput from '../../../../custom component/CustomTextInput';
import eye from '../../../../assets/icons/eye.png';
import hidden from '../../../../assets/icons/close-eye.png';
import Colors from '../../../../assets/Colors';
import background from '../../../../assets/images/background.png';
import validate from '../../../../assets/validate';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const NewPassword = () => {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [isSecureEntryConfirm, setIsSecureEntryConfirm] = useState(true);
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // *Region for OnPress Login
  const handleConfirmNewPassword = async () => {
    // console.log('Confirm New Password');
    // const data = {
    //   password: password,
    //   confirmPassword: confirmPassword,
    // };
    const numberValue = await AsyncStorage.getItem('userPhone');
    console.log('+84' + numberValue);
    if (password !== confirmPassword) {
      Alert.alert('Password not match');
      return;
    }
    const res = await axios.post(
      `https://foody-uit.herokuapp.com/auth/forgotPassword`,
      {
        phoneNumber: '0' + numberValue,
        newPassword: password,
      }
    );
    const { success } = res.data;
    console.log(success);
    if (!success) {
      Alert.alert('Error occur! Please try again');
      return;
    }
    navigation.navigate('RePasswordSuccess');
  };
  // *End Region

  function isEnable() {
    return (
      password !== '' && confirmPassword !== '' && password === confirmPassword
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView>
        <ImageBackground
          source={background}
          resizeMode="cover"
          style={{ flex: 1 }}
        >
          <View style={styles.container}>
            {/* Logo and title  */}
            <View style={styles.view1}>
              <View>
                <Image style={styles.logo} source={logo}></Image>
              </View>
              <View>
                <Text style={styles.textPleaseRegister}>
                  Reset new password
                </Text>
              </View>
            </View>

            {/* Input section  */}
            <View style={styles.view2}>
              <View>
                <CustomTextInput
                  blurColor={Colors.primary}
                  label="Password"
                  placeholder="Password"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry={isSecureEntry}
                  icon={
                    <TouchableOpacity
                      onPress={() => {
                        setIsSecureEntry((prev) => !prev);
                      }}
                    >
                      <Image
                        source={isSecureEntry ? hidden : eye}
                        style={{ width: 25, height: 25 }}
                      ></Image>
                    </TouchableOpacity>
                  }
                  iconPosition="right"
                />
                <CustomTextInput
                  blurColor={Colors.primary}
                  label="Confirm password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text),
                      validate.validatePasswordConfirm(
                        text,
                        password,
                        setConfirmPasswordError
                      );
                  }}
                  secureTextEntry={isSecureEntryConfirm}
                  icon={
                    <TouchableOpacity
                      onPress={() => {
                        setIsSecureEntryConfirm((prev) => !prev);
                      }}
                    >
                      <Image
                        source={isSecureEntryConfirm ? hidden : eye}
                        style={{ width: 25, height: 25 }}
                      ></Image>
                    </TouchableOpacity>
                  }
                  iconPosition="right"
                  error={confirmPasswordError}
                />
              </View>

              {/* Button reset password  */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  disabled={isEnable() ? false : true}
                  onPress={handleConfirmNewPassword}
                  style={[
                    styles.button,
                    {
                      backgroundColor: isEnable() ? Colors.primary : '#FFB196',
                    },
                  ]}
                >
                  <Text style={styles.buttonText}>Reset password</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default NewPassword;
