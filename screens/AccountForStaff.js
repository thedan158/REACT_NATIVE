import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Switch,
  ImageBackground,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import CardInformation from '../custom component/CardInformation';
import ButtonUser from '../custom component/ButtonUser';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/core';
import power from '../assets/icons/power.png';
import info from '../assets/icons/info.png';
import personal from '../assets/icons/personal.png';
import vector from '../assets/icons/Vector.png';
import password from '../assets/icons/password.png';
import policy from '../assets/icons/policy.png';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseConfig } from '../firebase';
import * as firebase from 'firebase';
import ModalPrivacy from '../custom component/ModalPrivacy';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const AccountForStaff = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const [fullname, setFullname] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const [image, setImage] = useState('null');
  const [visible, setVisible] = React.useState(false);
  const [url, setUrl] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);

  useFocusEffect(() => {
    const getData = async () => {
      const user = await AsyncStorage.getItem('userLoginData');
      const userInfo = JSON.parse(user);
      console.log(userInfo.username);
      const response = await axios.get(
        `https://foody-uit.herokuapp.com/profile/getUserProfile/${userInfo.username}`
      );
      const { success } = response.data;
      const { data } = response.data;
      console.log(data);
      console.log(success);
      if (!success) {
        Alert.alert('Account not found');
        return;
      }
      setAddress(data.address ? data.address : '');
      setEmail(data.email ? data.email : '');
      setFullname(data.fullname ? data.fullname : userInfo.username);
      setPhoneNumber(data.phoneNumber ? data.phoneNumber : '');
      setImage(
        data.imagePath
          ? data.imagePath
          : 'https://firebasestorage.googleapis.com/v0/b/le-repas.appspot.com/o/images%2Fgood.png?alt=media&token=de139437-3a20-4eb3-ba56-f6a591779d15'
      );
    };
    getData().catch((err) => console.log(err));
  }, []);
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Header  */}
        <View style={styles.containerHeader}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Image
              source={personal}
              style={{ height: 30, width: 30, marginHorizontal: 15 }}
            />
            <Text style={styles.textHeader}>Personal details</Text>
          </View>
        </View>
        {/* Card Info  */}
        <View style={styles.feature}>
          <CardInformation
            name={fullname}
            mail={email}
            imageSource={{ uri: image }}
            address={address}
            phone={phoneNumber}
          />
        </View>

        <View style={styles.buttonUser}>
          {/* Edit profile  */}
          <TouchableOpacity
            style={styles.TouchableOpacity}
            onPress={() => navigation.navigate('EditStaffProfile')}
          >
            <Image source={personal} style={styles.iconTitle} />
            <Text style={styles.textName}>Edit Your Profile</Text>
            <Image style={styles.icon} source={vector} />
          </TouchableOpacity>

          {/* Change password  */}
          <TouchableOpacity
            style={styles.TouchableOpacity}
            onPress={() => navigation.navigate('ListFood')}
          >
            <Image source={password} style={styles.iconTitle} />
            <Text style={styles.textName}>Change Your Password</Text>
            <Image style={styles.icon} source={vector} />
          </TouchableOpacity>

          {/* Policy and privacy  */}
          <TouchableOpacity
            style={styles.TouchableOpacity}
            onPress={() => setVisible(true)}
          >
            <Image source={policy} style={styles.iconTitle} />
            <Text style={styles.textName}>Policy and privacy</Text>
            <Image style={styles.icon} source={vector} />
          </TouchableOpacity>
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
              source={power}
              style={{ height: 15, width: 15, marginHorizontal: 10 }}
            />
            <Text style={styles.buttonText1}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal PaP */}
      <ModalPrivacy visible={visible}>
        <View>
          <View style={{ marginBottom: '10%' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              Policy and privacy
            </Text>
          </View>
          <ScrollView
            style={{
              marginLeft: '5%',
              height: '80%',
              marginBottom: '7%',
            }}
          >
            <Text style={styles.details}></Text>
          </ScrollView>

          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <TouchableOpacity
              style={styles.button3}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.buttonText1}>Agree</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalPrivacy>
    </ScrollView>
  );
};

export default AccountForStaff;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    flex: 1,
  },
  containerHeader: {
    flexDirection: 'row',
    // flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginVertical: '7%',
    marginLeft: '5%',
  },
  feature: {
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 3.5,
  },
  buttonUser: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    // flex: 4,
    // marginTop: '-7%',
  },
  about: {
    flexDirection: 'row',
    // flex: 1.5,
    alignItems: 'flex-end',
    marginLeft: '10%',
    marginVertical: '5%',
  },
  buttonContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
  },
  btnEdit: {
    width: 90,
    height: 42,
    borderRadius: 25,
    backgroundColor: '#FA4A0C',

    left: '10%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textHeader: {
    width: 147,

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
  details: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    color: '#232323',
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
    color: '#FA4A0C',
    fontWeight: '700',
    fontSize: 16,
  },
  button1: {
    backgroundColor: '#FA4A0C',
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
  button3: {
    backgroundColor: '#FA4A0C',
    width: '35%',
    padding: 15,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    margin: 5,
    flexDirection: 'row',
  },
  TouchableOpacity: {
    backgroundColor: 'white',
    width: 350,
    height: 50,
    marginTop: '5%',
    borderRadius: 20,
    flexDirection: 'row',
  },

  textName: {
    position: 'absolute',
    fontSize: 18,
    fontWeight: 'bold',
    top: '25%',
    left: '15%',
  },

  icon: {
    width: 18,
    height: 18,
    position: 'absolute',
    right: 30,
    top: '30%',
  },
  iconTitle: {
    width: 20,
    height: 20,
    position: 'absolute',
    marginLeft: 20,
    top: '30%',
  },
});
