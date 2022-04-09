import {Image, StyleSheet, Text,TextInput, View,TouchableOpacity, ScrollView } from 'react-native'
import React,{ useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { SafeAreaView } from 'react-native-safe-area-context';
import logo from '../assets/images/logo_app.png'
import CustomTextInput from '../custom component/CustomTextInput';
import eye from '../assets/icons/eye-green.png'
import hidden from '../assets/icons/closed-eyes-green.png'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const CreateStaffAccount = () => {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [isSecureEntry, setIsSecureEntry] = useState(true);

const navigation = useNavigation()


// *Region for OnPress Login
const handleLogin = () => {
    navigation.navigate('Home')
  }
// *End Region


  return (
      <ScrollView>
      <View style={styles.container}>
    <View style={styles.view1}>
    
    
    <Text style={styles.textPleaseRegister}>Create your staff account</Text>
    
    </View>
    <View style={styles.view2}>
    <View 
>

     
        <CustomTextInput
        label='Username'
        placeholder="Username"
        value={username}
        blurColor={'#4FA987'}

        onChangeText={text=>setUsername(text)}
        />
        

    <CustomTextInput
        label='Password'
        placeholder="Password"
        value={password}
        onChangeText={text=>setPassword(text)}
        secureTextEntry={isSecureEntry}
        blurColor={'#4FA987'}
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
    
      <View style={styles.buttonContainer}>
        <TouchableOpacity
        onPress={handleLogin}
        style={styles.button}>
            <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
        </View>
    
    </View>
    </View>
    </ScrollView>
  )
}

export default CreateStaffAccount

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        flex: 1,
        backgroundColor:'#FFFFFF',
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
        marginTop:70,
    },
    button:{
        backgroundColor:'#4FA987',
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
        borderColor:'#4FA987',
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
         color:'#4FA987',
        position:'relative',
        marginTop:100,
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
        flex:0.9,
        marginTop:70
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