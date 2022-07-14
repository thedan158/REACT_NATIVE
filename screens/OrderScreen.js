import {
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
  ScrollView,
  FlatList,
  TextInput,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect, Component } from "react";
import AppLoading from "expo-app-loading";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import { useNavigation } from "@react-navigation/core";
import { SafeAreaView } from "react-navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Constants from "expo-constants";
import table from "../assets/icons/table.png";
import reload from "../assets/icons/reloading.png";

import styled, { ThemeProvider } from "styled-components";
import { useSelector, useDispatch } from "react-redux";

const statusBarHeight = Constants.statusBarHeight;
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

// TODO fix the Scrollview with flatlist

const DATA = [
  {
    id: "1",
    name: "Rồng 7 Món",
    quantity: "1",
  },
  {
    id: "2",
    name: "Choáng váng thần dược",
    quantity: "2",
  },
  {
    id: "3",
    name: "Ốc Luộc",
    quantity: "1",
  },
];

const OrderScreen = () => {
  const [search, setSearch] = useState("");
  const [masterData, setMasterData] = useState([]);
  const [dataStarter, setNewStarter] = useState([]);
  const [dataMainCourse, setNewMainCourse] = useState([]);
  const [dataDrink, setNewDrink] = useState([]);
  const [selected, setIsSelected] = useState("Select Table");
  const [refreshing, setRefreshing] = useState(false);

  const theme = useSelector((state) => state.themeReducer.theme);

  var STARTER = [],
    MAINCOURSE = [],
    DESSERT = [];
  useEffect(() => {
    const getData = async () => {
      (STARTER = []), (MAINCOURSE = []), (DESSERT = []);
      const id = await AsyncStorage.getItem("tableID");
      console.log("oke");
      console.log(id);
      if (!id) {
        setIsSelected("Select your table");
      }
      if (id) {
        const resOrderID = await axios.post(
          `https://foody-uit.herokuapp.com/order/getCurrentOrderID`,
          {
            tableID: id,
          }
        );
        const orderID = resOrderID.data.message;
        console.log("orderID: " + orderID);
        const res = await axios.post(
          `https://foody-uit.herokuapp.com/orderInfo/getOrderInfo`,
          {
            orderID: orderID,
          }
        );
        const { success, message } = res.data;
        console.log(message);
        console.log("success " + success);
        if (success) {
          for (let i = 0; i < message.length; i++) {
            if (message[i].foodType == "Starter") {
              STARTER.push(message[i]);
            } else if (message[i].foodType == "Main course") {
              MAINCOURSE.push(message[i]);
            } else {
              DESSERT.push(message[i]);
            }
          }
          setNewStarter(STARTER);
          setNewMainCourse(MAINCOURSE);
          setNewDrink(DESSERT);

          setRefreshing(false);
        } else {
          console.log("None");
          setNewStarter([]);
          setNewMainCourse([]);
          setNewDrink([]);

          setRefreshing(false);
        }
      }
    };
    getData().catch((err) => console.log(err));
  }, [refreshing]);

  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleStarterMenu = () => {
    navigation.navigate("StarterMenu");
  };
  const handleMainMenu = () => {
    navigation.navigate("MainMenu");
  };
  const handleDrinkMenu = () => {
    navigation.navigate("DrinkMenu");
  };
  const handleDesertMenu = () => {
    navigation.navigate("DesertMenu");
  };
  const handleSelectedTable = () => {
    navigation.navigate("SelectedTable");
  };

  let arrowResource = require("../assets/icons/Vector.png");
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const FlatlistItem = ({item}) =>  {
      return (
        <View style={styles.flatlistitemStyle}>
          <ContentFlatListItem>{item.quantity}</ContentFlatListItem>
          <ContentFlatListItem>x</ContentFlatListItem>
          <ContentFlatListItem>{item.name}</ContentFlatListItem>
        </View>
      );
  }

  return (
    //   Root view
    <ThemeProvider theme={theme}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.droidSafeArea}
      >
        <Container>
          {/* ------------------------------------first view section-------------------------- */}
          <View style={styles.container_top}>
            {/* ---------------top header view Layout-------------- */}
            <ContentHeader>Order</ContentHeader>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.textHeaderBottom}>ORDER MEAL</Text>
              <TouchableOpacity onPress={() => setRefreshing(true)}>
                <Image
                  source={reload}
                  style={{ height: 30, width: 30, alignSelf: "center" }}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* ----------------------------second view section---------------------------------- */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={styles.container_bottom}
            nestedScrollEnabled
          >
            <View>
              {/* --------------btnSelectTable section view---------- */}
              <View style={styles.btnContainerViewStyle}>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    width: deviceWidth,
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 30,
                    marginTop: 10,
                  }}
                >
                  <View
                    style={{
                      flex: 7.5,
                    }}
                  >
                    <ContainerSelectTable>
                      <ContentSelectTableInfo>
                        {selected}
                      </ContentSelectTableInfo>
                    </ContainerSelectTable>
                  </View>

                  <TouchableOpacity
                    onPress={handleSelectedTable}
                    style={{ flex: 2.5 }}
                  >
                    <Image source={table} style={{ width: 40, height: 40 }} />
                  </TouchableOpacity>
                </View>
              </View>
              {/* -------------- end btnSelectTable section view---------- */}

              {/*------------- View Starter Order----------------- */}

              <View style={styles.container_layout_column}>
                <View style={styles.container_layout_row1}>
                  <Text style={styles.textHeaderBottom}>Starter: </Text>
                  <View style={styles}>
                    <ButtonMenuOpen onPress={handleStarterMenu}>
                      <View style={styles.viewMENU}>
                        <View style={styles.lineStyle1} />
                        <View style={styles.lineStyle1} />
                        <View style={styles.lineStyle1} />
                        <ContentMenu>MENU</ContentMenu>
                      </View>
                    </ButtonMenuOpen>
                  </View>
                </View>
                <FlatList
                  refreshing={refreshing}
                  data={dataStarter}
                  renderItem={({ item, index }) => {
                    return (
                      <FlatlistItem item={item} index={index}></FlatlistItem>
                    );
                  }}
                  keyExtractor={(item) => item.id}
                  nestedScrollEnabled
                />

                <View style={styles.lineStyle2} />
              </View>

              {/* --------------View Main Course Order-----------  */}
              <View style={styles.container_layout_column}>
                <View style={styles.container_layout_row1}>
                  <Text style={styles.textHeaderBottom}>Main course: </Text>
                  <View style={styles}>
                    <ButtonMenuOpen onPress={handleMainMenu}>
                      <View style={styles.viewMENU}>
                        <View style={styles.lineStyle1} />
                        <View style={styles.lineStyle1} />
                        <View style={styles.lineStyle1} />
                        <ContentMenu>MENU</ContentMenu>
                      </View>
                    </ButtonMenuOpen>
                  </View>
                </View>
                <FlatList
                  refreshing={refreshing}
                  onRefresh={() => setRefreshing(true)}
                  data={dataMainCourse}
                  renderItem={({ item, index }) => {
                    return (
                      <FlatlistItem item={item} index={index}></FlatlistItem>
                    );
                  }}
                  keyExtractor={(item) => item.id}
                  nestedScrollEnabled
                />
                <View style={styles.lineStyle2} />
              </View>
              {/* -----------------View Desert Order-------------- */}
              <View style={styles.container_layout_column}>
                <View style={styles.container_layout_row1}>
                  <Text style={styles.textHeaderBottom}>Desert - Drink: </Text>
                  <View style={styles}>
                    <ButtonMenuOpen onPress={handleDesertMenu}>
                      <View style={styles.viewMENU}>
                        <View style={styles.lineStyle1} />
                        <View style={styles.lineStyle1} />
                        <View style={styles.lineStyle1} />
                        <ContentMenu>MENU</ContentMenu>
                      </View>
                    </ButtonMenuOpen>
                  </View>
                </View>
                <FlatList
                  refreshing={refreshing}
                  onRefresh={() => setRefreshing(true)}
                  data={dataDrink}
                  renderItem={({ item, index }) => {
                    return (
                      <FlatlistItem item={item} index={index}></FlatlistItem>
                    );
                  }}
                  keyExtractor={(item) => item.id}
                  nestedScrollEnabled
                />
                <View style={styles.lineStyle2} />
              </View>
              {/* ----------------View Drink Order--------------- */}
              {/* <View style={styles.container_layout_column}>
                <View style={styles.container_layout_row1}>
                  <Text style={styles.textHeaderBottom}>Drink: </Text>
                  <View style={styles}>
                    <TouchableOpacity
                      style={styles.btnMenuDrink}
                      onPress={handleDrinkMenu}
                    >
                      <View style={styles.viewMENU}>
                        <View style={styles.lineStyle1} />
                        <View style={styles.lineStyle1} />
                        <View style={styles.lineStyle1} />
                        <Text style={styles.textMENU}>MENU</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <FlatList
                  data={DATA}
                  renderItem={({ item, index }) => {
                    return (
                      <FlatlistItem item={item} index={index}></FlatlistItem>
                    );
                  }}
                  keyExtractor={(item) => item.id}
                />
                <View style={styles.lineStyle2} />
              </View> */}
              {/* ----------------View Message Order----------- */}
              <View style={styles.container_layout_column2}>
                <View style={styles.container_layout_row1}>
                  <Text style={styles.textHeaderBottom}>Message: </Text>
                  <View>
                    {theme.mode === "light" ? (
                      <ContentInputMessage
                        placeholder="Note to the Chef..."
                        placeholderTextColor="#212121"
                      ></ContentInputMessage>
                    ) : (
                      <ContentInputMessage
                        placeholder="Note to the Chef..."
                        placeholderTextColor="#fff"
                      ></ContentInputMessage>
                    )}
                  </View>
                </View>

                <View style={styles.rectangleGreydevideView}></View>
              </View>
            </View>

            {/* ------------order button view section------------ */}
            <View style={styles.container_layout_column3}>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert("Order Successfully !");
                }}
                style={styles.btnOrder}
              >
                <View>
                  <Text style={styles.txtOrder}>Order</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Container>
      </KeyboardAwareScrollView>
    </ThemeProvider>
  );
};

export default OrderScreen;

const Container = styled.View`
  padding-left: 20;
  padding-right: 20;
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_ACCOUNT_COLOR};
  flex: 1;
  height: ${deviceHeight};
`;

const ContainerSelectTable = styled.View`
  background-color: ${(props) => props.theme.PRIMARY_BUTTON_COLOR};
  justify-content: center;
  align-items: center;
  width: 95%;
  height: 140%;
  border-radius: 20;
`;

const ContentSelectTableInfo = styled.Text`
  font-weight: bold;
  font-size: 18;
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
`;

const ButtonMenuOpen = styled.TouchableOpacity`
  height: 54;
  border-radius: 30;
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_ACCOUNT_COLOR};
  border-color: ${(props) => props.theme.PRIMARY_BACKGROUND_ACCOUNT_COLOR};
  align-content: center;
  justify-content: center;
  align-items: center;
`;

const ContentHeader = styled.Text`
  font-size: 30;
  font-weight: bold;
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
  align-self: center;
  margin-bottom: 3%;
`;

const ContentMenu = styled.Text`
  height: 20;
  align-self: center;
  margin-top: 0;
  justify-content: center;
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
  align-items: center;
  font-size: 12;
  font-weight: bold;
  margin: {3};
  top: 0;

`;

const ContentInputMessage = styled.TextInput`
  width: 115;
  top: 3;
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
`;
const ContentFlatListItem = styled.Text`
  margin: 5;
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
`;

const styles = StyleSheet.create({
  container_top: {
    height: 100,
    justifyContent: "center",
    alignContent: "center",
    marginTop: "7%",
  },
  container: {
    backgroundColor: "#FFF",
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "center",
    height: deviceHeight,
  },
  container_bottom: {
    top: 0,
    flexDirection: "column",
    borderRadius: 20,
    paddingTop: 15,
    marginTop: "0%",
    marginBottom: "13%",
  },
  rectangleGreydevideView: {
    backgroundColor: "#808080",
    width: deviceWidth,
    height: 5,
    marginBottom: 10,
    marginTop: 25,
  },
  container_layout_row: {
    flexDirection: "row",
  },
  container_bottomTabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 0,
    backgroundColor: "#8000",
    height: 60,
    marginLeft: 0,
    paddingLeft: 0,
    paddingRight: 30,
    marginRight: 0,
    width: deviceWidth,
    marginBottom: 0,
  },
  container_layout_row1: {
    flexDirection: "row",
    justifyContent: "space-between",
    left: 0,
  },
  container_layout_row2: {
    flexDirection: "row",
    height: 50,
  },
  container_layout_column: {
    flexDirection: "column",
  },
  container_layout_column2: {
    flexDirection: "column",
    top: 10,
    bottom: 30,
  },
  container_layout_column3: {
    flexDirection: "column",
    top: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  viewMENU: {
    top: 5,
    backgroundColor: "transparent",
  },
  viewtest: {
    flex: 7,
    backgroundColor: "#F3F3F3",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 20,
    left: 10,
    right: 0,
  },
  btnContainerViewStyle: {
    flexDirection: "column",
    top: 5,
    justifyContent: "space-between",
  },
  btnImagestyle: {
    height: 20,
    width: 20,
    left: 70,
  },
  btnBottomTabs: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  flatlistitemStyle: {
    flex: 1,
    flexDirection: "row",
    top: 1,
    backgroundColor: "transparent",
  },
  flatlistStyle: {},
  btnOrder: {
    width: 310,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6838",
    marginTop: 20,
  },
  btnMenuMainCourse: {
    height: 54,

    borderRadius: 30,
    backgroundColor: "#fff",
    borderColor: "#000",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  btnMenuDesert: {
    height: 54,
    borderRadius: 30,
    backgroundColor: "#fff",
    borderColor: "#000",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  btnMenuDrink: {
    height: 54,
    borderRadius: 30,
    backgroundColor: "#fff",
    borderColor: "#000",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  btnTest: {
    width: 310,
    height: 60,

    flexDirection: "row",
  },
  btnMenuStarter: {
    height: 54,

    borderRadius: 30,
    backgroundColor: "#fff",
    borderColor: "#000",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  btnTextstyle: {
    fontSize: 18,

    // width: 175,
    // height: 27,
    fontWeight: "bold",
  },
  lineStyle: {
    width: 350,
    backgroundColor: "#000000",
    height: 0.6,
    marginTop: 20,
    marginBottom: 20,
  },
  lineStyle2: {
    width: 350,
    backgroundColor: "#808080",
    height: 0.6,
    marginTop: 20,
    marginBottom: 10,
  },
  textMENU: {
    height: 20,
    alignSelf: "center",
    marginTop: 0,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 12,
    fontWeight: "bold",
    margin: 2,
    top: 0,
  },
  txtOrder: {
    color: "#F6F6F9",
    fontWeight: "bold",
    fontSize: 18,
  },
  lineStyle1: {
    width: 18,
    height: 2,
    margin: 2,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    left: 7,
    backgroundColor: "#808080",
  },
  marginFlatlistText: {
    margin: 5,
  },
  textHeaderTab: {
    color: "#ff6838",
    top: -40,
    fontSize: 25,
    bottom: 0,
    fontWeight: "bold",
  },
  textHeaderBottomMessage: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff6838",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  textHeaderBottom: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ff6838",
  },
  txtinput: {
    width: 115,
    top: 3,
  },
  txtBottomTabHome: {
    fontSize: 15,
    marginTop: 0,
    marginBottom: 0,
  },
  txtBottomTabBill: {
    fontSize: 15,
    marginTop: 0,
  },
  textHeader: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    alignSelf: "center",
    marginBottom: "3%",
  },
  IconHeader: {
    right: 0,
    top: -20,
  },
  appButtonContainer: {
    padding: 10,
    height: 60,
    width: 364,
    top: -10,
    bottom: 100,
    borderRadius: 20,
    backgroundColor: "#F3F3F6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  appButtonText: {
    width: 175,
    height: 30,
    color: "#000",
  },
  droidSafeArea: {
    flex: 1,
  },
  imgBottomTab: {
    height: 40,
    width: 40,
  },
});
