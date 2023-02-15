import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Dimensions,
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
import CustomModal from "../../../../custom component/CustomModal";
import styles from "./style";
import { useDispatch } from "react-redux";
import { getAPIActionJSON, getStatelessAPI } from "../../../../api/ApiActions";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [visible, setVisible] = React.useState(false);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const handleResponse = (response) => {
    if (!response.success) {
      Alert.alert(response.message);
      return;
    }
    if (response.data.status === "Unverified") {
      navigation.navigate("OTPsignup");
      return;
    }
    if (!response.data.restaurantID) {
      navigation.navigate("RestaurantInformation");
      return;
    }
    if (response.data.role === "owner") {
      navigation.navigate("AppLoaderOwner");
    } else navigation.navigate("AppLoader");
  };
  const handleLogin = async () => {
    // Passing configuration object to axios
    dispatch(
      getAPIActionJSON(
        "login",
        {
          username: username,
          password: password,
        },
        null,
        "",
        (e) => handleResponse(e)
      )
    );
  };

  return (
    <ScrollView>
      {/* Modal  pop-up when login failed*/}
      <CustomModal visible={visible}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../../../assets/icons/remove.png")}
            style={{ height: 150, width: 150, marginVertical: 30 }}
          />
        </View>

        <Text style={{ marginVertical: 20, fontSize: 20, textAlign: "center" }}>
          Incorrect username or password
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
            setVisible(false);
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Try again !</Text>
        </TouchableOpacity>
      </CustomModal>

      {/* Background  */}
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
                Login to your account
              </Text>
            </View>
          </View>

          {/* Input section  */}
          <View style={styles.view2}>
            <View>
              <CustomTextInput
                label="Username"
                placeholder="Username"
                blurColor={Colors.primary}
                value={username}
                onChangeText={(text) => setUsername(text)}
              />

              <CustomTextInput
                label="Password"
                placeholder="Password"
                value={password}
                blurColor={Colors.primary}
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
            </View>

            {/* Forgot password  */}
            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text style={styles.forgotPassword}>Forgot password?</Text>
            </TouchableOpacity>

            {/* Login button section  */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </View>

            {/* Register section  */}
            <View style={styles.registerText}>
              <Text style={styles.newOwnerText}>You're a new Owner? </Text>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Signup");
                }}
              >
                <Text style={styles.buttonOutlineText}> Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default LoginScreen;
