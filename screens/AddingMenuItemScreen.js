import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
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

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const AddingMenuItemScreen = () => {
  const [priceDish, setPriceDish] = useState("");
  const [nameDish, setNameDish] = useState("");
  const [specialFeatures, setSpecialFeatures] = useState("");
  const [discount, setDiscount] = useState("");
  const [image, setImage] = useState("null");
  const [visible, setVisible] = useState(false);

  useEffect(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Permission denied!");
    }
  }, []);

  const handleSave = () => {
    navigation.goBack();
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
            {/* Button save */}
            <TouchableOpacity
              onPress={() => setVisible(true)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>

          {/* Modal  */}
        <CustomModal visible={visible}>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('../assets/icons/save-green.png')}
              style={{ height: 150, width: 150, marginVertical: 30 }}
            />
          </View>

          <Text
            style={{ marginVertical: 30, fontSize: 20, textAlign: 'center' }}
          >
            Adding to menu successfully.
          </Text>
          <TouchableOpacity
            onPress={() => {
              handleSave();
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
    justifyContent: 'center',
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
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
    width: '100%',
    padding: 15,
    borderRadius: 20,
    elevation: 1,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: 'center',
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
});
