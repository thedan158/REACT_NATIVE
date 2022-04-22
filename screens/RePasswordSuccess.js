import {Image, StyleSheet, Text,TextInput, View,TouchableOpacity, ScrollView } from 'react-native'
import React,{ useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { SafeAreaView } from 'react-native-safe-area-context';
import logo from '../assets/images/logo_app.png'

const RePasswordSuccess = () => {
const navigation = useNavigation()


// *Region for OnPress Login
const handleRePassword = () => {
    navigation.navigate('Login')
  }
  return (
    <ScrollView>
      <View style={styles.container}>

      {/* Logo and title  */}
    <View style={styles.view1}>
    <View>
        <Image style={styles.logo} source={logo}></Image>
    </View>
    <View >
    <Text style={styles.textPleaseRegister}>Password Reset!</Text>
    </View>
    </View>

    {/* Notification  */}
    <View style={styles.view2}>
    <View 
>
<Text style={styles.subtitle}>Your password has been reset, please login again!</Text>
      
        

        
</View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
        onPress={handleRePassword}
        style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        </View>
    
    </View>
    </View>
    </ScrollView>
  )
}

export default RePasswordSuccess

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        flex: 1,
    },
    inputContainer:{
        width: 300,
        height: 55,
        backgroundColor: "white",
        justifyContent:'center',
        alignItems:'flex-start',
        borderRadius:13,   
    },

    input:{
        backgroundColor:'white',
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:10,
        marginTop:5,
        flexWrap:'wrap'
    },
    buttonContainer:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:40,
    },
    button:{
        backgroundColor:'#FA4A0C',
        width:'100%',
        padding:15,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        elevation:1,
        
    },
    buttonOutline:{
        backgroundColor:'white',
        marginTop:5,
        borderColor:'#FA4A0C',
        borderWidth:2,
    },
    buttonText:{
        color:'white',
        fontWeight:'700',
        fontSize:16,

    },
    buttonOutlineText:{
        color:'#FA4A0C',
        fontWeight:'700',
        fontSize:16,
    },
    newOwnerText:{
        color:'black',
        fontSize:16,
        fontWeight:'normal'
    },
    
    view1:{
        margin:20,
        justifyContent:'center',
        alignItems:'center'
    },
  
    textPleaseRegister:{
       
      position:'relative',
      top:10,
      fontSize:20,
      fontWeight:'bold'
    },

  logo:{
      
      height:160,
      width:170,
      position:'relative',
      top:5
   
  },

  textView:{
      flex:0.12,
      flexDirection:'row',
      backgroundColor:'white',   
      borderBottomLeftRadius: 50,
      borderBottomRightRadius: 50,
  },

  view2:{
      flex:0.9,
      marginTop:20
  },


    textLabel:{
        fontSize:15,
        marginTop:15,
        marginBottom:15,
    },
    registerText:{
        flexWrap:'wrap',
        flexDirection:'row',
        marginTop:20,
        justifyContent:'center'
    },
    subtitle:{
        fontSize:15,
        marginBottom:15,
        textAlign:'center',
        color:'#9B9B9B'
    }
})