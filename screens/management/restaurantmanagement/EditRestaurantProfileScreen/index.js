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
import InputText from '../../../../custom component/InputText';
import gallery from '../../../../assets/icons/picture.png';
import * as ImagePicker from 'expo-image-picker';
import { Constants } from 'expo-constants';
import Colors from '../../../../assets/Colors';
import background from '../../../../assets/images/background.png';
import CustomModal from '../../../../custom component/CustomModal';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseConfig } from '../../../../firebase';
import * as firebase from 'firebase';
import LoadingOwner from '../../../../custom component/LoadingOwner';
import OwnerScreen from '../../../../custom component/OwnerScreen';
import { useSelector } from 'react-redux';
import styles from './style';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const EditResProfile = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const [nameOfRes, setNameOfRes] = useState('');
  const [address, setAddress] = useState('');
  const [hotline, setHotline] = useState('');
  const navigation = useNavigation();
  const [image, setImage] = useState('null');
  const [visible, setVisible] = React.useState(false);
  const [url, setUrl] = React.useState('');
  const [visibleLoad, setVisibleLoad] = React.useState(false);
  const theme = useSelector((state) => state.themeReducer.theme);

  // function close LoadingOwner and open CustomModal when timePassed is true
  const loadingAndPopup = () => {
    setVisibleLoad(true);
    setTimeout(() => {
      setVisibleLoad(false);
      setVisible(true);
    }, 5000);
  };

  useEffect(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission denied!');
    }

    const getData = async () => {
      const user = await AsyncStorage.getItem('userLoginData');
      const userInfo = JSON.parse(user);
      console.log(userInfo.username);
      const response = await axios.get(
        `https://foody-uit.herokuapp.com/restaurant/getRestaurant/${userInfo.username}`
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
      setHotline(data.hotline ? data.hotline : '');
      setNameOfRes(data.name ? data.name : '');
      setImage(
        data.imagePath
          ? data.imagePath
          : 'https://firebasestorage.googleapis.com/v0/b/le-repas.appspot.com/o/images%2Fgood.png?alt=media&token=de139437-3a20-4eb3-ba56-f6a591779d15'
      );
    };
    getData().catch((err) => console.log(err));
  }, []);
  const handleRestaurantUpdate = async () => {
    loadingAndPopup();
    //*Get user data from asyncstorage
    const user = await AsyncStorage.getItem('userLoginData');
    const userInfo = JSON.parse(user);
    console.log(userInfo.username);

    //*Create blob from image
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
          console.log(userInfo);
          console.log('platform: ' + Platform.OS);
          console.log('blob:' + blob);
          console.log('url:' + url);
          const res = await axios.post(
            `https://foody-uit.herokuapp.com/restaurant/updateRestaurant/${userInfo.username}`,
            {
              name: nameOfRes,
              address: address,
              hotline: hotline,
              imagePath: url,
            }
          );
          const { success } = res.data;
          console.log(success);
          if (!success) {
            Alert.alert('Update failed');
            return;
          }
        });
      }
    );
  };
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

  return (
    <OwnerScreen>
      <ScrollView>
        <View style={styles.container}>
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
              <Text style={styles.buttonText}>Change Your Logo</Text>
            </TouchableOpacity>
          </View>
          {/* Input section  */}
          <View style={styles.view3}>
            <View>
              {/* Full name input */}

              <InputText
                blurColor={Colors.primary}
                value={nameOfRes}
                onChangeText={(text) => setNameOfRes(text)}
                placeholder="Name of Restaurant"
              />
            </View>

            {/* Address input */}
            <View>
              <InputText
                blurColor={Colors.primary}
                value={address}
                onChangeText={(text) => setAddress(text)}
                placeholder="Address"
              />
            </View>
            {/* Hotline */}
            <View>
              <InputText
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
              <TouchableOpacity
                onPress={handleRestaurantUpdate}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Modal loading  */}
          <LoadingOwner visible={visibleLoad}></LoadingOwner>
          {/* Modal  */}
          <CustomModal visible={visible}>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../../../../assets/icons/save-green.png')}
                style={{ height: 150, width: 150, marginVertical: 30 }}
              />
            </View>

            <Text
              style={{
                marginVertical: 30,
                fontSize: 20,
                textAlign: 'center',
                color: theme.PRIMARY_TEXT_COLOR,
              }}
            >
              Update profile successfully{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
                setVisible(false);
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </CustomModal>
        </View>
      </ScrollView>
    </OwnerScreen>
  );
};

export default EditResProfile;
