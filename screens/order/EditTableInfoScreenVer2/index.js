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
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../../assets/Colors";
import { useNavigation } from "@react-navigation/core";
import back from "../../../assets/icons/back-green.png";
import CustomTextInput from "../../../custom component/CustomTextInput";
import * as ImagePicker from "expo-image-picker";
import CustomModal from "../../../custom component/CustomModal";
import del from "../../../assets/icons/delete_light.png";
import styles from "./style";
import styled, { ThemeProvider } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getAPIActionJSON } from "../../../api/ApiActions";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const EditTableInfoScreenRework1 = ({ navigation, route }) => {
  const { table } = route.params;
  console.log(table);
  const [image, setImage] = useState("null");
  const [nameTable, setNameTable] = useState(table);
  const [visible, setVisible] = useState(false);
  const [visibleDeleted, setVisibleDeleted] = useState(false);
  const restaurantID = useSelector((state) => state.user.restaurantID);
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.setting.theme);

  const handleDeleteResponse = (response) => {
    if (!response.success) {
      Alert.alert(response.message);
      return;
    }
    setVisibleDeleted(true);
  };
  const handleSaveResponse = (response) => {
    if (!response.success) {
      Alert.alert(response.message);
      return;
    }
    setVisible(true);
  };
  const handleDeleteTable = () => {
    try {
      dispatch(
        getAPIActionJSON(
          "deleteTable",
          { tableName: table },
          null,
          `/${restaurantID}`,
          (e) => handleDeleteResponse(e)
        )
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleSave = () => {
    try {
      dispatch(
        getAPIActionJSON(
          "updateTable",
          { oldTableName: table, tableName: nameTable },
          null,
          `/${restaurantID}`,
          (e) => handleSaveResponse(e)
        )
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <ContainerScrollView>
        <ContainerViewGoBackButton>
          {/* Button GoBack */}
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
        </ContainerViewGoBackButton>

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
            value={nameTable}
            onChangeText={(text) => setNameTable(text)}
            placeholder="Name Table"
          />
        </View>

        <View style={styles.view4}>
          {/* Button Delete */}
          <TouchableOpacity
            onPress={handleDeleteTable}
            style={styles.buttonDelete}
          >
            <Image
              source={del}
              style={{ height: 15, width: 15, marginHorizontal: 10 }}
            />
            <Text style={styles.buttonTextDelete}>Delete</Text>
          </TouchableOpacity>

          {/* Button save */}
          <TouchableOpacity onPress={handleSave} style={styles.buttonSave}>
            <Text style={styles.buttonTextSave}>Save</Text>
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
          {theme === "light" ? (
            <Text
              style={{ marginVertical: 30, fontSize: 20, textAlign: "center" }}
            >
              Deleted table successfully.
            </Text>
          ) : (
            <Text
              style={{
                marginVertical: 30,
                fontSize: 20,
                textAlign: "center",
                color: "grey",
              }}
            >
              Deleted table successfully.
            </Text>
          )}

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

        {/* Modal save */}
        <CustomModal visible={visible}>
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../../../assets/icons/save-green.png")}
              style={{ height: 150, width: 150, marginVertical: 30 }}
            />
          </View>
          {theme === "light" ? (
            <Text
              style={{ marginVertical: 30, fontSize: 20, textAlign: "center" }}
            >
              Edit table successfully.
            </Text>
          ) : (
            <Text
              style={{
                marginVertical: 30,
                fontSize: 20,
                textAlign: "center",
                color: "grey",
              }}
            >
              Edit table successfully.
            </Text>
          )}

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
      </ContainerScrollView>
    </ThemeProvider>
  );
};

export default EditTableInfoScreenRework1;

const ContainerScrollView = styled.ScrollView`
  flex: 1;
  height: ${windowHeight};
  width: ${windowWidth};
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_ACCOUNT_COLOR};
`;

const ContainerViewGoBackButton = styled.View`
  flex-direction: row;
  width: ${windowWidth};
  align-items: center;
  justify-content: space-between;
  flex: 1;
  height: 100;
  background-color: transparent;
`;
