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
import pencil from '../assets/icons/pencil.png';
import { useNavigation } from '@react-navigation/core';
import search from '../assets/icons/search.png';
import ButtonUser from '../custom component/ButtonUser';
import add from '../assets/icons/add.png';
import close from '../assets/icons/x.png';
import CustomModal from '../custom component/CustomModal';
import Colors from '../assets/Colors';
import CustomTextInput from '../custom component/CustomTextInput';
import hidden from '../assets/icons/closed-eyes-green.png';
import eye from '../assets/icons/eye-green.png';
import HomeScreen from './HomeScreen';
import Analytics from './Analytics';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import cashier from '../assets/icons/cashier.png';
import waiter from '../assets/icons/waiter.png';
import chef from '../assets/icons/chef.png';
import vector from '../assets/icons/Vector.png';
import waiterData from '../assets/data/WaiterData';
import chefData from '../assets/data/ChefData';
const windowWidth = Dimensions.get('window').width;

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

const StaffManagement = () => {
  const Tab = createMaterialTopTabNavigator();
  const navigation = useNavigation();
  console.log(waiterData);

  // flat list view

  const FlatListItem = ({ item }) => {
    console.log(item);
    return (
      <TouchableOpacity
        style={styles.TouchableOpacity}
        onPress={() => navigation.navigate('EditStaffProfile')}
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
            source={item.avatar}
          />
        </TouchableOpacity>

        <View
          style={{
            justifyContent: 'center',

            width: '65%',
          }}
        >
          <Text style={styles.textName}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
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
          <Image source={waiter} style={styles.iconHeader} />
          <Text style={styles.textWaiter}>Waiters</Text>
        </View>
        <FlatList
          data={waiterData}
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
          <Image source={chef} style={styles.iconHeader} />
          <Text style={styles.textWaiter}>Chefs</Text>
        </View>
        <FlatList
          data={chefData}
          renderItem={({ item, index }) => {
            return <FlatListItem item={item} index={index} />;
          }}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
};

export default StaffManagement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
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
    borderBottomColor: '#e0e0e0',
  },
});
