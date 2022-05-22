import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import React from 'react';
import VKH from '../assets/images/VKH.jpg';
import Colors from '../assets/Colors';
import back from '../assets/icons/back-green.png';
import del from '../assets/icons/delete.png';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/core';
import CustomModal from '../custom component/CustomModal';

const StaffInformation = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 30 }}>
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

      {/* Image  */}
      <View style={styles.image}>
        <Image source={VKH} style={styles.avatar} />
      </View>

      {/* Staff's profile  */}
      <View style={styles.profile}>
        <Text style={styles.title}>Name</Text>
        <Text style={styles.information}>Vu Khanh Hoang</Text>

        <Text style={styles.title}>Email</Text>
        <Text style={styles.information}>20521352@gm.uit.edu.vn</Text>

        <Text style={styles.title}>Contact number</Text>
        <Text style={styles.information}>0528679244</Text>

        <Text style={styles.title}>Day of birth</Text>
        <Text style={styles.information}>14/06/2002</Text>

        <Text style={styles.title}>Address</Text>
        <Text style={styles.information}>Bien Hoa, Dong Nai, TP.HCM</Text>
      </View>

      {/* Button  */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            setVisible(true);
          }}
          style={styles.button}
        >
          <Image
            source={del}
            style={{ height: 15, width: 15, marginHorizontal: 10 }}
          />
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>

      {/* Modal  */}
      <CustomModal visible={visible}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../assets/icons/trash.png')}
            style={{ height: 150, width: 150, marginVertical: 30 }}
          />
        </View>

        <Text style={{ marginVertical: 30, fontSize: 20, textAlign: 'center' }}>
          Do you want to delete this account?
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
            }}
            style={styles.button1}
          >
            <Text style={styles.buttonText1}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('TabForOwner');
              setVisible(false);
            }}
            style={styles.button2}
          >
            <Text style={styles.buttonText1}>Yes</Text>
          </TouchableOpacity>
        </View>
      </CustomModal>
    </View>
  );
};

export default StaffInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  image: {
    alignItems: 'center',
  },
  avatar: {
    height: 150,
    width: 150,
    borderRadius: 100,
    margin: 30,
  },
  profile: {
    flex: 5,
    justifyContent: 'flex-start',

    left: 40,
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  information: {
    marginTop: 10,
    fontSize: 17,
    marginLeft: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
  },
  button: {
    backgroundColor: 'white',
    width: '50%',
    padding: 15,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    margin: 5,
    flexDirection: 'row',
  },
  buttonText: {
    color: '#DA0000',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonText1: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  button1: {
    backgroundColor: '#767676',
    width: '48%',
    padding: 15,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    alignSelf: 'center',
  },
  button2: {
    backgroundColor: '#F44336',
    width: '48%',
    padding: 15,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    alignSelf: 'center',
  },
});
