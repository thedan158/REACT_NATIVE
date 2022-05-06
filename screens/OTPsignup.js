import {Image, StyleSheet, Text,TextInput, View,TouchableOpacity, ScrollView } from 'react-native'
import React,{ useState, useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/core'
import { SafeAreaView } from 'react-native-safe-area-context';
import logo from '../assets/images/logo_app.png'

const OTP = () => {
let textInput = useRef(null);
const [internalVal, setInternalVal] = useState('');
const [timer,setTimer]=useState(60);
const navigation = useNavigation()
const onChangeText = (val)=>{
    setInternalVal(val)
}
useEffect(()=>{
    textInput.focus()
},[])

    // Countdown 60s function
React.useEffect(()=>{
    let interval = setInterval(()=>{
        setTimer(prevTimer => {
            if(prevTimer>0){
                return prevTimer - 1
            }
            else {
                return prevTimer
            }
        })
    },1000)
    return () => clearInterval(interval)
}, [])


const handleOTP = () => {
    navigation.navigate('RestaurantInformation')
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
    <Text style={styles.textPleaseRegister}>OTP Authentication</Text>
    </View>
    </View>
    <View style={styles.view2}>
    <View>
      {/* Subtitle  */}
<Text style={styles.subtitle}>An authentication code has been send to your phone number</Text>


        {/* Number input section  */}
<View >
       
        <TextInput
        ref={(input)=>textInput=input}
        onChangeText={onChangeText}
        value={internalVal}
        style={{position:'absolute', width:1, height:1, opacity:0}}
        returnKeyType='done'
        keyboardType='decimal-pad'
        maxLength={4}>
        </TextInput>
        <View style={styles.otpView}>
        {
            Array(4).fill().map((data,index)=>(
                <View
                key={index}
                style={[styles.inputContainer,
                {
                    borderColor:  index === internalVal.length ? '#FA4A0C' : 'white'
                }
                ]}
                >
               
                    <Text 
                    style={styles.numberInput}
                    onPress={()=>textInput.focus()}
                    >
                        {internalVal && internalVal.length > 0 ? internalVal[index] : ""}
                    </Text>
                </View>
            ))
        }
        </View>
    </View> 
        
        {/* Resend code */}
      
      <View style={styles.countDown}>
      <Text style={styles.subtitle2}>Didn't receive code?</Text>
      <TouchableOpacity 
        onPress={() => setTimer(60)}>
            <Text style={styles.buttonOutlineText}
            
            >  Resend ({timer}s) </Text>
        </TouchableOpacity>
        </View>
</View>

        {/* Button section  */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
        
        onPress={handleOTP}
        style={styles.button}>
            <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        </View>
    
    </View>
    </View>
    </ScrollView>
  )
}

export default OTP

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        flex: 1,
    },
   

    input:{
        backgroundColor:'white',
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:10,
        marginTop:5,
        flexWrap:'wrap',
        textAlign:'center',
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
        marginTop:15
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
    },
    inputContainer:{
        width: 55,
        height: 55,
        backgroundColor: "white",
        justifyContent:'center',
        alignItems:'center',
        borderRadius:13,   
        borderWidth:2,
        
    },
    numberInput:{
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:10,
        marginTop:5,
        justifyContent:'center',
        alignItems:'center',
        fontSize:20,
        textAlign:'center',
        fontWeight:'bold',
        color:'black'
    },
    otpView:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        marginTop:30
    },
    subtitle2:{
        fontSize:15,
        marginTop:15,
        textAlign:'center',
        color:'#9B9B9B'
    },
    countDown:{
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'center',
    }
})