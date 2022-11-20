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
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { SafeAreaView } from 'react-native-safe-area-context';
import logo from '../../../../assets/images/logo_app.png';
import InputText from '../../../../custom component/InputText';
import eye from '../../../../assets/icons/eye.png';
import hidden from '../../../../assets/icons/close-eye.png';
import Colors from '../../../../assets/Colors';
import StaffScreen from '../../../../custom component/StaffScreen';
import CustomModal from '../../../../custom component/CustomModal';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingStaff from '../../../../custom component/LoadingStaff';
import { useSelector } from 'react-redux';
import styles from './style';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ChangePassword = () => {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const navigation = useNavigation();
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [isSecureEntryConfirm, setIsSecureEntryConfirm] = useState(true);
  const [visible, setVisible] = React.useState(false);
  const [visibleLoad, setVisibleLoad] = React.useState(false);
  const theme = useSelector((state) => state.setting.theme);

  // function close LoadingStaff and open CustomModal when timePassed is true
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
    // const myTimeout = setTimeout(navigation.navigate("Login"), 5000);
  };
  return (
    <ScrollView>
      <StaffScreen>
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
                blurColor={Colors.primary}
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
              <InputText
                blurColor={Colors.primary}
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

          {/* Modal loading */}
          <LoadingStaff visible={visibleLoad}></LoadingStaff>

          <CustomModal visible={visible}>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../../../../assets/icons/password-orange.png')}
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
      </StaffScreen>
    </ScrollView>
  );
};

export default ChangePassword;
