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
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../assets/images/logo_app.png";
import CustomTextInput from "../custom component/CustomTextInput";
import eye from "../assets/icons/eye.png";
import hidden from "../assets/icons/close-eye.png";
import Colors from "../assets/Colors";
import background from "../assets/images/background.png";
import validate from "../assets/validate";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const NewPassword = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [isSecureEntryConfirm, setIsSecureEntryConfirm] = useState(true);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // *Region for OnPress Login
  const handleConfirmNewPassword = async () => {
    // console.log('Confirm New Password');
    // const data = {
    //   password: password,
    //   confirmPassword: confirmPassword,
    // };
    const numberValue = await AsyncStorage.getItem("userPhone");
    console.log("+84" + numberValue);
    if (password !== confirmPassword) {
      Alert.alert("Password not match");
      return;
    }
    const res = await axios.post(
      `https://foody-uit.herokuapp.com/auth/forgotPassword`,
      {
        phoneNumber: "0" + numberValue,
        newPassword: password,
      }
    );
    const { success } = res.data;
    console.log(success);
    if (!success) {
      Alert.alert("Error occur! Please try again");
      return;
    }
    navigation.navigate("RePasswordSuccess");
  };
  // *End Region

  function isEnable() {
    return (
      password !== "" && confirmPassword !== "" && password === confirmPassword
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
                      backgroundColor: isEnable() ? Colors.primary : "#FFB196",
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

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  },
  inputContainer: {
    width: 300,
    height: 55,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "flex-start",
    borderRadius: 13,
  },

  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#FA4A0C",
    width: "100%",
    padding: 15,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 1,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#FA4A0C",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#FA4A0C",
    fontWeight: "700",
    fontSize: 16,
  },
  newOwnerText: {
    color: "black",
    fontSize: 16,
    fontWeight: "normal",
  },

  // container:{
  //     flex:1,
  //     backgroundColor:'#F2F2F2'
  // },

  view1: {
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  textPleaseRegister: {
    position: "relative",
    top: 10,
    fontSize: 20,
    fontWeight: "bold",
  },

  logo: {
    height: 160,
    width: 170,
    position: "relative",
    top: 5,
    marginTop: 25,
  },

  textView: {
    flex: 0.12,
    flexDirection: "row",
    backgroundColor: "white",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },

  view2: {
    flex: 0.9,
    marginTop: 20,
  },

  textLabel: {
    fontSize: 15,
    marginTop: 15,
    marginBottom: 15,
  },
  registerText: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
  },
  forgotPassword: {
    color: "#FA4A0C",
    fontWeight: "700",
    fontSize: 16,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 15,
    textAlign: "center",
    color: "#9B9B9B",
  },
});
