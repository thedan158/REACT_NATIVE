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
import Colors from "../../../../assets/Colors";
import background from "../../../../assets/images/background.png";
import OwnerScreen from "../../../../custom component/OwnerScreen";
import CustomModal from "../../../../custom component/CustomModal";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingOwner from "../../../../custom component/LoadingOwner";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style";

import { firebaseConfig } from "../../../../firebase";
import * as firebase from "firebase";
import { getAPIActionJSON } from "../../../../api/ApiActions";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const EditProfile = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const [fullname, setFullname] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [visible, setVisible] = React.useState(false);
  const [url, setUrl] = React.useState("");
  const [visibleLoad, setVisibleLoad] = React.useState(false);
  const theme = useSelector((state) => state.setting.theme);
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);

  // function close LoadingOwner and open CustomModal when timePassed is true
  const handleResponse = (response) => {
    if (!response.success) {
      Alert.alert(response.message);
      return;
    }
    setFullname(response.data.fullname);
    setAddress(response.data.address);
    setEmail(response.data.email);
    setImage(response.data.imagePath);
    setPhoneNumber(response.data.phoneNumber);
  };
  const navigation = useNavigation();
  const getData = () => {
    dispatch(
      getAPIActionJSON("getUserProfile", null, null, `/${username}`, (e) =>
        handleResponse(e)
      )
    );
  };
  useEffect(async () => {
    getData();
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
  const handleUpdateProfile = async () => {
    //*Get user data from AsyncStorage

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
      .child(`images/profile/${username}.jpg`);
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
          console.log("download url: " + url);
          setUrl(url);
          blob.close();
          dispatch({ type: "loading.success" });
          dispatch(
            getAPIActionJSON(
              "updateProfile",
              {
                fullname: fullname,
                address: address,
                phoneNumber: phoneNumber,
                email: email,
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
    //*Update user data
  };
  // *Region for OnPress Signup
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
              <Text style={styles.buttonText}>Change Your Avatar</Text>
            </TouchableOpacity>
          </View>

          {/* Input section  */}
          <View style={styles.view3}>
            {/* Full name input */}

            <InputText
              blurColor={Colors.secondary}
              value={fullname}
              onChangeText={(text) => setFullname(text)}
              placeholder="Full Name"
            />

            {/* Address input */}

            <InputText
              blurColor={Colors.secondary}
              value={address}
              onChangeText={(text) => setAddress(text)}
              placeholder="Address"
            />

            {/* Hotline */}

            <InputText
              blurColor={Colors.secondary}
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
              placeholder="Phone number"
              keyboardType="decimal-pad"
            />

            <InputText
              blurColor={Colors.secondary}
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Email"
            />
          </View>

          <View style={styles.view4}>
            {/* Button */}
            <TouchableOpacity
              onPress={handleUpdateProfile}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
          {/* Modal loading  */}
          <LoadingOwner visible={visibleLoad}></LoadingOwner>

          {/* Modal  popup*/}
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

export default EditProfile;
