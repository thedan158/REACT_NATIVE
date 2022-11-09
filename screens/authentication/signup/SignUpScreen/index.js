import {
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Alert,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';
import logo from '../../../../assets/images/logo_app.png';
import { TextInput } from 'react-native-gesture-handler';
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
const SignupScreen = () => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [phoneError, setPhoneError] = React.useState('');
  const navigation = useNavigation();

  function isEnableSignup() {
    return (
      fullName !== '' &&
      phoneNumber !== '' &&
      username !== '' &&
      password !== '' &&
      phoneError == ''
    );
  }

  // *Region for OnPress Signup
  const handleSignup = async () => {
    console.log('Signup');
    const usernameCheckRes = await axios
      .get(`https://foody-uit.herokuapp.com/auth/checkUsername/${username}`)
      .catch((err) => {
        Alert.alert('Error', 'Username is already exist');
      });
    const successName = usernameCheckRes.data.success;
    console.log('valid username:' + successName);
    if (!successName) {
      Alert.alert('Username is already used');
      return;
    }
    const phoneCheckRes = await axios
      .get(
        `https://foody-uit.herokuapp.com/auth/checkPhoneNumber/${phoneNumber}`
      )
      .catch((err) => {
        Alert.alert('Error', 'Phone number is already exist');
      });
    const successPhone = phoneCheckRes.data.success;
    console.log('valid phone:' + successPhone);
    if (!successPhone) {
      Alert.alert('Phone number is already used');
      return;
    }
    const data = {
      fullname: fullName,
      phoneNumber: phoneNumber,
      password: password,
      username: username,
    };
    console.log(data);
    console.log('+84' + phoneNumber.substring(1));
    navigation.navigate('OTPsignup');
    const res = await axios.post(
      `https://foody-uit.herokuapp.com/otp/sendOtp`,
      {
        phoneNumber: '+84' + phoneNumber.substring(1),
      }
    );
    const { success } = res.data;
    console.log(success);
    await AsyncStorage.setItem('userInfo', JSON.stringify(data));
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <ImageBackground
          source={background}
          resizeMode="cover"
          style={{ flex: 1 }}
        >
          {/* Logo and title */}
          <View style={styles.view1}>
            <View>
              <Image style={styles.logo} source={logo}></Image>
            </View>
            <Text style={styles.textPleaseRegister}>
              Register your information
            </Text>
          </View>

          {/* Input section  */}
          <View style={styles.view2}>
            <View></View>
            <View>
              {/* Full name input */}

              <CustomTextInput
                blurColor={Colors.primary}
                value={fullName}
                onChangeText={(text) => setFullName(text)}
                placeholder="Full Name"
              />
            </View>

            {/* Mobile number input */}
            <View style={{ marginTop: -15 }}>
              <CustomTextInput
                blurColor={Colors.primary}
                value={phoneNumber}
                onChangeText={(text) => {
                  setPhoneNumber(text),
                    validate.validatePhone(text, setPhoneError);
                }}
                keyboardType="decimal-pad"
                placeholder="Mobile Number"
                error={phoneError}
              />
            </View>

            {/* Username */}
            <View style={{ marginTop: -15 }}>
              <CustomTextInput
                blurColor={Colors.primary}
                value={username}
                onChangeText={(text) => setUsername(text)}
                placeholder="Username"
              />
            </View>
            {/* Password */}
            <View style={{ marginTop: -15 }}>
              <CustomTextInput
                blurColor={Colors.primary}
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholder="Password"
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
            </View>
          </View>

          <View style={styles.view3}>
            {/* Sign-up button */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                disabled={isEnableSignup() ? false : true}
                onPress={handleSignup}
                style={[
                  styles.button,
                  {
                    backgroundColor: isEnableSignup()
                      ? Colors.primary
                      : '#FFB196',
                  },
                ]}
              >
                <Text style={styles.buttonText}>Sign-up</Text>
              </TouchableOpacity>
            </View>

            {/* Login  */}
            <View style={styles.registerText}>
              <Text style={styles.ownerText}>Already an Owner? </Text>

              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginText}> Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

export default SignupScreen;
