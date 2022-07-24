import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../assets/Colors';
import { useNavigation } from '@react-navigation/core';
import ModalListFood from '../custom component/ModalListFood';
import UserDarkTheme from '../assets/icons/personal_dark.png';
import UserLightTheme from '../assets/icons/personal_light.png';

import styled, { ThemeProvider } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

const imgDesertDish = require('../assets/images/DessertDish.png');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const imgBackgroundSource = require('../assets/images/Dishs1-nonCut.png');
const maxWidthConst = windowWidth - 30;
const imgBackgroundSource2 = require('../assets/images/Artboard1.png');
const imgBackgroundSource3 = {
  uri: 'https://www.pngall.com/wp-content/uploads/2/Meal-PNG-Pic.png',
};

const HomeScreen2ndFinal = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);

  const theme = useSelector((state) => state.themeReducer.theme);
  const dispatch = useDispatch();

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <View style={styles.containerHeaderTop}>
          {/* <Image source={{ uri: 'https://icons-for-free.com/download-icon-HOME-131994911289288683_512.png' }}
                      style={styles.icHomeStyle} /> */}
          <View style={styles.containerTitleInfo}>
            <Content_Header>Home</Content_Header>
          </View>
          <View
            style={{
              marginRight: '3%',
              alignSelf: 'center',
            }}
          >
            {theme.mode === 'light' ? (
              <Image source={UserLightTheme} style={styles.icUserStyle} />
            ) : (
              <Image source={UserDarkTheme} style={styles.icUserStyle} />
            )}
          </View>
        </View>
        <View style={styles.containerBtnMenuInfo}>
          {/* Button Menu Open */}
          <TouchableOpacity
            style={styles.btnMenuOpen}
            onPress={() => navigation.navigate('MenuScreen')}
          >
            <LinearGradient
              colors={[Colors.ImperialRed, Colors.DarkOrange]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.btnMenuOpen}
            >
              <View style={styles.containerMenuInfo}>
                <View style={styles.containerTxtInfo}>
                  {/* Header Tag Info View */}
                  <View style={styles.containerHeaderInfoTxt}>
                    <Text style={styles.txtMenu}>MAIN</Text>
                    <View
                      style={{
                        alignContent: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        marginBottom: 5,
                      }}
                    >
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 18,
                          marginBottom: -2,
                        }}
                      >
                        OF
                      </Text>
                      <Text
                        style={{
                          color: '#fff',
                          marginVertical: -7,
                          fontSize: 12,
                        }}
                      >
                        THE
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 30,
                        marginLeft: 0,
                        fontWeight: 'bold',
                      }}
                    >
                      MEAL
                    </Text>
                  </View>
                  {/* Detail info for Menu Section */}
                  <View style={styles.containerHeaderDetailMenuInfoTxt}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 15,
                        fontWeight: 'bold',
                      }}
                    >
                      100% FRESH FOOD
                    </Text>
                    <Text style={{ color: '#fff' }}>
                      so you can order in a smile
                    </Text>
                  </View>
                  <Image
                    source={imgBackgroundSource}
                    style={{
                      flex: 1.5,
                      zIndex: 1,
                      width: '150%',
                      height: '100%',
                      right: '0%',
                      left: '0%',
                      top: '5%',
                      resizeMode: 'contain',
                    }}
                  />
                  <View></View>
                  <Image />
                </View>
                <View style={styles.imgBackgroundMenuInfo}>
                  <ImageBackground
                    source={imgBackgroundSource3}
                    style={styles.imgBackgroundMenuInfostyle}
                  />
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.containerBtnDealInfo}>
          {/* Button 2 */}
          <TouchableOpacity
            style={styles.btnSaleOffOpen}
            onPress={() => navigation.navigate('StarterMenuHome')}
          >
            <LinearGradient
              style={styles.btnSaleOffOpen}
              colors={[Colors.FrenchRaspberry, Colors.ParadisePink]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.ContainnerTextSaleOff}>
                <Text
                  style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}
                >
                  STARTER
                </Text>
                <Text
                  style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}
                >
                  DISH
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: '#fff' }}>Guarantee </Text>
                </View>
                <Text
                  style={{
                    color: '#fee38d',
                    fontWeight: 'bold',
                    fontSize: 15,
                  }}
                >
                  100% FRESH
                </Text>
              </View>
              <Image
                source={{
                  uri: 'http://assets.stickpng.com/images/5ea1507fe0ebe6000479458d.png',
                }}
                style={styles.imgSaleOff}
              />
            </LinearGradient>
          </TouchableOpacity>

          {/* Button 3 */}
          <TouchableOpacity
            style={styles.btnTryNewDishOpen}
            onPress={() => navigation.navigate('Button3Screen')}
          >
            <LinearGradient
              style={styles.btnTryNewDishOpen}
              colors={['#f12711', '#f5af19']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.ContainnerTextSaleOff}>
                <Text
                  style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}
                >
                  DESERT and DRINK
                </Text>
                <Text style={{ color: '#fff' }}>Guarantee</Text>
                <Text
                  style={{
                    color: '#000',
                    textDecorationLine: 'underline',
                    fontWeight: 'bold',
                  }}
                >
                  100% Worth Try
                </Text>
              </View>
              <Image source={imgDesertDish} style={styles.imgTryNew} />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Devide line */}
        <View style={styles.containerDevideLine}></View>
        <View style={styles.containerExcDealsHeader}>
          <Content>Exclusive Deal Of The DaY</Content>
        </View>
        <View style={styles.containerBtnExcDeals}>
          {/* Button 4 */}
          <TouchableOpacity
            style={styles.btnBottomOpen}
            onPress={() => setVisible(true)}
          >
            <LinearGradient
              style={styles.btnBottomOpen}
              colors={['#FB6A70', '#FCA384']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.containerExcDealInfo}>
                <Text
                  style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}
                >
                  Exclusive Deal
                </Text>
                <Text style={{}}>
                  Saving your money and giving you the best meal is our priority
                </Text>
                <Text style={{}}></Text>
                <Text></Text>
                <Text style={{}}>Get them now!!!</Text>
              </View>
              <Image source={imgBackgroundSource2} style={styles.imgExcDeal} />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <ModalListFood visible={visible}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </ModalListFood>
      </Container>
    </ThemeProvider>
  );
};

export default HomeScreen2ndFinal;

const Container = styled.View`
  width: ${windowWidth};
  height: ${windowHeight};
  flex: 1;
  padding-top: 0;
  padding-bottom: 7%;
  padding-top: 5%;
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_ACCOUNT_COLOR};
`;

const Content_Header = styled.Text`
  font-size: 25;
  font-weight: bold;
  align-self: center;
  align-items: center;
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
`;
const Content = styled.Text`
  flex: 1;
  margin-left: 5%;
  font-size: 20;
  font-weight: bold;
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
`;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    flex: 1,
    paddingTop: 0,
    paddingBottom: '7%',
    paddingTop: '5%',
  },
  closeButton: {
    // alignSelf: 'center',
    // backgroundColor: 'black',
    // padding: 10,
    // borderRadius: 20,
    // elevation: 20,
    // bottom: '100%',

    backgroundColor: 'black',
    width: '30%',
    padding: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 20,
    alignSelf: 'center',
    bottom: '100%',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  containerTitleInfo: {
    flex: 4,
    flexWrap: 'wrap',
    marginTop: '1%',
    maxWidth: '90%',
    alignItems: 'center',
    paddingLeft: '5%',
    justifyContent: 'center',
  },
  icUserStyle: {
    height: 40,
    width: 40,
    paddingRight: 10,
    marginRight: '0%',
    alignSelf: 'center',
    resizeMode: 'cover',
    marginRight: '2%',
  },
  containerHeaderTop: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 0,
  },
  containerMenuInfo: {
    flex: 1,
    flexDirection: 'row',
  },
  containerExcDealInfo: {
    flex: 1,
    marginTop: '5%',
    marginLeft: '5%',
  },
  containerHeaderInfoTxt: {
    flex: 1,
    paddingLeft: '8%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ContainnerTextSaleOff: {
    flex: 1,
    paddingLeft: '8%',
    paddingTop: '10%',
  },
  containerTxtInfo: {
    flex: 2,
  },
  containerHeaderDetailMenuInfoTxt: {
    flex: 1,
    paddingLeft: '6%',
  },
  containerBtnMenuInfo: {
    flex: 2.5,
    width: windowWidth,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  containerDevideLine: {
    flex: 0.02,
    width: maxWidthConst,
    height: '1%',
    marginTop: '3%',
    marginBottom: '4%',
    backgroundColor: '#AFAFAF',
    alignSelf: 'center',
  },
  containerBtnDealInfo: {
    flex: 2.5,
    marginTop: '0%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: '4%',
  },
  containerExcDealsHeader: {
    flex: 0.5,
    maxWidth: maxWidthConst,
  },
  containerBtnExcDeals: {
    flex: 3,
    marginBottom: '5%',
    backgroundColor: 'transparent',
    maxWidth: windowWidth,
    justifyContent: 'center',
    alignContent: 'center',
  },
  icHomeStyle: {
    height: 60,
    width: 60,
    flex: 1,
    top: 5,
  },

  imgSaleOff: {
    flex: 1,
    resizeMode: 'contain',
    zIndex: 1,
    height: '100%',
    width: '100%',
    top: '5%',
    left: '20%',
  },
  imgTryNew: {
    flex: 1,
    resizeMode: 'cover',
    zIndex: 1,
    height: '75%',
    width: '75%',
    top: '5%',
    left: '25%',
  },
  imgBackgroundMenuInfo: {
    flex: 1.5,
    marginLeft: 5,
    backgroundColor: 'transparent',
    marginTop: 15,
  },
  imgExcDeal: {
    flex: 1.1,
    top: '8%',
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  imgBackgroundMenuInfostyle: {
    height: '105%',
    width: '100%',
    flex: 1,
    zIndex: 1,
    marginRight: 0,
    resizeMode: 'cover',
  },
  txtExclDealerText: {
    flex: 1,
    marginLeft: '5%',
    fontSize: 20,
    fontWeight: 'bold',
  },
  txtMenu: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
  },
  btnSaleOffOpen: {
    flex: 1,
    borderRadius: 15,
    marginRight: '1.1%',
    shadowColor: '#f981a1',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  btnTryNewDishOpen: {
    flex: 1,
    borderRadius: 15,
    marginLeft: '1.1%',
    shadowColor: '#f8bcd5',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  btnMenuOpen: {
    width: maxWidthConst,
    height: '95%',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderRadius: 15,
    shadowColor: Colors.fieryRose,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  btnBottomOpen: {
    height: '95%',
    width: maxWidthConst,
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 15,
    shadowColor: '#fb6c74',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});
