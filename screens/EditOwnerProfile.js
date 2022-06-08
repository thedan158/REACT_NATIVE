import {
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Alert,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';
import CustomTextInput from '../custom component/CustomTextInput';
import gallery from '../assets/icons/picture.png';
import * as ImagePicker from 'expo-image-picker';
import { Constants } from 'expo-constants';
import Colors from '../assets/Colors';
import background from '../assets/images/background.png';
import StaffScreen from '../custom component/StaffScreen';
import CustomModal from '../custom component/CustomModal';
import back from '../assets/icons/back-green.png';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const EditProfile = () => {
  const [nameOfRes, setNameOfRes] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const [image, setImage] = useState('null');
  const [visible, setVisible] = React.useState(false);

  useEffect(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Permission denied!');
    }
  }, []);

  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  // *Region for OnPress Signup
  const handleSignup = () => {
    navigation.goBack();
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            width: windowWidth,
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: 0.5,
          }}
        >
          <TouchableOpacity
            style={{
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexDirection: 'row',
              marginLeft: 20,
            }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image
              source={back}
              style={{
                height: 20,
                width: 20,
              }}
            />
          </TouchableOpacity>
        </View>
        {/* Pick image  */}
        <View style={styles.view2}>
          <TouchableOpacity onPress={PickImage}>
            <View style={styles.pickLogo}>
              <ImageBackground
                style={styles.ImageBackground}
                source={gallery}
              />

              {image && (
                <Image source={{ uri: image }} style={styles.pick}></Image>
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={PickImage} style={styles.button1}>
            <Text style={styles.buttonText}>Choose Your Avatar</Text>
          </TouchableOpacity>
        </View>

        {/* Input section  */}
        <View style={styles.view3}>
          {/* Full name input */}

          <CustomTextInput
            blurColor={Colors.secondary}
            value={nameOfRes}
            onChangeText={(text) => setNameOfRes(text)}
            placeholder="Full Name"
          />

          {/* Address input */}

          <CustomTextInput
            blurColor={Colors.secondary}
            value={address}
            onChangeText={(text) => setAddress(text)}
            placeholder="Address"
          />

          {/* Hotline */}

          <CustomTextInput
            blurColor={Colors.secondary}
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            placeholder="Phone number"
            keyboardType="decimal-pad"
          />

          <CustomTextInput
            blurColor={Colors.secondary}
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Email"
            keyboardType="decimal-pad"
          />
        </View>

        <View style={styles.view4}>
          {/* Button */}
          <TouchableOpacity
            onPress={() => setVisible(true)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>

        {/* Modal  */}
        <CustomModal visible={visible}>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('../assets/icons/save-green.png')}
              style={{ height: 150, width: 150, marginVertical: 30 }}
            />
          </View>

          <Text
            style={{ marginVertical: 30, fontSize: 20, textAlign: 'center' }}
          >
            Update profile successfully{' '}
          </Text>
          <TouchableOpacity
            onPress={() => {
              handleSignup();
              setVisible(false);
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </CustomModal>
      </View>
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
  },
  button: {
    backgroundColor: Colors.secondary,
    width: '100%',
    padding: 15,
    borderRadius: 20,
    elevation: 1,
    alignItems: 'center',
  },
  button1: {
    backgroundColor: Colors.secondary,
    width: '60%',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },

  view2: {
    flex: 3,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  view3: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 5,
  },
  view4: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
  },

  textView: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },

  loginBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    top: 30,
    left: 10,
  },

  loginText: {
    color: Colors.secondary,
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
    position: 'absolute',
    alignSelf: 'center',
  },

  ownerText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'normal',
  },

  signupBox: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    right: 15,
  },

  rectangle: {
    width: 130,
    height: 3,
    backgroundColor: Colors.secondary,
    position: 'relative',
    bottom: -9,
  },

  signupText: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  registerText: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
  },

  fullNameBox: {
    width: 300,
    height: 55,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 13,
  },

  fullNameText: {
    fontSize: 15,
    marginLeft: 30,
  },

  passwordBox: {
    width: 300,
    height: 55,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    marginTop: 25,
  },

  gallery: {
    height: 65,
    width: 65,
    alignSelf: 'center',
  },

  textSignupButton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },

  pickLogo: {
    width: 140,
    height: 140,
    backgroundColor: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 10,
    borderStyle: 'dashed',
  },
  pick: {
    width: 140,
    height: 140,
    borderColor: 'black',
  },

  ImageBackground: {
    height: 50,
    width: 50,
    position: 'absolute',
    alignSelf: 'center',
  },
});
