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
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/core";
import InputText from "../../../../custom component/InputText";
import gallery from "../../../../assets/icons/picture.png";
import * as ImagePicker from "expo-image-picker";
import { Constants } from "expo-constants";
import Colors from "../../../../assets/Colors";
import background from "../../../../assets/images/background.png";
import CustomModal from "../../../../custom component/CustomModal";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebaseConfig } from "../../../../firebase";
import * as firebase from "firebase";
import LoadingOwner from "../../../../custom component/LoadingOwner";
import OwnerScreen from "../../../../custom component/OwnerScreen";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style";
import { getAPIActionJSON } from "../../../../api/ApiActions";

const EditResProfile = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const [nameOfRes, setNameOfRes] = useState("");
  const [address, setAddress] = useState("");
  const [hotline, setHotline] = useState("");
  const navigation = useNavigation();
  const [image, setImage] = useState("null");
  const [visible, setVisible] = React.useState(false);
  const [url, setUrl] = React.useState("");
  const [visibleLoad, setVisibleLoad] = React.useState(false);
  const theme = useSelector((state) => state.setting.theme);
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  // function close LoadingOwner and open CustomModal when timePassed is true

  const getData = () => {
    dispatch(
      getAPIActionJSON("getRestaurant", null, null, `/${username}`, (res) =>
        handleResponse(res)
      )
    );
  };
  const handleResponse = (response) => {
    if (!response.success) {
      Alert.alert(response.message);
      return;
    }
    setAddress(response.data.address);
    setHotline(response.data.hotline);
    setImage(response.data.imagePath);
    setNameOfRes(response.data.name);
  };
  useEffect(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    getData();
    if (status !== "granted") {
      alert("Permission denied!");
    }
  }, []);
  const handleRestaurantUpdate = async () => {
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
              "updateRestaurant",
              {
                name: nameOfRes,
                address: address,
                hotline: hotline,
                imagePath: url,
              },
              null,
              `/${username}`,
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

  return (
    <OwnerScreen>
      <ScrollView>
        <View style={styles.container}>
          {/* Pick image  */}
          <View style={styles.view2}>
            <TouchableOpacity onPress={PickImage}>
              <View style={styles.pickLogo}>
                <ImageBackground
                  style={styles.ImageBackground}
                  source={gallery}
                />

                {image ? (
                  <Image source={{ uri: image }} style={styles.pick}></Image>
                ) : null}
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={PickImage} style={styles.button1}>
              <Text style={styles.buttonText}>Change Your Logo</Text>
            </TouchableOpacity>
          </View>
          {/* Input section  */}
          <View style={styles.view3}>
            <View>
              {/* Full name input */}

              <InputText
                blurColor={Colors.primary}
                value={nameOfRes}
                onChangeText={(text) => setNameOfRes(text)}
                placeholder="Name of Restaurant"
              />
            </View>

            {/* Address input */}
            <View>
              <InputText
                blurColor={Colors.primary}
                value={address}
                onChangeText={(text) => setAddress(text)}
                placeholder="Address"
              />
            </View>
            {/* Hotline */}
            <View>
              <InputText
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
              <TouchableOpacity
                onPress={handleRestaurantUpdate}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Modal loading  */}
          <LoadingOwner visible={visibleLoad}></LoadingOwner>
          {/* Modal  */}
          <CustomModal visible={visible}>
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../../../../assets/icons/save-green.png")}
                style={{ height: 150, width: 150, marginVertical: 30 }}
              />
            </View>

            <Text
              style={{
                marginVertical: 30,
                fontSize: 20,
                textAlign: "center",
                color: theme.PRIMARY_TEXT_COLOR,
              }}
            >
              Update profile successfully{" "}
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
        </View>
      </ScrollView>
    </OwnerScreen>
  );
};

export default EditResProfile;
