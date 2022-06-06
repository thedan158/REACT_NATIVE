import {
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/core";
import logo from "../assets/images/logo_app.png";
import CustomTextInput from "../custom component/CustomTextInput";
import gallery from "../assets/icons/gallery.png";
import * as ImagePicker from "expo-image-picker";
import { Constants } from "expo-constants";
import Colors from "../assets/Colors";
import background from "../assets/images/background.png";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const RestaurantInformation = () => {
  const [nameOfRes, setNameOfRes] = useState("");
  const [address, setAddress] = useState("");
  const [hotline, setHotline] = useState("");
  const navigation = useNavigation();
  const [image, setImage] = useState("null");

  useEffect(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Permission denied!");
    }
  }, []);

 
  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  // Create random number for restaurant id
  function randomNumber() {
    return Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000;
  }
  // *Region for OnPress Signup
  const handleSignup = async () => {
    const rNumber = randomNumber();
    console.log(rNumber);
    const id = rNumber.toString();
    const resCheckRestaurantNotExists = await axios.post(
      `https://foody-uit.herokuapp.com/restaurant/checkRestaurantNotExists`,
      {
        id: id,
      }
    );
    const successCheckRes = resCheckRestaurantNotExists.data.success;
    console.log("Res not exists: " + successCheckRes);
    while (!successCheckRes) {
      const id = rNumber.toString();
      resCheckRestaurantNotExists = await axios.post(
        `https://foody-uit.herokuapp.com/restaurant/checkRestaurantNotExists`,
        {
          id: id,
        }
      );
      successCheckRes = resCheckRestaurantNotExists.data.success;
    }
    console.log("Create restaurant");
    const res = await axios.post(
      `https://foody-uit.herokuapp.com/restaurant/createRestaurant`,
      {
        id: id,
        name: nameOfRes,
        address: address,
        hotline: hotline,
      }
    );
    const { success } = res.data;
    console.log(success);
    if (success) {
      const userLoginData = await AsyncStorage.getItem("userLoginData");
      const user = JSON.parse(userLoginData);

      console.log("user name: " + user.username);
      const resUpdateUserRestaurantID = await axios.put(
        `https://foody-uit.herokuapp.com/auth/updateUser`,
        {
          username: user.username,
          restaurantID: id,
        }
      );
      const successUpdateUserRestaurantID =
        resUpdateUserRestaurantID.data.success;
      if (successUpdateUserRestaurantID) {
        console.log("Update user restaurant id success");
        navigation.navigate("AppLoader");
      }
    }
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <ImageBackground
          source={background}
          resizeMode="cover"
          style={{ flex: 1 }}
        >
          {/* Logo */}
          <View style={styles.view1}>
            <View>
              <Image style={styles.logo} source={logo}></Image>
            </View>
            <View>
              <Text style={styles.textPleaseRegister}>
                Fill your restaurant information
              </Text>
            </View>
          </View>

          {/* Pick image  */}
          <View style={styles.view2}>
            <TouchableOpacity onPress={PickImage}>
              <View style={styles.pickLogo}>
                <ImageBackground
                  style={styles.ImageBackground}
                  source={gallery}
                />

                {image && (
                  <Image source={{ uri: image }} style={styles.pick}></Image>
                )}
              </View>
            </TouchableOpacity>
          </View>
          {/* Input section  */}
          <View style={styles.view3}>
            <View>
              {/* Full name input */}

              <CustomTextInput
                blurColor={Colors.primary}
                value={nameOfRes}
                onChangeText={(text) => setNameOfRes(text)}
                placeholder="Name of Restaurant"
              />
            </View>

            {/* Address input */}
            <View style={{ marginTop: -15 }}>
              <CustomTextInput
                blurColor={Colors.primary}
                value={address}
                onChangeText={(text) => setAddress(text)}
                placeholder="Address"
              />
            </View>
            {/* Hotline */}
            <View style={{ marginTop: -15 }}>
              <CustomTextInput
                blurColor={Colors.primary}
                value={hotline}
                onChangeText={(text) => setHotline(text)}
                placeholder="Hotline"
                keyboardType="decimal-pad"
              />
            </View>
          </View>

          <View style={styles.view4}>
            {/* Button */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleSignup} style={styles.button}>
                <Text style={styles.buttonText}>Finish</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

export default RestaurantInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    width: windowWidth,
    height: windowHeight,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
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
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  view1: {
    flex: 3,
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  view2: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  view3: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 3,
  },
  view4: {
    flex: 2,
    justifyContent: "flex-end",
    marginBottom: 5,
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
    flexDirection: "row",
    backgroundColor: "white",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },

  loginBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    top: 30,
    left: 10,
  },

  loginText: {
    color: "#FA4A0C",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
    position: "absolute",
    alignSelf: "center",
  },

  ownerText: {
    color: "black",
    fontSize: 16,
    fontWeight: "normal",
  },

  signupBox: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "flex-start",
    position: "relative",
    right: 15,
  },

  rectangle: {
    width: 130,
    height: 3,
    backgroundColor: "#FA4A0C",
    position: "relative",
    bottom: -9,
  },

  signupText: {
    fontSize: 20,
    fontWeight: "bold",
  },

  registerText: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
  },

  fullNameBox: {
    width: 300,
    height: 55,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "flex-start",
    borderRadius: 13,
  },

  fullNameText: {
    fontSize: 15,
    marginLeft: 30,
  },

  passwordBox: {
    width: 300,
    height: 55,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 13,
    marginTop: 25,
  },

  gallery: {
    height: 65,
    width: 65,
    alignSelf: "center",
  },

  textSignupButton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },

  pickLogo: {
    width: 140,
    height: 140,
    backgroundColor: "white",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 10,
    borderStyle: "dashed",
  },
  pick: {
    width: 140,
    height: 140,
    borderColor: "black",
  },

  ImageBackground: {
    height: 80,
    width: 80,
    position: "absolute",
    alignSelf: "center",
  },
});
