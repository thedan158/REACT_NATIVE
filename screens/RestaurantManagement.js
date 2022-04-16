import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import HomeScreen from './HomeScreen'
import StaffManagement from './StaffManagement'
import Analytics from './Analytics'
import { SafeAreaView } from 'react-native-safe-area-context'
import TabBar from 'react-native-underline-tabbar'
import { NavigationContainer } from '@react-navigation/native'


const RestaurantManagement = () => {
    const Tab = createMaterialTopTabNavigator();

  return (
      <View style={{flex:1}}>

      {/* Title  */}
      <View style={styles.viewText}>
          <Text style={styles.text}>Your Restaurant</Text>
      </View>
      

      {/* Top tab bar  */}
    <Tab.Navigator screenOptions={{
        
        tabBarLabelStyle: { fontSize: 14, fontWeight:'bold' },
    tabBarStyle: { backgroundColor: 'white', borderBottomLeftRadius:30, borderBottomRightRadius:30 },
    tabBarPressColor:'white',
    tabBarActiveTintColor:'green',
    tabBarInactiveTintColor:'black',
    tabBarIndicatorStyle:{
        height:4, 
        backgroundColor:'green', 
        borderRadius:40, 
        width:110,
        marginLeft:43
        },
    tabBarIndicatorContainerStyle:{justifyContent:'center', alignItems:'center'},
    tabBarShowLabel:'true',
    
    
    
    }}
    style={{ backgroundColor:'white'}}
    >
    
        <Tab.Screen component={StaffManagement} name='Staffs'/>
        <Tab.Screen component={Analytics} name='Analytics'/>
    </Tab.Navigator>
    </View>
  )
}

export default RestaurantManagement

const styles = StyleSheet.create({
    text:{
        
        textAlign:'center',
        textAlignVertical:'center',
        marginTop:60,
        fontSize:28,
        fontWeight:'bold',
        color:'#4FA987'
    },
    viewText:{
        
        
        backgroundColor:'white',
        height:130,
        alignContent:'center',
        
        
        
    }
})