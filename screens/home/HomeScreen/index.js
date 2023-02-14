import {
    Text,
    View,
    Dimensions,
    Image,
    TouchableOpacity,
    ImageBackground,
  } from 'react-native';
  import React, {useEffect, LogBox } from 'react';
  import { LinearGradient } from 'expo-linear-gradient';
  import Colors from '../../../assets/Colors';
  import { useNavigation } from '@react-navigation/core';
  import UserDarkTheme from '../../../assets/icons/personal_dark.png';
  import UserLightTheme from '../../../assets/icons/personal_light.png';
  import styles from './style';
  import styled, { ThemeProvider } from 'styled-components';
  import { useSelector, useDispatch } from 'react-redux';
  

  const imgDesertDish = require('../../../assets/images/DessertDish.png');
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const imgBackgroundSource = require('../../../assets/images/Dishs1-nonCut.png');
  const imgBackgroundSource2 = require('../../../assets/images/Artboard1.png');
  const imgBackgroundSource3 = {
    uri: 'https://www.pngall.com/wp-content/uploads/2/Meal-PNG-Pic.png',
  };
 
  const HomeScreen2ndFinal = () => {
    
    const navigation = useNavigation();
    const [visible, setVisible] = React.useState(false);
    const theme = useSelector((state) => state.setting.theme);
    const menuMainCoursesList = useSelector((state) => state.user.menuMainCourses);
    const menuDesertAndDrinksList = useSelector((state) => state.user.menuDesertAndDrinks);
    const dispatch = useDispatch();
    const getMenu = async () => {
      dispatch(
        getAPIActionJSON("postMainCourse", {
          username: 'thedantest9',
          foodType: 'Main course',
        }),
        getAPIActionJSON("postDesertAndDrink", {
          username: 'thedantest9',
          foodType: 'Dessert and Drink',
        }) 
      );

    }
    useEffect(() => {
      getMenu();
      console.log(menuMainCoursesList);
      console.log(menuDesertAndDrinksList);
      return () => {
        
      };
    }, [])
  
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
              onPress={() => navigation.navigate('DesertAndDrinkMenuHome')}
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
    background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_COLOR};
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