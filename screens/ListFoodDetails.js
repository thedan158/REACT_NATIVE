import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { SharedElement } from 'react-navigation-shared-element';
import close from '../assets/icons/close.png';
import clock from '../assets/icons/clock-orange.png';
import star from '../assets/icons/yellowstar.png';
import Colors from '../assets/Colors';

const width = Dimensions.get('window').width;
const DURATION = 400;

const toTop = {
  0: { opacity: 0, translateY: 0 },
  1: { opacity: 1, translateY: 10 },
};
const toBottom = {
  0: { opacity: 0, translateX: 320, translateY: -10 },
  1: { opacity: 1, translateX: 320, translateY: 5 },
};

const ListFoodDetails = ({ navigation, route }) => {
  const { item } = route.params;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
      }}
    >
      <View></View>
      {/* Image  */}
      <View style={{ flex: 5 }}>
        <SharedElement id={item.key}>
          <Image
            source={item.poster}
            style={{ height: '100%', width: width }}
          />
        </SharedElement>
      </View>

      {/* Details  */}
      <View style={{ flex: 5 }}>
        <Animatable.View
          useNativeDriver
          animation={toTop}
          delay={-100}
          style={{
            backgroundColor: 'white',
            width: width,
            height: '100%',
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            marginTop: '-10%',
          }}
        >
          {/* Back button */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Animatable.Image
              useNativeDriver
              animation={toBottom}
              delay={DURATION}
              source={close}
              style={{
                height: 30,
                width: 30,
                marginLeft: '2%',
                marginTop: '5%',
              }}
            />
          </TouchableOpacity>

          {/* Name of food */}
          <Animatable.Text
            useNativeDriver
            animation={toTop}
            delay={DURATION + 100}
            style={{
              fontSize: 50,
              marginLeft: '5%',
              fontWeight: 'bold',
              marginTop: '2%',
            }}
          >
            {item.title}
          </Animatable.Text>

          {/* Time and star */}
          <Animatable.View
            useNativeDriver
            animation={toTop}
            delay={DURATION + 300}
            style={{ flexDirection: 'row', marginLeft: '2%', marginTop: '2%' }}
          >
            <Image
              source={clock}
              style={{ height: 20, width: 20, marginHorizontal: 10 }}
            />
            <Text style={{ fontSize: 15 }}>{`${item.time} mins`}</Text>

            <Image
              source={star}
              style={{ height: 20, width: 20, marginLeft: 15, marginRight: 5 }}
            />
            <Text style={{ fontSize: 15 }}>{item.rating}</Text>
          </Animatable.View>

          {/* Cost  */}
          <Animatable.View
            useNativeDriver
            animation={toTop}
            delay={DURATION + 500}
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              height: 45,
              marginTop: '2%',
              marginLeft: '4%',
            }}
          >
            <Text style={{ fontSize: 25, color: Colors.primary }}>$</Text>
            <Text
              style={{
                fontSize: 40,
                fontWeight: 'bold',
                color: Colors.primary,
              }}
            >
              {item.cost}
            </Text>
          </Animatable.View>

          {/* Description */}
          <Animatable.View
            useNativeDriver
            animation={toTop}
            delay={DURATION + 700}
            style={{
              width: '92%',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '7%',
              marginLeft: '4%',
            }}
          >
            <Text style={{ fontSize: 20, color: '#434344' }}>
              {item.description}
            </Text>
          </Animatable.View>
        </Animatable.View>
      </View>
    </View>
  );
};

ListFoodDetails.sharedElements = (route, otherRoute, showing) => {
  const { item } = route.params;

  return [
    {
      id: item.key,
    },
  ];
};

export default ListFoodDetails;
