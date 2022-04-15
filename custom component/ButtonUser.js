import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../assets/Colors'
import vector from '../assets/icons/Vector.png'
import { useNavigation } from '@react-navigation/core'


const ButtonUser = ({name}) => {
    const navigation = useNavigation()
  return (
      
    <View style={styles.container}>
    <TouchableOpacity style={styles.TouchableOpacity} onPress={() => navigation.navigate('StaffInformation')}>
      {name && <Text style={styles.textName}>{name}</Text>}
      <Image style={styles.icon} source={vector}/>
      </TouchableOpacity>
    </View>
    
  )
}

export default ButtonUser

const styles = StyleSheet.create({
    container:{
        flex:1, 
        flexDirection:'row',
        backgroundColor:Colors.gray,
        width:300,
        height:50,
        marginTop:20,
        borderRadius:20,

    },
    TouchableOpacity:{
      justifyContent:'center',
      alignItems:'center',
      flexDirection:'row'
    },
    textName:{
        textAlign:'center',
        textAlignVertical:'center',
        marginLeft:40,
        fontSize:18,
        fontWeight:'bold'
        
    },
    icon:{
        width:18, 
        height:18, 
        marginLeft:180, 
        alignSelf:'center'
    }
})