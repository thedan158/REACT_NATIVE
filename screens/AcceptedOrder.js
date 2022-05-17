import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ImageBackground,
} from 'react-native';
import React from 'react';
import accept from '../assets/icons/accept.png';
import { ScrollView } from 'react-native-gesture-handler';
import background from '../assets/images/background.png';
import bag from '../assets/icons/bag.png';
import table from '../assets/icons/round-table.png';
import ButtonAcceptedOrder from '../custom component/ButtonAcceptedOrder';

const windowsWidth = Dimensions.get('window').width;
const windowsHeight = Dimensions.get('window').height;
const AcceptedOrder = () => {
  return (
    <ImageBackground source={background} resizeMode="cover" style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Header  */}

        <View style={styles.containerHeaderTop}>
          <Image source={accept} style={styles.icHomeStyle} />
          <View style={styles.containerTitleInfo}>
            <Text style={styles.txtHome}>Accepted Orders</Text>
          </View>
        </View>
        <ScrollView style={{ width: '95%' }}>
          <ButtonAcceptedOrder name="Take away" imageSource={bag} id="#315" />
          <ButtonAcceptedOrder name="Table 1" imageSource={table} id="#317" />
          <ButtonAcceptedOrder name="Table 3" imageSource={table} id="#320" />
          <ButtonAcceptedOrder name="Table 3" imageSource={table} id="#320" />
          <ButtonAcceptedOrder name="Table 3" imageSource={table} id="#320" />
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default AcceptedOrder;

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
