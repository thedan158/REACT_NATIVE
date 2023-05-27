import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';

import styled, { ThemeProvider } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { switchTheme } from '../redux/themeActions';
import { lightTheme, darkTheme } from '../assets/Theme';
import { useNavigation } from '@react-navigation/core';

const CardInformation = ({ name, mail, phone, address, imageSource }) => {
  const theme = useSelector((state) => state.setting.theme);

  return (
    <Container>
      <View style={styles.card}>
        <View style={styles.avatar}>
          <Image source={imageSource} style={styles.image} />
        </View>
        <View style={styles.information}>
          <Content style={styles.textName}>{name}</Content>
          <Content style={styles.details}>{mail}</Content>
          <View style={styles.line} />
          <Content style={styles.details}>{phone}</Content>
          <View style={styles.line} />
          <Content style={styles.details}>{address}</Content>
        </View>
      </View>
    </Container>
  );
};

export default CardInformation;
const Container = styled.View`
  width: 95%;
  border-radius: 20px;
  border-width: 1px;
  border-color: #a09a99;
`;
const Content = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const styles = StyleSheet.create({
  card: {
    height: 170,
    marginHorizontal: 15,
    width: '100%',
    borderRadius: 20,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 6,
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

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
  textName: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 27,
    color: '#FA4A0C',
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
});
