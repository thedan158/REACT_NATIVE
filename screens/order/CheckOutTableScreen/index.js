import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./style";
import CustomModal from "../../../custom component/CustomModal";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { getAPIActionJSON } from "../../../api/ApiActions";

const imgTagSource = require("../../../assets/icons/Tag2.png");
const imgCloseSource = require("../../../assets/icons/close.png");
const imgBackgroundSource = require("../../../assets/images/background.png");

const CheckOutTableScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const totalPrice = () => {
    var totalPrice = 0;
    item.order.map((item) => {
      totalPrice = totalPrice + item.price * item.quantity;
    });
    return totalPrice;
  };
  function getTodayDateTime() {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, "0");
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const year = today.getFullYear().toString();
    const hours = today.getHours().toString().padStart(2, "0");
    const minutes = today.getMinutes().toString().padStart(2, "0");
    const seconds = today.getSeconds().toString().padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }
  const handleResponse = (response) => {
    if (!response.success) {
      Alert.alert(response.message);
      return;
    }
    setVisible(true);
  };
  const handleCheckout = () => {
    dispatch(
      getAPIActionJSON(
        "checkoutOrder",
        {
          tableName: item.name,
          date: getTodayDateTime(),
        },
        null,
        `/${item.restaurantID}`,
        (e) => handleResponse(e)
      )
    );
  };
  const FlatlistItem = ({ item }) => {
    return (
      <View style={styles.containerItemMapList}>
        <View style={styles.containerNumberDish}>
          <Text style={styles.txtNumberDishItemMap}>{item.quantity}</Text>
        </View>
        <Text style={styles.txtNameDishItemMap}>{item.name}</Text>
        <Text style={styles.txtPriceDishItemMap}>${item.price}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={imgBackgroundSource}
        style={styles.imgBackgroundSourceStyle}
      >
        <View style={styles.containerHeader}>
          <ImageBackground
            source={imgTagSource}
            style={styles.imgTagSourceStyle}
          >
            <Text style={styles.txtTitle}>{item.name}</Text>
          </ImageBackground>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.btnCloseScreen}
          >
            <Image
              source={imgCloseSource}
              style={styles.imgCloseSourceStyle}
            ></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.containerFlatListStyle}>
          <FlatList
            style={styles}
            data={item.order}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <FlatlistItem item={item} />}
          />
        </View>
        <View style={styles.DevideLineStyle}></View>
        <View style={styles.containerBottom}>
          <View style={styles.containerDiscount}>
            <Text style={styles.txtDiscount}>Date</Text>
            <TextInput style={styles.txtDiscountInfo}>
              {getTodayDateTime()}
            </TextInput>
          </View>
          <View style={styles.containerTotals}>
            <Text style={styles.txtTotal}>Total</Text>
            <Text style={styles.txtTotalInfo}>${totalPrice()}</Text>
          </View>
          <TouchableOpacity
            onPress={handleCheckout}
            style={styles.btnCheckOutStyle}
          >
            <Text style={styles.txtCheckOutStyle}>Checkout</Text>
          </TouchableOpacity>
        </View>
        {/* Modal view */}
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
            Checkout successfully.!!!
          </Text>
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
              navigation.goBack();
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>OK!</Text>
          </TouchableOpacity>
        </CustomModal>
      </ImageBackground>
    </View>
  );
};

export default CheckOutTableScreen;
