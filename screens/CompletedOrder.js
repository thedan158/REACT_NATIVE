import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ImageBackground,
} from 'react-native';
import React from 'react';
import ButtonCompletedOrder from '../custom component/ButtonCompletedOrder';
import completed from '../assets/icons/completed.png';
import { ScrollView } from 'react-native-gesture-handler';
import background from '../assets/images/background.png';
import bag from '../assets/icons/bag.png';
import table from '../assets/icons/round-table.png';

const windowsWidth = Dimensions.get('window').width;
const windowsHeight = Dimensions.get('window').height;
const CompletedOrders = () => {
  return (
    <ImageBackground source={background} resizeMode="cover" style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Header  */}

        <View style={styles.containerHeaderTop}>
          <Image source={completed} style={styles.icHomeStyle} />
          <View style={styles.containerTitleInfo}>
            <Text style={styles.txtHome}>Completed Orders</Text>
          </View>
        </View>
        <ScrollView style={{ width: '95%' }}>
          <ButtonCompletedOrder name="Take away" imageSource={bag} id="#315" />
          <ButtonCompletedOrder name="Table 1" imageSource={table} id="#317" />
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default CompletedOrders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: windowsWidth,
    height: windowsHeight,
  },
  containerHeaderTop: {
    flexDirection: 'row',
    width: 260,
    justifyContent: 'space-evenly',
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
