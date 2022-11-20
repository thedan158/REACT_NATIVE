import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import leftArrowLightTheme from '../../../assets/icons/back-orange.png';
import invoiceLightTheme from '../../../assets/icons/invoice.png';
import BillSticker from '../../../assets/icons/billSticker.png';
import { StatusBar } from 'expo-status-bar';
import { Dimensions } from 'react-native';
import styled, { ThemeProvider } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../../assets/Colors';
import cart from '../../../assets/icons/cart.png';
import IconBadge from 'react-native-icon-badge';
import ModalOrderList from '../../../custom component/ModalOrderList';
import close from '../../../assets/icons/close_orange.png';
import FoodComponent from '../../../custom component/FoodComponent';
import styles from './style';

const { width, height } = Dimensions.get('window');
const imgBtnOrange = require('../../../assets/icons/ButtonOrange.png');

// Dummy Data for Testing UI/UX -------------------------------------------------------------
const categoryMenuTypeData = [
  {
    id: 4,
    name: 'Full Menu',
    icon: require('../../../assets/icons/menuIcon.png'),
  },
  {
    id: 1,
    name: 'Starter Dish',
    icon: require('../../../assets/icons/starterDish.png'),
  },
  {
    id: 2,
    name: 'Main Dish',
    icon: require('../../../assets/icons/mainDish.png'),
  },
  {
    id: 3,
    name: 'Dessert-Drink',
    icon: require('../../../assets/icons/dessertDish.png'),
  },
];

const DishData = [
  {
    id: 1,
    nameDish: 'Crispy Chicken',
    categoryFoodType: [2, 4],
    photo: require('../../../assets/images/food-dishes-Transparent-Images.png'),
    detail: 'Crispy Chicken Burger - Main',
    duration: '15 - 20 min',
    price: 15,
  },
  {
    id: 2,
    nameDish: 'Crispy Chicken',
    categoryFoodType: [3, 4],
    photo: require('../../../assets/images/food-dishes-Transparent-Images.png'),
    detail: 'Crispy Chicken Burger - Dessert',
    duration: '10 - 15 min',
    price: 20,
  },
  {
    id: 3,
    nameDish: 'Crispy Chicken',
    categoryFoodType: [1, 4],
    photo: require('../../../assets/images/food-dishes-Transparent-Images.png'),
    detail: 'Crispy Chicken Burger - Starter',
    duration: '5 - 10 min',
    price: 10,
  },
  {
    id: 4,
    nameDish: 'Crispy Chicken',
    categoryFoodType: [2, 4],
    photo: require('../../../assets/images/food-dishes-Transparent-Images.png'),
    detail: 'Crispy Chicken Burger - Main 2',
    duration: '15 - 20 min',
    price: 15,
  },
  {
    id: 5,
    nameDish: 'Crispy Chicken',
    categoryFoodType: [1, 4],
    photo: require('../../../assets/images/food-dishes-Transparent-Images.png'),
    detail: 'Crispy Chicken Burger - Starter 2',
    duration: '3 - 8 min',
    price: 15,
  },
];

const item = {
  id: 1,
  name: 'Table 1',
  isBusy: true,
};

const MenuOrderScreen = ({ navigation }) => {
  // States Declaration -------------------------------------------------------------------
  const [categories, setCategories] = React.useState(categoryMenuTypeData);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [dishData, setDishData] = React.useState(DishData);
  const [modalListOrder, setModalListOrder] = React.useState(false);
  const [selectedDish, setSelectedDish] = React.useState(0);
  const theme = useSelector((state) => state.setting.theme);

  function onSelectCategory(category) {
    //filter Dish Type
    let DishList = DishData.filter((a) =>
      a.categoryFoodType.includes(category.id)
    );

    setDishData(DishList);

    setSelectedCategory(category);
  }

  function getCategoryNameById(id) {
    let category = categories.filter((a) => a.id == id);

    if (category.length > 0) return category[0].name;

    return '';
  }

  // Header Render Function ----------------------------------------------------------------

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: '100%',
          flex: 0.3,
          paddingTop: '3.5%',
          marginBottom: '0%',
        }}
      >
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: 10 * 3,
            justifyContent: 'center',
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            source={leftArrowLightTheme}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>

        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          {theme.mode === 'light' ? (
            <View
              style={{
                width: '70%',
                height: '100%',
                backgroundColor: '#Fff',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 30,
                shadowColor: '#000',

                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}
            >
              <Text
                style={{
                  lineHeight: 22,
                  fontSize: 20,
                  color: '#FA4A0C',
                  fontWeight: 'bold',
                }}
              >
                TABLE 1
              </Text>
            </View>
          ) : (
            <View
              style={{
                width: '70%',
                height: '100%',
                backgroundColor: '#EFEFF1',
                alignItems: 'center',
                justifyContent: 'center',

                borderRadius: 30,
                shadowColor: '#555555',

                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}
            >
              <Text
                style={{
                  lineHeight: 22,
                  fontSize: 20,
                  color: '#FA4A0C',
                  fontWeight: 'bold',
                }}
              >
                {item.name}
              </Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={{
            width: 50,
            paddingRight: 10 * 2,
            justifyContent: 'center',
          }}
          onPress={() => {
            navigation.navigate('CheckOutTableScreen', { item });
          }}
        >
          <Image
            source={invoiceLightTheme}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  // Categories Food Menu Render Function
  function renderMenuCategories() {
    const renderItem = ({ item }) => {
      return (
        <View>
          {theme.mode === 'light' ? (
            <TouchableOpacity
              style={{
                padding: 10,
                alignSelf: 'center',
                height: 60,
                backgroundColor:
                  selectedCategory?.id == item.id ? Colors.primary : '#FFF',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 30,
                marginVertical: 5,
                marginHorizontal: 10,
                flexDirection: 'row',
                shadowColor: '#000',

                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}
              onPress={() => onSelectCategory(item)}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  alignItems: 'center',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  marginRight: 5,
                  backgroundColor:
                    selectedCategory?.id == item.id
                      ? 'transparent'
                      : 'transparent',
                }}
              >
                <Image
                  source={item.icon}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
              </View>

              <Text
                style={{
                  marginTop: 0,
                  color:
                    selectedCategory?.id == item.id ? '#FFFFFF' : '#1E1F20',
                  alignSelf: 'center',
                  fontSize: 14,
                  marginLeft: 0,
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                padding: 10,
                alignSelf: 'center',
                height: 60,
                backgroundColor:
                  selectedCategory?.id == item.id ? Colors.primary : '#313133',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 30,
                marginVertical: 5,
                marginHorizontal: 10,
                flexDirection: 'row',
                shadowColor: '#555555',

                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}
              onPress={() => onSelectCategory(item)}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  alignItems: 'center',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  marginRight: 5,
                  backgroundColor:
                    selectedCategory?.id == item.id
                      ? 'transparent'
                      : 'transparent',
                }}
              >
                <Image
                  source={item.icon}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
              </View>

              <Text
                style={{
                  marginTop: 0,
                  color: '#FFFFFF',
                  alignSelf: 'center',
                  fontSize: 14,
                  marginLeft: 0,
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      );
    };

    return (
      <View
        style={{
          marginTop: '2%',
          paddingHorizontal: 20,
          height: '100%',
          flex: 1.1,
        }}
        horizontal={true}
      >
        <Text
          style={{
            fontSize: 25,

            lineHeight: 40,
            fontWeight: 'bold',
            paddingHorizontal: 5,
            flex: 0.4,
            color: Colors.primary,
          }}
        >
          Categories
        </Text>

        {/* FlatList Render Button Menu Categories */}
        <FlatList
          data={categories}
          horizontal={false}
          style={{
            paddingVertical: 0,

            height: '100%',
            flex: 1.5,
            width: '100%',
            alignSelf: 'center',
            alignContent: 'center',
          }}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 5,

            alignItems: 'center',
            alignContent: 'center',
          }}
        />
      </View>
    );
  }

  // List Dish Data Render Function

  function renderFoodList() {
    const RenderItemFlatList = ({ item }) => {
      const [counter, setCounter] = React.useState(0);
      function BtnDelPress() {
        if (item.quantity > 0) {
          setCounter((counter) => counter - 1);
          item.quantity = counter - 1;
          if (selectedDish > 0) {
            setSelectedDish((counter) => counter - 1);
          }
        }
      }
      function BtnAddPress() {
        setCounter((counter) => counter + 1);
        item.quantity = counter + 1;
        setSelectedDish((counter) => counter + 1);
      }

      return (
        <LinearGradient
          colors={['#F8F8F9', '#F8F8F9']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            padding: 10,
            width: 140,
            height: 200,
            margin: 10,
            borderRadius: 20,
            alignSelf: 'center',
            shadowColor: '#777777',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 25,
          }}
        >
          <Image
            source={item.photo}
            style={{
              borderRadius: 20,

              marginBottom: '4%',
              marginTop: '4%',
              width: '80%',
              height: '100%',
              alignSelf: 'center',
              resizeMode: 'contain',

              flex: 5,
            }}
          ></Image>
          <Text
            style={{
              flex: 1.5,
              color: '#434343',
            }}
          >
            {item.nameDish}
          </Text>
          <Text
            style={{
              color: Colors.primary,
              flex: 2,
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            ${item.price}
          </Text>
          <View
            style={{
              flex: 2,
              flexDirection: 'row',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}
          >
            {/* <TouchableOpacity onPress={BtnDelPress} style={styles.buttonAdjust}>
                <Text>-</Text>
              </TouchableOpacity> */}

            <TouchableOpacity onPress={BtnAddPress} style={styles.buttonAdjust}>
              <Text>+</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      );
    };

    // Function Render Food Item FlatList
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

      const [counter, setCounter] = React.useState(0);
      return (
        <View style={styles.flatlistItemView}>
          <View
            style={{
              marginLeft: '3%',
            }}
          >
            {/* Image item section */}
            <Image style={styles.containerImageItem} source={item.photo} />
          </View>

          {/* Item detail section */}
          {theme.mode === 'light' ? (
            <View
              style={{
                flex: 2,
                marginLeft: '3%',
              }}
            >
              <Text style={styles.txtNameItemFlatlist}>{item.nameDish}</Text>
              <Text style={styles.txtDetailItemFlatlist}>{item.detail}</Text>
              <Text style={styles.txtPriceItemFlatlist}>${item.price}</Text>
            </View>
          ) : (
            <View
              style={{
                flex: 2,
                marginLeft: '3%',
              }}
            >
              <Text style={styles.txtNameItemFlatlistDarkTheme}>
                {item.nameDish}
              </Text>
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
      <View
        style={{
          marginVertical: 10,
          flex: 2.5,
          borderRadius: 10,
        }}
      >
        <FlatList
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          data={dishData}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item, index }) => {
            return (
              <RenderItemFlatList
                item={item}
                index={index}
              ></RenderItemFlatList>
            );
          }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 10,
            marginBottom: 10,
            paddingBottom: 10,
            borderRadius: 10,
          }}
        />
        <View
          styles={{
            justifyContent: 'flex-end',
            paddingRight: 10,
          }}
        ></View>
      </View>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <ContainerSafeAreaView>
        {renderHeader()}
        {renderMenuCategories()}
        {renderFoodList()}
        <View
          style={{
            position: 'absolute',
            alignItems: 'center',

            top: '85%',
            left: '75%',
          }}
        >
          {/* <TouchableWithoutFeedback>
            <View style={styles.floatingButton}>
              {selectedDish > 0 ? (
                <View style={styles.countingCartView}>
                  <Text
                    style={{
                      color: Colors.primary,
                      alignSelf: 'center',
                      fontWeight: 'bold',
                      fontSize: 12,
                    }}
                  >
                    {selectedDish}
                  </Text>
                </View>
              ) : null}
              <TouchableOpacity>
                <ImageBackground
                  source={cart}
                  style={{ width: 30, height: 30 }}
                ></ImageBackground>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback> */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconBadge
              MainElement={
                <TouchableOpacity
                  onPress={() => setModalListOrder(true)}
                  style={styles.floatingButton}
                >
                  <Image source={cart} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
              }
              BadgeElement={
                <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>
                  {selectedDish}
                </Text>
              }
              IconBadgeStyle={{
                width: 25,
                height: 25,
                backgroundColor: '#fff',
                borderColor: Colors.primary,
                borderWidth: 2,
              }}
              Hidden={selectedDish == 0}
            />
          </View>
        </View>
        <ModalOrderList visible={modalListOrder}>
          {/* Header  */}

          {/* Table name  */}
          <View style={styles.tableName}>
            <Content style={{ color: Colors.primary }}>{item.name}</Content>
          </View>
          {/* Close button  */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalListOrder(false)}
          >
            <Image source={close} style={{ height: 13, width: 13 }} />
          </TouchableOpacity>

          {/* Sub-header  */}
          <View style={styles.subHeader}>
            <Content style={{ fontSize: 20 }}>Order List</Content>
            <Content style={{ color: '#787878', fontWeight: 'normal' }}>
              4 items
            </Content>
          </View>

          {/* List order  */}
          <ScrollView style={styles.listOrder}>
            <FoodComponent />
            <FoodComponent />
            <FoodComponent />
          </ScrollView>

          {/* Total price and order  */}
          <View style={styles.footer}>
            {/* Total price  */}
            <View style={styles.totalPrice}>
              <Text style={{ fontSize: 16, color: '#979797' }}>Price</Text>
              <Content style={{ fontSize: 20, color: Colors.primary }}>
                $35.40
              </Content>
            </View>
            {/* Order button */}
            <View style={styles.orderButton}>
              <Content style={{ color: 'white', fontSize: 17 }}>Order</Content>
            </View>
          </View>
        </ModalOrderList>
      </ContainerSafeAreaView>
    </ThemeProvider>
  );
};

const Content = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
  font-weight: bold;
`;

export default MenuOrderScreen;

const ContainerSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_ACCOUNT_COLOR};
  padding-top: 6%;
`;
