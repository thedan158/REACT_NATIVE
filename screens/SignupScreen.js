import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import logo from '../assets/icons/logo.png'



const SignupScreen = () => {
  return (
    <SafeAreaView style={styles.container}>

    {/* Logo */}
    <View style={styles.view1}>
        <View>
            <Image style={styles.logo} source={logo}></Image>
        </View>
        
     </View>

     {/* Login,Signup Text */}
     <View style={styles.textView}>
        <View style={styles.loginBox}>
            <Text style={styles.loginText}>Login</Text>
            
        </View>
        <View style={styles.signupBox}>
            <Text style={styles.signupText}>Sign-up</Text>
            <View style={styles.rectangle}></View>
        </View>
     </View>

    <View >
        <Text style={styles.registerText}>Register</Text>
        <View style={styles.googleButton}></View>
    </View>
    </SafeAreaView>
    
  )
}

export default SignupScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#E5E5E5'
    },
    view1:{
        flex:0.35,
        alignItems:'center',
        justifyContent:'center',
     
        backgroundColor:'white'
       
    },
      
    
    logo:{
        
        height:250,
        width:250,
        position:'relative',
        top:20
     
    },

    textView:{
        flex:0.05,
        flexDirection:'row',
        backgroundColor:'white',   
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },

    loginBox:{
        flex:0.5,
        alignItems:'center',
        justifyContent:'flex-start',
        position:'relative',
        left:15,
      
      
    },

    loginText:{
        fontSize:20,
        fontWeight:'bold'
    },


    signupBox:{
        flex:0.5,
        alignItems:'center',
        justifyContent:'flex-start',
        position:'relative',
        right:15
        
    },

    rectangle:{
        width: 130,
        height: 3,
        backgroundColor: "#FA4A0C",
        position:'relative',
        bottom:-9,
       
    },

    signupText:{
        fontSize:20,
        fontWeight:'bold'
    },
    
    registerText:{
        fontSize:30,
        fontWeight:'bold',
        color:'#FA4A0C',
        position:'relative',
        top:60,
        left:50
    },

    googleButton:{
        width: 40,
        height: 40,
        backgroundColor:'white',
        alignSelf:'flex-end',
        position:'relative',
        right:100,
        top:20,
        borderRadius:10
    }


   
    
})