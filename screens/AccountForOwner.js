import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import VKH from '../assets/images/VKH.jpg';
import CardInformation from '../custom component/CardInformation';
import ButtonUser from '../custom component/ButtonUser';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/core';
import power2 from '../assets/icons/power2.png';
import setting from '../assets/icons/setting.png';
import pen from '../assets/icons/pen.png';
import info from '../assets/icons/info.png';
import Colors from '../assets/Colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const AccountForOwner = () => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Header  */}
        <View style={styles.containerHeader}>
          <Text style={styles.textHeader}>Personal details</Text>
          <TouchableOpacity style={styles.btnEdit}>
            <Text style={styles.editText}>Edit</Text>
            <Image
              source={pen}
              style={{ height: 15, width: 15, marginHorizontal: 5 }}
            />
          </TouchableOpacity>
        </View>
        {/* Card Info  */}
        <View style={styles.feature}>
          <CardInformation
            name="Tanhao"
            mail="daotanhao9h@gmail.com"
            imageSource={VKH}
            address="Bien Hoa, Dong Nai, Ho Chi Minh City"
            phone="+84 528679244"
          />
        </View>

        <View style={styles.buttonUser}>
          <ButtonUser name="Your Order" />
          <ButtonUser name="Notifications" />
          <ButtonUser name="My Preferences" />
          <ButtonUser name="Help" />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}
          style={styles.about}
        >
          <Image
            source={info}
            style={{
              height: 20,
              width: 20,
            }}
          />
          <Text style={{ marginHorizontal: 10 }}>About</Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}
            style={styles.button1}
          >
            <Image
              source={setting}
              style={{
                height: 15,
                width: 15,
                marginHorizontal: 10,
              }}
            />
            <Text style={styles.buttonText1}>Setting</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}
            style={styles.button2}
          >
            <Image
              source={power2}
              style={{ height: 15, width: 15, marginHorizontal: 10 }}
            />
            <Text style={styles.buttonText2}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AccountForOwner;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    flex: 1,
  },
  containerHeader: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  feature: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 3.5,
  },
  buttonUser: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 4,
    marginTop: '-7%',
  },
  about: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginLeft: 40,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flex: 2.5,
    marginHorizontal: 15,
  },
  btnEdit: {
    width: 90,
    height: 42,
    borderRadius: 25,
    backgroundColor: Colors.secondary,
    top: '20%',
    left: '10%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textHeader: {
    width: 147,
    height: 27,
    top: '2%',
    right: '30%',
    fontWeight: 'bold',
    fontSize: 18,
    // lineHeight: 27,
  },
  editText: {
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  card: {
    width: '95%',
    height: 170,
    backgroundColor: 'black',
    marginHorizontal: 15,
    marginTop: 60,
    borderRadius: 20,
    backgroundColor: 'white',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    flexDirection: 'row',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 20,
    alignSelf: 'center',
    marginLeft: 30,
  },
  information: {
    justifyContent: 'center',
    marginLeft: 20,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    width: 180,
  },
  textName: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 27,
  },
  details: {
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 18,
    color: '#898888',
  },
  line: {
    width: 170,
    backgroundColor: '#898888',
    height: 1,
    marginVertical: 5,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 20,
  },

  buttonText1: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonText2: {
    color: Colors.secondary,
    fontWeight: '700',
    fontSize: 16,
  },
  button1: {
    backgroundColor: Colors.secondary,
    width: '50%',
    padding: 15,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    margin: 5,
    flexDirection: 'row',
  },
  button2: {
    backgroundColor: 'white',
    width: '50%',
    padding: 15,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    margin: 5,
    flexDirection: 'row',
  },
});
