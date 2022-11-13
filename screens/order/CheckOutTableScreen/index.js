import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ImageBackground,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
  } from 'react-native';
  import React, { useEffect, useState } from 'react';
  import Colors from '../../assets/Colors';
  import CustomModal from '../../custom component/CustomModal';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import axios from 'axios';
  import styles from './style';
  
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const imgTagSource = require('../../assets/icons/Tag2.png');
  const imgCloseSource = require('../../assets/icons/close.png');
  const imgBackgroundSource = require('../../assets/images/background.png');
  const maxWidthConst = windowWidth - 20;
  
  const DATA = [
    {
      id: 1,
      nameDish: 'Pizza',
      NumberDish: 2,
      _NumberDish: '2',
      PriceDish: 3.0,
      _PriceDish: '3.0',
    },
    {
      id: 2,
      nameDish: 'Pizzaaaaa',
      NumberDish: 4,
      _NumberDish: '4',
      PriceDish: 3.5,
      _PriceDish: '3.55',
    },
    {
      id: 3,
      nameDish: 'Pizza',
      NumberDish: 1,
      _NumberDish: '1',
      PriceDish: 3.2,
      _PriceDish: '3.2',
    },
    {
      id: 3,
      nameDish: 'Pizza',
      NumberDish: 1,
      _NumberDish: '1',
      PriceDish: 3.2,
      _PriceDish: '3.2',
    },
    {
      id: 3,
      nameDish: 'Pizza',
      NumberDish: 1,
      _NumberDish: '1',
      PriceDish: 3.2,
      _PriceDish: '3.2',
    },
    {
      id: 3,
      nameDish: 'Pizza',
      NumberDish: 1,
      _NumberDish: '1',
      PriceDish: 3.2,
      _PriceDish: '3.2',
    },
    {
      id: 3,
      nameDish: 'Pizza',
      NumberDish: 1,
      _NumberDish: '1',
      PriceDish: 3.2,
      _PriceDish: '3.2',
    },
    {
      id: 3,
      nameDish: 'Pizza',
      NumberDish: 1,
      _NumberDish: '1',
      PriceDish: 3.2,
      _PriceDish: '3.2',
    },
    {
      id: 3,
      nameDish: 'Pizza',
      NumberDish: 1,
      _NumberDish: '1',
      PriceDish: 3.2,
      _PriceDish: '3.2',
    },
  ];
  
  const FlatlistItem = ({ item }) => {
    return (
      <View style={styles.containerItemMapList}>
        <View style={styles.containerNumberDish}>
          <Text style={styles.txtNumberDishItemMap}>{item.quantity}</Text>
        </View>
        <Text style={styles.txtNameDishItemMap}>{item.name}</Text>
        <Text style={styles.txtPriceDishItemMap}>${item.price}</Text>
      </View>
    );
  };
  
  const CheckOutTableScreen = ({ route, discount, navigation }) => {
    const handleCheckOut = async (totalBill) => {
      const id = await AsyncStorage.getItem('tableIDBill');
      console.log('oke');
      console.log(id);
  
      const res = await axios.post(
        `https://foody-uit.herokuapp.com/order/getCurrentOrderID`,
        {
          tableID: id,
        }
      );
      const orderID = res.data.message;
      if (orderID) {
        const res = await axios.post(
          `https://foody-uit.herokuapp.com/bill/createBill`,
          {
            orderID: orderID,
            total: totalBill,
            status: 'pay',
          }
        );
        const res1 = await axios.put(
          `https://foody-uit.herokuapp.com/order/updateOrder`,
          {
            id: orderID,
          }
        );
        const res2 = await axios.put(
          `https://foody-uit.herokuapp.com/table/updateBusyTable`,
          {
            id: id,
            isBusy: false,
          }
        );
        const success = res.data.success;
        const success1 = res1.data.success;
        const success2 = res2.data.success;
  
        if (success && success1 && success2) {
          setVisible(true);
        }
      }
    };
    const [dataFromState, setNewData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
  
    useEffect(() => {
      const getData = async () => {
        const id = await AsyncStorage.getItem('tableIDBill');
        console.log('oke');
        console.log(id);
        if (id) {
          const resOrderID = await axios.post(
            `https://foody-uit.herokuapp.com/order/getCurrentOrderID`,
            {
              tableID: id,
            }
          );
          const orderID = resOrderID.data.message;
          const res = await axios.post(
            `https://foody-uit.herokuapp.com/orderInfo/getOrderInfo`,
            {
              orderID: orderID,
            }
          );
          const { success, message } = res.data;
          console.log(message);
          console.log('success ' + success);
          if (success) {
            setNewData(message);
            setRefreshing(false);
            console.log('filteredData is all selected');
          } else {
            console.log('None');
            setNewData([]);
            setRefreshing(false);
            console.log('filteredData is all selected');
          }
        }
      };
      getData().catch((err) => console.log(err));
    }, [refreshing]);
    const { item } = route.params;
    let title = item.name;
    const [visible, setVisible] = useState(false);
    function getTotalBill(DATAList) {
      var _totalBill = 0;
  
      for (let _item of DATAList) {
        let _subTotal = _item.price * _item.quantity;
        _totalBill += _subTotal;
      }
      return _totalBill;
    }
    var tempTotal;
    discount = 0;
    if (discount > 0) {
      tempTotal = getTotalBill(dataFromState) * (discount / 100);
    } else {
      tempTotal = getTotalBill(dataFromState);
    }
    let finalDiscount = discount.toString() + '%';
  
    function displayListItemBill(ListData) {
      ListData = DATA;
      return ListData.map((_itemListData) => {
        return (
          <View style={styles.containerItemMapList}>
            <View style={styles.containerNumberDish}>
              <Text style={styles.txtNumberDishItemMap}>
                {_itemListData.NumberDish}
              </Text>
            </View>
            <Text style={styles.txtNameDishItemMap}>
              {_itemListData.nameDish}
            </Text>
            <Text style={styles.txtPriceDishItemMap}>
              ${_itemListData.PriceDish}
            </Text>
          </View>
        );
      });
    }
    const handleSave = () => {
      navigation.goBack();
    };
    return (
      <View style={styles.container}>
        <ImageBackground
          source={imgBackgroundSource}
          style={styles.imgBackgroundSourceStyle}
        >
          <View style={styles.containerHeader}>
            <ImageBackground
              source={imgTagSource}
              style={styles.imgTagSourceStyle}
            >
              <Text style={styles.txtTitle}>{title}</Text>
            </ImageBackground>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.btnCloseScreen}
            >
              <Image
                source={imgCloseSource}
                style={styles.imgCloseSourceStyle}
              ></Image>
            </TouchableOpacity>
          </View>
          <View style={styles.containerFlatListStyle}>
            <FlatList
              refreshing={refreshing}
              onRefresh={() => setRefreshing(true)}
              style={styles}
              data={dataFromState}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => <FlatlistItem item={item} />}
            />
          </View>
          <View style={styles.DevideLineStyle}></View>
          <View style={styles.containerBottom}>
            <View style={styles.containerDiscount}>
              <Text style={styles.txtDiscount}>Discount</Text>
              <Text style={styles.txtDiscountInfo}>{finalDiscount}</Text>
            </View>
            <View style={styles.containerTotals}>
              <Text style={styles.txtTotal}>Total</Text>
              <Text style={styles.txtTotalInfo}>${tempTotal}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                handleCheckOut(tempTotal);
              }}
              style={styles.btnCheckOutStyle}
            >
              <Text style={styles.txtCheckOutStyle}>Checkout</Text>
            </TouchableOpacity>
          </View>
          {/* Modal view */}
          <CustomModal visible={visible}>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../../assets/icons/save-green.png')}
                style={{ height: 150, width: 150, marginVertical: 30 }}
              />
            </View>
  
            <Text
              style={{ marginVertical: 30, fontSize: 20, textAlign: 'center' }}
            >
              Checkout successfully.!!!
            </Text>
            <TouchableOpacity
              onPress={() => {
                handleSave();
                setVisible(false);
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>OK!</Text>
            </TouchableOpacity>
          </CustomModal>
        </ImageBackground>
      </View>
    );
  };
  
  export default CheckOutTableScreen;