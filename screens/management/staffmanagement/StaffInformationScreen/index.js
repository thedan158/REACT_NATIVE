import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import Colors from '../../../../assets/Colors';
import Svg, { Path } from 'react-native-svg';
import back from '../../../../assets/icons/back-white.png';
import del_light from '../../../../assets/icons/delete_light.png';
import del_dark from '../../../../assets/icons/delete_dark.png';
import CustomModal from '../../../../custom component/CustomModal';
import { useNavigation } from '@react-navigation/core';
import name from '../../../../assets/icons/name.png';
import phone from '../../../../assets/icons/phone.png';
import cake from '../../../../assets/icons/cake.png';
import address from '../../../../assets/icons/address.png';
import pencil from '../../../../assets/icons/pen.png';
import close_light from '../../../../assets/icons/close.png';
import close_dark from '../../../../assets/icons/close_dark.png';
import CircleCheckBox, { LABEL_POSITION } from 'react-native-circle-checkbox';
import { useSelector } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import styles from './style';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const StaffInformation = ({ route }) => {
  const navigation = useNavigation();
  const theme = useSelector((state) => state.themeReducer.theme);
  const [visible, setVisible] = React.useState(false);
  const [editRole, setEditRole] = React.useState(false);
  const [waiter, setWaiter] = React.useState(false);
  const [cook, setCook] = React.useState(false);
  const { item } = route.params;
  const chooseWaiter = () => {
    setWaiter(true);
    setCook(false);
  };
  const chooseCook = () => {
    setWaiter(false);
    setCook(true);
  };
  return (
    <ThemeProvider theme={theme}>
      <View
        style={[
          styles.container,
          { backgroundColor: theme.PRIMARY_BACKGROUND_COLOR },
        ]}
      >
        {/* Profile  */}
        <View
          style={[
            styles.header,
            { backgroundColor: theme.PRIMARY_BUTTON_COLOR },
          ]}
        >
          {/* Name  */}
          <View style={{ flexDirection: 'row' }}>
            <Image source={name} style={styles.icon} />
            <Text style={styles.title}>Name</Text>
          </View>
          <Text
            style={[styles.information, { color: theme.PRIMARY_INFO_COLOR }]}
          >
            {item.fullname}
          </Text>

          {/* Number  */}
          <View style={{ flexDirection: 'row' }}>
            <Image source={phone} style={styles.icon} />
            <Text style={styles.title}>Contact number</Text>
          </View>
          <Text
            style={[styles.information, { color: theme.PRIMARY_INFO_COLOR }]}
          >
            {item.phoneNumber}
          </Text>

          {/* Birthday  */}
          <View style={{ flexDirection: 'row' }}>
            <Image source={cake} style={styles.icon} />
            <Text style={styles.title}>Day of birth</Text>
          </View>
          <Text
            style={[styles.information, { color: theme.PRIMARY_INFO_COLOR }]}
          >
            14/06/2002
          </Text>

          {/* Address  */}
          <View style={{ flexDirection: 'row' }}>
            <Image source={address} style={styles.icon} />
            <Text style={styles.title}>Address</Text>
          </View>
          <Text
            style={[styles.information, { color: theme.PRIMARY_INFO_COLOR }]}
          >
            {item.address}
          </Text>
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
            <Image
              source={{ uri: item.imagePath }}
              style={styles.avatar}
            ></Image>
          )}
        </View>

        {/* Role  */}
        <TouchableOpacity
          onPress={() => {
            setEditRole(true);
          }}
          style={{
            alignSelf: 'center',
            marginTop: '25%',
            flexDirection: 'row',
          }}
        >
          <Content>{item.role}</Content>

          {/* Edit role  */}
          <TouchableOpacity
            style={{ justifyContent: 'center' }}
            onPress={() => {
              setEditRole(true);
            }}
          >
            <Image
              source={pencil}
              style={{
                width: 20,
                height: 20,
                left: 10,
              }}
            />
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Button section  */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              setVisible(true);
            }}
            style={[
              styles.button,
              {
                backgroundColor: theme.mode === 'light' ? '#FFF0F3' : '#A31D25',
              },
            ]}
          >
            <Image
              source={theme.mode === 'light' ? del_light : del_dark}
              style={{ height: 15, width: 15, marginHorizontal: 10 }}
            />
            <Text
              style={[
                styles.buttonText,
                { color: theme.mode === 'light' ? '#DA0000' : '#fff' },
              ]}
            >
              Delete
            </Text>
          </TouchableOpacity>
        </View>

        {/* Modal  */}
        <CustomModal visible={visible}>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('../../../../assets/icons/trash.png')}
              style={{ height: 150, width: 150, marginVertical: 30 }}
            />
          </View>

          <Content
            style={{ marginVertical: 30, fontSize: 20, textAlign: 'center' }}
          >
            Do you want to delete this account?
          </Content>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
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

        {/* Edit role modal  */}
        <CustomModal visible={editRole}>
          {/* Close button  */}
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => setEditRole(false)}
              style={{ marginLeft: '90%', marginTop: '-10%' }}
            >
              <Image
                source={theme.mode === 'light' ? close_light : close_dark}
                style={{ height: 20, width: 20, marginVertical: 20 }}
              />
            </TouchableOpacity>
          </View>

          {/* Header  */}
          <View style={{ alignItems: 'center' }}>
            <Content
              style={{ fontSize: 22, fontWeight: 'bold', marginBottom: '5%' }}
            >
              Edit role
            </Content>
          </View>

          {/* Role  */}
          <View
            style={
              cook
                ? [
                    styles.checkboxContainer,
                    { backgroundColor: theme.PRIMARY_BACKGROUND_COLOR },
                  ]
                : [
                    styles.checkboxContainer1,
                    { backgroundColor: theme.PRIMARY_BACKGROUND_COLOR },
                  ]
            }
          >
            <CircleCheckBox
              checked={cook}
              onToggle={() => chooseCook()}
              labelPosition={LABEL_POSITION.RIGHT}
              label="Cook"
              outerColor={Colors.secondary}
              innerColor={Colors.secondary}
              filterColor={theme.PRIMARY_BACKGROUND_COLOR}
              styleLabel={{
                color: Colors.secondary,
                fontSize: 18,
                fontWeight: 'bold',
                marginLeft: '60%',
              }}
              styleCheckboxContainer={{
                height: 50,
              }}
            />
          </View>
          <View
            style={
              waiter
                ? [
                    styles.checkboxContainer,
                    { backgroundColor: theme.PRIMARY_BACKGROUND_COLOR },
                  ]
                : [
                    styles.checkboxContainer1,
                    { backgroundColor: theme.PRIMARY_BACKGROUND_COLOR },
                  ]
            }
          >
            <CircleCheckBox
              checked={waiter}
              onToggle={() => chooseWaiter()}
              labelPosition={LABEL_POSITION.RIGHT}
              label="Waiter"
              outerColor={Colors.secondary}
              innerColor={Colors.secondary}
              filterColor={theme.PRIMARY_BACKGROUND_COLOR}
              styleLabel={{
                color: Colors.secondary,
                fontSize: 18,
                fontWeight: 'bold',
                marginLeft: '60%',
              }}
              styleCheckboxContainer={{
                height: 50,
              }}
            />
          </View>

          {/* Save button  */}
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => {
                setEditRole(false);
              }}
              style={styles.button3}
            >
              <Text style={{ color: 'white', fontWeight: '700', fontSize: 16 }}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </CustomModal>
      </View>
    </ThemeProvider>
  );
};

const Content = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
  font-weight: bold;
`;

export default StaffInformation;
