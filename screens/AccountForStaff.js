import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Switch,
  ImageBackground,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import CardInformation from '../custom component/CardInformation';
import ButtonUser from '../custom component/ButtonUser';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/core';
import power from '../assets/icons/power.png';
import info from '../assets/icons/info.png';
import personal from '../assets/icons/personal.png';
import vector from '../assets/icons/Vector.png';
import password from '../assets/icons/password.png';
import policy from '../assets/icons/policy.png';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseConfig } from '../firebase';
import * as firebase from 'firebase';
import ModalPrivacy from '../custom component/ModalPrivacy';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const AccountForStaff = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const [fullname, setFullname] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const [image, setImage] = useState('null');
  const [visible, setVisible] = React.useState(false);
  const [url, setUrl] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);

  useFocusEffect(() => {
    const getData = async () => {
      const user = await AsyncStorage.getItem('userLoginData');
      const userInfo = JSON.parse(user);
      console.log(userInfo.username);
      const response = await axios.get(
        `https://foody-uit.herokuapp.com/profile/getUserProfile/${userInfo.username}`
      );
      const { success } = response.data;
      const { data } = response.data;
      console.log(data);
      console.log(success);
      if (!success) {
        Alert.alert('Account not found');
        return;
      }
      setAddress(data.address ? data.address : '');
      setEmail(data.email ? data.email : '');
      setFullname(data.fullname ? data.fullname : userInfo.username);
      setPhoneNumber(data.phoneNumber ? data.phoneNumber : '');
      setImage(
        data.imagePath
          ? data.imagePath
          : 'https://firebasestorage.googleapis.com/v0/b/le-repas.appspot.com/o/images%2Fgood.png?alt=media&token=de139437-3a20-4eb3-ba56-f6a591779d15'
      );
    };
    getData().catch((err) => console.log(err));
  }, []);
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Header  */}
        <View style={styles.containerHeader}>
          <View
            style={{
              marginLeft: 20,
              marginTop: '1%',
            }}
          >
            <Text style={styles.textHeader}>Personal details</Text>
          </View>
        </View>
        {/* Card Info  */}
        <View style={styles.feature}>
          <CardInformation
            name={fullname}
            mail={email}
            imageSource={{ uri: image }}
            address={address}
            phone={phoneNumber}
          />
        </View>

        <View style={styles.buttonUser}>
          {/* Edit profile  */}
          <TouchableOpacity
            style={styles.TouchableOpacity}
            onPress={() => navigation.navigate('EditStaffProfile')}
          >
            <Image source={personal} style={styles.iconTitle} />
            <Text style={styles.textName}>Edit Your Profile</Text>
            <Image style={styles.icon} source={vector} />
          </TouchableOpacity>

          {/* Change password  */}
          <TouchableOpacity
            style={styles.TouchableOpacity}
            onPress={() => navigation.navigate('ChangeStaffPassword')}
          >
            <Image source={password} style={styles.iconTitle} />
            <Text style={styles.textName}>Change Your Password</Text>
            <Image style={styles.icon} source={vector} />
          </TouchableOpacity>

          {/* Policy and privacy  */}
          <TouchableOpacity
            style={styles.TouchableOpacity}
            onPress={() => setVisible(true)}
          >
            <Image source={policy} style={styles.iconTitle} />
            <Text style={styles.textName}>Policy and privacy</Text>
            <Image style={styles.icon} source={vector} />
          </TouchableOpacity>
        </View>

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

      {/* Modal PaP */}
      <ModalPrivacy visible={visible}>
        <View>
          <View style={{ marginBottom: '10%' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              Policy and privacy
            </Text>
          </View>
          <ScrollView
            style={{
              marginLeft: '5%',
              height: '80%',
              marginBottom: '7%',
            }}
          >
            <Text style={styles.details}>
              Privacy Policy Software Animals built the Foody app as a Free app.
              This SERVICE is provided by Software Animals at no cost and is
              intended for use as is. This page is used to inform visitors
              regarding my policies with the collection, use, and disclosure of
              Personal Information if anyone decided to use my Service. If you
              choose to use my Service, then you agree to the collection and use
              of information in relation to this policy. The Personal
              Information that I collect is used for providing and improving the
              Service. I will not use or share your information with anyone
              except as described in this Privacy Policy. The terms used in this
              Privacy Policy have the same meanings as in our Terms and
              Conditions, which are accessible at Foody unless otherwise defined
              in this Privacy Policy. Information Collection and Use For a
              better experience, while using our Service, I may require you to
              provide us with certain personally identifiable information,
              including but not limited to images. The information that I
              request will be retained on your device and is not collected by me
              in any way. The app does use third-party services that may collect
              information used to identify you. Link to the privacy policy of
              third-party service providers used by the app Google Play Services
              Google Analytics for Firebase Firebase Crashlytics Expo Log Data I
              want to inform you that whenever you use my Service, in a case of
              an error in the app I collect data and information (through
              third-party products) on your phone called Log Data. This Log Data
              may include information such as your device Internet Protocol
              (“IP”) address, device name, operating system version, the
              configuration of the app when utilizing my Service, the time and
              date of your use of the Service, and other statistics. Cookies
              Cookies are files with a small amount of data that are commonly
              used as anonymous unique identifiers. These are sent to your
              browser from the websites that you visit and are stored on your
              device's internal memory. This Service does not use these
              “cookies” explicitly. However, the app may use third-party code
              and libraries that use “cookies” to collect information and
              improve their services. You have the option to either accept or
              refuse these cookies and know when a cookie is being sent to your
              device. If you choose to refuse our cookies, you may not be able
              to use some portions of this Service. Service Providers I may
              employ third-party companies and individuals due to the following
              reasons: To facilitate our Service; To provide the Service on our
              behalf; To perform Service-related services; or To assist us in
              analyzing how our Service is used. I want to inform users of this
              Service that these third parties have access to their Personal
              Information. The reason is to perform the tasks assigned to them
              on our behalf. However, they are obligated not to disclose or use
              the information for any other purpose. Security I value your trust
              in providing us your Personal Information, thus we are striving to
              use commercially acceptable means of protecting it. But remember
              that no method of transmission over the internet, or method of
              electronic storage is 100% secure and reliable, and I cannot
              guarantee its absolute security. Links to Other Sites This Service
              may contain links to other sites. If you click on a third-party
              link, you will be directed to that site. Note that these external
              sites are not operated by me. Therefore, I strongly advise you to
              review the Privacy Policy of these websites. I have no control
              over and assume no responsibility for the content, privacy
              policies, or practices of any third-party sites or services.
              Children’s Privacy These Services do not address anyone under the
              age of 13. I do not knowingly collect personally identifiable
              information from children under 13 years of age. In the case I
              discover that a child under 13 has provided me with personal
              information, I immediately delete this from our servers. If you
              are a parent or guardian and you are aware that your child has
              provided us with personal information, please contact me so that I
              will be able to do the necessary actions. Changes to This Privacy
              Policy I may update our Privacy Policy from time to time. Thus,
              you are advised to review this page periodically for any changes.
              I will notify you of any changes by posting the new Privacy Policy
              on this page. This policy is effective as of 2022-06-17 Contact Us
              If you have any questions or suggestions about my Privacy Policy,
              do not hesitate to contact me at thedan671@gmail.com.
            </Text>
          </ScrollView>

          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <TouchableOpacity
              style={styles.button3}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.buttonText1}>Agree</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalPrivacy>
    </ScrollView>
  );
};

export default AccountForStaff;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    flex: 1,
  },
  containerHeader: {
    flexDirection: 'row',
    // flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginVertical: '7%',
    marginLeft: '5%',
  },
  feature: {
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 3.5,
  },
  buttonUser: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    // flex: 4,
    // marginTop: '-7%',
  },
  about: {
    flexDirection: 'row',
    // flex: 1.5,
    alignItems: 'flex-end',
    marginLeft: '10%',
    marginVertical: '5%',
  },
  buttonContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    marginVertical: 30,
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
    fontWeight: 'bold',
    fontSize: 30,
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
    fontSize: 14,
    lineHeight: 18,
    color: '#232323',
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
    backgroundColor: '#FA4A0C',
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
  button3: {
    backgroundColor: '#FA4A0C',
    width: '35%',
    padding: 15,
    borderRadius: 25,
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
    marginTop: '5%',
    borderRadius: 20,
    flexDirection: 'row',
  },

  textName: {
    position: 'absolute',
    fontSize: 18,
    fontWeight: 'bold',
    top: '25%',
    left: '15%',
  },

  icon: {
    width: 18,
    height: 18,
    position: 'absolute',
    right: 30,
    top: '30%',
  },
  iconTitle: {
    width: 20,
    height: 20,
    position: 'absolute',
    marginLeft: 20,
    top: '30%',
  },
});
