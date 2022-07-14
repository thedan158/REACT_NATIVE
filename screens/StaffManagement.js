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
import { useNavigation } from '@react-navigation/core';
import add from '../assets/icons/add.png';
import Colors from '../assets/Colors';
import { useSelector } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import waiter_light from '../assets/icons/waiter_light.png';
import waiter_dark from '../assets/icons/waiter_dark.png';
import chef_light from '../assets/icons/chef_light.png';
import chef_dark from '../assets/icons/chef_dark.png';

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
  const [masterData, setMasterData] = useState([]);
  const [WaiterData, setWaiterData] = useState([]);
  const [ChefData, setChefData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const Tab = createMaterialTopTabNavigator();
  const navigation = useNavigation();
  const theme = useSelector((state) => state.themeReducer.theme);

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
        setRefreshing(false);
        console.log('filteredData is all selected');
      } else {
        setWaiterData([]);
        setChefData([]);
        setRefreshing(false);
        console.log('filteredData is all selected');
      }
    };
    getData().catch((err) => console.log(err));
  }, [refreshing]);
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
          onPress={() => navigation.navigate('EditStaffProfile')}
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
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
            }}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  iconHeader: {
    width: 20,
    height: 20,
    alignSelf: 'flex-start',
    margin: 10,
  },

  containerItemFlatList: {
    width: windowWidth - 40,
    height: '100%',
    paddingHorizontal: '5%',
    backgroundColor: '#FFFFFF',
    paddingTop: 0,
    marginVertical: '2%',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    paddingBottom: '1.5%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    flex: 1,
  },
  icon: {
    width: 18,
    height: 18,
    position: 'absolute',
    right: 30,
    top: '30%',
  },
  textName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  view1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.secondary,
    textAlign: 'left',
    marginLeft: 20,
    marginTop: 30,
  },
  editText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.secondary,
    textAlignVertical: 'center',
    marginTop: 30,
    left: -10,
  },
  editBox: {
    flexDirection: 'row',
    position: 'relative',
    left: 160,
  },
  pencil: {
    height: 18,
    width: 18,
    left: 0,
    alignSelf: 'center',
    marginTop: 30,
  },
  containerSearchLayout: {
    width: 280,
    height: 40,
    borderRadius: 15,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#FFF',
    backgroundColor: '#F3F3F3',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    padding: 0,
    marginTop: 20,
  },
  btnSearch: {
    height: 20,
    width: 20,
    marginLeft: 20,
    marginRight: 10,
  },
  imgIconSearch: {
    margin: 0,
    height: 16,
    width: 16,
  },
  containerTemp: {
    flexDirection: 'column',

    justifyContent: 'center',
    alignItems: 'center',
  },
  textWaiter: {
    fontSize: 20,

    position: 'relative',

    fontWeight: 'bold',
  },
  add: {
    marginTop: 30,
    marginRight: 20,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    height: 600,
    width: '90%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: '100%',
    height: 20,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.secondary,
    textAlignVertical: 'center',
    marginTop: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: Colors.secondary,
    width: '100%',
    padding: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    marginTop: 50,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  TouchableOpacity: {
    backgroundColor: 'transparent',
    width: windowWidth * 0.7,
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    marginLeft: 80,
    // borderBottomColor: '#e0e0e0',
  },
});
