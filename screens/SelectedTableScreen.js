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

const SearchIconResouce = require("../assets/icons/search.png");
const FillterIconResouce = require("../assets/icons/fillter.png");

const SelectedTable = ({ navigation }) => {
  const FlatlistItemFunctions = ({ item }) => {
    if (item.isBusy === true) {
      return (
        <View>
          <TouchableOpacity
            disabled={true}
            onPress={() => navigation.navigate("Order", { item })}
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
          onPress={() => navigation.navigate("Order", { item })}
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
    <ScrollView style={styles.container}>
      <View style={styles.containerTop}>
        <Text style={styles.txtHeaderView}>SELECT TABLE</Text>
        <View style={styles.containerTemp}>
          <View style={styles.containerSearchLayout}>
            <TouchableOpacity style={styles.btnSearch}>
              <Image source={SearchIconResouce} style={styles.imgIconSearch} />
            </TouchableOpacity>
            <TextInput
              value={search}
              onChangeText={(text) => searchFilterFunction(text)}
              style={styles.txtSearchBar}
              placeholder={"Search Table..."}
            />
          </View>

          <TouchableOpacity style={styles.btnImgFillter}>
            <Image source={FillterIconResouce} style={styles.imgIconFillter} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.containerBottom}>
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
      </View>
    </ScrollView>
  );
};

export default SelectedTable;

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
    color: "#000000",
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
