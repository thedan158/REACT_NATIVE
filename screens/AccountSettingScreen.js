import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'


const AccountSettingScreen = () => {
  return (
    <ScrollView>
        <View style={styles.container}>
            <View style={styles.containerHeader}>
              <Text style={{fontSize: 18, fontWeight: 'bold', marginRight: 100,}}>Personal details</Text>
              <TouchableOpacity style={styles.btnEdit}>
                <Text style={{fontSize: 15,fontWeight: 'bold' , alignSelf: 'center', alignItems: 'center', justifyContent: 'center', color: '#fff'}} >Edit</Text>
                
              </TouchableOpacity>
            </View>
        </View>
    </ScrollView>
  )
}

export default AccountSettingScreen

const styles = StyleSheet.create({
  container:{
    paddingVertical: 20,
    paddingHorizontal: 10,

  },
  containerHeader:{
    flexDirection: 'row',
    padding: 10,
  },
  btnEdit:{
    width: 90,
    height: 42,
    borderRadius: 25,
    backgroundColor: '#F8774A',
    alignSelf: 'center',
    justifyContent: 'center'
  },

})