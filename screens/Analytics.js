import { StyleSheet, Text, View, Image,TouchableOpacity, Button } from 'react-native'
import React from 'react'
import CustomModal from '../custom component/CustomModal'
import { useNavigation } from '@react-navigation/core';

const Analytics = () => {
  const [visible, setVisible] = React.useState(false);
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <CustomModal visible={visible}>
        <View style={{alignItems: 'center'}}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Image
                source={require('../assets/icons/x.png')}
                style={{height: 30, width: 30}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../assets/icons/check.png')}
            style={{height: 150, width: 150, marginVertical: 10}}
          />
        </View>

        <Text style={{marginVertical: 30, fontSize: 20, textAlign: 'center'}}>
          Congratulations registration was successful
        </Text>
        <Button title='Open Home' onPress={()=>navigation.navigate('RestaurantManagement')}/>
      </CustomModal>
      <Button title="Open Modal" onPress={() => setVisible(true)} />
    </View>
  );
}

export default Analytics

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
})