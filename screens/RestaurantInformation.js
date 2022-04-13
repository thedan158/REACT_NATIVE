import {TouchableOpacity,TextInput, KeyboardAvoidingView, StyleSheet, Text, View, Image, Button,  Alert, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/core'
import logo from '../assets/images/logo_app.png'
import CustomTextInput from '../component/CustomTextInput'
import gallery from '../assets/icons/gallery.png'
import * as ImagePicker from 'expo-image-picker'
import { Constants } from 'expo-constants'

const RestaurantInformation = () => {
    const [nameOfRes, setNameOfRes] = useState('');
    const [address, setAddress] = useState('');
    const [hotline, setHotline] = useState('');
    const navigation = useNavigation()
    const [image, setImage]=useState(null);

    useEffect(async()=>{
        const{status}=await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if(status!=='granted'){
        alert('Permission denied!')
    }},[]

    )

    const PickImage = async()=>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.All,
            allowsEditing:true,
            aspect:[4,3],
            quality:1
        })
        console.log(result)
        if(!result.cancelled){
            setImage(result.uri)
        }
    }

// *Region for OnPress Signup
const handleSignup = () => {
    navigation.navigate('Home')
  }
  return (
    
    <ScrollView>
    
    <View style={styles.container}>
    {/* Logo */}
    <View style={styles.view1}>
        <View>
            <Image style={styles.logo} source={logo}></Image>
        </View>
        <View>
        <Text style={styles.textPleaseRegister}>Fill your restaurant information</Text>
        </View>
     </View>

     <View style={styles.pickLogo}>
        {/* <Image style={styles.gallery} source={gallery}></Image> */}
        {image && <Image source={{uri:image}} style={styles.pickLogo}/>}
        </View>
        <TouchableOpacity 
        onPress={PickImage}>
            <Text style={styles.loginText}>Choose Your Logo</Text>
          
        </TouchableOpacity>
        
     

    <View style={styles.view2}>

    <View style={{marginTop:-15}}>
    {/* Full name input */}
    
        <CustomTextInput 
         value={nameOfRes}
        onChangeText={text=>setNameOfRes(text)} 
        placeholder='Name of Restaurant'/>
    </View>

    {/* Mobile number input */}
    <View style={{marginTop:-15}}>
    <CustomTextInput 
         value={address}
        onChangeText={text=>setAddress(text)} 
        placeholder='Address'/>
    </View>
    {/* Password */}
    <View style={{marginTop:-15}}>
    <CustomTextInput 
         value={hotline}
        onChangeText={text=>setHotline(text)} 
        placeholder='Hotline'
        keyboardType='decimal-pad'
        />
        </View>
   
        </View>
    </View>


    
    
    

    
    {/* Sign-up button */}
    <View style={styles.buttonContainer}>
        <TouchableOpacity
        onPress={handleSignup}
        style={styles.button}>
            <Text style={styles.buttonText}>Finish</Text>
        </TouchableOpacity>
        </View>
        
    

    
    
    </ScrollView>
   
    
    
  
  )
}

export default RestaurantInformation

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
        marginTop:10
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
        textAlign:'center',
        marginTop:15
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
        backgroundColor: 'white',
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

    gallery:{
        height:65,
        width:65,
        alignSelf:'center'
    },
    

  

    textSignupButton:{
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },

    pickLogo:{
        width:150,
        height:150,
        backgroundColor:'#F2F2F2',
        flex:1,
        alignSelf:'center',
        marginTop:-5,
        justifyContent:'space-evenly',
        alignItems:'center'
    }   
   
})
