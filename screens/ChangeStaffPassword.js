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
import CustomTextInput from '../custom component/CustomTextInput';
import eye from '../assets/icons/eye.png';
import hidden from '../assets/icons/close-eye.png';
import Colors from '../assets/Colors';
import background from '../assets/images/background.png';
import StaffScreen from '../custom component/StaffScreen';
import CustomModal from '../custom component/CustomModal';

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

  return (
    <StaffScreen>
      <View style={styles.container}>
        {/* Logo and title  */}
        <View style={styles.view1}>
          <View>
            <Image style={styles.logo} source={logo}></Image>
          </View>
          <View>
            <Text style={styles.textPleaseRegister}>Reset new password</Text>
          </View>
        </View>

        {/* Input section  */}
        <View style={styles.view2}>
          <View>
            <CustomTextInput
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
              onPress={() => setVisible(true)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Reset password</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Modal  */}
        <CustomModal visible={visible}>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('../assets/icons/password-orange.png')}
              style={{ height: 150, width: 150, marginVertical: 30 }}
            />
          </View>

          <Text
            style={{ marginVertical: 30, fontSize: 20, textAlign: 'center' }}
          >
            Congratulations registration was successful
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
              setVisible(false);
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </CustomModal>
      </View>
    </StaffScreen>
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
    backgroundColor: '#FA4A0C',
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
    borderColor: '#FA4A0C',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#FA4A0C',
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
    color: '#FA4A0C',
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
