import {KeyboardAvoidingView, StyleSheet, Text, View, Image, Button, Pressable, Alert } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/core'
import logo from '../assets/images/logo_app.png'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'




const SignupScreen = () => {
    const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const navigation = useNavigation()


// *Region for OnPress Login
const handleSignup = () => {
    navigation.navigate('Home')
  }
  return (
    
    <KeyboardAvoidingView style={styles.container}>

    {/* Logo */}
    <View style={styles.view1}>
        <View>
            <Image style={styles.logo} source={logo}></Image>
        </View>
        <View >
        <Text style={styles.textPleaseRegister}>Register your information</Text>
        </View>
     </View>

     

    <View style={styles.view2}>

   
    {/* Full name input */}
    <View style={styles.fullNameBox}>
        <TextInput onChangeText={text=>setEmail(text)} style={styles.fullNameText} placeholder='Full Name'/>
    </View>

    {/* Mobile number input */}
    <View style={styles.passwordBox}>
        <TextInput onChangeText={text=>setEmail(text)} style={styles.fullNameText} placeholder='Mobile Number'/>
    </View>

    {/* Password */}
    <View style={styles.passwordBox}>
        <TextInput secureTextEntry={true} onChangeText={text=>setPassword(text)} style={styles.fullNameText} placeholder='Password'/>
    </View>

    {/* Confirm password */}
    <View style={styles.passwordBox}>
        <TextInput secureTextEntry={true} onChangeText={text=>setPassword(text)} style={styles.fullNameText} placeholder='Confirm Password'/>
    </View>

    </View>


    
    
    <View style={styles.view3}>

    
    {/* Sign-up button */}
    <View style={styles.signupBoxButton}>
    <Pressable style={styles.signupButton} 
    onPress={handleSignup}>
      <Text style={styles.textSignupButton}>Sign-up</Text>
    </Pressable>
    </View>

    <View style={styles.loginBox}>
        <Text style={styles.ownerText}>Already an Owner?</Text>
    <Pressable onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Login</Text>   
        </Pressable> 

    </View>

    
    </View>
    </KeyboardAvoidingView>
    
  )
}

export default SignupScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F2F2F2'
    },
    
      view1:{
          
          justifyContent:'center',
          alignItems:'center'
      },

      view2:{
       
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',

    },
    view3:{
       
        position:'relative',
        top:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },

      textPleaseRegister:{
         
        position:'relative',
        top:-30,
        fontSize:20,
        fontWeight:'bold'
      },

    logo:{
        
        height:270,
        width:270,
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

    loginBox:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        position:'relative',
        top:30,
        left:10
        
      
      
    },

    loginText:{
        fontSize:13,
        fontWeight:'bold',
        color:"#FA4A0C"
    },

    ownerText:{
        fontSize:13,
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
        top:50,
        left:65,
        
    },

    fullNameBox:{
        width: 300,
        height: 55,
        backgroundColor: "white",
        justifyContent:'center',
        alignItems:'flex-start',
        borderRadius:13,
        
    },

    fullNameText:{
        fontSize:15,
        marginLeft:30
    },

    passwordBox:{
        width: 300,
        height: 55,
        backgroundColor: "white",
        justifyContent:'center',
        alignItems:'flex-start',
        borderRadius:13,
        marginTop:25
    },

   
    signupBoxButton:{
        alignItems: 'center',
        justifyContent: 'center',
    },

    signupButton:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        // paddingHorizontal: 32,
        borderRadius: 20,
        elevation: 1,
        backgroundColor: '#FA4A0C',
        position:'relative',
        top:30,
        left:40,
        width:200,

    },

    textSignupButton:{
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },

  
   
    
})