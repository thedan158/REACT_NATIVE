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
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../assets/images/logo_app.png";
import CustomTextInput from "../custom component/CustomTextInput";
import PhoneInput from "react-native-phone-number-input";
import background from "../assets/images/background.png";
import Colors from "../assets/Colors";
import validate from "../assets/validate";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const ForgotPassword = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigation = useNavigation();
  const [phoneError, setPhoneError] = React.useState("");

  function isEnableGetCode() {
    return phoneNumber !== "" && phoneError == "";
  }

  // *Region for OnPress Login
  const handleForgotPassword = async () => {
    console.log("+84" + phoneNumber);
    await AsyncStorage.setItem("userPhone", phoneNumber);
    const res = await axios.post(
      `https://foody-uit.herokuapp.com/otp/sendOtp`,
      {
        phoneNumber: "+84" + phoneNumber,
      }
    );
    const { success } = res.data;
    console.log(success);
    if (success) {
      navigation.navigate("OTPforgotpass");
    } else {
      Alert.alert("Invailid Phone Number");
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
                        : "#FFB196",
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

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  },
  inputContainer: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    // borderRadius: 10,
    // marginTop: 5,
    // alignSelf: 'center',
    // left: 20,

    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    left: 27,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#FA4A0C",
    width: "80%",
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

  view1: {
    justifyContent: "center",
    alignItems: "center",
    flex: 3,
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
  },

  textView: {
    flex: 0.12,
    flexDirection: "row",
    backgroundColor: "white",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },

  view2: {
    flex: 5,
    marginTop: 20,
  },
  view3: {
    flex: 2,
  },
  textLabel: {
    fontSize: 15,
    margin: 15,
  },
  registerText: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 15,
    textAlign: "center",
    color: "#9B9B9B",
  },
});
