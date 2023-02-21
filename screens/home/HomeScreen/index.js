import {
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useEffect, LogBox } from "react";
import IconBadge from "react-native-icon-badge";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../../assets/Colors";
import { useNavigation } from "@react-navigation/core";
import UserDarkTheme from "../../../assets/icons/personal_dark.png";
import UserLightTheme from "../../../assets/icons/personal_light.png";
import styles from "./style";
import styled, { ThemeProvider } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Carousel from "react-native-reanimated-carousel";
import { getAPIActionJSON } from "../../../api/ApiActions";

const imgDesertDish = require("../../../assets/images/DessertDish.png");
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const imgBackgroundSource = require("../../../assets/images/Dishs1-nonCut.png");
const imgBackgroundSource2 = require("../../../assets/images/Artboard1.png");
const imgBackgroundSource3 = {
  uri: "https://www.pngall.com/wp-content/uploads/2/Meal-PNG-Pic.png",
};

const HomeScreen2ndFinal = () => {
  const data = [
    "https://firebasestorage.googleapis.com/v0/b/le-repas.appspot.com/o/images%2Fcarousel%2FManage%20your%20Prescriptions.png?alt=media&token=5f89fb93-ae05-46e9-a8e4-8391f69ac71f",
    "https://firebasestorage.googleapis.com/v0/b/le-repas.appspot.com/o/images%2Fcarousel%2FManage%20your%20Prescriptions%20(4).png?alt=media&token=fcc93470-542f-4477-8ad8-0bb1d5ce2c1d",
    "https://firebasestorage.googleapis.com/v0/b/le-repas.appspot.com/o/images%2Fcarousel%2FManage%20your%20Prescriptions%20(3).png?alt=media&token=99c290b0-a47a-422f-9789-c041a8b38e2d",
  ];
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userImagePath = useSelector((state) => state.user.imagePath);
  const theme = useSelector((state) => state.setting.theme);
  const fullname = useSelector((state) => state.user.fullname);
  const username = useSelector((state) => state.user.username);
  const userRole = useSelector((state) => state.user.role);

  const getDataRestaurant = () => {
    if (userRole === 'owner') {
      dispatch(
        getAPIActionJSON(
          "getRestaurant",
          null,
          null,
          `/${username}`,
          (res) => handleGetDataRestaurantResponse(res),
        )
      )
      const handleGetDataRestaurantResponse = (res) => {
        if(res.success) {
          // need a new store in redux storage
        }
      }
    }
    return;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <View style={styles.headerSection}>
          <View style={styles.headerTextSection}>
            <Text style={styles.headerText}>👋 Hello!</Text>
            <Text style={styles.headerUsername}>{fullname}</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile")}
            style={styles.headerUserSection}
          >
            <IconBadge
              MainElement={
                <Image
                  style={styles.headerUserImage}
                  source={{
                    uri:
                      userImagePath !== ""
                        ? userImagePath
                        : "https://firebasestorage.googleapis.com/v0/b/le-repas.appspot.com/o/images%2Fgood.png?alt=media&token=de139437-3a20-4eb3-ba56-f6a591779d15",
                  }}
                />
              }
              IconBadgeStyle={{
                width: 10,
                height: 18,
                backgroundColor: "#009DC7",
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.containerBtnExcDeals}>
          <Carousel
            loop
            width={windowWidth}
            height={windowWidth / 1.7}
            autoPlay={true}
            data={data}
            scrollAnimationDuration={1200}
            onSnapToItem={(index) => {}}
            renderItem={({ item, index }) => (
              <View
                style={{
                  shadowOpacity: 0.1,
                  flex: 1,
                  margin: 10,
                  borderRadius: 10,
                  justifyContent: "center",
                }}
              >
                <Image
                  style={{ height: "100%", width: "100%", borderRadius: 20 }}
                  source={{
                    uri: item,
                  }}
                />
              </View>
            )}
          />
        </View>
        {/* Devide line */}
        <View style={styles.containerDevideLine}></View>
        <View style={styles.containerBtnMenuInfo}>
          {/* Button Menu Open */}
          <TouchableOpacity
            style={styles.btnMenuOpen}
            onPress={() => navigation.navigate("MenuScreen")}
          >
            <LinearGradient
              colors={[Colors.ImperialRed, Colors.DarkOrange]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.btnMenuOpen}
            >
              <View style={styles.containerMenuInfo}>
                <View style={styles.containerTxtInfo}>
                  {/* Header Tag Info View */}
                  <View style={styles.containerHeaderInfoTxt}>
                    <Text style={styles.txtMenu}>MAIN</Text>
                    <View
                      style={{
                        alignContent: "center",
                        justifyContent: "center",
                        alignSelf: "center",
                        marginBottom: 5,
                      }}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: 18,
                          marginBottom: -2,
                        }}
                      >
                        OF
                      </Text>
                      <Text
                        style={{
                          color: "#fff",
                          marginVertical: -7,
                          fontSize: 12,
                        }}
                      >
                        THE
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 30,
                        marginLeft: 0,
                        fontWeight: "bold",
                      }}
                    >
                      MEAL
                    </Text>
                  </View>
                  {/* Detail info for Menu Section */}
                  <View style={styles.containerHeaderDetailMenuInfoTxt}>
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 15,
                        fontWeight: "bold",
                      }}
                    >
                      100% FRESH FOOD
                    </Text>
                    <Text style={{ color: "#fff" }}>
                      so you can order in a smile
                    </Text>
                  </View>
                  <Image
                    source={imgBackgroundSource}
                    style={{
                      flex: 1.5,
                      zIndex: 1,
                      width: "150%",
                      height: "100%",
                      right: "0%",
                      left: "0%",
                      top: "5%",
                      resizeMode: "contain",
                    }}
                  />
                  <View></View>
                  <Image />
                </View>
                <View style={styles.imgBackgroundMenuInfo}>
                  <ImageBackground
                    source={imgBackgroundSource3}
                    style={styles.imgBackgroundMenuInfostyle}
                  />
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.containerBtnDealInfo}>
          {/* Button 2 */}
          <TouchableOpacity
            style={styles.btnSaleOffOpen}
            onPress={() => navigation.navigate("StarterMenuHome")}
          >
            <LinearGradient
              style={styles.btnSaleOffOpen}
              colors={[Colors.FrenchRaspberry, Colors.ParadisePink]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.ContainnerTextSaleOff}>
                <Text
                  style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}
                >
                  STARTER
                </Text>
                <Text
                  style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}
                >
                  DISH
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ color: "#fff" }}>Guarantee </Text>
                </View>
                <Text
                  style={{
                    color: "#fee38d",
                    fontWeight: "bold",
                    fontSize: 15,
                  }}
                >
                  100% FRESH
                </Text>
              </View>
              <Image
                source={{
                  uri: "http://assets.stickpng.com/images/5ea1507fe0ebe6000479458d.png",
                }}
                style={styles.imgSaleOff}
              />
            </LinearGradient>
          </TouchableOpacity>

          {/* Button 3 */}
          <TouchableOpacity
            style={styles.btnTryNewDishOpen}
            onPress={() => navigation.navigate("DesertAndDrinkMenuHome")}
          >
            <LinearGradient
              style={styles.btnTryNewDishOpen}
              colors={["#f12711", "#f5af19"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.ContainnerTextSaleOff}>
                <Text
                  style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}
                >
                  DESERT and DRINK
                </Text>
                <Text style={{ color: "#fff" }}>Guarantee</Text>
                <Text
                  style={{
                    color: "#000",
                    textDecorationLine: "underline",
                    fontWeight: "bold",
                  }}
                >
                  100% Worth Try
                </Text>
              </View>
              <Image source={imgDesertDish} style={styles.imgTryNew} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Container>
    </ThemeProvider>
  );
};

export default HomeScreen2ndFinal;

const Container = styled.View`
  width: ${windowWidth};
  height: ${windowHeight};
  flex: 1;
  padding-top: 0;
  padding-bottom: 7%;
  padding-top: 5%;
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_COLOR};
`;

const Content_Header = styled.Text`
  font-size: 25;
  font-weight: bold;
  align-self: center;
  align-items: center;
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
`;
const Content = styled.Text`
  flex: 1;
  margin-left: 5%;
  font-size: 20;
  font-weight: bold;
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
`;
