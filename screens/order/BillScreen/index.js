import {
  StyleSheet,
  FlatList,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Colors from '../../../assets/Colors';
import ModalTableSelect from '../../../custom component/ModalTableSelect';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from './style';

import styled, { ThemeProvider } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

const SearchIconResouce = require('../../../assets/icons/SearchGray.png');
const FillterIconResouce = require('../../../assets/icons/fillter.png');
const FillterDarkTheme = require('../../../assets/icons/FillterDark.png');

const DataTable = [
  {
    id: 1,
    name: 'Table 1',
    imgSourceSelected: require('../../../assets/icons/TableOrange.png'),
    imgSourceEmpty: require('../../../assets/icons/TableGray.png'),
    isBusy: true,
  },
  {
    id: 2,
    name: 'Table 2',
    imgSourceSelected: require('../../../assets/icons/TableOrange.png'),
    imgSourceEmpty: require('../../../assets/icons/TableGray.png'),
    isBusy: false,
  },
  {
    id: 3,
    name: 'Table 3',
    imgSourceSelected: require('../../../assets/icons/TableOrange.png'),
    imgSourceEmpty: require('../../../assets/icons/TableGray.png'),
    isBusy: true,
  },
  {
    id: 4,
    name: 'Table 4',
    imgSourceSelected: require('../../../assets/icons/TableOrange.png'),
    imgSourceEmpty: require('../../../assets/icons/TableGray.png'),
    isBusy: false,
  },
  {
    id: 5,
    name: 'Table 5',
    imgSourceSelected: require('../../../assets/icons/TableOrange.png'),
    imgSourceEmpty: require('../../../assets/icons/TableGray.png'),
    isBusy: true,
  },
  {
    id: 6,
    name: 'Table 6',
    imgSourceSelected: require('../../../assets/icons/TableOrange.png'),
    imgSourceEmpty: require('../../../assets/icons/TableGray.png'),
    isBusy: true,
  },
  {
    id: 7,
    name: 'Table 7',
    imgSourceSelected: require('../../../assets/icons/TableOrange.png'),
    imgSourceEmpty: require('../../../assets/icons/TableGray.png'),
    isBusy: true,
  },
  {
    id: 8,
    name: 'Table 8',
    imgSourceSelected: require('../../../assets/icons/TableOrange.png'),
    imgSourceEmpty: require('../../../assets/icons/TableGray.png'),
    isBusy: false,
  },
];

const BillScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [masterData, setMasterData] = useState([]);
  const [dataFromState, setNewData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const theme = useSelector((state) => state.setting.theme);

  const FlatlistItemFunctions = ({ item }) => {
    if (item.isBusy === true) {
      return (
        <View>
          <TouchableOpacity
            onPress={async () => {
              await AsyncStorage.setItem('tableIDBill', item.id);
              console.log('id sent: ' + item.id);
              navigation.navigate('CheckOutTableScreen', { item });
            }}
            style={styles.flatlistitemStyleInUse}
          >
            <View>
              <Image
                source={require('../../../assets/icons/TableOrange.png')}
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
        <TouchableOpacity disabled={true} style={styles.flatlistitemStyle}>
          <View>
            <Image
              source={require('../../../assets/icons/TableGray.png')}
              style={styles.imgItemFlatlist}
            />
            <Text style={styles.txtItemFlatlist}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  useEffect(() => {
    const getData = async () => {
      const userLoginData = await AsyncStorage.getItem('userLoginData');
      const user = JSON.parse(userLoginData);
      console.log('username: ' + user.username);
      const res = await axios.post(
        `https://foody-uit.herokuapp.com/table/getAllTableOfRestaurant`,
        {
          username: user.username,
        }
      );
      const { success, message } = res.data;
      console.log(message);
      console.log(success);
      if (success) {
        setNewData(message);
        setMasterData(dataFromState);
        setRefreshing(false);
      } else {
        setNewData([]);
        setMasterData([]);
        setRefreshing(false);
      }
      console.log('filteredData is all selected');
    };
    getData().catch((err) => console.log(err));
  }, [refreshing]);
  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterData.filter(function (item) {
        const itemData = item.id ? item.id.toLowerCase() : ''.toUpperCase();
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
      <ContainerScrollView>
        <View style={styles.containerTop}>
          <Text style={styles.txtHeaderView}>BiLL</Text>
          <View style={styles.containerTemp}>
            <ContainerSearch>
              <TouchableOpacity style={styles.btnSearch}>
                <Image
                  source={SearchIconResouce}
                  style={styles.imgIconSearch}
                />
              </TouchableOpacity>
              {theme.mode === 'light' ? (
                <TextInput
                  value={search}
                  onChangeText={(text) => searchFilterFunction(text)}
                  style={styles.txtSearchBar}
                  placeholder={'Search Table...'}
                  placeholderTextColor="#000"
                />
              ) : (
                <TextInput
                  value={search}
                  onChangeText={(text) => searchFilterFunction(text)}
                  style={styles.txtSearchBarDarkTheme}
                  placeholder={'Search Table...'}
                  placeholderTextColor="#8A8A8A"
                />
              )}
            </ContainerSearch>

            <TouchableOpacity style={styles.btnImgFillter}>
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
      </ContainerScrollView>
    </ThemeProvider>
  );
};

export default BillScreen;

const ContainerScrollView = styled.ScrollView`
  padding-bottom: 8%;
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_ACCOUNT_COLOR};
  padding-top: 0%;
  flex: 1;
`;

const ContainerBottom = styled.View`
  border-topleftradius: 30;
  border-toprightradius: 30;
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_ACCOUNT_COLOR};
  justify-content: center;
  align-items: center;
  margin-top: -50;
  padding-top: 20;
  padding-left: 10;
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
