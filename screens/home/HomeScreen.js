import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
} from 'react-native';
import React from 'react';
import Colors from '../../assets/Colors';

const icHome = require('../../assets/icons/HomeOrange.png');
const icUser = require('../../assets/icons/UserIcon.png');
const imgSourceDish = require('../../assets/images/sushi.jpg');
const DATADish = [
  {
    id: 1,
    NameDish: 'Fast Burgers',
    PriceDish: 5,
    RatingDish: '4.5',
    NumberRatingsDish: 144,
    imgSource: require('../../assets/images/sushi.jpg'),
  },
  {
    id: 2,
    NameDish: 'Fast Burgers',
    PriceDish: 10,
    RatingDish: '4.7',
    NumberRatingsDish: 243,
    imgSource: require('../../assets/images/sushi.jpg'),
  },
  {
    id: 3,
    NameDish: 'Fast Burgers',
    PriceDish: 32,
    RatingDish: '5.0',
    NumberRatingsDish: 167,
    imgSource: require('../../assets/images/sushi.jpg'),
  },
  {
    id: 4,
    NameDish: 'Fast Burgers',
    PriceDish: 10,
    RatingDish: '4.2',
    NumberRatingsDish: 124,
    imgSource: require('../../assets/images/sushi.jpg'),
  },
  {
    id: 5,
    NameDish: 'Fast Burgers',
    PriceDish: 21,
    RatingDish: '4.1',
    NumberRatingsDish: 323,
    imgSource: require('../../assets/images/sushi.jpg'),
  },
];

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const HomeScreen = () => {
  function FlatListItem({ item }) {
    if (item.RatingDish >= 4.5) {
      return (
        <View style={styles.containerItem1}>
          <Image
            source={item.imgSource}
            style={{
              width: 300,
              height: 170,
              resizeMode: 'cover',
              alignSelf: 'center',
              borderRadius: 15,
              marginBottom: '2%',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <View style={{}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 17,
                  marginLeft: 10,
                }}
              >
                {item.NameDish}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 10,
                  maxWidth: 200,
                }}
              >
                <Text>
                  ${item.PriceDish}
                  {'\t\t\t\t\t\t\t\t'}
                </Text>

                <Image
                  source={require('../../assets/icons/Star.png')}
                  style={{
                    marginTop: 4,
                  }}
                />
                <Text
                  style={{
                    color: '#c36e68',
                  }}
                >
                  {item.RatingDish}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}
            >
              <ImageBackground
                source={{
                  uri: 'https://st.depositphotos.com/1023799/3237/v/380/depositphotos_32379595-stock-illustration-recommended-golden-label-vector-illustration.jpg?forcejpeg=true',
                }}
                style={{
                  height: 40,
                  width: 40,
                  resizeMode: 'cover',
                  marginLeft: 135,
                  marginBottom: 0,
                  zIndex: 1,
                }}
              />
            </View>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.containerItem1}>
        <Image
          source={item.imgSource}
          style={{
            width: 300,
            height: 170,
            resizeMode: 'cover',
            alignSelf: 'center',
            borderRadius: 15,
            marginBottom: '2%',
          }}
        />
        <View style={styles}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 17,
              marginLeft: 10,
            }}
          >
            {item.NameDish}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 10,
            }}
          >
            <Text>
              ${item.PriceDish}
              {'\t\t\t\t\t\t\t\t'}
            </Text>

            <Image
              source={require('../../assets/icons/Star.png')}
              style={{
                marginTop: 4,
              }}
            />
            <Text
              style={{
                color: '#c36e68',
              }}
            >
              {item.RatingDish}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function HeaderInfo() {
    return (
      <View style={styles.containerHeaderInfo}>
        <View style={{ flex: 3, maxWidth: 200 }}>
          <Text style={styles.txtHeaderInfoWelcome}>Hello there, </Text>
          <Text style={styles.txtHeaderInfoAccount}>VKH</Text>
        </View>
        <TouchableOpacity style={styles.btnAccountOpen}>
          <Image
            source={{
              uri: 'https://png.pngtree.com/png-vector/20190116/ourlarge/pngtree-vector-avatar-icon-png-image_322275.jpg',
            }}
            style={styles.imgUserAccountInfoHeader}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function HeaderInfoTab() {
    return (
      <View style={styles.containerInfoViewTab}>
        <View style={styles.containerIcHomeView}>
          <TouchableOpacity
            style={{
              height: 45,
              width: 45,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
              borderRadius: 15,
            }}
          >
            <Image
              source={icHome}
              style={{
                height: 20,
                width: 20,
                resizeMode: 'cover',
                alignSelf: 'center',
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.containerTextTitlesInfo}>
          <View
            style={{
              alignSelf: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 17,
                color: '#8c9099',
                alignSelf: 'center',
              }}
            >
              Hello,
            </Text>
            <Text
              style={{
                fontSize: 17,
                color: Colors.primary,
                alignSelf: 'center',
                fontWeight: 'bold',
              }}
            >
              Vu Khanh Hoang
            </Text>
          </View>
        </View>
        <View style={styles.containerIcUserAccount}>
          <TouchableOpacity
            style={{
              height: 45,
              width: 45,
              alignSelf: 'center',
              marginHorizontal: '5%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
              borderRadius: 15,
            }}
          >
            <Image
              source={icUser}
              style={{
                height: 18,
                width: 18,
                resizeMode: 'cover',
                alignSelf: 'center',
                marginLeft: 3,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function SearchBarViewComponent() {
    return (
      <View
        style={{
          height: 35,
          width: windowWidth - 50,
          marginLeft: '5%',
          backgroundColor: '#f9f9f9',
          borderRadius: 20,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: '6%',
          marginBottom: '5%',
          marginTop: '5%',
          alignContent: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,

          elevation: 7,
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            height: 20,
            width: 20,
            alignSelf: 'center',
          }}
        >
          <Image
            style={{
              width: 20,
              height: 20,
              resizeMode: 'cover',
              alignSelf: 'center',
            }}
            source={require('../../assets/icons/search.png')}
          />
        </TouchableOpacity>
        <TextInput
          style={{
            flex: 3.5,
            maxWidth: '85%',
            flexWrap: 'wrap',
          }}
          placeholder="Search foods"
        ></TextInput>
      </View>
    );
  }

  function HeaderTab() {
    return (
      <View style={[styles.containerBtnAdjust]}>
        <View style={styles.containerBtnMMenuOpen}>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignSelf: 'center' }}
          >
            <Image
              source={{
                uri: 'data:image/png;base64,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',
              }}
              style={styles.imgIconMenuOpen}
            />
            <Text style={styles.txtMenuOpen}>Special</Text>
          </TouchableOpacity>
          <View style={styles.VerticalLineDivider}></View>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignSelf: 'center' }}
          >
            <Image
              source={{
                uri: 'https://gentlemancrafter.files.wordpress.com/2021/03/sale-01.png?w=350&h=200&crop=1',
              }}
              style={styles.imgIconMenuOpen}
            />
            <Text style={styles.txtMenuOpen}>Sale off</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function ListPopularFood() {
    return (
      <View style={styles.containerListPopularFood}>
        <View style={styles.containerTitlePopularFood}>
          <Text style={{ fontSize: 20, color: '#c36e68', fontWeight: 'bold' }}>
            Popular Choices
          </Text>
          <TouchableOpacity style={styles.btnPopularChoiceSeeMoreOpen}>
            <Text style={{ marginTop: 3 }}>See more</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginHorizontal: '4%' }}>
          <FlatList
            data={DATADish}
            renderItem={({ item, index }) => {
              return <FlatListItem item={item} index={index} />;
            }}
            horizontal={true}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
          ></FlatList>
        </View>
      </View>
    );
  }

  const CardFoodMenuHome = ({ imgSource, NameDish, PriceDish, RatingDish }) => {
    return (
      <View style={styles.containerCardFoodMenuHome}>
        <Image
          source={imgSource}
          style={{
            height: 80,
            width: 80,
            resizeMode: 'cover',
            marginRight: '3%',
            borderRadius: 15,
          }}
        />
        <View style={styles.containerInfoCardFoodMenuItem}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
            }}
          >
            {NameDish}
          </Text>
          <Text>{PriceDish}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Image
              source={require('../../assets/icons/Star.png')}
              style={{
                marginTop: 4,
              }}
            />
            <Text
              style={{
                color: '#c36e68',
              }}
            >
              {RatingDish}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  function ListMenu() {
    const NameDish = 'Super Sushi dish';
    const PriceDish = '10';
    const RatingDish = '4.9';
    return (
      <View style={styles.containerNewDishes}>
        <View>
          <View style={styles.containerTitlePopularFood}>
            <Text
              style={{ fontSize: 20, color: '#c36e68', fontWeight: 'bold' }}
            >
              Menu Restaurant
            </Text>
            <TouchableOpacity style={styles.btnMenuSeeMoreOpen}>
              <Text style={{ marginTop: 3 }}>See more</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.containerCardFoodMenuHome}>
            <Image
              source={imgSourceDish}
              style={{
                height: 80,
                width: 80,
                resizeMode: 'cover',
                marginRight: '3%',
                borderRadius: 15,
              }}
            />
            <View style={styles.containerInfoCardFoodMenuItem}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                }}
              >
                {NameDish}
              </Text>
              <Text>{PriceDish}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={require('../../assets/icons/Star.png')}
                  style={{
                    marginTop: 4,
                  }}
                />
                <Text
                  style={{
                    color: '#c36e68',
                  }}
                >
                  {RatingDish}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.lineDividerHorizontal}></View>

          <View style={styles.containerCardFoodMenuHome}>
            <Image
              source={imgSourceDish}
              style={{
                height: 80,
                width: 80,
                resizeMode: 'cover',
                marginRight: '3%',
                borderRadius: 15,
              }}
            />
            <View style={styles.containerInfoCardFoodMenuItem}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                }}
              >
                {NameDish}
              </Text>
              <Text>{PriceDish}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={require('../../assets/icons/Star.png')}
                  style={{
                    marginTop: 4,
                  }}
                />
                <Text
                  style={{
                    color: '#c36e68',
                  }}
                >
                  {RatingDish}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* {HeaderInfo()} */}
      {HeaderInfoTab()}
      {/* {HeaderTab()} */}
      {/* {SearchBarViewComponent()} */}
      {ListPopularFood()}
      {ListMenu()}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '5%',
    paddingLeft: '2%',
    height: windowHeight,
    width: windowWidth,
    paddingBottom: '8%',
    backgroundColor: 'white',
  },
  containerInfoViewTab: {
    height: 65,
    width: windowWidth - 0,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 25,
    paddingHorizontal: '2%',
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: '1%',
    marginBottom: '5%',
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  containerIcHomeView: {
    flex: 1,
  },
  containerTextTitlesInfo: {
    flex: 3,
    maxWidth: '90%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  containerIcUserAccount: {
    flex: 1,
  },
  containerCardFoodMenuHome: {
    width: windowWidth - 50,
    alignSelf: 'center',
    borderRadius: 15,
    backgroundColor: '#fff',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: '3%',
  },
  containerNewDishes: {
    marginTop: '1%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  containerHeaderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexWrap: 'wrap-reverse',
    paddingHorizontal: '5%',
    width: windowWidth,
    height: 50,
    marginTop: '2%',
  },
  lineDividerHorizontal: {
    width: windowWidth - 40,
    height: 1,
    backgroundColor: '#808080',
    alignSelf: 'center',
    marginVertical: '3%',
  },
  containerInfoCardFoodMenuItem: {
    maxWidth: '90%',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginBottom: '10%',
  },
  containerItem1: {
    height: 220,
    width: 300,
    borderRadius: 15,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    backgroundColor: '#fff',
    alignContent: 'center',
    justifyContent: 'center',
  },
  containerBtnAdjust: {
    flexDirection: 'row',
    width: windowWidth - 100,
    height: 50,
    alignSelf: 'center',
    marginTop: '5%',
    // borderRadius: 15,
    backgroundColor: 'transparent',
    // borderWidth: 0.5,
    borderColor: Colors.lightGray,
  },
  containerListPopularFood: {
    height: 250,
    width: windowWidth,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
  },
  containerTitlePopularFood: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexWrap: 'wrap-reverse',
    paddingHorizontal: '5%',
    width: windowWidth,
    marginTop: '5%',
    marginBottom: '4%',
    height: 30,
  },
  containerBtnMMenuOpen: {
    flexDirection: 'row',
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  VerticalLineDivider: {
    alignSelf: 'center',
    height: 30,
    backgroundColor: '#808080',
    width: 1.5,
    marginHorizontal: '10%',
  },
  imgIconMenuOpen: {
    height: 25,
    width: 25,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  imgUserAccountInfoHeader: {
    height: 40,
    width: 40,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  txtMenuOpen: {
    alignSelf: 'center',
    fontSize: 18,
    lineHeight: 30,
  },
  btnAccountOpen: {
    flex: 1,
    marginLeft: '20%',
  },
  btnPopularChoiceSeeMoreOpen: {
    alignContent: 'center',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row-reverse',
    flexWrap: 'nowrap',
  },
  btnMenuSeeMoreOpen: {
    alignContent: 'center',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row-reverse',
    flexWrap: 'nowrap',
  },
  txtHeaderInfoWelcome: {},
  txtHeaderInfoAccount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});
