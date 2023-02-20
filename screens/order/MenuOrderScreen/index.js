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
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import leftArrowLightTheme from "../../../assets/icons/back-orange.png";
import invoiceLightTheme from "../../../assets/icons/invoice.png";
import BillSticker from "../../../assets/icons/billSticker.png";
import { StatusBar } from "expo-status-bar";
import { Dimensions } from "react-native";
import styled, { ThemeProvider } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../../assets/Colors";
import cart from "../../../assets/icons/cart.png";
import IconBadge from "react-native-icon-badge";
import ModalOrderList from "../../../custom component/ModalOrderList";
import close from "../../../assets/icons/close_orange.png";
import FoodComponent from "../../../custom component/FoodComponent";
import styles from "./style";
import { getAPIActionJSON } from "../../../api/ApiActions";

const { width, height } = Dimensions.get("window");
const imgBtnOrange = require("../../../assets/icons/ButtonOrange.png");

// Dummy Data for Testing UI/UX -------------------------------------------------------------
const categoryMenuTypeData = [
  {
    id: 4,
    displayName: "Full Menu",
    name: "Full Menu",
    icon: require("../../../assets/icons/menuIcon.png"),
  },
  {
    id: 1,
    displayName: "Starter Dish",
    name: "Starter",
    icon: require("../../../assets/icons/starterDish.png"),
  },
  {
    id: 2,
    displayName: "Main Dish",
    name: "Main course",
    icon: require("../../../assets/icons/mainDish.png"),
  },
  {
    id: 3,
    displayName: "Dessert & Drink",
    name: "Dessert and Drink",
    icon: require("../../../assets/icons/dessertDish.png"),
  },
];

const MenuOrderScreen = ({ navigation, route }) => {
  // States Declaration -------------------------------------------------------------------
  const { item } = route.params;
  const dispatch = useDispatch();
  const [categories, setCategories] = React.useState(categoryMenuTypeData);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [dishData, setDishData] = React.useState([]);
  const [masterData, setMasterData] = useState([]);
  const [modalListOrder, setModalListOrder] = React.useState(false);
  const [selectedDish, setSelectedDish] = React.useState([]);
  const theme = useSelector((state) => state.setting.theme);

  function onSelectCategory(category) {
    //filter Dish Type
    if (category.name === "Full Menu") {
      setDishData(masterData);
      setSelectedCategory(category);
      return;
    }
    let DishList = masterData.filter((item) => item.foodType === category.name);

    setDishData(DishList);

    setSelectedCategory(category);
  }

  const handleResponse = (response) => {
    if (!response.success) {
      Alert.alert(response.message);
      return;
    }
    setDishData(response.data);
    setMasterData(response.data);
  };
  const getData = () => {
    try {
      dispatch(
        getAPIActionJSON(
          "getAllFood",
          null,
          null,
          `/${item.restaurantID}`,
          (e) => handleResponse(e)
        )
      );
    } catch (error) {}
  };
  const handleAddQuantity = (index1) => {
    const updatedList = selectedDish.map((item, index) => {
      if (index === index1) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setSelectedDish(updatedList);
  };
  const handleDesQuantity = (index1) => {
    var updatedList = selectedDish.map((item, index) => {
      if (index === index1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    updatedList = updatedList.filter((item) => item.quantity !== 0);
    setSelectedDish(updatedList);
  };
  const handleDel = (index1) => {
    var updatedList = selectedDish.filter((item, index) => index !== index1);
    setSelectedDish(updatedList);
  };
  const handleOrderResponse = (response) => {
    if (!response.success) {
      Alert.alert(response.message);
      return;
    }
    navigation.goBack();
  };
  const handleOrder = () => {
    try {
      setModalListOrder(false);
      dispatch(
        getAPIActionJSON(
          "createOrder",
          {
            tableName: item.name,
            order: selectedDish,
          },
          null,
          `/${item.restaurantID}`,
          (e) => handleOrderResponse(e)
        )
      );
    } catch (error) {
      console.log(error);
    }
  };
  const renderOrder = Array.from(
    { length: selectedDish.length },
    (_, index) => {
      return (
        <FoodComponent
          onAdd={() => handleAddQuantity(index)}
          onDes={() => handleDesQuantity(index)}
          onDel={() => handleDel(index)}
          item={selectedDish[index]}
        />
      );
    }
  );
  const totalPrice = () => {
    var totalPrice = 0;
    selectedDish.map((item) => {
      totalPrice = totalPrice + item.price * item.quantity;
    });
    return totalPrice;
  };
  useEffect(() => {
    getData();
  }, []);

  // Header Render Function ----------------------------------------------------------------

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: "row",
          height: "100%",
          flex: 0.3,
          paddingTop: "3.5%",
          marginBottom: "0%",
        }}
      >
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: 10 * 3,
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
          {theme.mode === "light" ? (
            <View
              style={{
                width: "70%",
                height: "100%",
                backgroundColor: "#Fff",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 30,
                shadowColor: "#000",

                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
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
                {item.name ?? "TABLE"}
              </Text>
            </View>
          ) : (
            <View
              style={{
                width: "70%",
                height: "100%",
                backgroundColor: "#EFEFF1",
                alignItems: "center",
                justifyContent: "center",

                borderRadius: 30,
                shadowColor: "#555555",

                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
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
                {item.name}
              </Text>
            </View>
          )}
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
        <View>
          {theme.mode === "light" ? (
            <TouchableOpacity
              style={{
                padding: 10,
                alignSelf: "center",
                height: 60,
                backgroundColor:
                  selectedCategory?.id == item.id ? Colors.primary : "#FFF",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 30,
                marginVertical: 5,
                marginHorizontal: 10,
                flexDirection: "row",
                shadowColor: "#000",

                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}
              onPress={() => onSelectCategory(item)}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  alignItems: "center",
                  alignSelf: "center",
                  justifyContent: "center",
                  marginRight: 5,
                  backgroundColor:
                    selectedCategory?.id == item.id
                      ? "transparent"
                      : "transparent",
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
                  marginTop: 0,
                  color:
                    selectedCategory?.id == item.id ? "#FFFFFF" : "#1E1F20",
                  alignSelf: "center",
                  fontSize: 14,
                  marginLeft: 0,
                }}
              >
                {item.displayName}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                padding: 10,
                alignSelf: "center",
                height: 60,
                backgroundColor:
                  selectedCategory?.id == item.id ? Colors.primary : "#313133",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 30,
                marginVertical: 5,
                marginHorizontal: 10,
                flexDirection: "row",
                shadowColor: "#555555",

                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}
              onPress={() => onSelectCategory(item)}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  alignItems: "center",
                  alignSelf: "center",
                  justifyContent: "center",
                  marginRight: 5,
                  backgroundColor:
                    selectedCategory?.id == item.id
                      ? "transparent"
                      : "transparent",
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
                  marginTop: 0,
                  color: "#FFFFFF",
                  alignSelf: "center",
                  fontSize: 14,
                  marginLeft: 0,
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      );
    };

    return (
      <View
        style={{
          marginTop: "2%",
          paddingHorizontal: 20,
          height: "100%",
          flex: 1.1,
        }}
        horizontal={true}
      >
        <Text
          style={{
            fontSize: 25,

            lineHeight: 40,
            fontWeight: "bold",
            paddingHorizontal: 5,
            flex: 0.4,
            color: Colors.primary,
          }}
        >
          Categories
        </Text>

        {/* FlatList Render Button Menu Categories */}
        <FlatList
          data={categories}
          horizontal={false}
          style={{
            paddingVertical: 0,

            height: "100%",
            flex: 1.5,
            width: "100%",
            alignSelf: "center",
            alignContent: "center",
          }}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 5,

            alignItems: "center",
            alignContent: "center",
          }}
        />
      </View>
    );
  }

  // List Dish Data Render Function

  function renderFoodList() {
    const RenderItemFlatList = ({ item }) => {
      const [counter, setCounter] = React.useState(0);
      function BtnAddPress() {
        const haveOrdered = selectedDish.findIndex(
          (food) => food.name === item.name
        );
        if (haveOrdered !== -1) return;
        setSelectedDish([...selectedDish, { ...item, quantity: 1 }]);
      }

      return (
        <LinearGradient
          colors={["#F8F8F9", "#F8F8F9"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            padding: 10,
            width: 140,
            height: 200,
            margin: 10,
            borderRadius: 20,
            alignSelf: "center",
            shadowColor: "#777777",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 25,
          }}
        >
          <Image
            source={{ uri: item.imagePath }}
            style={{
              borderRadius: 20,

              marginBottom: "4%",
              marginTop: "4%",
              width: "80%",
              height: "100%",
              alignSelf: "center",
              resizeMode: "contain",

              flex: 5,
            }}
          ></Image>
          <Text
            style={{
              flex: 1.5,
              color: "#434343",
            }}
          >
            {item.name}
          </Text>
          <Text
            style={{
              color: Colors.primary,
              flex: 2,
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            ${item.price}
          </Text>
          <View
            style={{
              flex: 2,
              flexDirection: "row",
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            {/* <TouchableOpacity onPress={BtnDelPress} style={styles.buttonAdjust}>
                <Text>-</Text>
              </TouchableOpacity> */}

            <TouchableOpacity onPress={BtnAddPress} style={styles.buttonAdjust}>
              <Text>+</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      );
    };
    return (
      <View
        style={{
          marginVertical: 10,
          flex: 2.5,
          borderRadius: 10,
        }}
      >
        <FlatList
          columnWrapperStyle={{ justifyContent: "space-between" }}
          data={dishData}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item, index }) => {
            return (
              <RenderItemFlatList
                item={item}
                index={index}
              ></RenderItemFlatList>
            );
          }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 10,
            marginBottom: 10,
            paddingBottom: 10,
            borderRadius: 10,
          }}
        />
        <View
          styles={{
            justifyContent: "flex-end",
            paddingRight: 10,
          }}
        ></View>
      </View>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <ContainerSafeAreaView>
        {renderHeader()}
        {renderMenuCategories()}
        {renderFoodList()}
        <View
          style={{
            position: "absolute",
            alignItems: "center",

            top: "85%",
            left: "75%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconBadge
              MainElement={
                <TouchableOpacity
                  onPress={() => setModalListOrder(true)}
                  style={styles.floatingButton}
                >
                  <Image source={cart} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
              }
              BadgeElement={
                <Text style={{ color: Colors.primary, fontWeight: "bold" }}>
                  {selectedDish.length}
                </Text>
              }
              IconBadgeStyle={{
                width: 25,
                height: 25,
                backgroundColor: "#fff",
                borderColor: Colors.primary,
                borderWidth: 2,
              }}
              Hidden={selectedDish.length === 0}
            />
          </View>
        </View>
        <ModalOrderList visible={modalListOrder}>
          {/* Header  */}

          {/* Table name  */}
          <View style={styles.tableName}>
            <Content style={{ color: Colors.primary }}>{item.name}</Content>
          </View>
          {/* Close button  */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalListOrder(false)}
          >
            <Image source={close} style={{ height: 13, width: 13 }} />
          </TouchableOpacity>

          {/* Sub-header  */}
          <View style={styles.subHeader}>
            <Content style={{ fontSize: 20 }}>Order List</Content>
            <Content style={{ color: "#787878", fontWeight: "normal" }}>
              {selectedDish.length} items
            </Content>
          </View>

          {/* List order  */}
          <ScrollView style={styles.listOrder}>{renderOrder}</ScrollView>

          {/* Total price and order  */}
          <View style={styles.footer}>
            {/* Total price  */}
            <View style={styles.totalPrice}>
              <Text style={{ fontSize: 16, color: "#979797" }}>Price</Text>
              <Content style={{ fontSize: 20, color: Colors.primary }}>
                ${totalPrice()}
              </Content>
            </View>
            {/* Order button */}
            <TouchableOpacity onPress={handleOrder} style={styles.orderButton}>
              <Content style={{ color: "white", fontSize: 17 }}>Order</Content>
            </TouchableOpacity>
          </View>
        </ModalOrderList>
      </ContainerSafeAreaView>
    </ThemeProvider>
  );
};

const Content = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
  font-weight: bold;
`;

export default MenuOrderScreen;

const ContainerSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_ACCOUNT_COLOR};
  padding-top: 6%;
`;
