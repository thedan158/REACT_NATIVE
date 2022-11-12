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
  import back from '../../assets/icons/back-green.png';
  import gallery from '../../assets/icons/picture.png';
  import { useNavigation } from '@react-navigation/core';
  import CustomTextInput from '../../custom component/CustomTextInput';
  import Colors from '../../assets/Colors';
  import * as ImagePicker from 'expo-image-picker';
  import background from '../../assets/images/background.png';
  import CustomModal from '../../custom component/CustomModal';
  import del from '../../assets/icons/delete_light.png';
  import styles from './style';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import axios from 'axios';
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  
  const EditTableInfo = ({ route }) => {
    const handleDeleteTable = async (id) => {
      const res = await axios.delete(
        `https://foody-uit.herokuapp.com/table/deleteTable/${id}`
      );
      const { success, message } = res.data;
      console.log(message);
      console.log(success);
      if (success) {
        navigation.goBack();
      }
    };
    const handleSave = async (id) => {
      const res1 = await axios.put(
        `https://foody-uit.herokuapp.com/table/updateTable/${id}`,
        {
          name: nameTable,
        }
      );
      const success1 = res1.data.success;
      const message1 = res1.data.message;
      console.log(message1);
      console.log(success1);
      if (success1) {
        setVisible(true);
        navigation.goBack();
      }
    };
    const { item } = route.params;
    const [nameTable, setNameTable] = useState(item.name);
    const [numberPeople, setNumberPeople] = useState('');
    const [position, setPosition] = useState('');
    const [visible, setVisible] = useState(false);
    const [visibleDeleted, setVisibleDeleted] = useState(false);
    const [image, setImage] = useState('null');
    const navigation = useNavigation();
  
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
                  source={item.imgSourceEmpty}
                />
  
                {image && (
                  <Image source={{ uri: image }} style={styles.pick}></Image>
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={PickImage} style={styles.button1}>
              <Text style={styles.buttonText}>Select Your Image</Text>
            </TouchableOpacity>
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
  
            {/* Number of people in use */}
            <CustomTextInput
              blurColor={Colors.secondary}
              value={numberPeople}
              onChangeText={(text) => setNumberPeople(text)}
              placeholder="Number of chair"
              keyboardType="decimal-pad"
            />
  
            {/* Position table  */}
            <CustomTextInput
              blurColor={Colors.secondary}
              value={position}
              onChangeText={(text) => setPosition(text)}
              placeholder="Position table"
              keyboardType="decimal-pad"
            />
          </View>
  
          <View style={styles.view4}>
            {/* Button Delete */}
            <TouchableOpacity
              onPress={() => {
                setVisibleDeleted(true);
                handleDeleteTable(item.id);
              }}
              style={styles.buttonDelete}
            >
              <Image
                source={del}
                style={{ height: 15, width: 15, marginHorizontal: 10 }}
              />
              <Text style={styles.buttonTextDelete}>Delete</Text>
            </TouchableOpacity>
  
            {/* Button save */}
            <TouchableOpacity
              onPress={() => handleSave(item.id)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
  
          {/* Modal delete */}
          <CustomModal visible={visibleDeleted}>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../../assets/icons/save-green.png')}
                style={{ height: 150, width: 150, marginVertical: 30 }}
              />
            </View>
  
            <Text
              style={{ marginVertical: 30, fontSize: 20, textAlign: 'center' }}
            >
              Deleted table successfully.
            </Text>
            <TouchableOpacity
              onPress={() => {
                setVisibleDeleted(false);
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </CustomModal>
  
          {/* Modal adding */}
          <CustomModal visible={visible}>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../../assets/icons/save-green.png')}
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
        </View>
      </ScrollView>
    );
  };
  
  export default EditTableInfo;
