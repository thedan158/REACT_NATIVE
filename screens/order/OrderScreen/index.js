import {
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
  ScrollView,
  FlatList,
  TextInput,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useState, useEffect, Component } from 'react';
import AppLoading from 'expo-app-loading';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { useNavigation } from '@react-navigation/core';
import { SafeAreaView } from 'react-navigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Constants from 'expo-constants';
import table from '../../../assets/icons/table.png';
import reload from '../../../assets/icons/reloading.png';
import styles from './style';
import styled, { ThemeProvider } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

const statusBarHeight = Constants.statusBarHeight;
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

// TODO fix the Scrollview with flatlist

const OrderScreen = ({ route, navigation }) => {
  const { item } = route?.params || {};
  console.log('item:', item);

  const [dataStarter, setNewStarter] = useState([]);
  const [dataMainCourse, setNewMainCourse] = useState([]);
  const [dataDrink, setNewDrink] = useState([]);
  const [selected, setIsSelected] = useState(item?.name || 'Select Table');
  const [refreshing, setRefreshing] = useState(false);

  const theme = useSelector((state) => state.themeReducer.theme);
  const insets = useSafeAreaInsets();

  const handleStarterMenu = () => {
    navigation.navigate('StarterMenu');
  };
  const handleMainMenu = () => {
    navigation.navigate('MainMenu');
  };
  const handleDrinkMenu = () => {
    navigation.navigate('DrinkMenu');
  };
  const handleDesertMenu = () => {
    navigation.navigate('DesertMenu');
  };
  const handleSelectedTable = () => {
    navigation.navigate('SelectedTable');
  };

  let arrowResource = require('../../../assets/icons/Vector.png');
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const FlatlistItem = ({ item }) => {
    return (
      <View style={styles.flatlistitemStyle}>
        <ContentFlatListItem>{item.quantity}</ContentFlatListItem>
        <ContentFlatListItem>x</ContentFlatListItem>
        <ContentFlatListItem>{item.name}</ContentFlatListItem>
      </View>
    );
  };

  return (
    //   Root view
    <ThemeProvider theme={theme}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.droidSafeArea}
      >
        <Container>
          {/* ------------------------------------first view section-------------------------- */}
          <View style={styles.container_top}>
            {/* ---------------top header view Layout-------------- */}
            <ContentHeader>Order</ContentHeader>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={styles.textHeaderBottom}>ORDER MEAL</Text>
              <TouchableOpacity onPress={() => setRefreshing(true)}>
                <Image
                  source={reload}
                  style={{ height: 30, width: 30, alignSelf: 'center' }}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* ----------------------------second view section---------------------------------- */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={styles.container_bottom}
            nestedScrollEnabled
          >
            <View>
              {/* --------------btnSelectTable section view---------- */}
              <View style={styles.btnContainerViewStyle}>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    width: deviceWidth,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 30,
                    marginTop: 10,
                  }}
                >
                  <View
                    style={{
                      flex: 7.5,
                    }}
                  >
                    <ContainerSelectTable>
                      <ContentSelectTableInfo>
                        {selected}
                      </ContentSelectTableInfo>
                    </ContainerSelectTable>
                  </View>

                  <TouchableOpacity
                    onPress={handleSelectedTable}
                    style={{ flex: 2.5 }}
                  >
                    <Image source={table} style={{ width: 40, height: 40 }} />
                  </TouchableOpacity>
                </View>
              </View>
              {/* -------------- end btnSelectTable section view---------- */}

              {/*------------- View Starter Order----------------- */}

              <View style={styles.container_layout_column}>
                <View style={styles.container_layout_row1}>
                  <Text style={styles.textHeaderBottom}>Starter: </Text>
                  <View style={styles}>
                    <ButtonMenuOpen onPress={handleStarterMenu}>
                      <View style={styles.viewMENU}>
                        <View style={styles.lineStyle1} />
                        <View style={styles.lineStyle1} />
                        <View style={styles.lineStyle1} />
                        <ContentMenu>MENU</ContentMenu>
                      </View>
                    </ButtonMenuOpen>
                  </View>
                </View>
                <FlatList
                  refreshing={refreshing}
                  data={dataStarter}
                  renderItem={({ item, index }) => {
                    return (
                      <FlatlistItem item={item} index={index}></FlatlistItem>
                    );
                  }}
                  keyExtractor={(item) => item.id}
                  nestedScrollEnabled
                />

                <View style={styles.lineStyle2} />
              </View>

              {/* --------------View Main Course Order-----------  */}
              <View style={styles.container_layout_column}>
                <View style={styles.container_layout_row1}>
                  <Text style={styles.textHeaderBottom}>Main course: </Text>
                  <View style={styles}>
                    <ButtonMenuOpen onPress={handleMainMenu}>
                      <View style={styles.viewMENU}>
                        <View style={styles.lineStyle1} />
                        <View style={styles.lineStyle1} />
                        <View style={styles.lineStyle1} />
                        <ContentMenu>MENU</ContentMenu>
                      </View>
                    </ButtonMenuOpen>
                  </View>
                </View>
                <FlatList
                  refreshing={refreshing}
                  onRefresh={() => setRefreshing(true)}
                  data={dataMainCourse}
                  renderItem={({ item, index }) => {
                    return (
                      <FlatlistItem item={item} index={index}></FlatlistItem>
                    );
                  }}
                  keyExtractor={(item) => item.id}
                  nestedScrollEnabled
                />
                <View style={styles.lineStyle2} />
              </View>
              {/* -----------------View Desert Order-------------- */}
              <View style={styles.container_layout_column}>
                <View style={styles.container_layout_row1}>
                  <Text style={styles.textHeaderBottom}>Desert - Drink: </Text>
                  <View style={styles}>
                    <ButtonMenuOpen onPress={handleDesertMenu}>
                      <View style={styles.viewMENU}>
                        <View style={styles.lineStyle1} />
                        <View style={styles.lineStyle1} />
                        <View style={styles.lineStyle1} />
                        <ContentMenu>MENU</ContentMenu>
                      </View>
                    </ButtonMenuOpen>
                  </View>
                </View>
                <FlatList
                  refreshing={refreshing}
                  onRefresh={() => setRefreshing(true)}
                  data={dataDrink}
                  renderItem={({ item, index }) => {
                    return (
                      <FlatlistItem item={item} index={index}></FlatlistItem>
                    );
                  }}
                  keyExtractor={(item) => item.id}
                  nestedScrollEnabled
                />
                <View style={styles.lineStyle2} />
              </View>
              {/* ----------------View Drink Order--------------- */}
              {/* <View style={styles.container_layout_column}>
                  <View style={styles.container_layout_row1}>
                    <Text style={styles.textHeaderBottom}>Drink: </Text>
                    <View style={styles}>
                      <TouchableOpacity
                        style={styles.btnMenuDrink}
                        onPress={handleDrinkMenu}
                      >
                        <View style={styles.viewMENU}>
                          <View style={styles.lineStyle1} />
                          <View style={styles.lineStyle1} />
                          <View style={styles.lineStyle1} />
                          <Text style={styles.textMENU}>MENU</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <FlatList
                    data={DATA}
                    renderItem={({ item, index }) => {
                      return (
                        <FlatlistItem item={item} index={index}></FlatlistItem>
                      );
                    }}
                    keyExtractor={(item) => item.id}
                  />
                  <View style={styles.lineStyle2} />
                </View> */}
              {/* ----------------View Message Order----------- */}
              <View style={styles.container_layout_column2}>
                <View style={styles.container_layout_row1}>
                  <Text style={styles.textHeaderBottom}>Message: </Text>
                  <View>
                    {theme.mode === 'light' ? (
                      <ContentInputMessage
                        placeholder="Note to the Chef..."
                        placeholderTextColor="#212121"
                      ></ContentInputMessage>
                    ) : (
                      <ContentInputMessage
                        placeholder="Note to the Chef..."
                        placeholderTextColor="#fff"
                      ></ContentInputMessage>
                    )}
                  </View>
                </View>

                <View style={styles.rectangleGreydevideView}></View>
              </View>
            </View>

            {/* ------------order button view section------------ */}
            <View style={styles.container_layout_column3}>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert('Order Successfully !');
                }}
                style={styles.btnOrder}
              >
                <View>
                  <Text style={styles.txtOrder}>Order</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Container>
      </KeyboardAwareScrollView>
    </ThemeProvider>
  );
};

export default OrderScreen;

const Container = styled.View`
  padding-left: 20;
  padding-right: 20;
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_ACCOUNT_COLOR};
  flex: 1;
  height: ${deviceHeight};
`;

const ContainerSelectTable = styled.View`
  background-color: ${(props) => props.theme.PRIMARY_BUTTON_COLOR};
  justify-content: center;
  align-items: center;
  width: 95%;
  height: 140%;
  border-radius: 20;
`;

const ContentSelectTableInfo = styled.Text`
  font-weight: bold;
  font-size: 18;
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
`;

const ButtonMenuOpen = styled.TouchableOpacity`
  height: 54;
  border-radius: 30;
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_ACCOUNT_COLOR};
  border-color: ${(props) => props.theme.PRIMARY_BACKGROUND_ACCOUNT_COLOR};
  align-content: center;
  justify-content: center;
  align-items: center;
`;

const ContentHeader = styled.Text`
  font-size: 30;
  font-weight: bold;
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
  align-self: center;
  margin-bottom: 3%;
`;

const ContentMenu = styled.Text`
    height: 20;
    align-self: center;
    margin-top: 0;
    justify-content: center;
    color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
    align-items: center;
    font-size: 12;
    font-weight: bold;
    margin: {3};
    top: 0;
  
  `;

const ContentInputMessage = styled.TextInput`
  width: 115;
  top: 3;
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
`;
const ContentFlatListItem = styled.Text`
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
`;
