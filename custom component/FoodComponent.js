import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import pizza from '../assets/images/pizza.jpg';
import del from '../assets/icons/bin.png';
import decrease from '../assets/icons/decrease.png';
import increase from '../assets/icons/increase.png';
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
          {/* Food name and food price */}
          <Content style={styles.foodName}>Croissant and Cappuccino</Content>
          <Content style={styles.foodPrice}>$12.60</Content>
          {/* Quantity and delete  */}
          <View style={styles.quantityAndDelete}>
            <View style={styles.quantity}>
              <TouchableOpacity>
                <Image source={decrease} style={{ height: 25, width: 25 }} />
              </TouchableOpacity>
              <Content style={styles.foodPrice}>2</Content>
              <TouchableOpacity>
                <Image source={increase} style={{ height: 25, width: 25 }} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <Image source={del} style={{ height: 25, width: 25 }} />
            </TouchableOpacity>
          </View>
        </View>
      </Container>
    </ThemeProvider>
  );
};

const Container = styled.View`
  width: 100%;
  height: 120;
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_COLOR};
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
  quantity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
  },
  quantityAndDelete: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignItems: 'center',
  },
  foodPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#636363',
  },
  information: {
    marginLeft: '6%',
    marginTop: '4%',
    alignItems: 'flex-start',
    flexDirection: 'column',
    maxWidth: '70%',
    justifyContent: 'space-between',
    maxHeight: '75%',
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
    borderRadius: 10,
  },
});
