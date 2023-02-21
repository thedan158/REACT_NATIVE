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
import InputText from '../../../../custom component/InputText';
import gallery from '../../../../assets/icons/picture.png';
import * as ImagePicker from 'expo-image-picker';
import { Constants } from 'expo-constants';
import Colors from '../../../../assets/Colors';
import background from '../../../../assets/images/background.png';
import StaffScreen from '../../../../custom component/StaffScreen';
import CustomModal from '../../../../custom component/CustomModal';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseConfig } from '../../../../firebase';
import * as firebase from 'firebase';
import LoadingStaff from '../../../../custom component/LoadingStaff';
import { useDispatch ,useSelector } from 'react-redux';
import styles from './style';
import { getAPIActionJSON } from '../../../../api/ApiActions';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const EditProfile = () => {
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
  const theme = useSelector((state) => state.setting.theme);
  const [visibleLoad, setVisibleLoad] = React.useState(false);
  const dispatch = useDispatch();
  const username = useSelector(state => state.user.username);
  // function close LoadingStaff and open CustomModal when timePassed is true
  const loadingAndPopup = () => {
    setVisibleLoad(true);
    setTimeout(() => {
      setVisibleLoad(false);
      setVisible(true);
    }, 5000);
  };

  const getData = () =>{
    dispatch(
      getAPIActionJSON(
        "getUserProfile", 
        null,
        null,
        `/${username}`,
        (res) => handleResponseUser(res)
      )
    )
    const handleResponseUser = (res) => {
      if(!res.success) {
        Alert.alert(res.message)
        return;
      }
      setAddress(res.data.address);
      setEmail(res.data.email);
      setFullname(res.data.fullname);
      setPhoneNumber(res.data.phoneNumber);
      setImage(res.data.imagePath);
    }
  }

  useEffect(async () => {
    getData();
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
  // *Region for save profile
  const handleUpdateProfile = async () => {
    loadingAndPopup();
    //*Get user data from AsyncStorage
    // const user = await AsyncStorage.getItem('userLoginData');
    // const userData = JSON.parse(user);

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

    //*Upload blob to firebase
    const ref = firebase
      .storage()
      .ref()
      .child(`images/profile/${username}.jpg`);
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
          // console.log(userData);
          // console.log('platform: ' + Platform.OS);
          // console.log('blob:' + blob);
          // console.log('url:' + url);
          // const res = await axios.post(
          //   `https://foody-uit.herokuapp.com/profile/update/${userData.username}`,
          //   {
          //     fullname: fullname,
          //     address: address,
          //     phoneNumber: phoneNumber,
          //     email: email,
          //     imagePath: url,
          //   }
          // );
          // const { success } = res.data;
          // console.log(success);
          // if (!success) {
          //   Alert.alert('Update failed');
          //   return;
          // }
          dispatch(
            getAPIActionJSON(
              "updateProfile",
              {
                fullname: fullname,
                address: address,
                phoneNumber: phoneNumber,
                email: email,
                imagePath: image,
              },
              null,
              `/${username}`,
              (res) => handleUpdateResponse (res)
            )
          )
          const handleUpdateResponse = (res) => {
            if(!res.success) {
              Alert.alert('Update failed');
              return;
            }

          }
        });
      }
    );
  };
  // *End region

  // *Region for OnPress Signup
  const handleSignup = () => {
    navigation.navigate('TabForStaff', { screen: 'AccountForStaff' });
  };

  return (
    <StaffScreen>
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

                {image ? (
                  <Image source={{ uri: image }} style={styles.pick}></Image>
                ) : null }
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={PickImage} style={styles.button1}>
              <Text style={styles.buttonText}>Change Your Avatar</Text>
            </TouchableOpacity>
          </View>

          {/* Input section  */}
          <View style={styles.view3}>
            {/* Full name input */}

            <InputText
              blurColor={Colors.primary}
              value={fullname}
              onChangeText={(text) => setFullname(text)}
              placeholder="Full Name"
            />

            {/* Address input */}

            <InputText
              blurColor={Colors.primary}
              value={address}
              onChangeText={(text) => setAddress(text)}
              placeholder="Address"
            />

            {/* Hotline */}

            <InputText
              blurColor={Colors.primary}
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
              placeholder="Phone Number"
              keyboardType="decimal-pad"
            />

            <InputText
              blurColor={Colors.primary}
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Email"
            />
          </View>

          <View style={styles.view4}>
            {/* Button */}
            <TouchableOpacity
              onPress={handleUpdateProfile}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Modal loading */}
        <LoadingStaff visible={visibleLoad}></LoadingStaff>

        {/* Modal popup */}
        <CustomModal visible={visible}>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('../../../../assets/icons/save-orange.png')}
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
            Update profile successfully
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
      </ScrollView>
    </StaffScreen>
  );
};

export default EditProfile;
