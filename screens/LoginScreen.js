import {Image, StyleSheet, Text,TextInput, View,TouchableOpacity, ScrollView, ImageBackground } from 'react-native'
import React,{ useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { SafeAreaView } from 'react-native-safe-area-context';
import logo from '../assets/images/logo_app.png'
import CustomTextInput from '../custom component/CustomTextInput';
import eye from '../assets/icons/eye.png'
import hidden from '../assets/icons/close-eye.png'
import Colors from '../assets/Colors';
import background from '../assets/images/background.png'

const LoginScreen = () => {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [isSecureEntry, setIsSecureEntry] = useState(true);

const navigation = useNavigation()


// *Region for OnPress Login
const handleLogin = () => {
    navigation.navigate('Dashboard')
  }
// *End Region


  return (
      <ScrollView>
            <ImageBackground source={background} resizeMode="cover" style={{flex:1}}/>

      <View style={styles.container}>

      {/* Logo and title  */}
    <View style={styles.view1}>
    <View>
        <Image style={styles.logo} source={logo}></Image>
    </View>
    <View >
    <Text style={styles.textPleaseRegister}>Login to your account</Text>
    </View>
    </View>

    {/* Input section  */}
    <View style={styles.view2}>
    <View 
>

     
        <CustomTextInput
        label='Username'
        placeholder="Username"
        blurColor={Colors.primary}
        value={username}
        onChangeText={text=>setUsername(text)}
        />
        

    <CustomTextInput
        label='Password'
        placeholder="Password"
        value={password}
        blurColor={Colors.primary}
        onChangeText={text=>setPassword(text)}
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


            {/* Forgot password  */}
    <TouchableOpacity 
        onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>

            {/* Login button section  */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
        onPress={handleLogin}
        style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        </View>

        {/* Register section  */}
    <View style={styles.registerText}>
    <Text style={styles.newOwnerText}>You're a new Owner? </Text>

        <TouchableOpacity 
        onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.buttonOutlineText}> Register</Text>
        </TouchableOpacity>
    </View>
    </View>
    </View>
    </ScrollView>
  )
}

export default LoginScreen

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
    
    // container:{
    //     flex:1,
    //     backgroundColor:'#F2F2F2'
    // },
    
      view1:{
          
          justifyContent:'center',
          alignItems:'center',
          margin:20
      },
    
      textPleaseRegister:{
         
        position:'relative',
        top:20,
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
        marginBottom:15
    },
    registerText:{
        flexWrap:'wrap',
        flexDirection:'row',
        marginTop:20,
        justifyContent:'center'
    },
    forgotPassword:{
        color:'#FA4A0C',
        fontWeight:'700',
        fontSize:16,
        marginTop:10
    },
    dropShadow: {
        shadowColor: '#171717',
        // shadowOffset: {width: 0, height: 3},
        // shadowOpacity: 0.4,
        // shadowRadius: 2,
        elevation:11
      },
})