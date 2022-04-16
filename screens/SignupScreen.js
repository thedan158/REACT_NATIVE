import {TouchableOpacity, KeyboardAvoidingView, StyleSheet, Text, View, Image, Button,  Alert, ScrollView } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/core'
import logo from '../assets/images/logo_app.png'
import { TextInput } from 'react-native-gesture-handler'
import CustomTextInput from '../custom component/CustomTextInput'
import eye from '../assets/icons/eye.png'
import hidden from '../assets/icons/close-eye.png'
import Colors from '../assets/Colors'


const SignupScreen = () => {
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSecureEntry, setIsSecureEntry] = useState(true);
    const [isSecureEntryConfirm, setIsSecureEntryConfirm] = useState(true);
    const navigation = useNavigation()


// *Region for OnPress Signup
const handleSignup = () => {
    navigation.navigate('OTPsignup')
  }
  return (
    
    <ScrollView>
    
    <View style={styles.container}>
    {/* Logo and title */}
    <View style={styles.view1}>
        <View>
            <Image style={styles.logo} source={logo}></Image>
        </View>
        <View >
        <Text style={styles.textPleaseRegister}>Register your information</Text>
        </View>
     </View>

     
        {/* Input section  */}
    <View style={styles.view2}>

    <View style={{marginTop:-15}}>
    {/* Full name input */}
    
        <CustomTextInput 
        blurColor={Colors.primary}
         value={fullName}
        onChangeText={text=>setFullName(text)} 
        placeholder='Full Name'/>
    </View>

    {/* Mobile number input */}
    <View style={{marginTop:-15}}>
    <CustomTextInput 
    blurColor={Colors.primary}
         value={phoneNumber}
        onChangeText={text=>setPhoneNumber(text)} 
        keyboardType='decimal-pad'
        placeholder='Mobile Number'/>
    </View>
    {/* Password */}
    <View style={{marginTop:-15}}>
    <CustomTextInput 
    blurColor={Colors.primary}
         value={password}
        onChangeText={text=>setPassword(text)} 
        placeholder='Password'
        secureTextEntry={isSecureEntry}
        icon={
              <TouchableOpacity
                onPress={() => {
                  setIsSecureEntry((prev) => !prev);
                }}>
                <Image source={isSecureEntry ? hidden : eye} style={{width:25, height:25}}>
                </Image>
              </TouchableOpacity>
            }
            iconPosition="right"
        />
        </View>
    {/* Confirm password */}
    <View style={{marginTop:-15}}>
    <CustomTextInput 
        blurColor={Colors.primary}
         value={confirmPassword}
        onChangeText={text=>setConfirmPassword(text)} 
        placeholder='Confirm Password'
        secureTextEntry={isSecureEntryConfirm}
        icon={
              <TouchableOpacity
                onPress={() => {
                  setIsSecureEntryConfirm((prev) => !prev);
                }}>
                <Image source={isSecureEntryConfirm ? hidden : eye} style={{width:25, height:25}}>
                </Image>
              </TouchableOpacity>
            }
            iconPosition="right"
        />
        </View>
    </View>


    
    
    

    
    {/* Sign-up button */}
    <View style={styles.buttonContainer}>
        <TouchableOpacity
        onPress={handleSignup}
        style={styles.button}>
            <Text style={styles.buttonText}>Sign-up</Text>
        </TouchableOpacity>
        </View>

        {/* Login  */}
        <View style={styles.registerText}>
    <Text style={styles.ownerText}>Already an Owner? </Text>

        <TouchableOpacity 
        onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}> Login</Text>
        </TouchableOpacity>
    </View>
    

    
    </View>
    </ScrollView>
   
    
    
  )
}

export default SignupScreen

const styles = StyleSheet.create({
    container:{
        // flex:1,
        backgroundColor:'#F2F2F2'
    },
    buttonContainer:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
    },
    button:{
        backgroundColor:'#FA4A0C',
        width:'80%',
        padding:15,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        elevation:1,
        
    },
    buttonText:{
        color:'white',
        fontWeight:'700',
        fontSize:16,

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
        color:'#FA4A0C',
        fontWeight:'700',
        fontSize:16,
    },

    ownerText:{
        color:'black',
        fontSize:16,
        fontWeight:'normal'
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
        flexWrap:'wrap',
        flexDirection:'row',
        marginTop:20,
        justifyContent:'center'
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
        alignItems:'center',
        borderRadius:13,
        marginTop:25,
    },

   
    

  

    textSignupButton:{
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },

   
    
})