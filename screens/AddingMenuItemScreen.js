import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import back from "../assets/icons/back-green.png";
import gallery from "../assets/icons/picture.png";
import { useNavigation } from "@react-navigation/core";
import CustomTextInput from "../custom component/CustomTextInput";
import Colors from "../assets/Colors";
import * as ImagePicker from "expo-image-picker";
import background from "../assets/images/background.png";
import CustomModal from "../custom component/CustomModal";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SelectDropdown from "react-native-select-dropdown";
import { firebaseConfig } from "../firebase";
import * as firebase from "firebase";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const AddingMenuItemScreen = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const [priceDish, setPriceDish] = useState("");
  const [nameDish, setNameDish] = useState("");
  const [foodType, setFoodType] = useState("");
  const [discount, setDiscount] = useState("");
  const [image, setImage] = useState("null");
  const [visible, setVisible] = useState(false);
  const [url, setUrl] = useState("");
  const foodTypeContainer = ["Starter", "Dessert and Drink", "Main course"];
  useEffect(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Permission denied!");
    }
  }, []);

  const handleSave = async () => {
    //*Get user data from AsyncStorage
    const user = await AsyncStorage.getItem("userLoginData");
    const userData = JSON.parse(user);
    console.log(userData.username);

    //*Create blob from image
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });

    //*Upload blob to firebase
    const ref = firebase
      .storage()
      .ref()
      .child(
        `images/${userData.username}_restaurantImage/food/${nameDish}.jpg`
      );
    const snapshot = ref.put(blob);
    await snapshot.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        console.log("uploading");
      },
      (error) => {
        console.log(error);
        blob.close();
        return;
      },
      async () => {
        await ref.getDownloadURL().then(async (url) => {
          console.log("download url: " + url);
          setUrl(url);
          blob.close();
          console.log(userData);
          console.log("platform: " + Platform.OS);
          console.log("blob:" + blob);
          console.log("url:" + url);
          const res = await axios.post(
            `https://foody-uit.herokuapp.com/food/addFood/${userData.username}`,
            {
              name: nameDish,
              price: priceDish,
              foodType: foodType,
              discount: discount,
              imagePath: url,
            }
          );
          const { success } = res.data;
          console.log(success);
          if (!success) {
            Alert.alert("Add new food failed");
            return;
          }
          setVisible(true);
        });
      }
    );
  };
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
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={background}
      resizeMode="cover"
      style={{
        flex: 1,
      }}
    >
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              width: windowWidth,
              alignItems: "center",
              justifyContent: "space-between",
              flex: 0.5,
            }}
          >
            <TouchableOpacity
              style={{
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "row",
                marginLeft: 20,
              }}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Image
                source={back}
                style={{
                  height: 20,
                  width: 20,
                }}
              />
            </TouchableOpacity>
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
            <TouchableOpacity onPress={PickImage} style={styles.button1}>
              <Text style={styles.buttonText}>Select Your Image</Text>
            </TouchableOpacity>
          </View>

          {/* Input section  */}
          <View style={styles.view3}>
            {/* Features input */}

            <SelectDropdown
              buttonStyle={styles.selectFoodType}
              defaultButtonText="Select Food Type"
              dropdownStyle={styles.dropdownStyle}
              data={foodTypeContainer}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
                setFoodType(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item;
              }}
            />
            {/* Name dish input */}

            <CustomTextInput
              blurColor={Colors.secondary}
              value={nameDish}
              onChangeText={(text) => setNameDish(text)}
              placeholder="Name Dish"
            />

            {/* Price Dish */}

            <CustomTextInput
              blurColor={Colors.secondary}
              value={priceDish}
              onChangeText={(text) => setPriceDish(text)}
              placeholder="Price Dish"
              keyboardType="decimal-pad"
            />

            {/* Discount  */}
            <CustomTextInput
              blurColor={Colors.secondary}
              value={discount}
              onChangeText={(text) => setDiscount(text)}
              placeholder="Discount"
              keyboardType="decimal-pad"
            />
          </View>

          <View style={styles.view4}>
            {/* Button save */}
            <TouchableOpacity onPress={handleSave} style={styles.button}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>

          {/* Modal  */}
          <CustomModal visible={visible}>
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../assets/icons/save-green.png")}
                style={{ height: 150, width: 150, marginVertical: 30 }}
              />
            </View>

            <Text
              style={{ marginVertical: 30, fontSize: 20, textAlign: "center" }}
            >
              Adding to menu successfully.
            </Text>
            <TouchableOpacity
              onPress={() => {
                setVisible(false);
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </CustomModal>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default AddingMenuItemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: windowHeight,
    width: windowWidth,
    paddingTop: "2%",
    backgroundColor: "transparent",
  },
  view2: {
    flex: 3,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  view3: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 5,
  },
  view4: {
    flex: 1,
    justifyContent: "center",
    marginTop: 10,
    width: "80%",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
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
  ImageBackground: {
    height: 50,
    width: 50,
    position: "absolute",
    alignSelf: "center",
  },
  pick: {
    width: 140,
    height: 140,
    borderColor: "black",
  },

  button: {
    backgroundColor: Colors.secondary,
    width: "100%",
    padding: 15,
    borderRadius: 20,
    elevation: 1,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  button1: {
    backgroundColor: Colors.secondary,
    width: "60%",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    elevation: 1,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  selectFoodType: {
    paddingHorizontal: 15,
    marginTop: 15,
    marginBottom: 17,
    borderColor: "white",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 15,
    width: 300,
    height: 50,
    backgroundColor: "#FFFCFB",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 13,
    borderWidth: 1,
  },
  dropdownStyle: {
    backgroundColor: "#FFFCFB",
    width: 300,
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 13,
  },
});
