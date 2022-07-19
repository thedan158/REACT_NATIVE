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
import styled, { ThemeProvider } from "styled-components";
import { useSelector, useDispatch } from "react-redux";

// --------------- item data ----------------
const DATA = [
  {
    id: '1',
    name: 'The Macdonalds',
    detail: 'classic chesse buger',
    price: '4.99',
    imgSource: require('../assets/images/crispy-chicken-burger.jpg'),
  },
  {
    id: '2',
    name: 'The Macdonalds',
    detail: 'classic chesse buger',
    price: '5.99',
    imgSource: require('../assets/images/crispy-chicken-burger.jpg'),
  },
  {
    id: '3',
    name: 'The Macdonalds',
    detail: 'classic chesse buger',
    price: '6.99',
    imgSource: require('../assets/images/crispy-chicken-burger.jpg'),
  },
  {
    id: '4',
    name: 'Sushi',
    detail: 'classic chesse buger',
    price: '7.99',
    imgSource: require('../assets/images/crispy-chicken-burger.jpg'),
  },
  {
    id: '5',
    name: 'Cơm rang',
    detail: 'Ngon vl chứ còn cc j nữa',
    price: '8.99',
    imgSource: require('../assets/images/1512474034-837-bua-sang-chac-da-voi-com-chien-ca-hoi-mem-toi-bo-duong-_mg_8357-1512473926-width660height440.jpg'),
  },
];

const imgBtnOrange = require('../assets/icons/ButtonOrange.png');
// ------------------Flatlist item Render layout----------------------

const StarterMenuScreen = () => {
  const navigation = useNavigation();
  const theme = useSelector((state) => state.themeReducer.theme);
  const IcCloseDark = require('../assets/icons/CancelDark.png');
  const IcCloseLight = require('../assets/icons/cancelLight.png');
  const FillterIconResouce = require('../assets/icons/fillter.png');
  const FillterDarkTheme = require('../assets/icons/FillterDark.png');

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
      console.log('id', id);
      var resGetCurrentOrder = await axios.post(
        `https://foody-uit.herokuapp.com/order/getCurrentOrderID`,
        {
          tableID: id,
        }
      );
      var successGetCurrentOrder = resGetCurrentOrder.data.success;
      var orderID = resGetCurrentOrder.data.message;
      console.log('Current order: ' + successGetCurrentOrder);
      console.log('Current orderID: ' + orderID);

      while (!successGetCurrentOrder) {
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
        resGetCurrentOrder = await axios.post(
          `https://foody-uit.herokuapp.com/order/getCurrentOrderID`,
          {
            tableID: id,
          }
        );
        successGetCurrentOrder = resGetCurrentOrder.data.success;
        orderID = resGetCurrentOrder.data.message;
        console.log('update busy: ' + message2);
        console.log('Current order: ' + successGetCurrentOrder);
        console.log('Current orderID: ' + orderID);
        console.log(message1);
        console.log(success1);
        console.log(success2);
      }

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
          foodType: 'Starter',
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
              {/* <Text style={styles.txtDetailItemFlatlist}>{item.detail}</Text> */}
              <Text style={styles.txtPriceItemFlatlist}>${item.price}</Text>
            </View>
          ) : (
            <View>
              <Text style={styles.txtNameItemFlatlistDarkTheme}>{item.name}</Text>
              {/* <Text style={styles.txtDetailItemFlatlistDarkTheme}>{item.detail}</Text> */}
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
        <ContentHeader>Starter</ContentHeader>
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
      <Container2ndSection>
        {/* ---------------Search section layout--------------- */}
        <ContainerSearchFill>
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
                    <Image source={FillterIconResouce} style={styles.imgIconFillter} />
                  ) : (
                    <Image source={FillterDarkTheme} style={styles.imgIconFillter} />
                  )}
          </TouchableOpacity>
        </ContainerSearchFill>

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
      </Container2ndSection>
    </Container>
    </ThemeProvider>
    
  );
};

export default StarterMenuScreen;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  elevation: 8;
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_ACCOUNT_COLOR};
  padding-top: 7%;
`
const ContainerHeader = styled.View`
  height: 70;
  flex-direction: row;
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_ACCOUNT_COLOR};
  justify-content: space-between;

`
const ContentHeader = styled.Text`
  margin-left: 30;
  justify-content: center;
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
  align-items: center;
  align-self: center;
  font-size: 25;
  font-weight: bold;
`
const Container2ndSection = styled.ScrollView`
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_ACCOUNT_COLOR};
  flex-direction: column;
  flex: 1;
`
const ContainerSearchFill = styled.View`
  height: 100;
  flex-direction: row;
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_ACCOUNT_COLOR};
  justify-content: space-between;
  align-items: center;
  align-self: center;
  margin-top: -20;
`


const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 0,
    justifyContent: 'center',
    elevation: 8,
    margin: 0,
    paddingTop: Platform.OS === 'Android' ? StatusBar.currentHeight : 0,
  },
  container_header: {
    height: 70,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  containerSearchView: {
    height: 100,
    flexDirection: 'row',
    backgroundColor: '#000',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: -20,
  },
  containerImageItem: {
    height: 70,
    width: 78,
    marginLeft: 10,
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  containerListItemView: {
    padding: 10,
  },
  containerBtnAdjust: {
    justifyContent: 'center',
    flexDirection: 'row',
    elevation: 1,
    marginLeft: 0,
    marginRight: '2%',
  },
  containerBtnApply: {
    backgroundColor: '#F8774A',
    borderRadius: 25,
    height: 40,
    width: 105,
    marginTop: 10,
    marginLeft: 240,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  scrollviewStyle: {
    backgroundColor: '#FFf',
    flexDirection: 'column',
    flex: 1,
  },
  flatlistItemView: {
    height: 110,
    width: 330,
    flex: 1,
    borderRadius: 30,
    borderWidth: 2,
    margin: 5,
    borderColor: '#808080',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
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
  txtTitle: {
    marginLeft: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },
  txtBtnApply: {
    fontSize: 14,
    color: '#fff',
  },
  txtInpSearch: {
    marginLeft: 10,
    height: 55,
    marginRight: 10,
    width: 280,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E1D9D1',
    paddingLeft: 25,
    fontSize: 18,
    color: "#8A8A8A",
  },

  txtInpSearchDark:{
    marginLeft: 10,
    height: 55,
    marginRight: 10,
    width: 280,
    backgroundColor: '#313133',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E1D9D1',
    paddingLeft: 25,
    fontSize: 18,
    color: "#8A8A8A",
  },
  txtDetailItemFlatlist: {
    fontSize: 12,
    color: '#3D3D3D',
  },
  txtNameItemFlatlist: {
    fontSize: 16,
    color: '#3D3D3D',
    fontWeight: 'bold',
  },
  txtNameItemFlatlistDarkTheme: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  txtDetailItemFlatlistDarkTheme: {
    fontSize: 12,
    color: "#fff",
  },
  txtPriceItemFlatlist: {
    fontSize: 18,
    color: '#F3554A',
    fontWeight: 'bold',
  },
  btnDel: {
    justifyContent: 'center',
    color: '#FFF',
    fontSize: 16,
    zIndex: 1,
    alignSelf: 'center',
  },
  btnAdd: {
    height: 24,
    width: 24,
    backgroundColor: '#F9881F',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 90,
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: 10,
    marginLeft: 5,
    elevation: 3,
  },
  imgBtnCloseStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: 20,
  },
  imaBtnFillter: {
    marginRight: 10,
  },
  imgBtnOrangeStyle: {
    width: 24,
    height: 24,
    resizeMode: 'cover',
    zIndex: 2,
  },
});
