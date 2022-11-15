import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
  Image,
  Text,
  View,
  ImageBackground,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { render } from 'react-dom';
import styles from './style';
import styled, { ThemeProvider } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

// --------------- item data ----------------
const DATA = [
  {
    id: '1',
    name: 'The Macdonalds',
    detail: 'classic chesse buger',
    price: '4.99',
    imgSource: require('../../../assets/images/crispy-chicken-burger.jpg'),
  },
  {
    id: '2',
    name: 'The Macdonalds',
    detail: 'classic chesse buger',
    price: '5.99',
    imgSource: require('../../../assets/images/crispy-chicken-burger.jpg'),
  },
  {
    id: '3',
    name: 'The Macdonalds',
    detail: 'classic chesse buger',
    price: '6.99',
    imgSource: require('../../../assets/images/crispy-chicken-burger.jpg'),
  },
  {
    id: '4',
    name: 'Sushi',
    detail: 'classic chesse buger',
    price: '7.99',
    imgSource: require('../../../assets/images/crispy-chicken-burger.jpg'),
  },
  {
    id: '5',
    name: 'Cơm rang',
    detail: 'Ngon vl chứ còn cc j nữa',
    price: '8.99',
    imgSource: require('../../../assets/images/1512474034-837-bua-sang-chac-da-voi-com-chien-ca-hoi-mem-toi-bo-duong-_mg_8357-1512473926-width660height440.jpg'),
  },
];

const imgBtnOrange = require('../../../assets/icons/ButtonOrange.png');
// ------------------Flatlist item Render layout----------------------

const MainCourseMenuScreen = () => {
  const navigation = useNavigation();
  const btnCloseResource = require('../../../assets/icons/close.png');
  const btnFillterResource = require('../../../assets/icons/fillter.png');
  const IcCloseDark = require('../../../assets/icons/CancelDark.png');
  const IcCloseLight = require('../../../assets/icons/cancelLight.png');
  const FillterIconResouce = require('../../../assets/icons/fillter.png');
  const FillterDarkTheme = require('../../../assets/icons/FillterDark.png');
  const theme = useSelector((state) => state.themeReducer.theme);
  const [search, setSearch] = useState('');
  const [masterData, setMasterData] = useState([]);
  const [dataFromState, setNewData] = useState([]);
  const handleApply = () => {
    const createOrUpdateOrderInfo = async () => {
      const data = [];
      for (let i = 0; i < dataFromState.length; i++) {
        if (dataFromState[i].quantity > 0) data.push(dataFromState[i]);
      }
      const id = await AsyncStorage.getItem('tableID');
      const resGetCurrentOrder = await axios.post(
        `https://foody-uit.herokuapp.com/order/getCurrentOrderID`,
        {
          tableID: id,
        }
      );
      const successGetCurrentOrder = resGetCurrentOrder.data.success;
      const orderID = resGetCurrentOrder.data.message;
      console.log('Current order: ' + successGetCurrentOrder);
      console.log('Current orderID: ' + orderID);

      if (!successGetCurrentOrder) {
        const res1 = await axios.post(
          `https://foody-uit.herokuapp.com/order/createOrder`,
          {
            tableID: id,
          }
        );
        const res2 = await axios.put(
          `https://foody-uit.herokuapp.com/table/updateBusyTable`,
          {
            id: id,
            isBusy: true,
          }
        );
        var success1 = res1.data.success;
        var message1 = res1.data.message;
        var success2 = res2.data.success;
        var message2 = res2.data.message;
      }
      console.log(message1);
      console.log(success1);
      console.log(message2);
      console.log(success2);
      const res = await axios.post(
        `https://foody-uit.herokuapp.com/orderInfo/createOrderInfo`,
        {
          foodInfo: data,
          orderID: orderID,
        }
      );
      const { success, message } = res.data;
      console.log(message);
      console.log(success);
      navigation.goBack();
    };
    createOrUpdateOrderInfo().catch((err) => console.log(err));
  };
  useEffect(() => {
    const getData = async () => {
      const userLoginData = await AsyncStorage.getItem('userLoginData');
      const user = JSON.parse(userLoginData);
      console.log('username: ' + user.username);
      const res = await axios.post(
        `https://foody-uit.herokuapp.com/food/getAllFoodWithType`,
        {
          username: user.username,
          foodType: 'Main course',
        }
      );
      const { success, message } = res.data;
      console.log(message);
      console.log(success);
      setNewData(message);
      setMasterData(dataFromState);
      console.log('filteredData is all selected');
    };
    getData().catch((err) => console.log(err));
  }, []);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterData.filter(function (item) {
        const itemData = item.name ? item.name.toLowerCase() : ''.toUpperCase();
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

    const [counter, setCounter] = useState(0);
    return (
      <View style={styles.flatlistItemView}>
        <View>
          {/* Image item section */}
          <Image
            style={styles.containerImageItem}
            source={{ uri: item.imagePath }}
          />
        </View>

        {/* Item detail section */}
        {theme.mode === 'light' ? (
          <View>
            <Text style={styles.txtNameItemFlatlist}>{item.name}</Text>
            <Text style={styles.txtDetailItemFlatlist}>{item.detail}</Text>
            <Text style={styles.txtPriceItemFlatlist}>${item.price}</Text>
          </View>
        ) : (
          <View>
            <Text style={styles.txtNameItemFlatlistDarkTheme}>{item.name}</Text>
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
          {theme.mode === 'light' ? (
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
    <ThemeProvider theme={theme}>
      <Container>
        {/* --------------------------Header title section (1st section)----------------------------- */}
        <ContainerHeader>
          <ContentHeader>Main Course</ContentHeader>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.imgBtnCloseStyle}
          >
            <Image source={btnCloseResource} />
          </TouchableOpacity>
        </ContainerHeader>

        {/* ----------------------Search and pick-up item section (2nd section)---------------------- */}
        <ContainerScrollView>
          {/* ---------------Search section layout--------------- */}
          <ContainerSearch>
            {theme.mode === 'light' ? (
              <TextInput
                style={styles.txtInpSearch}
                value={search}
                onChangeText={(text) => searchFilterFunction(text)}
                placeholder="Search..."
                placeholderTextColor="#8A8A8A"
              />
            ) : (
              <TextInput
                style={styles.txtInpSearchDark}
                value={search}
                onChangeText={(text) => searchFilterFunction(text)}
                placeholder="Search..."
                placeholderTextColor="#8A8A8A"
              />
            )}
            <TouchableOpacity style={styles.imaBtnFillter}>
              {theme.mode === 'light' ? (
                <Image
                  source={FillterIconResouce}
                  style={styles.imgIconFillter}
                />
              ) : (
                <Image
                  source={FillterDarkTheme}
                  style={styles.imgIconFillter}
                />
              )}
            </TouchableOpacity>
          </ContainerSearch>

          {/* ----------------List item section----------------- */}
          <FlatList
            style={styles.containerListItemView}
            data={dataFromState}
            renderItem={({ item, index }) => {
              return <FlatlistItem item={item} index={index}></FlatlistItem>;
            }}
            keyExtractor={(item) => item.id}
          />
          {/* ---------------Btn Apply item in flatlist--------- */}
          <TouchableOpacity onPress={handleApply}>
            <View style={styles.containerBtnApply}>
              <Text style={styles.txtBtnApply}>Apply</Text>
            </View>
          </TouchableOpacity>
        </ContainerScrollView>
      </Container>
    </ThemeProvider>
  );
};

export default MainCourseMenuScreen;

const Container = styled.View`
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_ACCOUNT_COLOR};
  flex: 1;
  padding-top: 8%;
`;
const ContainerHeader = styled.View`
  height: 70;
  flex-direction: row;
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_ACCOUNT_COLOR};
  justify-content: space-between;
`;
const ContainerScrollView = styled.ScrollView`
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_ACCOUNT_COLOR};
  flex-direction: column;
  flex: 1;
`;
const ContainerSearch = styled.View`
  height: 100;
  flex-direction: row;
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_ACCOUNT_COLOR};
  justify-content: space-between;
  align-items: center;
  align-self: center;
  margin-top: -20;
`;
const ContentHeader = styled.Text`
  margin-left: 30;
  justify-content: center;
  align-items: center;
  align-self: center;
  font-size: 25;
  font-weight: bold;
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
`;
