import {Image, StyleSheet, Text,TextInput, View,TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React,{ useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { SafeAreaView } from 'react-native-safe-area-context';
import logo from '../assets/images/logo_app.png'


const LoginScreen = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const navigation = useNavigation()


// *Region for OnPress Login
const handleLogin = () => {
    navigation.navigate('Home')
  }
// *End Region


  return (
      <SafeAreaView style={styles.container}>
    <View style={styles.view1}>
    <View>
        <Image style={styles.logo} source={logo}></Image>
    </View>
    <View >
    <Text style={styles.textPleaseRegister}>Login to your account</Text>
    </View>
    </View>
    <View style={styles.view2}>
    {/* <KeyboardAvoidingView 
        behavior="padding"
    > */}
    <View 
>
<Text style={styles.textLabel}>E-mail</Text>
      <View style={styles.inputContainer}>
          
        <TextInput
        placeholder="Email"
        value={email}
        onChangeText={text=>setEmail(text)}
        style={styles.input}>
        </TextInput>
        </View>
        <Text style={styles.textLabel}>Password</Text>

        <View style={styles.inputContainer}>

       
        <TextInput
        placeholder="Password"
        value={password}
        onChangeText={text=>setPassword(text)}
        style={styles.input}
        secureTextEntry={true}>
        </TextInput>
      </View>
</View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
        onPress={handleLogin}
        style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        </View>
    <View style={styles.registerText}>
    <Text style={styles.newOwnerText}>You're a new Owner? </Text>

        <TouchableOpacity 
        onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
    </View>
    {/* </KeyboardAvoidingView> */}
    </View>
    </SafeAreaView>
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
          alignItems:'center'
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

    view2:{
        flex:0.9
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
    }
})