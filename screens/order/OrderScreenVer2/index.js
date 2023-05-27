import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Pressable,
  TextInput,
  FlatList,
  SafeAreaView,
  Alert,
  Dimensions,
} from "react-native";
import { useIsFocused } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import styled, { ThemeProvider, withTheme } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import CustomModal from "../../../custom component/CustomModal";
import styles from "./style";
import { getAPIActionJSON } from "../../../api/ApiActions";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const imgAddItem = require("../../../assets/icons/AddItem.png");
const SearchIconResouce = require("../../../assets/icons/SearchGray.png");

const OrderScreenUpdate1 = ({ navigation }) => {
  const isFocus = useIsFocused();
  const dispatch = useDispatch();
  const restaurantID = useSelector((state) => state.user.restaurantID);
  const role = useSelector((state) => state.user.role);
  const [search, setSearch] = useState("");
  const theme = useSelector((state) => state.setting.theme);
  const [dataFromState, setNewData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [modalAdjustTableVisibleConfirm, setModalAdjustTableVisibleConfirm] =
    useState(false);
  const [
    modalOpenMenuOrderScreenTableConfirm,
    setModalOpenMenuOrderScreenTableConfirm,
  ] = useState(false);
  const [tableSelectedAdjust, setTableSelectedAdjust] = useState("");
  const handleResponse = (response) => {
    if (!response.success) {
      Alert.alert(response.message);
      return;
    }
    setNewData(response.data);
    setMasterData(response.data);
  };
  const getData = () => {
    dispatch(
      getAPIActionJSON("getAllTable", null, null, `/${restaurantID}`, (e) =>
        handleResponse(e)
      )
    );
  };
  useEffect(() => {
    getData();
  }, [isFocus]);

  const searchFilterFunction = (text) => {
    if (text) {
      const newList = masterData.filter((item) => item.name.includes(text));
      setNewData(newList);
      setSearch(text);
    } else {
      setNewData(masterData);
      setSearch(text);
    }
  };

  const FlatlistItemFunctions = ({ item }) => {
    if (item.isBusy === true) {
      return (
        <View>
          <Pressable
            onPress={() => {
              navigation.navigate("CheckOutTableScreen", { item });
            }}
            onLongPress={() => {
              setTableSelectedAdjust(item);
              setModalOpenMenuOrderScreenTableConfirm(true);
            }}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.5 : 1,
              },
              styles.flatlistitemStyleInUse,
            ]}
          >
            <View>
              <Image
                source={require("../../../assets/icons/TableOrange.png")}
                style={styles.imgItemFlatlist}
              />
              <Text style={styles.txtItemFlatlistInUse}>{item.name}</Text>
            </View>
          </Pressable>
        </View>
      );
    }

    return (
      <View>
        <Pressable
          delayLongPress={1000}
          onLongPress={() => {
            setTableSelectedAdjust(item.name);
            setModalAdjustTableVisibleConfirm(true);
          }}
          onPress={() => {
            navigation.navigate("MenuOrderScreen", { item });
          }}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.5 : 1,
            },
            styles.flatlistitemStyle,
          ]}
        >
          <View>
            <Image
              source={require("../../../assets/icons/TableGray.png")}
              style={styles.imgItemFlatlist}
            />
            <Text style={styles.txtItemFlatlist}>{item.name}</Text>
          </View>
        </Pressable>
      </View>
    );
  };

  const handleConfirmAdjustTableInfo = () => {
    setModalAdjustTableVisibleConfirm(false);
    navigation.navigate("EditTableInfoScreenRework1", {
      table: tableSelectedAdjust,
    });
  };
  const handleConfirmMoreOrder = () => {
    setModalOpenMenuOrderScreenTableConfirm(false);
    navigation.navigate("MenuOrderScreen", { item: tableSelectedAdjust });
  };

  return (
    // Root View
    <ThemeProvider theme={theme}>
      <Container>
        <View style={styles.containerTop}>
          <Text style={styles.txtHeaderView}>TABLE</Text>
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

            {role === "owner" ? (
              <TouchableOpacity
                onPress={() => navigation.navigate("AddingTable")}
                style={styles.btnImgFillter}
              >
                <Image source={imgAddItem} style={styles.imgIconFillter} />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        <ContainerBottom>
          <FlatList
            style={{ height: "100%" }}
            data={dataFromState}
            renderItem={({ item, index }) => {
              return (
                <FlatlistItemFunctions
                  item={item}
                  index={index}
                ></FlatlistItemFunctions>
              );
            }}
            keyExtractor={(item) => item.name}
            nestedScrollEnabled
            numColumns={2}
          />
        </ContainerBottom>

        {/* Modal Confirm Adjust Table */}
        <CustomModal visible={modalAdjustTableVisibleConfirm}>
          <View
            style={{
              alignSelf: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../../assets/icons/QuestionMarkOrange.png")}
              style={{ height: 150, width: 150, marginVertical: 30 }}
            />
            {theme.mode === "light" ? (
              <Text
                style={{
                  marginVertical: 30,
                  fontSize: 20,
                  textAlign: "center",
                }}
              >
                Do you want to adjust table name '{tableSelectedAdjust}' ?
              </Text>
            ) : (
              <Text
                style={{
                  marginVertical: 30,
                  fontSize: 20,
                  textAlign: "center",
                  color: "white",
                }}
              >
                Do you want to adjust table name '{tableSelectedAdjust}' ?
              </Text>
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "center",
                justifyContent: "space-between",
              }}
            >
              {/* Button Ok */}
              <TouchableOpacity
                onPress={() => handleConfirmAdjustTableInfo()}
                style={styles.button}
              >
                <Text style={styles.buttonText}>OK</Text>
              </TouchableOpacity>
              {/* Button Cancel */}
              <TouchableOpacity
                onPress={() => {
                  setModalAdjustTableVisibleConfirm(false);
                }}
                style={styles.button1}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </CustomModal>
        {/* Modal Confirm Adding More Order ~ Modal Confirm More Ordered With Table Already Ordered */}
        <CustomModal visible={modalOpenMenuOrderScreenTableConfirm}>
          <View
            style={{
              alignSelf: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../../assets/icons/orderSticker.png")}
              style={{ height: 150, width: 150, marginVertical: 30 }}
            />
            {theme.mode == "light" ? (
              <Text
                style={{
                  marginVertical: 30,
                  fontSize: 20,
                  textAlign: "center",
                  flexWrap: "wrap",
                }}
              >
                Do you want to place more orders with table name '
                {tableSelectedAdjust.name}' ?
              </Text>
            ) : (
              <Text
                style={{
                  marginVertical: 30,
                  fontSize: 20,
                  textAlign: "center",
                  flexWrap: "wrap",
                  color: "white",
                }}
              >
                Do you want to place more orders with table name '
                {tableSelectedAdjust.name}' ?
              </Text>
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "center",
                justifyContent: "space-between",
              }}
            >
              {/* Button Ok */}
              <TouchableOpacity
                onPress={() => handleConfirmMoreOrder()}
                style={styles.button}
              >
                <Text style={styles.buttonText}>OK</Text>
              </TouchableOpacity>
              {/* Button Cancel */}
              <TouchableOpacity
                onPress={() => {
                  setModalOpenMenuOrderScreenTableConfirm(false);
                }}
                style={styles.button1}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </CustomModal>
      </Container>
    </ThemeProvider>
  );
};

export default OrderScreenUpdate1;

const ContainerBottom = styled.View`
  border-top-left-radius: 30;
  border-top-right-radius: 30;
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_ACCOUNT_COLOR};
  justify-content: center;
  align-items: center;
  margin-top: -40;
  padding-top: 20;
  padding-left: 10;
`;
const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_ACCOUNT_COLOR};
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
