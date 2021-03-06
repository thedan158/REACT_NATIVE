import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { SafeAreaView } from 'react-native-safe-area-context';
import logo from '../assets/images/logo_app.png';
import InputText from '../custom component/InputText';
import eye from '../assets/icons/eye-green.png';
import hidden from '../assets/icons/closed-eyes-green.png';
import Colors from '../assets/Colors';
import background from '../assets/images/background.png';
import OwnerScreen from '../custom component/OwnerScreen';
import CustomModal from '../custom component/CustomModal';
import back from '../assets/icons/back-green.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import LoadingOwner from '../custom component/LoadingOwner';
import { useSelector } from 'react-redux';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ChangePassword = () => {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [isSecureEntryConfirm, setIsSecureEntryConfirm] = useState(true);
  const [visible, setVisible] = React.useState(false);
  const [visibleLoad, setVisibleLoad] = React.useState(false);
  const theme = useSelector((state) => state.themeReducer.theme);

  // function close LoadingOwner and open CustomModal when timePassed is true
  const loadingAndPopup = () => {
    setVisibleLoad(true);
    setTimeout(() => {
      setVisibleLoad(false);
      setVisible(true);
    }, 2000);
  };
  const handleChangePassword = async () => {
    console.log('Change password');
    const userLoginData = await AsyncStorage.getItem('userLoginData');
    const user = JSON.parse(userLoginData);
    console.log('username: ' + user.username);
    if (password !== confirmPassword) {
      Alert.alert('Password not match');
      return;
    }
    const res = await axios.put(
      `https://foody-uit.herokuapp.com/auth/changePassword`,
      {
        username: user.username,
        oldPassword: oldPassword,
        newPassword: password,
        confirmPassword: confirmPassword,
      }
    );
    const { success } = res.data;
    console.log('Correct account ' + success);
    if (!success) {
      Alert.alert(
        'Error',
        'Failed to changed password, please ensure your information is correct'
      );
      return;
    }

    loadingAndPopup();
  };
  return (
    <ScrollView>
      <OwnerScreen>
        <View style={styles.container}>
          {/* Logo and title  */}
          <View style={styles.view1}>
            <View>
              <Image style={styles.logo} source={logo}></Image>
            </View>
            <View>
              <Text
                style={[
                  styles.textPleaseRegister,
                  { color: theme.PRIMARY_TEXT_COLOR },
                ]}
              >
                Reset new password
              </Text>
            </View>
          </View>

          {/* Input section  */}
          <View style={styles.view2}>
            <View>
              <InputText
                blurColor={Colors.secondary}
                label="Old Password"
                placeholder="Old Password"
                value={oldPassword}
                onChangeText={(text) => setOldPassword(text)}
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
              <InputText
                blurColor={Colors.secondary}
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
              <InputText
                blurColor={Colors.secondary}
                label="Confirm password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
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
              />
            </View>

            {/* Button reset password  */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handleChangePassword}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Reset password</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Modal loading  */}
          <LoadingOwner visible={visibleLoad}></LoadingOwner>
          {/* Modal  */}
          <CustomModal visible={visible}>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../assets/icons/password-green.png')}
                style={{ height: 150, width: 150, marginVertical: 30 }}
              />
            </View>

            <Text
              style={{ marginVertical: 30, fontSize: 20, textAlign: 'center' }}
            >
              Your password has been reset successfully
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login');
                setVisible(false);
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </CustomModal>
        </View>
      </OwnerScreen>
    </ScrollView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: windowHeight,
    width: windowWidth,
  },
  inputContainer: {
    width: 300,
    height: 55,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 13,
  },

  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  view2: {
    flex: 7,
    marginTop: 40,
  },
  view1: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 3,
  },

  button: {
    backgroundColor: Colors.secondary,
    width: '100%',
    padding: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: Colors.secondary,
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: Colors.secondary,
    fontWeight: '700',
    fontSize: 16,
  },
  newOwnerText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'normal',
  },

  // container:{
  //     flex:1,
  //     backgroundColor:'#F2F2F2'
  // },

  textPleaseRegister: {
    position: 'relative',
    top: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },

  logo: {
    height: 160,
    width: 170,
    position: 'relative',
    top: 5,
    marginTop: 25,
  },

  textView: {
    flex: 0.12,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },

  textLabel: {
    fontSize: 15,
    marginTop: 15,
    marginBottom: 15,
  },
  registerText: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
  },
  forgotPassword: {
    color: Colors.secondary,
    fontWeight: '700',
    fontSize: 16,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 15,
    textAlign: 'center',
    color: '#9B9B9B',
  },
});
