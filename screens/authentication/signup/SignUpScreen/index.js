import {
  TouchableOpacity,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import logo from "../../../../assets/images/logo_app.png";
import CustomTextInput from "../../../../custom component/CustomTextInput";
import eye from "../../../../assets/icons/eye.png";
import hidden from "../../../../assets/icons/close-eye.png";
import Colors from "../../../../assets/Colors";
import background from "../../../../assets/images/background.png";
import validate from "../../../../assets/validate";
import styles from "./style";
import { useDispatch } from "react-redux";
import { getAPIActionJSON } from "../../../../api/ApiActions";

const SignupScreen = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [phoneError, setPhoneError] = React.useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();

  function isEnableSignup() {
    return (
      fullName !== "" &&
      phoneNumber !== "" &&
      username !== "" &&
      password !== "" &&
      phoneError == ""
    );
  }

  // *Region for OnPress Signup
  const handleResponse = (response) => {
    if (!response.success) {
      Alert.alert(response.message);
      return;
    }
    const phoneCode = `+84${phoneNumber.slice(1, phoneNumber.length)}`;
    dispatch(getAPIActionJSON("sendOtp", { phoneNumber: phoneCode }, null, ""));
    navigation.navigate("OTPsignup");
  };
  const handleSignup = () => {
    const data = {
      username: username,
      password: password,
      phoneNumber: phoneNumber,
      fullname: fullName,
    };
    dispatch(
      getAPIActionJSON("register", data, null, "", (e) => handleResponse(e))
    );
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
                      : "#FFB196",
                  },
                ]}
              >
                <Text style={styles.buttonText}>Sign-up</Text>
              </TouchableOpacity>
            </View>

            {/* Login  */}
            <View style={styles.registerText}>
              <Text style={styles.ownerText}>Already an Owner? </Text>

              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
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
