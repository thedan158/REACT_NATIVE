import {
  StyleSheet,
  FlatList,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import Colors from "../assets/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";

import styled, { ThemeProvider } from "styled-components";
import { useSelector, useDispatch } from "react-redux";

const SearchIconResouce = require("../assets/icons/SearchGray.png");
const FillterIconResouce = require('../assets/icons/fillter.png');
const FillterDarkTheme = require('../assets/icons/FillterDark.png');

const DataTable = [
  {
    id: 1,
    name: "Table 1",
    imgSourceSelected: require("../assets/icons/TableOrange.png"),
    imgSourceEmpty: require("../assets/icons/TableGray.png"),
    isUse: true,
  },
  {
    id: 2,
    name: "Table 2",
    imgSourceSelected: require("../assets/icons/TableOrange.png"),
    imgSourceEmpty: require("../assets/icons/TableGray.png"),
    isUse: false,
  },
  {
    id: 3,
    name: "Table 3",
    imgSourceSelected: require("../assets/icons/TableOrange.png"),
    imgSourceEmpty: require("../assets/icons/TableGray.png"),
    isUse: true,
  },
  {
    id: 4,
    name: "Table 4",
    imgSourceSelected: require("../assets/icons/TableOrange.png"),
    imgSourceEmpty: require("../assets/icons/TableGray.png"),
    isUse: true,
  },
  {
    id: 5,
    name: "Table 5",
    imgSourceSelected: require("../assets/icons/TableOrange.png"),
    imgSourceEmpty: require("../assets/icons/TableGray.png"),
    isUse: true,
  },
  {
    id: 6,
    name: "Table 6",
    imgSourceSelected: require("../assets/icons/TableOrange.png"),
    imgSourceEmpty: require("../assets/icons/TableGray.png"),
    isUse: true,
  },
  {
    id: 7,
    name: "Table 7",
    imgSourceSelected: require("../assets/icons/TableOrange.png"),
    imgSourceEmpty: require("../assets/icons/TableGray.png"),
    isUse: true,
  },
  {
    id: 8,
    name: "Table 8",
    imgSourceSelected: require("../assets/icons/TableOrange.png"),
    imgSourceEmpty: require("../assets/icons/TableGray.png"),
    isUse: false,
  },
];

const SelectedTable = () => {
  const FlatlistItemFunctions = ({ item }) => {
    if (item.isBusy === true) {
      return (
        <View>
          <TouchableOpacity
            disabled={true}
            onPress={() => {
              handleOnPressTable(item.id);
            }}
            style={styles.flatlistitemStyleInUse}
          >
            <View>
              <Image
                source={require("../assets/icons/TableOrange.png")}
                style={styles.imgItemFlatlist}
              />
              <Text style={styles.txtItemFlatlistInUse}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            handleOnPressTable(item.id);
          }}
          style={styles.flatlistitemStyle}
        >
          <View>
            <Image
              source={require("../assets/icons/TableGray.png")}
              style={styles.imgItemFlatlist}
            />
            <Text style={styles.txtItemFlatlist}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const [search, setSearch] = useState("");
  const [masterData, setMasterData] = useState([]);
  const [dataFromState, setNewData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const theme = useSelector((state) => state.themeReducer.theme);

  const handleOnPressTable = async (id) => {
    await AsyncStorage.setItem("tableID", id);
    console.log("id sent: " + id);
    navigation.goBack();
  };
  useEffect(() => {
    const getData = async () => {
      const userLoginData = await AsyncStorage.getItem("userLoginData");
      const user = JSON.parse(userLoginData);
      console.log("username: " + user.username);
      const res = await axios.post(
        `https://foody-uit.herokuapp.com/table/getAllTableOfRestaurant`,
        {
          username: user.username,
        }
      );
      const { success, message } = res.data;
      console.log(message);
      console.log(success);
      setNewData(message);
      setMasterData(dataFromState);
      setRefreshing(false);
      console.log("filteredData is all selected");
    };
    getData().catch((err) => console.log(err));
  }, [refreshing]);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterData.filter(function (item) {
        const itemData = item.name ? item.name.toLowerCase() : "".toUpperCase();
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

  return (
    // Root View
    <ThemeProvider theme={theme}>
      <Container>
        <View style={styles.containerTop}>
          <Text style={styles.txtHeaderView}>SELECT TABLE</Text>
          <View style={styles.containerTemp}>
            <ContainerSearch>
              <TouchableOpacity style={styles.btnSearch}>
                <Image
                  source={SearchIconResouce}
                  style={styles.imgIconSearch}
                />
              </TouchableOpacity>
              <TextInput
                value={search}
                onChangeText={(text) => searchFilterFunction(text)}
                style={styles.txtSearchBar}
                placeholder={"Search Table..."}
                placeholderTextColor="#8A8A8A"
              />
            </ContainerSearch>

            <TouchableOpacity style={styles.btnImgFillter}>
              {theme.mode === 'light' ? (
                  <Image source={FillterIconResouce} style={styles.imgIconFillter} />
                ) : (
                  <Image source={FillterDarkTheme} style={styles.imgIconFillter} />
                )}
            </TouchableOpacity>
          </View>
        </View>
        <ContainerBottom>
          <FlatList
            refreshing={refreshing}
            data={dataFromState}
            renderItem={({ item, index }) => {
              return (
                <FlatlistItemFunctions
                  item={item}
                  index={index}
                ></FlatlistItemFunctions>
              );
            }}
            keyExtractor={(item) => item.id}
            nestedScrollEnabled
            numColumns={2}
            onRefresh={() => setRefreshing(true)}
          />
        </ContainerBottom>
      </Container>
    </ThemeProvider>
  );
};

export default SelectedTable;

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_ACCOUNT_COLOR};
  flex: 1;
`;

const ContainerSearch = styled.View`
  width: 280;
  height: 50;
  border-radius: 15;
  margin-right: 10;
  border-width: 1;
  border-color: #a09a99;
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_ACCOUNT_COLOR};
  flex-direction: row;
  align-items: center;
  align-content: center;
  padding: 0;
`;
const ContainerBottom = styled.View`
  border-topLeftRadius: 30;
  border-topRightRadius: 30;
  border-color: #808080;
  background-color:  ${(props) => props.theme.PRIMARY_BACKGROUND_ACCOUNT_COLOR};
  justify-content: center;
  align-items: center;
  margin-top: -40;
  padding-top: 20;
  padding-left: 10;

`;

const styles = StyleSheet.create({
  container: {
    marginBottom: 0,
  },
  containerTop: {
    backgroundColor: "#FF4B3A",
    height: 180,
    flexDirection: "column",
    flex: 1,
    margin: 0,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  containerBottom: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderColor: "#808080",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -50,
    paddingTop: 20,
    paddingLeft: 10,
  },
  txtSearchBar: {
    color: "#8A8A8A",
  },
  txtHeaderView: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: -30,
    marginBottom: 10,
  },
  txtItemFlatlist: {
    color: "#A09A99",
    marginBottom: 10,
    alignSelf: "center",
    fontSize: 20,
  },
  txtItemFlatlistInUse: {
    color: Colors.primary,
    marginBottom: 10,
    alignSelf: "center",
    fontSize: 20,
  },
  containerTemp: {
    flexDirection: "row",
    marginBottom: 10,
  },
  containerSearchLayout: {
    width: 280,
    height: 50,
    borderRadius: 15,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#A09A99",
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    padding: 0,
  },
  imgIconSearch: {
    margin: 0,
    height: 16,
    width: 16,
  },
  imgIconFillter: {
    height: 50,
    width: 50,
    margin: 0,
  },
  imgItemFlatlist: {
    height: 70,
    width: 70,
    marginTop: 20,
    marginBottom: 5,
    resizeMode: "cover",
    alignSelf: "center",
    margin: 0,
  },
  btnSearch: {
    height: 20,
    width: 20,
    marginLeft: 20,
    marginRight: 10,
  },
  btnImgFillter: {
    height: 50,
    width: 50,
  },
  flatlistitemStyle: {
    height: 130,
    width: 130,
    borderRadius: 20,
    justifyContent: "center",
    borderColor: "grey",
    borderWidth: 2,
    alignItems: "center",
    marginRight: 20,
    marginVertical: 20,
    marginLeft: 10,
  },
  flatlistitemStyleInUse: {
    height: 130,
    width: 130,
    borderRadius: 20,
    justifyContent: "center",
    borderColor: Colors.primary,
    borderWidth: 2,
    alignContent: "center",
    alignItems: "center",
    marginRight: 20,
    marginVertical: 20,
    marginLeft: 10,
  },
});
