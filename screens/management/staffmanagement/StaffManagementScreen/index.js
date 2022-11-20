import {
  Modal,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  FlatList,
  Dimensions,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/core';
import add from '../../../../assets/icons/add.png';
import { useSelector } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import waiter_light from '../../../../assets/icons/waiter_light.png';
import waiter_dark from '../../../../assets/icons/waiter_dark.png';
import chef_light from '../../../../assets/icons/chef_light.png';
import chef_dark from '../../../../assets/icons/chef_dark.png';
import styles from './style';

const windowWidth = Dimensions.get('window').width;
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ModalPopup = ({ visible, children }) => {
  const [showModal, setShowModal] = React.useState(visible);
  return (
    <Modal transparent visible={true}>
      <View style={styles.modalBackground}>
        <View style={[styles.modalContainer]}>{children}</View>
      </View>
    </Modal>
  );
};
var CHEF = [],
  WAITER = [];
const StaffManagement = () => {
  const isFocus = useIsFocused();
  const [masterData, setMasterData] = useState([]);
  const [WaiterData, setWaiterData] = useState([]);
  const [ChefData, setChefData] = useState([]);
  const Tab = createMaterialTopTabNavigator();
  const navigation = useNavigation();
  const theme = useSelector((state) => state.setting.theme);

  useEffect(() => {
    const getData = async () => {
      (CHEF = []), (WAITER = []);
      const userLoginData = await AsyncStorage.getItem('userLoginData');
      const user = JSON.parse(userLoginData);
      console.log('username: ' + user.username);
      const res = await axios.get(
        `https://foody-uit.herokuapp.com/auth/getAllUser/${user.username}`
      );
      const { success, message } = res.data;
      console.log(message);
      console.log(success);
      if (success) {
        for (let i = 0; i < message.length; i++) {
          if (message[i].role == 'chef') {
            CHEF.push(message[i]);
          } else if (message[i].role == 'waiter') {
            WAITER.push(message[i]);
          }
        }
        setWaiterData(WAITER);
        setChefData(CHEF);

        console.log('filteredData is all selected');
      } else {
        setWaiterData([]);
        setChefData([]);

        console.log('filteredData is all selected');
      }
    };
    getData().catch((err) => console.log(err));
  }, [isFocus]);
  // flat list view

  const FlatListItem = ({ item }) => {
    console.log(item);
    return (
      <TouchableOpacity
        style={[
          styles.TouchableOpacity,
          { borderBottomColor: theme.mode === 'light' ? '#e0e0e0' : '#3D3C3F' },
        ]}
        onPress={() => navigation.navigate('StaffInformation', { item })}
      >
        <TouchableOpacity
          style={{ position: 'absolute', left: '-25%' }}
          onPress={() => navigation.navigate('StaffInformation', { item })}
        >
          <Image
            style={{
              width: 45,
              height: 45,
              borderRadius: 100,
            }}
            source={{
              uri:
                item.imagePath ||
                'https://firebasestorage.googleapis.com/v0/b/le-repas.appspot.com/o/images%2Fgood.png?alt=media&token=de139437-3a20-4eb3-ba56-f6a591779d15',
            }}
          />
        </TouchableOpacity>

        <View
          style={{
            justifyContent: 'center',

            width: '65%',
          }}
        >
          <Content style={styles.textName}>{item.username}</Content>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <ScrollView
        style={[
          styles.container,
          { backgroundColor: theme.PRIMARY_BACKGROUND_COLOR },
        ]}
      >
        {/* header  */}
        <View style={styles.view1}>
          {/* title  */}
          <Text style={styles.title}>List Staffs</Text>

          {/* add and create account for new staff  */}
          <TouchableOpacity
            onPress={() => navigation.navigate('CreateStaffAccount')}
          >
            <Image source={add} style={styles.add} />
          </TouchableOpacity>
        </View>

        {/* List staffs  */}

        {/* List waiter  */}
        <View
          style={{ justifyContent: 'center', alignItems: 'center', margin: 10 }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: '5%',
            }}
          >
            <Image
              source={theme.mode === 'light' ? waiter_light : waiter_dark}
              style={styles.iconHeader}
            />
            <Content style={styles.textWaiter}>Waiters</Content>
          </View>
          <FlatList
            data={WaiterData}
            renderItem={({ item, index }) => {
              return <FlatListItem item={item} index={index} />;
            }}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* List chef  */}
        <View
          style={{ justifyContent: 'center', alignItems: 'center', margin: 10 }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: '5%',
            }}
          >
            <Image
              source={theme.mode === 'light' ? chef_light : chef_dark}
              style={styles.iconHeader}
            />
            <Content style={styles.textWaiter}>Chefs</Content>
          </View>
          <FlatList
            data={ChefData}
            renderItem={({ item, index }) => {
              return <FlatListItem item={item} index={index} />;
            }}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </ThemeProvider>
  );
};
const Content = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
  font-weight: bold;
`;
export default StaffManagement;
