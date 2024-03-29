import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import background from "../../../assets/images/background.png";
import * as ImagePicker from "expo-image-picker";
import Colors from "../../../assets/Colors";
import back from "../../../assets/icons/back-green.png";
import CustomTextInput from "../../../custom component/CustomTextInput";
import { useNavigation } from "@react-navigation/core";
import del_light from "../../../assets/icons/delete_light.png";
import CustomModal from "../../../custom component/CustomModal";
import gallery from "../../../assets/icons/picture.png";
import galleryDarkTheme from "../../../assets/icons/pictureDarkTheme.png";
import styles from "./style";
import styled, { ThemeProvider } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getAPIActionJSON } from "../../../api/ApiActions";
import * as firebase from "firebase";
import { firebaseConfig } from "../../../firebase";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const EditMenuScreen = ({ route }) => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const { item } = route.params;
  console.log(item);
  const dispatch = useDispatch();
  const [priceDish, setPriceDish] = useState(item.price);
  const [nameDish, setNameDish] = useState(item.name);
  const [specialFeatures, setSpecialFeatures] = useState(item.votes);
  const [discount, setDiscount] = useState(item.discount);
  const [image, setImage] = useState(item.imagePath);
  const [url, setUrl] = React.useState("");
  const [visible, setVisible] = useState(false);
  const [visibleDeleted, setVisibleDeleted] = useState(false);
  const theme = useSelector((state) => state.setting.theme);
  const navigation = useNavigation();
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
  const handleDeleteResponse = (response) => {
    if (!response.success) {
      Alert.alert(response.message);
      return;
    }
    setVisibleDeleted(true);
  };
  const handleDelete = () => {
    try {
      dispatch(
        getAPIActionJSON(
          "deleteFood",
          { foodName: item.name },
          null,
          `/${item.restaurantID}`,
          (e) => handleDeleteResponse(e)
        )
      );
    } catch (error) {}
  };
  const handleSave = async () => {
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
    const ref = firebase
      .storage()
      .ref()
      .child(`images/restaurants/${nameOfRes}.jpg`);
    const snapshot = ref.put(blob);
    await snapshot.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        console.log("uploading");
        dispatch({ type: "loading.start" });
      },
      (error) => {
        console.log(error);
        blob.close();
        return;
      },
      async () => {
        await ref.getDownloadURL().then(async (url) => {
          setUrl(url);
          blob.close();
          dispatch({ type: "loading.success" });
          dispatch(
            getAPIActionJSON(
              "updateFood",
              {
                oldFoodName: item.name,
                foodName: nameDish,
                price: priceDish,
                discount: discount,
                imagePath: url,
              },
              null,
              `/${item.restaurantID}`,
              (res) => handleUpdateResponse(res)
            )
          );
          const handleUpdateResponse = (res) => {
            if (!res.success) {
              Alert.alert("Update failed");
              return;
            }
            setVisible(true);
          };
        });
      }
    );
  };

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
          {/* Name dish input */}

          <CustomTextInput
            blurColor={Colors.secondary}
            value={nameDish}
            onChangeText={(text) => setNameDish(text)}
            placeholder="Name Dish"
          />

          {/* Features input */}

          <CustomTextInput
            blurColor={Colors.secondary}
            value={specialFeatures}
            onChangeText={(text) => setSpecialFeatures(text)}
            placeholder="Special Features"
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
          {/* Button Delete */}
          <TouchableOpacity onPress={handleDelete} style={styles.buttonDelete}>
            <Image
              source={del_light}
              style={{ height: 15, width: 15, marginHorizontal: 10 }}
            />
            <Text style={styles.buttonTextDelete}>Delete</Text>
          </TouchableOpacity>

          {/* Button Save */}
          <TouchableOpacity onPress={handleSave} style={styles.button}>
            <Text style={styles.buttonText}>SAVE</Text>
          </TouchableOpacity>
        </View>

        {/* Modal delete */}
        <CustomModal visible={visibleDeleted}>
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../../../assets/icons/save-green.png")}
              style={{ height: 150, width: 150, marginVertical: 30 }}
            />
          </View>

          <Text
            style={{ marginVertical: 30, fontSize: 20, textAlign: "center" }}
          >
            Deleted food successfully.
          </Text>
          <TouchableOpacity
            onPress={() => {
              setVisibleDeleted(false);
              navigation.goBack();
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </CustomModal>

        {/* Modal adding  */}
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
            Update successfully.
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
      </ContainerView>
    </ThemeProvider>
  );
};

export default EditMenuScreen;

const ContainerView = styled.View`
  flex: 1;
  padding-top: 5%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
