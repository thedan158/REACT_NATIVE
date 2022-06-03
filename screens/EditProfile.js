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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const EditProfile = () => {
  const [nameOfRes, setNameOfRes] = useState('');
  const [address, setAddress] = useState('');
  const [hotline, setHotline] = useState('');
  const navigation = useNavigation();
  const [image, setImage] = useState('null');

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
    navigation.navigate('TabForOwner');
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <ImageBackground
          source={background}
          resizeMode="cover"
          style={{ flex: 1 }}
        >
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
              blurColor={Colors.primary}
              value={nameOfRes}
              onChangeText={(text) => setNameOfRes(text)}
              placeholder="Full Name"
            />

            {/* Address input */}

            <CustomTextInput
              blurColor={Colors.primary}
              value={address}
              onChangeText={(text) => setAddress(text)}
              placeholder="Address"
            />

            {/* Hotline */}

            <CustomTextInput
              blurColor={Colors.primary}
              value={hotline}
              onChangeText={(text) => setHotline(text)}
              placeholder="Hotline"
              keyboardType="decimal-pad"
            />

            <CustomTextInput
              blurColor={Colors.primary}
              value={hotline}
              onChangeText={(text) => setHotline(text)}
              placeholder="Hotline"
              keyboardType="decimal-pad"
            />
          </View>

          <View style={styles.view4}>
            {/* Button */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleSignup} style={styles.button}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    width: windowWidth,
    height: windowHeight,
  },
  buttonContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#FA4A0C',
    width: '80%',
    padding: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  button1: {
    backgroundColor: '#FA4A0C',
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
    backgroundColor: 'white',
    marginTop: 30,
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
    color: '#FA4A0C',
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
    backgroundColor: '#FA4A0C',
    position: 'relative',
    bottom: -9,
  },

  signupText: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  registerText: {
    flexWrap: 'wrap',
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
