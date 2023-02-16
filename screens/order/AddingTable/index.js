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
import { useNavigation } from "@react-navigation/core";
import CustomTextInput from "../../../custom component/CustomTextInput";
import Colors from "../../../assets/Colors";
import * as ImagePicker from "expo-image-picker";
import CustomModal from "../../../custom component/CustomModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import styled, { ThemeProvider } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import styles from "./style";
import { getAPIActionJSON } from "../../../api/ApiActions";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const AddingTable = () => {
  const theme = useSelector((state) => state.setting.theme);
  const restaurantID = useSelector((state) => state.user.restaurantID);
  const [tableName, setTableName] = useState("");
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState("null");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleResponse = (response) => {
    if (!response.success) {
      Alert.alert(response.message);
      return;
    }
    setVisible(true);
    navigation.goBack();
  };
  const handleSave = () => {
    if (tableName === "") {
      Alert.alert("Please enter table name");
      return;
    }
    dispatch(
      getAPIActionJSON(
        "createTable",
        { name: tableName },
        null,
        `/${restaurantID}`,
        (e) => handleResponse(e)
      )
    );
    // const res = await axios.post(
    //   `https://foody-uit.herokuapp.com/table/createTable`,
    //   {
    //     username: user.username,
    //     name: nameTable,
    //   }
    // );
    // const { success, message } = res.data;
    // console.log(message);
    // console.log(success);
    // if (success) {
    //   setVisible(true);
    //   navigation.goBack();
    // }
  };

  return (
    <ThemeProvider theme={theme}>
      <ContainerView>
        <View
          style={{
            flexDirection: "row",
            paddingTop: "0%",
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
          <ImageBackground
            style={styles.ImageBackground}
            source={require("../../../assets/images/logo_app.png")}
          />

          {image && <Image source={{ uri: image }} style={styles.pick}></Image>}
        </View>

        {/* Input section  */}
        <View style={styles.view3}>
          {/* Name Table input */}
          <CustomTextInput
            blurColor={Colors.secondary}
            value={tableName}
            onChangeText={(text) => setTableName(text)}
            placeholder="Name Table"
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
      </ContainerView>
    </ThemeProvider>
  );
};

export default AddingTable;

const ContainerView = styled.View`
  flex: 1;
  height: ${windowHeight};
  width: ${windowWidth};
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_COLOR};
  padding-top: 0%;
`;
