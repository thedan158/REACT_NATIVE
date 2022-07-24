import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import check from '../assets/icons/check.png';
import table from '../assets/icons/TableGray.png';
const UnreadNotification = ({ item }) => {
  const theme = useSelector((state) => state.themeReducer.theme);
  return (
    <ThemeProvider theme={theme}>
      <Container>
        {/* Image section  */}
        <View style={styles.avatar}>
          <Image source={table} style={styles.image} />
        </View>

        {/* Information */}
        <View style={styles.information}>
          {/* Table name and time  */}
          <View style={styles.header}>
            <Content style={styles.ContentName}>{item.tableName}</Content>
            <Content style={styles.id}>{item.time}</Content>
          </View>
          {/* Details  */}
          <View style={styles.textID}>
            <Content style={styles.details}>{item.details}</Content>
          </View>
        </View>
      </Container>
    </ThemeProvider>
  );
};

const Container = styled.TouchableOpacity`
  width: 95%;
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

export default UnreadNotification;

const styles = StyleSheet.create({
  card: {
    width: '95%',
    height: 150,
    backgroundColor: 'black',
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: 'white',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    flexDirection: 'row',
    flex: 1,
  },

  information: {
    marginLeft: '5%',
    marginTop: '6%',
    alignItems: 'flex-start',

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
    width: 90,
    height: 90,
    alignItems: 'center',
    marginTop: '6%',
    alignSelf: 'center',
    marginLeft: '5%',
    flex: 2,
  },
  image: {
    width: 60,
    height: 60,
  },
});
