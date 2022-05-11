import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Switch,
} from 'react-native';
import React, { useState } from 'react';
import VKH from '../assets/images/VKH.jpg';
import CardInformation from '../custom component/CardInformation';
import ButtonUser from '../custom component/ButtonUser';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/core';
import power from '../assets/icons/power.png';
import setting from '../assets/icons/setting.png';
import pen from '../assets/icons/pen.png';
import info from '../assets/icons/info.png';
import personal from '../assets/icons/personal.png';
import vector from '../assets/icons/Vector.png';
import light_on from '../assets/icons/light-on.png';
import light_off from '../assets/icons/light-off.png';
import dark_off from '../assets/icons/dark-off.png';
import dark_on from '../assets/icons/dark-on.png';
import Colors from '../assets/Colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const AccountForOwner = () => {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Header  */}
        <View style={styles.containerHeader}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Image
              source={personal}
              style={{ height: 30, width: 30, marginHorizontal: 15 }}
            />
            <Text style={styles.textHeader}>Personal details</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 40,
              }}
            >
              <Image
                source={isEnabled ? light_off : light_on}
                style={{ width: 25, height: 25 }}
              />
              <Switch
                value={isEnabled}
                onValueChange={setIsEnabled}
                style={{ marginHorizontal: 5 }}
              />
              <Image
                source={isEnabled ? dark_on : dark_off}
                style={{ width: 25, height: 25 }}
              />
            </View>
          </View>
        </View>
        {/* Card Info  */}
        <View style={styles.feature}>
          <CardInformation
            name="Tanhao"
            mail="daotanhao9h@gmail.com"
            imageSource={VKH}
            address="Bien Hoa, Dong Nai, Ho Chi Minh City"
            phone="+84 528679244"
          />
        </View>

        <View style={styles.buttonUser}>
          <View>
            <TouchableOpacity
              style={styles.TouchableOpacity}
              onPress={() => navigation.navigate('EditProfile')}
            />
            <Text style={styles.textName}>Edit Your Profile</Text>
            <Image style={styles.icon} source={vector} />
          </View>
          <View>
            <TouchableOpacity
              style={styles.TouchableOpacity}
              onPress={() => navigation.navigate('ChangePassword')}
            />
            <Text style={styles.textName}>Change Your Password</Text>
            <Image style={styles.icon} source={vector} />
          </View>
          <View>
            <TouchableOpacity
              style={styles.TouchableOpacity}
              onPress={() => navigation.navigate('StaffInformation')}
            />
            <Text style={styles.textName}>My Preferences</Text>
            <Image style={styles.icon} source={vector} />
          </View>
          <View>
            <TouchableOpacity
              style={styles.TouchableOpacity}
              onPress={() => navigation.navigate('StaffInformation')}
            />
            <Text style={styles.textName}>Notifications</Text>
            <Image style={styles.icon} source={vector} />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}
          style={styles.about}
        >
          <Image
            source={info}
            style={{
              height: 20,
              width: 20,
            }}
          />
          <Text style={{ marginHorizontal: 10 }}>About</Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}
            style={styles.button1}
          >
            <Image
              source={power}
              style={{ height: 15, width: 15, marginHorizontal: 10 }}
            />
            <Text style={styles.buttonText1}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AccountForOwner;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    flex: 1,
  },
  containerHeader: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  feature: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 3.5,
  },
  buttonUser: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 4,
    marginTop: '-7%',
  },
  about: {
    flexDirection: 'row',
    flex: 1.5,
    alignItems: 'flex-end',
    marginLeft: 40,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flex: 2.5,
    marginHorizontal: 15,
  },
  btnEdit: {
    width: 90,
    height: 42,
    borderRadius: 25,
    backgroundColor: '#FA4A0C',

    left: '10%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textHeader: {
    width: 147,

    fontWeight: 'bold',
    fontSize: 18,
    // lineHeight: 27,
  },
  editText: {
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  card: {
    width: '95%',
    height: 170,
    backgroundColor: 'black',
    marginHorizontal: 15,
    marginTop: 60,
    borderRadius: 20,
    backgroundColor: 'white',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    flexDirection: 'row',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 20,
    alignSelf: 'center',
    marginLeft: 30,
  },
  information: {
    justifyContent: 'center',
    marginLeft: 20,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    width: 180,
  },
  details: {
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 18,
    color: '#898888',
  },
  line: {
    width: 170,
    backgroundColor: '#898888',
    height: 1,
    marginVertical: 5,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 20,
  },

  buttonText1: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonText2: {
    color: '#FA4A0C',
    fontWeight: '700',
    fontSize: 16,
  },
  button1: {
    backgroundColor: Colors.secondary,
    width: '50%',
    padding: 15,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    margin: 5,
    flexDirection: 'row',
  },
  button2: {
    backgroundColor: 'white',
    width: '50%',
    padding: 15,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    margin: 5,
    flexDirection: 'row',
  },
  TouchableOpacity: {
    backgroundColor: 'white',
    width: 350,
    height: 50,
    marginTop: 20,
    borderRadius: 20,
    flexDirection: 'row',
  },
  textName: {
    position: 'absolute',
    fontSize: 18,
    fontWeight: 'bold',
    top: 32,
    left: 30,
  },
  icon: {
    width: 18,
    height: 18,
    position: 'absolute',
    right: 30,
    top: 35,
  },
});
