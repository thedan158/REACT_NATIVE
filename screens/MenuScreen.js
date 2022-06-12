import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import Colors from "../assets/Colors";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const maxWidthConst = windowWidth - 10;
const imgAddItem = require("../assets/icons/AddItem.png");
const imgUserSource = require("../assets/icons/user.png");
const imgGoBackSource = require("../assets/icons/back.png");
const icStar = require("../assets/icons/Star.png");
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const maxWidth40 = windowWidth - 30;
const imgSearchSource = require("../assets/icons/search.png");
const DataMenu = [
  {
    id: 1,
    // imgSource: require("../assets/images/pizza.jpg"),
    nameDish: "Pizza",
    rating: 4.5,
    votes: 355,
    price: 200,
  },
  {
    id: 2,
    // imgSource: require("../assets/images/pizza.jpg"),
    nameDish: "Pizza with recommendations",
    rating: 4.8,
    votes: 422,
    price: 253,
  },
  {
    id: 3,
    // imgSource: require("../assets/images/pizza.jpg"),
    nameDish: "Saro with recommendations",
    rating: 4.6,
    votes: 221,
    price: 131,
  },
  {
    id: 4,
    // imgSource: require("../assets/images/sarawak-laksa.jpg"),
    nameDish: "Sarawak laksa",
    rating: 4.1,
    votes: 321,
    price: 203,
  },
];
const DataMenu1 = [
  {
    id: 1,
    // imgSource: require("../assets/images/pizza.jpg"),
    nameDish: "Pizza",
    rating: 4.5,
    votes: 355,
    price: 200,
  },
];

const MenuScreen = ({ navigation }) => {
  const [dataFromState, setNewData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const userLoginData = await AsyncStorage.getItem("userLoginData");
      const user = JSON.parse(userLoginData);
      console.log("username: " + user.username);
      const res = await axios.post(
        `https://foody-uit.herokuapp.com/food/getAllFoodOfRestaurant`,
        {
          username: user.username,
        }
      );

      const { success, message } = res.data;
      console.log(message);
      console.log(success);

      console.log("filteredData is all selected");
      setNewData(message);
    };

    getData().catch((err) => console.log(err));
  }, []);
  const [search, setSearch] = useState("");
  const [masterData, setMasterData] = useState([]);
  useEffect(() => {
    setMasterData(dataFromState);
  }, []);
  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterData.filter(function (item) {
        const itemData = item.nameDish
          ? item.nameDish.toLowerCase()
          : "".toUpperCase();
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      setNewData(newData);
      setSearch(text);
    } else {
      setNewData(masterData);
      setSearch(text);
    }
  };

  function HeaderViewTab({ HeaderText }) {
    return (
      <View style={styles.containerHeaderViewTab}>
        <TouchableOpacity
          style={styles.btnGoBack}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image source={imgGoBackSource} style={styles.imgGoBackStyle} />
        </TouchableOpacity>

        <Text style={styles.txtHeaderViewTab}>{HeaderText}</Text>
        <TouchableOpacity
          style={styles.btnUserStyle}
          onPress={() => {
            navigation.navigate("AddingMenuItemScreen");
          }}
        >
          <Image source={imgAddItem} style={styles.imgUserStyle} />
        </TouchableOpacity>
      </View>
    );
  }

  function InformationViewTab({ TextInFo1, TextInFo2 }) {
    return (
      <View style={styles.containerInfoViewTab}>
        <Text
          style={{
            color: "#fff",
            fontSize: 18,
            alignSelf: "center",
          }}
        >
          {TextInFo1}
        </Text>
        <Text>{TextInFo2}</Text>
      </View>
    );
  }

  function SearchBarViewComponent() {
    return (
      <View style={styles.containerSearchViewComponent}>
        <View
          style={{
            alignSelf: "center",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            direction: "inherit",
            flexWrap: "wrap-reverse",
            flex: 1,
            alignSelf: "center",
            maxWidth: "95%",
            marginBottom: "2%",
            paddingHorizontal: "5%",
          }}
        >
          <TouchableOpacity style={styles.btnSearchStyle}>
            <Image source={imgSearchSource} style={styles.imgSearchStyle} />
          </TouchableOpacity>
          <TextInput
            placeholder="Search Menu..."
            value={search}
            onChangeText={(text) => searchFilterFunction(text)}
            underlineColorAndroid="transparent"
            style={{
              flex: 9,
            }}
          ></TextInput>
        </View>
      </View>
    );
  }

  const FlatListItem = ({ item }) => {
    return (
      <View style={styles.containerItemFlatList}>
        <View style={styles.containerImageItem}>
          {/* <Image source={item.imgSource} style={styles.imgSourceItem} /> */}
          <Image
            source={require("../assets/images/sarawak-laksa.jpg")}
            style={styles.imgSourceItem}
          />
        </View>

        <View style={styles.containerInfoItem}>
          <Text style={styles.txtNameDishItem}>{item.name}</Text>
          <View style={styles.containerRatingItem}>
            <Text style={styles.txtPriceItemInfo2}>${item.price}</Text>
          </View>

          <View style={styles.containerPriceItem}></View>
        </View>
      </View>
    );
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={[Colors.ImperialRed, Colors.DarkOrange]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      {HeaderViewTab({ HeaderText: "Menu Of the day" })}
      {InformationViewTab({ TextInFo1: "Have a good day!" })}
      {SearchBarViewComponent()}
      <View style={styles.containerDevideLine}></View>
      <View style={styles.containerInfoItem}>
        <FlatList
          data={dataFromState}
          renderItem={({ item, index }) => {
            return <FlatListItem item={item} index={index} />;
          }}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </LinearGradient>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    paddingTop: "0%",
  },
  containerHeaderViewTab: {
    flex: 1,
    flexDirection: "row",
    height: 60,
    width: windowWidth,
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap-reverse",
  },
  containerDevideLine: {
    height: 1,
    width: windowWidth - 15,
    marginTop: "4%",
    marginBottom: "5%",
    backgroundColor: "#AFAFAF",
    alignSelf: "center",
  },
  containerItemFlatList: {
    width: windowWidth - 40,
    height: "100%",
    paddingHorizontal: "5%",
    backgroundColor: "#FFFFFF",
    paddingTop: 0,
    marginVertical: "2%",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 15,
    paddingBottom: "1.5%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    flex: 1,
  },
  containerImageItem: {
    flex: 2,
    marginBottom: "1%",
    justifyContent: "center",
    alignContent: "center",
  },
  containerSearchViewComponent: {
    height: 40,
    width: windowWidth,
    maxWidth: "85%",
    alignSelf: "center",
    borderRadius: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  containerInfoViewTab: {
    height: 70,
    width: windowWidth,
    maxWidth: "110%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    paddingHorizontal: "5%",
  },
  containerInfoItem: {
    flex: 1,
  },
  containerInfoItem: {
    flex: 7,
  },
  containerRatingItem: {
    flexDirection: "row",
    flex: 2,
    marginBottom: "3%",
  },
  txtPriceItemInfo2: {
    color: "#EF5B5B",
    marginRight: "55%",
  },
  txtHeaderViewTab: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
    paddingTop: "0%",
  },
  txtNameDishItem: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: "2%",
  },
  txtRatingItem: {
    color: "#EF5B5B",
    marginHorizontal: 5,
  },
  containerPriceItem: {
    flex: 1,
  },
  btnSearchStyle: {
    width: 20,
    height: 20,
    flex: 1,
  },
  imgSearchStyle: {
    width: 20,
    height: 20,
    resizeMode: "cover",
  },
  imgStarItem: {
    height: 15,
    width: 15,
  },
  btnGoBack: {
    height: 30,
    width: 30,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  btnUserStyle: {
    height: 30,
    width: 30,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  imgGoBackStyle: {
    height: 25,
    width: 25,
    resizeMode: "cover",
    alignSelf: "center",
  },
  imgSourceItem: {
    resizeMode: "cover",
    margin: "2%",
    borderRadius: 15,
    height: 150,
    width: windowWidth - 50,
    alignSelf: "center",
    flex: 1,
  },
  imgUserStyle: {
    height: 25,
    width: 25,
    resizeMode: "cover",
    alignSelf: "center",
  },
});
