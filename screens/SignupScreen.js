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
import logo from '../assets/images/logo_app.png';
import { TextInput } from 'react-native-gesture-handler';
import CustomTextInput from '../custom component/CustomTextInput';
import eye from '../assets/icons/eye.png';
import hidden from '../assets/icons/close-eye.png';
import Colors from '../assets/Colors';
import background from '../assets/images/background.png';
import validate from '../assets/validate';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    const data = {
      fullname: fullName,
      phoneNumber: phoneNumber,
      password: password,
      username: username,
    };
    console.log(data);
    await AsyncStorage.setItem('userInfo', JSON.stringify(data));
    navigation.navigate('OTPsignup');
    const res = await axios.post(
      `https://foody-uit.herokuapp.com/otp/sendOtp`,
      {
        phoneNumber: '+84' + phoneNumber.substring(1),
      }
    );
    const { success } = res.data;
    console.log(success);
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    width: windowWidth,
    height: windowHeight,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#FA4A0C',
    width: '80%',
    padding: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  view1: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 3,
  },

  view2: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 5,
  },
  view3: {
    flex: 2,
  },

  textPleaseRegister: {
    position: 'relative',

    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  logo: {
    height: 160,
    width: 170,
    position: 'relative',

    marginTop: 25,
  },

  textView: {
    flex: 0.12,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },

  loginBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    top: 30,
    left: 10,
  },

  loginText: {
    color: '#FA4A0C',
    fontWeight: '700',
    fontSize: 16,
  },

  ownerText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'normal',
  },

  signupBox: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    right: 15,
  },

  rectangle: {
    width: 130,
    height: 3,
    backgroundColor: '#FA4A0C',
    position: 'relative',
    bottom: -9,
  },

  signupText: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  registerText: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
  },

  fullNameBox: {
    width: 300,
    height: 55,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 13,
  },

  fullNameText: {
    fontSize: 15,
    marginLeft: 30,
  },

  passwordBox: {
    width: 300,
    height: 55,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    marginTop: 25,
  },

  textSignupButton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
