import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import CardInformation from '../custom component/CardInformation';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/core';
import power from '../assets/icons/power.png';
import personal_light from '../assets/icons/personal_light.png';
import personal_dark from '../assets/icons/personal_dark.png';
import password_light from '../assets/icons/password_light.png';
import password_dark from '../assets/icons/password_dark.png';
import light_on from '../assets/icons/light-on.png';
import dark_on from '../assets/icons/dark-on.png';
import policy_light from '../assets/icons/policy_light.png';
import policy_dark from '../assets/icons/policy_dark.png';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseConfig } from '../firebase';
import * as firebase from 'firebase';
import ModalPrivacy from '../custom component/ModalPrivacy';

import styled, { ThemeProvider } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { switchTheme } from '../redux/themeActions';
import { lightTheme, darkTheme } from '../assets/Theme';

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

  const theme = useSelector((state) => state.themeReducer.theme);
  const dispatch = useDispatch();

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
    <ThemeProvider theme={theme}>
      <Container>
        {/* Header  */}
        <View style={styles.containerHeader}>
          <View
            style={{
              marginTop: '1%',
              flex: 8,
            }}
          >
            <Content style={styles.textHeader}>Personal details</Content>
          </View>
          <View style={{ flex: 2, marginRight: '5%' }}>
            {theme.mode === 'light' ? (
              <Switch onPress={() => dispatch(switchTheme(darkTheme))}>
                <Image source={light_on} style={{ width: 25, height: 25 }} />
              </Switch>
            ) : (
              <Switch onPress={() => dispatch(switchTheme(lightTheme))}>
                <Image source={dark_on} style={{ width: 25, height: 25 }} />
              </Switch>
            )}
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
          <Button onPress={() => navigation.navigate('EditStaffProfile')}>
            <Image
              source={theme.mode === 'light' ? personal_light : personal_dark}
              style={styles.iconTitle}
            />
            <Content>Edit Your Profile</Content>
          </Button>

          {/* Change password  */}
          <Button onPress={() => navigation.navigate('ChangeStaffPassword')}>
            <Image
              source={theme.mode === 'light' ? password_light : password_dark}
              style={styles.iconTitle}
            />
            <Content>Change Your Password</Content>
          </Button>

          {/* Policy and privacy  */}
          <Button onPress={() => setVisible(true)}>
            <Image
              source={theme.mode === 'light' ? policy_light : policy_dark}
              style={styles.iconTitle}
            />
            <Content>Policy and privacy</Content>
          </Button>
        </View>

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
      </Container>

      {/* Modal PaP */}
      <ModalPrivacy visible={visible}>
        <TouchableOpacity
          style={styles.button3}
          onPress={() => setVisible(false)}
        >
          <Text style={styles.buttonText1}>Agree</Text>
        </TouchableOpacity>
      </ModalPrivacy>
    </ThemeProvider>
  );
};

export default AccountForStaff;

const Content = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
  font-weight: bold;
`;
const Button = styled.TouchableOpacity`
  margin-top: 5%;
  background-color: ${(props) => props.theme.PRIMARY_BUTTON_COLOR};
  align-items: center;
  height: 55px;
  width: 85%;
  border-radius: 20px;
  flex-direction: row;

  shadow-color: ${(props) => props.theme.PRIMARY_SHADOW_COLOR};
  shadow-offset: 0px 0px;
  shadow-opacity: 0.2;
  shadow-radius: 10px;
  elevation: 1;
`;
const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_ACCOUNT_COLOR};
`;
const Switch = styled.TouchableOpacity`
  align-items: center;
  height: 50px;
  width: 50px;
  justify-content: center;
  border-radius: 10px;
  background-color: ${(props) => props.theme.PRIMARY_BUTTON_COLOR}; ;
`;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    flex: 1,
  },
  containerHeader: {
    flexDirection: 'row',
    // flex: 1,
    alignItems: 'center',
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
    marginTop: '5%',
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
    marginVertical: 30,
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
    fontWeight: 'bold',
    fontSize: 25,
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
    width: '35%',
    padding: 15,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    margin: 5,
    flexDirection: 'row',
    backgroundColor: '#FA4A0C',
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
    marginHorizontal: 15,
  },
});
