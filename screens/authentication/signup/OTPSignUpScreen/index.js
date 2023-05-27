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
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/core";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../../../assets/images/logo_app.png";
import background from "../../../../assets/images/background.png";
import Colors from "../../../../assets/Colors";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./style";
import { useDispatch, useSelector } from "react-redux";
import { getAPIActionJSON } from "../../../../api/ApiActions";

const OTP = () => {
  let textInput = useRef(null);
  const phoneNumber = useSelector((state) => state.user.phoneNumber);
  const [internalVal, setInternalVal] = useState("");
  const [timer, setTimer] = useState(60);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const onChangeText = (val) => {
    setInternalVal(val);
  };
  useEffect(() => {
    textInput.focus();
  }, []);

  // Countdown 60s function
  React.useEffect(() => {
    let interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          return prevTimer;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const isEnable = () => {
    return internalVal.length === 4;
  };
  const handleResponse = (response) => {
    if (!response.success) {
      Alert.alert(response.message);
      return;
    }
    navigation.navigate("RestaurantInformation");
  };
  const handleOTP = async () => {
    try {
      dispatch(
        getAPIActionJSON(
          "verifyOtp",
          {
            phoneNumber: phoneNumber,
            otp: parseInt(internalVal),
          },
          null,
          "",
          (e) => handleResponse(e)
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
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
              <Text style={styles.textPleaseRegister}>OTP Authentication</Text>
            </View>
          </View>
          <View style={styles.view2}>
            <View>
              {/* Subtitle  */}
              <Text style={styles.subtitle}>
                An authentication code has been send to your phone number
              </Text>

              {/* Number input section  */}
              <View>
                <TextInput
                  ref={(input) => (textInput = input)}
                  onChangeText={onChangeText}
                  value={internalVal}
                  style={{
                    position: "absolute",
                    width: 1,
                    height: 1,
                    opacity: 0,
                  }}
                  returnKeyType="done"
                  keyboardType="decimal-pad"
                  maxLength={4}
                ></TextInput>
                <View style={styles.otpView}>
                  {Array(4)
                    .fill()
                    .map((data, index) => (
                      <View
                        key={index}
                        style={[
                          styles.inputContainer,
                          {
                            borderColor:
                              index === internalVal.length
                                ? "#FA4A0C"
                                : "black",
                          },
                        ]}
                      >
                        <Text
                          style={styles.numberInput}
                          onPress={() => textInput.focus()}
                        >
                          {internalVal && internalVal.length > 0
                            ? internalVal[index]
                            : ""}
                        </Text>
                      </View>
                    ))}
                </View>
              </View>

              {/* Resend code */}

              <View style={styles.countDown}>
                <Text style={styles.subtitle2}>Didn't receive code?</Text>
                <TouchableOpacity onPress={() => setTimer(60)}>
                  <Text style={styles.buttonOutlineText}>
                    {" "}
                    Resend ({timer}s){" "}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Button section  */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                disabled={isEnable() ? false : true}
                onPress={handleOTP}
                style={[
                  styles.button,
                  {
                    backgroundColor: isEnable() ? Colors.primary : "#FFB196",
                  },
                ]}
              >
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default OTP;
