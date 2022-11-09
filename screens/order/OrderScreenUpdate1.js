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
} from 'react-native';
import Colors from '../../assets/Colors';
import { useIsFocused } from '@react-navigation/core';
import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import CustomModal from '../../custom component/CustomModal';

const imgAddItem = require('../../assets/icons/AddItem.png');
const SearchIconResouce = require('../../assets/icons/SearchGray.png');

const DataTable = [
  {
    id: 1,
    name: 'Table 1',
    isBusy: true,
  },
  {
    id: 2,
    name: 'Table 2',
    isBusy: true,
  },
  {
    id: 3,
    name: 'Table 3',
    isBusy: false,
  },
  {
    id: 4,
    name: 'Table 4',
    isBusy: false,
  },
];

const OrderScreenUpdate1 = ({ navigation }) => {
  const isFocus = useIsFocused();
  const [search, setSearch] = useState('');
  const theme = useSelector((state) => state.themeReducer.theme);
  const [dataFromState, setNewData] = useState([]);
  const [modalAdjustTableVisibleConfirm, setModalAdjustTableVisibleConfirm] =
    useState(false);
  const [
    modalOpenMenuOrderScreenTableConfirm,
    setModalOpenMenuOrderScreenTableConfirm,
  ] = useState(false);
  const [tableSelectedAdjust, setTableSelectedAdjust] = useState('');

  useEffect(() => {
    setNewData(DataTable);
  }, [isFocus]);

  const searchFilterFunction = (text) => {
    setNewData(DataTable);
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

  const FlatlistItemFunctions = ({ item }) => {
    if (item.isBusy === true) {
      return (
        <View>
          <Pressable
            onPress={() => {
              navigation.navigate('CheckOutTableScreen', { item });
            }}
            onLongPress={() => {
              setTableSelectedAdjust(item.name);
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
                source={require('../../assets/icons/TableOrange.png')}
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
            navigation.navigate('MenuOrderScreen');
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
              source={require('../../assets/icons/TableGray.png')}
              style={styles.imgItemFlatlist}
            />
            <Text style={styles.txtItemFlatlist}>{item.name}</Text>
          </View>
        </Pressable>
      </View>
    );
  };

  const handleConfirmAdjustTableInfo = async () => {
    setModalAdjustTableVisibleConfirm(false);
    navigation.navigate('EditTableInfoScreenRework1', { tableSelectedAdjust });
  };
  const handleConfirmMoreOrder = async () => {
    setModalOpenMenuOrderScreenTableConfirm(false);
    navigation.navigate('MenuOrderScreen');
  };

  return (
    // Root View
    <ThemeProvider theme={theme}>
      <ContainerScrollView>
        <SafeAreaView style={styles.droidSafeArea}>
          <View style={styles.containerTop}>
            <Text style={styles.txtHeaderView}>Order Rework</Text>
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
                  placeholder={'Search Table...'}
                  placeholderTextColor="#8A8A8A"
                />
              </ContainerSearch>

              <TouchableOpacity
                onPress={() => navigation.navigate('AddingTable')}
                style={styles.btnImgFillter}
              >
                <Image source={imgAddItem} style={styles.imgIconFillter} />
              </TouchableOpacity>
            </View>
          </View>
          <ContainerBottom>
            <FlatList
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
            />
          </ContainerBottom>

          {/* Modal Confirm Adjust Table */}
          <CustomModal visible={modalAdjustTableVisibleConfirm}>
            <View
              style={{
                alignSelf: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                source={require('../../assets/icons/QuestionMarkOrange.png')}
                style={{ height: 150, width: 150, marginVertical: 30 }}
              />
              {theme.mode === 'light' ? (
                <Text
                  style={{
                    marginVertical: 30,
                    fontSize: 20,
                    textAlign: 'center',
                  }}
                >
                  Do you want to adjust table name '{tableSelectedAdjust}' ?
                </Text>
              ) : (
                <Text
                  style={{
                    marginVertical: 30,
                    fontSize: 20,
                    textAlign: 'center',
                    color: 'white',
                  }}
                >
                  Do you want to adjust table name '{tableSelectedAdjust}' ?
                </Text>
              )}

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignSelf: 'center',
                  justifyContent: 'space-between',
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
                alignSelf: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                source={require('../../assets/icons/orderSticker.png')}
                style={{ height: 150, width: 150, marginVertical: 30 }}
              />
              {theme.mode == 'light' ? (
                <Text
                  style={{
                    marginVertical: 30,
                    fontSize: 20,
                    textAlign: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  Do you want to place more orders with table name '
                  {tableSelectedAdjust}' ?
                </Text>
              ) : (
                <Text
                  style={{
                    marginVertical: 30,
                    fontSize: 20,
                    textAlign: 'center',
                    flexWrap: 'wrap',
                    color: 'white',
                  }}
                >
                  Do you want to place more orders with table name '
                  {tableSelectedAdjust}' ?
                </Text>
              )}

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignSelf: 'center',
                  justifyContent: 'space-between',
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
        </SafeAreaView>
      </ContainerScrollView>
    </ThemeProvider>
  );
};

export default OrderScreenUpdate1;

const ContainerScrollView = styled.ScrollView`
  padding-bottom: 5%;
  padding-top: 0%;
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_ACCOUNT_COLOR};
  flex: 1;
`;
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

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 0,
    justifyContent: 'center',
    elevation: 8,
    margin: 0,
    paddingTop: Platform.OS === 'Android' ? StatusBar.currentHeight : 0,
  },
  container: {
    marginBottom: '0%',
    paddingTop: '0%',
    backgroundColor: '#fff',
  },
  containerTop: {
    backgroundColor: '#FF4B3A',
    height: 180,
    flexDirection: 'column',
    flex: 1,
    margin: 0,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-around',
    paddingTop: '0%',
  },
  containerBottom: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,

    borderColor: '#808080',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',

    marginTop: -40,
    paddingTop: 20,
    paddingLeft: 10,
  },
  txtSearchBar: {
    color: '#8A8A8A',
    maxWidth: 200,
    width: 200,
  },
  txtHeaderView: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 0,
    marginBottom: 0,
    paddingTop: 20,
  },
  txtItemFlatlist: {
    color: '#A09A99',
    marginBottom: 10,
    alignSelf: 'center',
    fontSize: 20,
  },
  txtItemFlatlistInUse: {
    color: Colors.primary,
    marginBottom: 10,
    alignSelf: 'center',
    fontSize: 20,
  },
  containerTemp: {
    flexDirection: 'row',
    marginBottom: 50,
    paddingTop: -200,
  },
  containerSearchLayout: {
    width: 280,
    height: 50,
    borderRadius: 15,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#A09A99',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    padding: 0,
  },
  imgIconSearch: {
    margin: 0,
    height: 16,
    width: 16,
    resizeMode: 'cover',
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
    resizeMode: 'cover',
    alignSelf: 'center',
    margin: 0,
    borderRadius: 20,
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
    justifyContent: 'center',
    borderColor: 'grey',
    borderWidth: 2,
    alignItems: 'center',
    marginRight: 20,
    marginVertical: 20,
    marginLeft: 10,
  },
  flatlistitemStyleInUse: {
    height: 130,
    width: 130,
    borderRadius: 20,
    justifyContent: 'center',
    borderColor: Colors.primary,
    borderWidth: 2,
    alignContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    marginVertical: 20,
    marginLeft: 10,
  },
  btnUserStyle: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: Colors.primary,
    width: '45%',
    padding: 15,
    borderRadius: 20,
    elevation: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    marginHorizontal: '2%',
  },
  button2: {
    backgroundColor: Colors.primary,
    width: '50%',
    padding: 15,
    borderRadius: 20,
    elevation: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  button1: {
    backgroundColor: Colors.secondary,
    width: '45%',
    padding: 15,
    borderRadius: 20,
    elevation: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    marginHorizontal: '2%',
  },
  imgUserStyle: {
    height: 25,
    width: 25,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
