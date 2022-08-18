import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import back from '../assets/icons/back-green.png';
import gallery from '../assets/icons/picture.png';
import { useNavigation } from '@react-navigation/core';
import CustomTextInput from '../custom component/CustomTextInput';
import Colors from '../assets/Colors';
import * as ImagePicker from 'expo-image-picker';
import background from '../assets/images/background.png';
import CustomModal from '../custom component/CustomModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import styled, { ThemeProvider } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AddingTable = () => {

  const theme = useSelector((state) => state.themeReducer.theme);
  const [nameTable, setNameTable] = useState('');
  const [numberPeople, setNumberPeople] = useState('');
  const [position, setPosition] = useState('');
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState('null');
  const navigation = useNavigation();
  const handleSave = async () => {
    const userLoginData = await AsyncStorage.getItem('userLoginData');
    const user = JSON.parse(userLoginData);
    console.log('username: ' + user.username);
    const res = await axios.post(
      `https://foody-uit.herokuapp.com/table/createTable`,
      {
        username: user.username,
        name: nameTable,
      }
    );
    const { success, message } = res.data;
    console.log(message);
    console.log(success);
    if (success) {
      setVisible(true);
      navigation.goBack();
    }
  };
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
  return (
    <ThemeProvider theme={theme}>
      <ContainerView>
        <View
          style={{
            flexDirection: 'row',
            paddingTop: '0%',
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
          <ImageBackground
            style={styles.ImageBackground}
            source={require('../assets/images/logo_app.png')}
          />

          {image && <Image source={{ uri: image }} style={styles.pick}></Image>}
        </View>

        {/* Input section  */}
        <View style={styles.view3}>
          {/* Name Table input */}
          <CustomTextInput
            blurColor={Colors.secondary}
            value={nameTable}
            onChangeText={(text) => setNameTable(text)}
            placeholder="Name Table"
          />
        </View>

        <View style={styles.view4}>
          {/* Button save */}
          <TouchableOpacity onPress={handleSave} style={styles.button}>
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
            Adding table successfully.
          </Text>
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </CustomModal>
      </ContainerView>
    </ThemeProvider>
      
    
  );
};

export default AddingTable;

const ContainerView = styled.View`
  flex: 1;
  height: ${windowHeight};
  width: ${windowWidth};
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_COLOR};
  padding-top: 0%;
`

const styles = StyleSheet.create({
  view2: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 50,
  },
  view3: {
    marginVertical: 50,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImageBackground: {
    height: 200,
    width: 200,
    borderRadius: 15,
    position: 'absolute',
    alignSelf: 'center',
  },
  view4: {
    justifyContent: 'center',
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
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
    borderRadius: 15,
    alignSelf: 'center',
    borderColor: 'black',
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
  button: {
    backgroundColor: Colors.secondary,
    width: '100%',
    padding: 15,
    borderRadius: 20,
    elevation: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
