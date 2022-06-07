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
} from 'react-native';
import React, { useState } from 'react';
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
            source={waiter}
            style={{
              width: 20,
              height: 20,
              alignSelf: 'flex-start',
              margin: 10,
            }}
          />
          <Text style={styles.textWaiter}>Waiters</Text>
        </View>
        <ButtonUser name={'Huy'} />
      </View>

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
            source={chef}
            style={{
              width: 20,
              height: 20,
              alignSelf: 'flex-start',
              margin: 10,
            }}
          />
          <Text style={styles.textWaiter}>Chefs</Text>
        </View>
        <ButtonUser name={'Huy'} />
        <ButtonUser name={'Hoang'} />
        <ButtonUser name={'Hoang'} />
        <ButtonUser name={'Hoang'} />
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
    fontSize: 16,

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
});
