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


const imgBtnOrange = require('../assets/icons/ButtonOrange.png');
// ------------------Flatlist item Render layout----------------------

const StarterMenuScreen = () => {
  const navigation = useNavigation();

  const btnCloseResource = require('../assets/icons/close.png');
  const btnFillterResource = require('../assets/icons/fillter.png');

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
        <View>
          <Text style={styles.txtNameItemFlatlist}>{item.name}</Text>
          {/* <Text style={styles.txtDetailItemFlatlist}>{item.detail}</Text> */}
          <Text style={styles.txtPriceItemFlatlist}>${item.price}</Text>
        </View>

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

          <Text style={styles.txtQuantityItem}> {counter} </Text>
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
    <SafeAreaView style={styles.droidSafeArea}>
      {/* --------------------------Header title section (1st section)----------------------------- */}
      <View style={styles.container_header}>
        <Text style={styles.txtTitle}>Starter</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.imgBtnCloseStyle}
        >
          <Image source={btnCloseResource} />
        </TouchableOpacity>
      </View>

      {/* ----------------------Search and pick-up item section (2nd section)---------------------- */}
      <ScrollView style={styles.scrollviewStyle}>
        {/* ---------------Search section layout--------------- */}
        <View style={styles.containerSearchView}>
          <TextInput
            style={styles.txtInpSearch}
            value={search}
            onChangeText={(text) => searchFilterFunction(text)}
            placeholder="Search..."
          />
          <TouchableOpacity style={styles.imaBtnFillter}>
            <Image source={btnFillterResource} />
          </TouchableOpacity>
        </View>

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
      </ScrollView>
    </SafeAreaView>
  );
};

export default StarterMenuScreen;

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
    backgroundColor: '#fff',
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
    marginHorizontal: '2%',
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

    color: '#000000',
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
