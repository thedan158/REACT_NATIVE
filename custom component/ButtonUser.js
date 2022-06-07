import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '../assets/Colors';
import vector from '../assets/icons/Vector.png';
import { useNavigation } from '@react-navigation/core';

const ButtonUser = ({ name }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.TouchableOpacity}
        onPress={() => navigation.navigate('StaffInformation')}
      ></TouchableOpacity>
      {name && <Text style={styles.textName}>{name}</Text>}
      <Image style={styles.icon} source={vector} />
    </View>
  );
};

export default ButtonUser;

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 20,
    justifyContent: 'center',
    marginTop: 20,
  },
  TouchableOpacity: {
    backgroundColor: 'white',
    width: 350,
    height: 50,

    borderRadius: 20,
    flexDirection: 'row',
  },
  textName: {
    position: 'absolute',
    fontSize: 18,
    fontWeight: 'bold',

    left: 30,
  },
  icon: {
    width: 18,
    height: 18,
    position: 'absolute',
    right: 30,
  },
});
