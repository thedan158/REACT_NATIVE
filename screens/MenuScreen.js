import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import Colors from "../assets/Colors";
import { LinearGradient } from "expo-linear-gradient";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const icBack = require("../assets/icons/back.png");
const icUser = require("../assets/icons/user.png");
const icSearch = require("../assets/icons/search.png");
const icStar = require("../assets/icons/Star.png");
const maxWidthConst = windowWidth - 10;

const DataMenu = [
  {
    id: 1,
    imgSource: require("../assets/images/pizza.jpg"),
    nameDish: "Pizza",
    rating: 4.5,
    votes: 355,
    price: 200,
  },
  {
    id: 2,
    imgSource: require("../assets/images/pizza.jpg"),
    nameDish: "Pizza with recommendations",
    rating: 4.8,
    votes: 422,
    price: 253,
  },
  {
    id: 3,
    imgSource: require("../assets/images/pizza.jpg"),
    nameDish: "Pizza with recommendations",
    rating: 4.6,
    votes: 221,
    price: 131,
  },
  {
    id: 4,
    imgSource: require("../assets/images/sarawak-laksa.jpg"),
    nameDish: "Sarawak laksa",
    rating: 4.1,
    votes: 321,
    price: 203,
  },
];

const MenuScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [masterData, setMasterData] = useState([]);

  useEffect(()=> {
    setMasterData(DataMenu);
    setFilteredData(DataMenu);
    console.log('filteredData is all selected');


  }, [])

  const searchFilterFunction = (text) => {
    
    if (text) {
      const newData = masterData.filter(function (item) {

        const itemData = item.nameDish
          ? item.nameDish.toLowerCase()
          : ''.toUpperCase();
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;

      });
      setFilteredData(newData);
      setSearch(text);  
    } else {
      setFilteredData(masterData)
      setSearch(text)
    }
  };

  const FlatListItem = ({ item }) => {
    return (
      <View style={styles.containerItemFlatList}>
        <View style={styles.containerImageItem}>
          <Image source={item.imgSource} style={styles.imgSourceItem} />
        </View>

        <View style={styles.containerInfoItem}>
          <Text style={styles.txtNameDishItem}>{item.nameDish}</Text>
          <View style={styles.containerRatingItem}>
            <Text style={styles.txtPriceItemInfo2}>${item.price}</Text>
            <Image source={icStar} style={styles.imgStarItem} />

            <Text style={styles.txtRatingItem}>{item.rating}</Text>
            <Text>({item.votes})</Text>
          </View>

          <View style={styles.containerPriceItem}></View>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.containerKeyboardAvoid}
    >
      <LinearGradient
        colors={[Colors.ImperialRed, Colors.DarkOrange]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.container}
      >
        <View style={styles.containerHeaderInfo}>
          <View style={styles.containerHeaderTab}>
            <TouchableOpacity 
            onPress={() => {
              navigation.goBack();
            }}
            >
              <Image style={styles.imgBack} source={icBack} />
            </TouchableOpacity>
            <Text style={styles.txtMenuHeader}>MENU</Text>
            <TouchableOpacity>
              <Image style={styles.imgUser} source={icUser} />
            </TouchableOpacity>
          </View>
          <View style={styles.containerHeaderInfoSections}>
            <Text style={styles.txtInfo1}>
              Homemade meals prepared with love
            </Text>
            <Text style={styles.txtInfo2}>60% Off today!!</Text>
            <View style={styles.containerSearchView}>
              <TouchableOpacity>
                <Image style={styles.icSearch} source={icSearch} />
              </TouchableOpacity>
              <TextInput
                placeholder="Search Menu"
                value={search}
                onChange={(text) => searchFilterFunction(text)}
                underlineColorAndroid="transparent"
                style={{ maxWidth: windowWidth - 120 }}
              />
            </View>
          </View>
        </View>
        <View style={styles.containerDevideLine}></View>
        <View style={styles.containerMenuInfo}>
          <FlatList
            data={filteredData}
            renderItem={({ item, index }) => {
              return <FlatListItem item={item} index={index} />;
            }}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    width: windowWidth,
    paddingTop: 20,
    paddingHorizontal: "3%",
    flex: 1,
  },
  containerKeyboardAvoid: {
    flex: 1,
    height: windowHeight,
    width: windowWidth,
  },
  containerHeaderInfo: {
    flex: 1,
  },
  containerDevideLine: {
    flex: 0.01,
    width: maxWidthConst,
    height: "0.1%",
    marginTop: "0%",
    marginBottom: "0%",
    backgroundColor: "#AFAFAF",
    alignSelf: "center",
  },
  containerMenuInfo: {
    flex: 3,
    justifyContent: "center",
    marginTop: "1.5%",
    backgroundColor: "transparent",
    marginBottom: "0%",
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
  containerInfoItem: {
    flex: 1,
  },
  containerRatingItem: {
    flexDirection: "row",
    flex: 2,
    marginBottom: "3%",
  },
  containerSearchView: {
    flexDirection: "row",
    height: "40%",
    width: windowWidth - 80,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    marginTop: "3%",
    maxWidth: windowWidth - 80,
    borderRadius: 45,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  containerHeaderTab: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    paddingTop: "0%",
  },
  containerPriceItem: {
    flex: 1,
  },
  containerHeaderInfoSections: {
    flex: 1.5,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    maxWidth: windowWidth - 10,
    width: windowWidth - 0,
    paddingHorizontal: "0%",
  },
  imgBack: {
    height: 30,
    width: 30,
    marginRight: "0%",
    resizeMode: "contain",
    flex: 1,
  },
  imgUser: {
    height: 30,
    width: 30,
    marginLeft: "0%",
    resizeMode: "contain",
    flex: 1,
  },
  txtMenuHeader: {
    color: "#fff",
    fontSize: 30,
    paddingTop: "0%",
    flex: 4,
    alignSelf: "center",
    alignItems: "center",
    fontWeight: "bold",
    paddingHorizontal: "6%",
  },
  txtInfo1: {
    color: "#fff",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  txtRatingItem: {
    color: "#EF5B5B",
    marginHorizontal: 5,
  },
  txtPriceItemInfo: {
    color: "#EF5B5B",
  },
  txtPriceItemInfo2: {
    color: "#EF5B5B",
    marginRight: "55%",
  },
  txtInfo2: {
    color: "#fff",
    alignContent: "center",
    alignSelf: "center",
  },
  txtNameDishItem: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: "2%",
  },
  icSearch: {
    height: 20,
    width: 20,
    marginRight: 10,
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
  imgStarItem: {
    height: 15,
    width: 15,
  },
});
