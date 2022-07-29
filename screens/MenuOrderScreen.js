import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  ImageBackground,
} from "react-native";
import React from "react";
import leftArrowLightTheme from "../assets/icons/leftArrowLightTheme.png";
import invoiceLightTheme from "../assets/icons/invoiceLightTheme.png";
import BillSticker from "../assets/icons/billSticker.png";
import { StatusBar } from "expo-status-bar";
import { Dimensions } from "react-native";
import styled, { ThemeProvider } from "styled-components";
import { useSelector, useDispatch } from "react-redux";

const { width, height } = Dimensions.get("window");
const imgBtnOrange = require("../assets/icons/ButtonOrange.png");

// Dummy Data for Testing UI/UX -------------------------------------------------------------
const categoryMenuTypeData = [
  {
    id: 4,
    name: "Full Menu",
    icon: require("../assets/icons/menuIcon.png"),
  },
  {
    id: 1,
    name: "Starter Dish",
    icon: require("../assets/icons/starterDish.png"),
  },
  {
    id: 2,
    name: "Main Dish",
    icon: require("../assets/icons/mainDish.png"),
  },
  {
    id: 3,
    name: "Dessert-Drink",
    icon: require("../assets/icons/dessertDish.png"),
  },
];

const DishData = [
  {
    id: 1,
    nameDish: "Crispy Chicken Burger",
    categoryFoodType: [2, 4],
    photo: require("../assets/images/burger-restaurant.jpg"),
    detail: "Crispy Chicken Burger - Main",
    duration: "15 - 20 min",
    price: 15,
  },
  {
    id: 2,
    nameDish: "Crispy Chicken Burger",
    categoryFoodType: [3, 4],
    photo: require("../assets/images/burger-restaurant.jpg"),
    detail: "Crispy Chicken Burger - Dessert",
    duration: "10 - 15 min",
    price: 20,
  },
  {
    id: 3,
    nameDish: "Crispy Chicken Burger",
    categoryFoodType: [1, 4],
    photo: require("../assets/images/burger-restaurant.jpg"),
    detail: "Crispy Chicken Burger - Starter",
    duration: "5 - 10 min",
    price: 10,
  },
  {
    id: 4,
    nameDish: "Crispy Chicken Burger",
    categoryFoodType: [2, 4],
    photo: require("../assets/images/burger-restaurant.jpg"),
    detail: "Crispy Chicken Burger - Main 2",
    duration: "15 - 20 min",
    price: 15,
  },
  {
    id: 5,
    nameDish: "Crispy Chicken",
    categoryFoodType: [1, 4],
    photo: require("../assets/images/burger-restaurant.jpg"),
    detail: "Crispy Chicken Burger - Starter 2",
    duration: "3 - 8 min",
    price: 15,
  },
];

const item = {
  id: 1,
  name: "Table 1",
  isBusy: true,
};

const MenuOrderScreen = ({ navigation }) => {
  // States Declaration -------------------------------------------------------------------
  const [categories, setCategories] = React.useState(categoryMenuTypeData);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [dishData, setDishData] = React.useState(DishData);
  const theme = useSelector((state) => state.themeReducer.theme);

  function onSelectCategory(category) {
    //filter Dish Type
    let DishList = DishData.filter((a) =>
      a.categoryFoodType.includes(category.id)
    );

    setDishData(DishList);

    setSelectedCategory(category);
  }

  function getCategoryNameById(id) {
    let category = categories.filter((a) => a.id == id);

    if (category.length > 0) return category[0].name;

    return "";
  }

  // Header Render Function ----------------------------------------------------------------

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 50,
          paddingTop: "2%",
          marginBottom: "5%",
        }}
      >
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: 10 * 2,
            justifyContent: "center",
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            source={leftArrowLightTheme}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>

        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View
            style={{
              width: "70%",
              height: "100%",
              backgroundColor: "#EFEFF1",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 30,
            }}
          >
            <Text
              style={{
                lineHeight: 22,
                fontSize: 20,
                color: "#FA4A0C",
                fontWeight: "bold",
              }}
            >
              TABLE 1
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            width: 50,
            paddingRight: 10 * 2,
            justifyContent: "center",
          }}
          onPress={() => {
            navigation.navigate("CheckOutTableScreen", { item });
          }}
        >
          <Image
            source={invoiceLightTheme}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  // Categories Food Menu Render Function
  function renderMenuCategories() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{
            padding: 10,
            paddingBottom: 10 * 2,
            backgroundColor:
              selectedCategory?.id == item.id ? "#FA4A0C" : "#FFFFFF",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 30,
            marginRight: 10,
            ...styles.shadow,
          }}
          onPress={() => onSelectCategory(item)}
        >
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor:
                selectedCategory?.id == item.id ? "#FFFFFF" : "#F5F5F6",
            }}
          >
            <Image
              source={item.icon}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
              }}
            />
          </View>

          <Text
            style={{
              marginTop: 10,
              color: selectedCategory?.id == item.id ? "#FFFFFF" : "#1E1F20",

              fontSize: 12,
              lineHeight: 22,
            }}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View
        style={{
          paddingHorizontal: 10 * 2,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            lineHeight: 36,
            fontWeight: "bold",
          }}
        >
          Restaurant
        </Text>
        <Text
          style={{
            fontSize: 30,
            lineHeight: 36,
            fontWeight: "bold",
          }}
        >
          Categories
        </Text>

        {/* FlatList Render Button Menu Categories */}
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: 10 }}
        />
      </View>
    );
  }

  // List Dish Data Render Function

  function renderFoodList() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={{
          marginBottom: 10 * 2,
        }}
      >
        {/* Image */}
        <View
          style={{
            marginBottom: 10,
          }}
        >
          <Image
            source={item.photo}
            resizeMode="cover"
            style={{
              width: "100%",
              height: 200,
              borderRadius: 30,
            }}
          />
          {/* Duration */}
          <View
            style={{
              position: "absolute",
              bottom: 0,
              height: 50,
              width: width * 0.3,
              backgroundColor: "#FFFFFF",
              borderTopRightRadius: 30,
              borderBottomLeftRadius: 30,
              alignItems: "center",
              justifyContent: "center",
              ...styles.shadow,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                lineHeight: 22,
              }}
            >
              {item.duration}
            </Text>
          </View>
        </View>

        {/* Dish Name */}
        <Text
          style={{
            fontSize: 20,
            lineHeight: 30,
            fontWeight: "bold",
          }}
        >
          {item.nameDish}
        </Text>

        {/* Dish Type Info */}
        <View
          style={{
            flexDirection: "row",
            marginLeft: 10,
          }}
        >
          {/* Categories Food Type */}
          {/* {
                        item.categoryFoodType.map((categoryId) => {
                            return (
                                <View
                                    style={{ flexDirection: 'row' }}
                                    key={categoryId}
                                >
                                    <Text style={{ 
                                        fontSize: 16, lineHeight: 22,
                                     }}>
                                        {getCategoryNameById(categoryId)}
                                    </Text>
                                    <Text style={{ 
                                        fontSize: 20, 
                                        lineHeight: 22, 
                                        color:  '#898C95' }}> . </Text>
                                </View>
                                )
                            })
                    } */}

          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                lineHeight: 22,
                fontSize: 16,
                color: "#1E1F20",
              }}
            >
              $
            </Text>
            <Text
              style={{
                lineHeight: 22,
                fontSize: 16,
                color: "#FA4A0C",
              }}
            >
              {item.price}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );

    // Function Render Food Item FlatList
    const FlatlistItem = ({ item }) => {
      function BtnDelPress() {
        if (item.quantity > 0) {
          setCounter((counter) => counter - 1);
          item.quantity = counter - 1;
        }
      }
      function BtnAddPress() {
        setCounter((counter) => counter + 1);
        item.quantity = counter + 1;
      }

      const [counter, setCounter] = React.useState(0);
      return (
        <View style={styles.flatlistItemView}>
          <View
            style={{
              marginLeft: "3%",
            }}
          >
            {/* Image item section */}
            <Image style={styles.containerImageItem} source={item.photo} />
          </View>

          {/* Item detail section */}
          {theme.mode === "light" ? (
            <View
              style={{
                flex: 2,
                marginLeft: "3%",
              }}
            >
              <Text style={styles.txtNameItemFlatlist}>{item.nameDish}</Text>
              <Text style={styles.txtDetailItemFlatlist}>{item.detail}</Text>
              <Text style={styles.txtPriceItemFlatlist}>${item.price}</Text>
            </View>
          ) : (
            <View
              style={{
                flex: 2,
                marginLeft: "3%",
              }}
            >
              <Text style={styles.txtNameItemFlatlistDarkTheme}>
                {item.nameDish}
              </Text>
              <Text style={styles.txtDetailItemFlatlistDarkTheme}>
                {item.detail}
              </Text>
              <Text style={styles.txtPriceItemFlatlist}>${item.price}</Text>
            </View>
          )}

          {/* Btn adjust section */}
          <View style={styles.containerBtnAdjust}>
            <TouchableOpacity onPress={BtnDelPress}>
              <ImageBackground
                source={imgBtnOrange}
                style={styles.imgBtnOrangeStyle}
              >
                <Text style={styles.btnDel}>-</Text>
              </ImageBackground>
            </TouchableOpacity>
            {theme.mode === "light" ? (
              <Text style={styles.txtQuantityItem}> {counter} </Text>
            ) : (
              <Text style={styles.txtQuantityItemDarkTheme}> {counter} </Text>
            )}

            <TouchableOpacity onPress={BtnAddPress}>
              <ImageBackground
                source={imgBtnOrange}
                style={styles.imgBtnOrangeStyle}
              >
                <Text style={styles.btnDel}>+</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
      );
    };

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginVertical: 10,
          flex: 1,
        }}
      >
        <FlatList
          data={dishData}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item, index }) => {
            return <FlatlistItem item={item} index={index}></FlatlistItem>;
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 10,
            marginBottom: 10,
            paddingBottom: 10,
          }}
        />
        <View
          styles={{
            justifyContent: "flex-end",
            paddingRight: 10,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#F8774A",
              borderRadius: 25,
              height: 40,
              width: 105,
              marginTop: 10,
              marginLeft: 230,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                color: "#FFFFFF",
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              Apply
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderMenuCategories()}
      {renderFoodList()}
    </SafeAreaView>
  );
};

export default MenuOrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F9",
    marginTop: "7%",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  flatlistItemView: {
    height: 110,
    width: "100%",
    flex: 1,
    borderRadius: 30,
    borderWidth: 0,
    margin: 5,
    borderColor: "#808080",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#F8F8F9",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  containerImageItem: {
    height: "85%",
    width: 85,
    borderRadius: 20,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  txtDetailItemFlatlist: {
    fontSize: 12,
    color: "#3D3D3D",
    flexWrap: "wrap",
  },
  txtNameItemFlatlist: {
    fontSize: 16,
    color: "#3D3D3D",
    fontWeight: "bold",
    flexWrap: "wrap",
  },
  txtPriceItemFlatlist: {
    fontSize: 18,
    color: "#F3554A",
    fontWeight: "bold",
    flexWrap: "wrap",
  },
  txtDetailItemFlatlistDarkTheme: {
    fontSize: 12,
    color: "#fff",
    flexWrap: "wrap",
  },
  txtNameItemFlatlistDarkTheme: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    flexWrap: "wrap",
  },
  containerBtnAdjust: {
    justifyContent: "center",
    flexDirection: "row",
    flex: 1,
    paddingRight: "2%",
  },
  imgBtnOrangeStyle: {
    width: 24,
    height: 24,
    resizeMode: "cover",
    zIndex: 2,
  },
  btnDel: {
    justifyContent: "center",
    color: "#FFF",
    fontSize: 16,
    zIndex: 1,
    alignSelf: "center",
  },
  txtQuantityItem: {
    fontSize: 16,
    marginHorizontal: "2%",
    color: "#3D3D3D",
  },
  txtQuantityItemDarkTheme: {
    fontSize: 16,
    marginHorizontal: "2%",
    color: "#fff",
  },
});
