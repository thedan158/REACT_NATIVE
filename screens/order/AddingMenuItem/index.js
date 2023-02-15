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
import back from "../../../assets/icons/back-green.png";
import gallery from "../../../assets/icons/picture.png";
import galleryDarkTheme from "../../../assets/icons/pictureDarkTheme.png";
import { useNavigation } from "@react-navigation/core";
import CustomTextInput from "../../../custom component/CustomTextInput";
import Colors from "../../../assets/Colors";
import * as ImagePicker from "expo-image-picker";
import CustomModal from "../../../custom component/CustomModal";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SelectDropdown from "react-native-select-dropdown";
import { firebaseConfig } from "../../../firebase";
import * as firebase from "firebase";
import styles from "./style";
import { getAPIActionJSON } from "../../../api/ApiActions";

import styled, { ThemeProvider } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import LoadingOwner from "../../../custom component/LoadingOwner";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const AddingMenuItemScreen = () => {
  const theme = useSelector((state) => state.setting.theme);

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const [priceDish, setPriceDish] = useState("");
  const [nameDish, setNameDish] = useState("");
  const [foodType, setFoodType] = useState("");
  const [discount, setDiscount] = useState("");
  const [image, setImage] = useState("null");
  const [visible, setVisible] = useState(false);
  const username = useSelector((state) => state.user.username);
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();
  const foodTypeContainer = ["Starter", "Dessert and Drink", "Main course"];
  useEffect(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Permission denied!");
    }
  }, []);
  const handleResponse = (response) => {
    if (!response.success) {
      Alert.alert(response.message);
      return;
    }
  };
  const handleSave = async () => {
    //*Create blob from image
    // const blob = await new Promise((resolve, reject) => {
    //   const xhr = new XMLHttpRequest();
    //   xhr.onload = function () {
    //     resolve(xhr.response);
    //   };
    //   xhr.onerror = function (e) {
    //     console.log(e);
    //     reject(new TypeError("Network request failed"));
    //   };
    //   xhr.responseType = "blob";
    //   xhr.open("GET", image, true);
    //   xhr.send(null);
    // });
    //*Upload blob to firebase
    // const ref = firebase
    //   .storage()
    //   .ref()
    //   .child(`images/${username}_restaurantImage/food/${nameDish}.jpg`);
    // const snapshot = ref.put(blob);
    // await snapshot.on(
    //   firebase.storage.TaskEvent.STATE_CHANGED,
    //   () => {
    //     console.log("uploading");
    //     dispatch({ type: "loading.start" });
    //   },
    //   (error) => {
    //     console.log(error);
    //     blob.close();
    //     return;
    //   },
    // async () => {
    //   dispatch({ type: "loading.success" });
    //   await ref.getDownloadURL().then(async (url) => {
    //     setUrl(url);
    //     blob.close();
    dispatch(
      getAPIActionJSON(
        "addFood",
        {
          name: nameDish,
          price: priceDish,
          foodType: foodType,
          discount: discount,
          imagePath: "abcxyz.com",
        },
        null,
        `/${username}`,
        (e) => handleResponse(e)
      )
    );
    // const res = await axios.post(
    //   `https://foody-uit.herokuapp.com/food/addFood/${userData.username}`,

    // );
    // const { success } = res.data;
    // console.log(success);
    // if (!success) {
    //   Alert.alert("Add new food failed");
    //   return;
    // }
    setVisible(true);
    // });
    // }
    // );
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
    <ThemeProvider theme={theme}>
      <ContainerView>
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
            {theme.mode === "light" ? (
              <View style={styles.pickLogo}>
                <ImageBackground
                  style={styles.ImageBackground}
                  source={gallery}
                />

                {image && (
                  <Image source={{ uri: image }} style={styles.pick}></Image>
                )}
              </View>
            ) : (
              <View style={styles.pickLogoDarkTheme}>
                <ImageBackground
                  style={styles.ImageBackground}
                  source={galleryDarkTheme}
                />

                {image && (
                  <Image source={{ uri: image }} style={styles.pick}></Image>
                )}
              </View>
            )}
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
              source={require("../../../assets/icons/save-green.png")}
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
              navigation.goBack();
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </CustomModal>
      </ContainerView>
    </ThemeProvider>
  );
};

export default AddingMenuItemScreen;

const ContainerView = styled.View`
  flex: 1;
  height: ${windowHeight};
  width: ${windowWidth};
  padding-top: 2%;
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_COLOR};
`;
