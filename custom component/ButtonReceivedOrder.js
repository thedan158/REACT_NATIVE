import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import warning from '../assets/icons/warning.png';
import Stopwatch from './Stopwatch';

const ButtonReceivedOrder = ({ name, id, imageSource }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('OrderDetails')}
    >
      {/* Image section  */}
      <View style={styles.avatar}>
        <Image source={imageSource} style={styles.image} />
      </View>

      {/* Information */}
      <View style={styles.information}>
        <Text style={styles.textName}>{name}</Text>
        <View style={styles.pending}>
          <Image source={warning} style={{ width: 20, height: 20 }} />
          <Text style={styles.details}> Pending</Text>
        </View>
      </View>

      {/* ID and stopwatch  */}
      <View style={styles.textID}>
        <Text style={styles.id}>{id}</Text>
        <Stopwatch />
      </View>
    </TouchableOpacity>
  );
};

export default ButtonReceivedOrder;

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
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 20,
    alignSelf: 'center',
    marginLeft: '5%',
    flex: 3,
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#264653',
  },
  information: {
    justifyContent: 'space-evenly',
    marginLeft: '7%',
    marginTop: '10%',
    alignItems: 'flex-start',
    height: '60%',
    flex: 3,
  },
  textID: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    marginVertical: '5%',
    flex: 4,
  },
  textName: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 27,
    color: '#2a9d8f',
  },
  details: {
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 18,
    color: '#898888',
    marginHorizontal: 5,
  },
  id: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 18,
    color: '#457B9D',
  },
  line: {
    width: 170,
    backgroundColor: '#898888',
    height: 1,
    marginVertical: 5,
  },
  image: {
    width: '60%',
    height: '60%',
    alignSelf: 'center',
  },
  pending: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
