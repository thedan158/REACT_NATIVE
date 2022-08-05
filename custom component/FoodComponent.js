import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import pizza from '../assets/images/pizza.jpg';
const FoodComponent = ({ item }) => {
  const theme = useSelector((state) => state.themeReducer.theme);
  return (
    <ThemeProvider theme={theme}>
      <Container>
        {/* Image section  */}
        <View style={styles.avatar}>
          <Image source={pizza} style={styles.image} />
        </View>

        {/* Information */}
        <View style={styles.information}>
          {/* Table name and time  */}
          <View style={styles.header}>
            <Content style={styles.ContentName}>1</Content>
            <Content style={styles.id}>1</Content>
          </View>
        </View>
      </Container>
    </ThemeProvider>
  );
};

const Container = styled.TouchableOpacity`
  width: 100%;
  height: 120;
  background-color: ${(props) => props.theme.PRIMARY_NOTIFICATION_COLOR};
  border-radius: 10;
  align-self: center;
  flex: 1;
  flex-direction: row;
  margin-bottom: 5px;
`;

const Content = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
  font-weight: bold;
`;

export default FoodComponent;

const styles = StyleSheet.create({
  information: {
    marginLeft: '5%',
    marginTop: '6%',
    alignItems: 'flex-start',
    flexDirection: 'column',
    flex: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '94%',
  },
  textName: {
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 27,
    color: '#000',
  },
  details: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 15,
    // color: '#898888',
  },
  textID: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    marginTop: '2%',
    maxWidth: '80%',
  },
  id: {
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 27,
    color: '#8A8A8A',
  },
  line: {
    width: 170,
    backgroundColor: '#898888',
    height: 1,
    marginVertical: 5,
  },
  avatar: {
    alignItems: 'center',

    alignSelf: 'center',
    marginLeft: '0%',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
});
