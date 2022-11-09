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
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { SafeAreaView } from 'react-native-safe-area-context';
import logo from '../../../../assets/images/logo_app.png';
import CustomTextInput from '../../../../custom component/CustomTextInput';
import background from '../../../../assets/images/background.png';
import Colors from '../../../../assets/Colors';
import validate from '../../../../assets/validate';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const ForgotPassword = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation();
  const [phoneError, setPhoneError] = React.useState('');

  function isEnableGetCode() {
    return phoneNumber !== '' && phoneError == '';
  }

  // *Region for OnPress Login
  const handleForgotPassword = async () => {
    console.log('+84' + phoneNumber);
    await AsyncStorage.setItem('userPhone', phoneNumber);
    const res = await axios.post(
      `https://foody-uit.herokuapp.com/otp/sendOtp`,
      {
        phoneNumber: '+84' + phoneNumber,
      }
    );
    const { success } = res.data;
    console.log(success);
    if (success) {
      navigation.navigate('OTPforgotpass');
    } else {
      Alert.alert('Invailid Phone Number');
    }
  };
  // *End Region

  return (
    <ScrollView>
      <View style={styles.container}>
        <ImageBackground
          source={background}
          resizeMode="cover"
          style={{ flex: 1 }}
        >
          {/* Logo  and title*/}
          <View style={styles.view1}>
            <View>
              <Image style={styles.logo} source={logo}></Image>
            </View>

            <View>
              <Text style={styles.textPleaseRegister}>Password Recovery</Text>
            </View>
          </View>

          <View style={styles.view2}>
            {/* Subtitle  */}
            <View>
              <Text style={styles.subtitle}>
                Please enter your mobile number to recover your password
              </Text>

              {/* Input section  */}
              <View style={styles.inputContainer}>
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
                  label="Mobile number"
                />
              </View>
            </View>

            <View style={styles.view3}>
              {/* Button  */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  disabled={isEnableGetCode() ? false : true}
                  onPress={handleForgotPassword}
                  style={[
                    styles.button,
                    {
                      backgroundColor: isEnableGetCode()
                        ? Colors.primary
                        : '#FFB196',
                    },
                  ]}
                >
                  <Text style={styles.buttonText}>Get code</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

export default ForgotPassword;
