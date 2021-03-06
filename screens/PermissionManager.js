import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useRef } from 'react';
import { CustomCollapsible } from '../custom component/CustomCollapsible';
import Colors from '../assets/Colors';
import { useNavigation } from '@react-navigation/core';
import CustomModal from '../custom component/CustomModal';
import back from '../assets/icons/back-green.png';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';

const PermissionManager = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);
  const [isWaiter, setIsWaiter] = React.useState(false);
  const [isChef, setIsChef] = React.useState(false);
  const theme = useSelector((state) => state.themeReducer.theme);

  const childtoParent = async (childData) => {
    setIsWaiter(!childData);
  };
  const childtoParentChef = async (childData) => {
    setIsChef(!childData);
  };
  const handleCreateAccount = async () => {
    const owner = await AsyncStorage.getItem('userLoginData');
    const ownerData = JSON.parse(owner);
    const staff = await AsyncStorage.getItem('staffInfo');
    const staffData = JSON.parse(staff);
    console.log(staffData.username);
    console.log(ownerData.username);
    console.log('isWaiter:' + isWaiter);
    console.log('isChef:' + isChef);
    if (isWaiter && isChef) {
      Alert.alert('Error', "You can't choose both");
      return;
    }
    if (!isWaiter && !isChef) {
      Alert.alert('Error', 'You must choose one');
      return;
    }
    const res = await axios.post(
      `https://foody-uit.herokuapp.com/auth/createUser/${ownerData.username}`,
      {
        username: staffData.username,
        password: staffData.password,
        role: isWaiter ? 'waiter' : 'chef',
      }
    );
    const { success } = res.data;
    console.log('Success: ' + success);
    if (!success) {
      Alert.alert('Error', 'Wrong infomation');
      return;
    }
    setVisible(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <View
        style={{ backgroundColor: theme.PRIMARY_BACKGROUND_COLOR, flex: 1 }}
      >
        {/* Back button  */}
        <View>
          <TouchableOpacity
            style={{
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexDirection: 'row',
              marginLeft: 20,
              marginTop: 40,
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
        {/* Title  */}
        <Text style={styles.modalTitle}>Permission Manager</Text>

        {/* Permission manager  */}
        <ScrollView style={styles.permission}>
          <CustomCollapsible
            textColor={theme.PRIMARY_TEXT_COLOR}
            title="Waiter"
            subTitle="This account is able to READ MENUS, MAKING ORDER, PAYMENT"
            childtoParent={childtoParent}
          />
          <CustomCollapsible
            textColor={theme.PRIMARY_TEXT_COLOR}
            title="Chef"
            subTitle="This account is able to READ MENUS, MAKING ORDER, PAYMENT, EDIT MENU"
            childtoParent={childtoParentChef}
          />
          {/* Button  */}
          <View style={{ marginTop: '10%' }}>
            <TouchableOpacity
              onPress={handleCreateAccount}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Finish</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Modal  */}
        <CustomModal visible={visible}>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('../assets/icons/check.png')}
              style={{ height: 150, width: 150, marginVertical: 30 }}
            />
          </View>

          <Text
            style={{ marginVertical: 30, fontSize: 20, textAlign: 'center' }}
          >
            Congratulations registration was successful
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('TabForOwner');
              setVisible(false);
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </CustomModal>
      </View>
    </ThemeProvider>
  );
};

export default PermissionManager;

const styles = StyleSheet.create({
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.secondary,
    textAlignVertical: 'center',
    marginTop: 40,
    textAlign: 'center',
  },
  permission: {
    marginVertical: 40,
  },
  button: {
    backgroundColor: Colors.secondary,
    width: '80%',
    padding: 15,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
