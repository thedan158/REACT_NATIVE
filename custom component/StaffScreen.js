import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, { Children } from 'react';
import back from '../assets/icons/back-orange.png';
import home from '../assets/icons/home-orange.png';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';

const windowsWidth = Dimensions.get('window').width;
const windowsHeight = Dimensions.get('window').height;

const CustomScreen = ({ icon, title, previousScreen, children }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Header  */}
      <View style={styles.containerHeaderTop}>
        <TouchableOpacity
          style={{
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            marginLeft: 20,
          }}
          onPress={() => {
            navigation.navigate(previousScreen);
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
        <View
          style={{
            flexDirection: 'row',
            width: '80%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image source={icon} style={styles.icon} />
          <View style={styles.containerTitleInfo}>
            <Text style={styles.txtHome}>{title}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            marginRight: 20,
          }}
          onPress={() => {
            navigation.navigate('HomeScreen2ndFinal');
          }}
        >
          <Image
            source={home}
            style={{
              height: 20,

              width: 20,
            }}
          />
        </TouchableOpacity>
      </View>

      {/* Order details  */}
      <ScrollView>{children}</ScrollView>
    </View>
  );
};

export default CustomScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: windowsWidth,
    height: windowsHeight,
  },
  containerHeaderTop: {
    flexDirection: 'row',
    margin: 20,
    width: windowsWidth,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    height: 30,
    width: 30,
    top: 5,
  },
  containerTitleInfo: {
    flexWrap: 'wrap',
    marginTop: 10,
    maxWidth: '80%',

    alignItems: 'center',
    alignContent: 'center',
  },
  txtHome: {
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginHorizontal: 5,
  },
});
