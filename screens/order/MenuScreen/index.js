import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    FlatList,
    Alert,
  } from 'react-native';
  import React, { useState, useEffect } from 'react';
  import Colors from '../../assets/Colors';
  import { LinearGradient } from 'expo-linear-gradient';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import axios from 'axios';
  import { useIsFocused } from '@react-navigation/core';
  import styles from './style';

  const maxWidthConst = windowWidth - 10;
  const imgAddItem = require('../../assets/icons/AddItem.png');
  const imgUserSource = require('../../assets/icons/user.png');
  const imgGoBackSource = require('../../assets/icons/back.png');
  const icStar = require('../../assets/icons/Star.png');
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const maxWidth40 = windowWidth - 30;
  const imgSearchSource = require('../../assets/icons/search.png');
  
  const MenuScreen = ({ navigation }) => {
    const isFocus = useIsFocused();
    const [dataFromState, setNewData] = useState([]);
    const [search, setSearch] = useState('');
    const [masterData, setMasterData] = useState([]);
    const [isAuthorized, setIsAuthorized] = useState(false);
    useEffect(() => {
      const getData = async () => {
        const userLoginData = await AsyncStorage.getItem('userLoginData');
        const user = JSON.parse(userLoginData);
        const userLoginRole = await AsyncStorage.getItem('userLoginRole');
        console.log('userrole: ' + userLoginRole);
        if (userLoginRole === 'owner' || userLoginRole === 'chef') {
          setIsAuthorized(true);
        }
        console.log('username: ' + user.username);
        const res = await axios.post(
          `https://foody-uit.herokuapp.com/food/getAllFoodWithType`,
          {
            username: user.username,
            foodType: 'Main course',
          }
        );
  
        const { success, message } = res.data;
        if (!success) {
          Alert.alert('Error', message);
          return;
        }
        console.log('filteredData is all selected');
        setNewData(message);
        setMasterData(message);
      };
      getData().catch((err) => console.log(err));
    }, [isFocus]);
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
  
    function HeaderViewTab({ HeaderText }) {
      return (
        <View style={styles.containerHeaderViewTab}>
          <TouchableOpacity
            style={styles.btnGoBack}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image source={imgGoBackSource} style={styles.imgGoBackStyle} />
          </TouchableOpacity>
  
          <Text style={styles.txtHeaderViewTab}>{HeaderText}</Text>
          <TouchableOpacity
            style={styles.btnUserStyle}
            onPress={() => {
              navigation.navigate('AddingMenuItemScreen');
            }}
          >
            {isAuthorized && (
              <Image source={imgAddItem} style={styles.imgUserStyle} />
            )}
          </TouchableOpacity>
        </View>
      );
    }
  
    function InformationViewTab({ TextInFo1, TextInFo2 }) {
      return (
        <View style={styles.containerInfoViewTab}>
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              alignSelf: 'center',
            }}
          >
            {TextInFo1}
          </Text>
          <Text>{TextInFo2}</Text>
        </View>
      );
    }
  
    function SearchBarViewComponent() {
      return (
        <View style={styles.containerSearchViewComponent}>
          <View
            style={{
              alignSelf: 'center',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              direction: 'inherit',
              flexWrap: 'wrap-reverse',
              flex: 1,
              alignSelf: 'center',
              maxWidth: '95%',
              marginBottom: '2%',
              paddingHorizontal: '5%',
            }}
          >
            <TouchableOpacity style={styles.btnSearchStyle}>
              <Image source={imgSearchSource} style={styles.imgSearchStyle} />
            </TouchableOpacity>
            <TextInput
              placeholder="Search Menu..."
              value={search}
              onChangeText={(text) => searchFilterFunction(text)}
              underlineColorAndroid="transparent"
              style={{
                flex: 9,
              }}
            ></TextInput>
          </View>
        </View>
      );
    }
  
    const FlatListItem = ({ item }) => {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate('EditMenuScreen', { item })}
        >
          <View style={styles.containerItemFlatList}>
            <View style={styles.containerImageItem}>
              <Image
                source={{ uri: item.imagePath }}
                style={styles.imgSourceItem}
              />
            </View>
  
            <View style={styles.containerInfoItem}>
              <Text style={styles.txtNameDishItem}>{item.name}</Text>
              <View style={styles.containerRatingItem}>
                <Text style={styles.txtPriceItemInfo2}>${item.price}</Text>
                <Image source={icStar} style={styles.imgStarItem} />
              </View>
  
              <View style={styles.containerPriceItem}></View>
            </View>
          </View>
        </TouchableOpacity>
      );
    };
  
    return (
      <LinearGradient
        style={styles.container}
        colors={[Colors.ImperialRed, Colors.DarkOrange]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        {HeaderViewTab({ HeaderText: 'Menu Of the day' })}
        {InformationViewTab({ TextInFo1: 'Have a good day!' })}
        {SearchBarViewComponent()}
        <View style={styles.containerDevideLine}></View>
        <View style={styles.containerInfoItem1}>
          <FlatList
            data={dataFromState}
            renderItem={({ item, index }) => {
              return <FlatListItem item={item} index={index} />;
            }}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </LinearGradient>
    );
  };
  
  export default MenuScreen;