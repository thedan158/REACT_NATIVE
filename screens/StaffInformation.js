import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import VKH from '../assets/images/girl.png';
import Colors from '../assets/Colors';
import Svg, { Path } from 'react-native-svg';
import back from '../assets/icons/back-white.png';
import del from '../assets/icons/delete.png';
import CustomModal from '../custom component/CustomModal';
import { useNavigation } from '@react-navigation/core';
import name from '../assets/icons/name.png';
import phone from '../assets/icons/phone.png';
import cake from '../assets/icons/cake.png';
import address from '../assets/icons/address.png';

const StaffInformation = ({ route }) => {
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);
  const { item } = route.params;
  return (
    <View style={styles.container}>
      {/* Profile  */}
      <View style={styles.header}>
        {/* Name  */}
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={name}
            style={{ width: 20, height: 20, marginTop: 23, marginRight: 10 }}
          />
          <Text style={styles.title}>Name</Text>
        </View>
        <Text style={styles.information}>{item.fullname}</Text>

        {/* Number  */}
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={phone}
            style={{ width: 20, height: 20, marginTop: 23, marginRight: 10 }}
          />
          <Text style={styles.title}>Contact number</Text>
        </View>
        <Text style={styles.information}>{item.phoneNumber}</Text>

        {/* Birthday  */}
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={cake}
            style={{ width: 20, height: 20, marginTop: 23, marginRight: 10 }}
          />
          <Text style={styles.title}>Day of birth</Text>
        </View>
        <Text style={styles.information}>14/06/2002</Text>

        {/* Address  */}
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={address}
            style={{ width: 20, height: 20, marginTop: 23, marginRight: 10 }}
          />
          <Text style={styles.title}>Address</Text>
        </View>
        <Text style={styles.information}>{item.address}</Text>
      </View>

      {/* Wave view  */}
      <View style={styles.box}>
        <Svg style={styles.svg} viewBox="0 0 1440 320">
          <Path
            fill={Colors.secondary}
            d="M0,32L40,69.3C80,107,160,181,240,202.7C320,224,400,192,480,165.3C560,139,640,117,720,112C800,107,880,117,960,122.7C1040,128,1120,128,1200,160C1280,192,1360,256,1400,288L1440,320L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
            fill-opacity="1"
          />
        </Svg>
      </View>

      {/* Back button  */}
      <View>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            marginLeft: '5%',
            height: 50,
            width: 50,
            marginTop: '-15%',
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

      {/* Avatar  */}
      <View style={styles.circle}>
        {item.imagePath && (
          <Image source={{ uri: item.imagePath }} style={styles.avatar}></Image>
        )}
      </View>

      {/* Button section  */}
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
  },
  svg: {
    height: '295%',
  },
  box: {
    backgroundColor: Colors.secondary,
    height: '10%',
  },
  header: {
    justifyContent: 'flex-start',

    position: 'absolute',
    height: '60%',
    width: '80%',
    alignSelf: 'center',
    backgroundColor: 'white',
    top: '25%',
    borderRadius: 20,
    paddingTop: '5%',
    paddingLeft: '8%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  circle: {
    height: 120,
    width: 120,
    alignSelf: 'center',
    position: 'absolute',
    top: '5%',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 120,
    alignSelf: 'center',
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

    color: '#495057',
    maxWidth: '85%',
  },

  buttonContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column-reverse',
    marginBottom: '5%',
    flex: 1,
  },
  button: {
    backgroundColor: '#FFF0F3',
    width: '50%',
    padding: 15,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    margin: 5,
    flexDirection: 'row',

    shadowColor: '#C9184A',

    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
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
