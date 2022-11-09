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
  Platform,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/core';
import logo from '../../../../assets/images/logo_app.png';
import CustomTextInput from '../../../../custom component/CustomTextInput';
import gallery from '../../../../assets/icons/gallery.png';
import * as ImagePicker from 'expo-image-picker';
import { Constants } from 'expo-constants';
import Colors from '../../../../assets/Colors';
import background from '../../../../assets/images/background.png';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseConfig } from '../../../../firebase';
import * as firebase from 'firebase';
import styles from './style';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const RestaurantInformation = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const [nameOfRes, setNameOfRes] = useState('');
  const [address, setAddress] = useState('');
  const [hotline, setHotline] = useState('');
  const navigation = useNavigation();
  const [image, setImage] = useState('null');
  const [url, setUrl] = useState('');

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
  // Create random number for restaurant id
  function randomNumber() {
    return Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000;
  }
  // *Region for OnPress Signup
  const handleSignup = async () => {
    const rNumber = randomNumber();
    console.log(rNumber);
    const id = rNumber.toString();
    const resCheckRestaurantNotExists = await axios.post(
      `https://foody-uit.herokuapp.com/restaurant/checkRestaurantNotExists`,
      {
        id: id,
      }
    );
    const successCheckRes = resCheckRestaurantNotExists.data.success;
    console.log('Res not exists: ' + successCheckRes);
    while (!successCheckRes) {
      const id = rNumber.toString();
      resCheckRestaurantNotExists = await axios.post(
        `https://foody-uit.herokuapp.com/restaurant/checkRestaurantNotExists`,
        {
          id: id,
        }
      );
      successCheckRes = resCheckRestaurantNotExists.data.success;
    }
    console.log('Create restaurant');
    //*Create blob for image
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', image, true);
      xhr.send(null);
    });

    //*Upload image to firebase
    const ref = firebase
      .storage()
      .ref()
      .child(`images/restaurants/${nameOfRes}.jpg`);
    const snapshot = ref.put(blob);
    await snapshot.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        console.log('uploading');
      },
      (error) => {
        console.log(error);
        blob.close();
        return;
      },
      async () => {
        await ref.getDownloadURL().then(async (url) => {
          console.log('download url: ' + url);
          setUrl(url);
          blob.close();
          console.log('platform: ' + Platform.OS);
          console.log('blob:' + blob);
          const res = await axios
            .post(
              `https://foody-uit.herokuapp.com/restaurant/createRestaurant`,
              {
                id: id,
                name: nameOfRes,
                address: address,
                hotline: hotline,
                imagePath: url,
              }
            )
            .catch((err) => {
              Alert.alert('Error', 'Something went wrong');
              console.log(err);
            });
          const { success } = res.data;
          console.log(success);
          if (success) {
            const userLoginData = await AsyncStorage.getItem('userLoginData');
            const user = JSON.parse(userLoginData);

            console.log('user name: ' + user.username);
            const resUpdateUserRestaurantID = await axios.put(
              `https://foody-uit.herokuapp.com/auth/updateUser`,
              {
                username: user.username,
                restaurantID: id,
              }
            );
            const successUpdateUserRestaurantID =
              resUpdateUserRestaurantID.data.success;
            if (successUpdateUserRestaurantID) {
              console.log('Update user restaurant id success');
              navigation.navigate('AppLoaderOwner');
            }
          }
        });
      }
    );
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <ImageBackground
          source={background}
          resizeMode="cover"
          style={{ flex: 1 }}
        >
          {/* Logo */}
          <View style={styles.view1}>
            <View>
              <Image style={styles.logo} source={logo}></Image>
            </View>
            <View>
              <Text style={styles.textPleaseRegister}>
                Fill your restaurant information
              </Text>
            </View>
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
          </View>
          {/* Input section  */}
          <View style={styles.view3}>
            <View>
              {/* Full name input */}

              <CustomTextInput
                blurColor={Colors.primary}
                value={nameOfRes}
                onChangeText={(text) => setNameOfRes(text)}
                placeholder="Name of Restaurant"
              />
            </View>

            {/* Address input */}
            <View style={{ marginTop: -15 }}>
              <CustomTextInput
                blurColor={Colors.primary}
                value={address}
                onChangeText={(text) => setAddress(text)}
                placeholder="Address"
              />
            </View>
            {/* Hotline */}
            <View style={{ marginTop: -15 }}>
              <CustomTextInput
                blurColor={Colors.primary}
                value={hotline}
                onChangeText={(text) => setHotline(text)}
                placeholder="Hotline"
                keyboardType="decimal-pad"
              />
            </View>
          </View>

          <View style={styles.view4}>
            {/* Button */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleSignup} style={styles.button}>
                <Text style={styles.buttonText}>Finish</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

export default RestaurantInformation;
