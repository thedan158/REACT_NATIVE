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

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const AddingTable = () => {
  const [nameTable, setNameTable] = useState("");
  const [numberPeople, setNumberPeople] = useState("");
  const [position, setPosition] = useState("");
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState("null");
  const navigation = useNavigation();
  const handleSave = () => {
    setVisible(true);
  };
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
            {/* Name Table input */}
            <CustomTextInput
              blurColor={Colors.secondary}
              value={nameTable}
              onChangeText={(text) => setNameTable(text)}
              placeholder="Name Table"
            />

            {/* Number of people in use */}
            <CustomTextInput
              blurColor={Colors.secondary}
              value={numberPeople}
              onChangeText={(text) => setNumberPeople(text)}
              placeholder="Number of chair"
              keyboardType="decimal-pad"
            />

            {/* Position table  */}
            <CustomTextInput
              blurColor={Colors.secondary}
              value={position}
              onChangeText={(text) => setPosition(text)}
              placeholder="Position table"
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
              Adding table successfully.
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

export default AddingTable;

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
  ImageBackground: {
    height: 50,
    width: 50,
    borderRadius: 15,
    position: "absolute",
    alignSelf: "center",
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
  pick: {
    width: 140,
    height: 140,
    borderRadius: 15,
    alignSelf: "center",
    borderColor: "black",
  },
  button1: {
    backgroundColor: Colors.primary,
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
  button: {
    backgroundColor: Colors.primary,
    width: "100%",
    padding: 15,
    borderRadius: 20,
    elevation: 1,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
