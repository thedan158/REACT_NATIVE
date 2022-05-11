import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import React from 'react';
import report from '../assets/icons/report.png';
import back from '../assets/icons/back-orange.png';
import { TouchableOpacity } from 'react-native-gesture-handler';

const windowsWidth = Dimensions.get('window').width;
const windowsHeight = Dimensions.get('window').height;
const OrderDetails = () => {
  return (
    <View style={styles.container}>
      {/* Header  */}
      <View style={styles.containerHeaderTop}>
        {/* <TouchableOpacity
          style={{
            justifyContent: 'flex-start',
            width: '80%',
            flexDirection: 'row',
          }}
        >
          <Image
            source={back}
            style={{
              justifyContent: 'flex-start',
              height: 50,
              width: 50,
              margin: 20,
            }}
          />
        </TouchableOpacity> */}

        <Image source={report} style={styles.icHomeStyle} />
        <View style={styles.containerTitleInfo}>
          <Text style={styles.txtHome}>Take away</Text>
        </View>
      </View>

      {/* Order details  */}
      <ScrollView></ScrollView>
    </View>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: windowsWidth,
    height: windowsHeight,
  },
  containerHeaderTop: {
    flexDirection: 'row',
    justifyContent: 'center',

    margin: 20,
  },
  icHomeStyle: {
    height: 40,
    width: 40,
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
  },
});
