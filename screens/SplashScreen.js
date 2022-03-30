import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import React from 'react'
import { withOrientation } from 'react-navigation'
import { backgroundColor, shadowOffset } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/core'

const SplashScreen = () => {
    const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
        {/*REGION SKIP BUTTON */}
      <View style={styles.componentContainer}>
          <TouchableOpacity
          style={styles.skipContainer}
          onPress={()=>navigation.navigate('Login')}>
            <Text style={styles.skipText}>SKIP {'>>'} </Text>
          </TouchableOpacity>        
      </View>
        {/* END REGION */}
      
        {/* REGION LOGO SPLASH */}
        <View style={styles.logoContainer}>
            <View style={styles.eclipse}>
                <Image style={styles.logo} source={require('../assets/images/logo_app.png')}></Image>
            </View>
        </View>
        {/* END REGION */}

        {/* REGION INFORMATION */}
        <View style={styles.information}>
            <Text style={styles.bigText}>Welcome, Sumanya!</Text>
            <Text style={styles.smallText}>Unlock the world of regular and rescued food by setting up your delivery address.</Text>
        </View>
        {/* END REGION */}

        {/* REGION SELECT LOCATION */}
        <View style={styles.location}>
            <Text style={styles.text}>SELECT LOCATION</Text>
            <TouchableOpacity style={styles.button}>
                <Image style={styles.buttonLogo} source={require('../assets/icons/image 30.png')}/>
                <Text style={styles.buttonText}>Locate Me</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>

            </TouchableOpacity>
        </View>
        {/* END REGION */}

        
    </SafeAreaView>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#FF4B3A',
    },
    componentContainer:{
        flex:1,
        paddingTop:20,
        flexDirection:'row-reverse'
    },
    skipText:{
        flex:1,
        // fontFamily:'nunito',
        fontSize:15,
        color:'white',
        opacity:0.5,
        fontWeight:'bold',
        paddingRight:15,
        
    },
    logoContainer:{
        flex:2,
        alignItems:'center'
    },
    eclipse:{
        borderRadius:100,
        backgroundColor:'white',
        shadowColor:'white',
        width:100,
        height:100,
        alignItems:'center',
        shadowOpacity:50,
        shadowRadius:5,
    },
    information:{
        flex:4,
        alignItems:'center'
    },
    location:{
        flex:3,
        flexDirection:'column'
    },
    logo:{
        marginEnd:5,
        width:105,
        height:105,
        
    },
    skipContainer:{
        flex:0.3,
    },
    bigText:{
        paddingTop:30,
        width:'55%',
        fontSize:40,
        color:'white',
        fontWeight:'bold',
        textAlign:'center',
    },
    smallText:{
        paddingTop:20,
        fontSize:18,
        color:'white',
        width:'80%',
        textAlign:'center',
        fontWeight:'200',   
    },
    text:{
        
        width:'50%',
        fontSize:15,
        color:'white',
        opacity:0.5,
        fontWeight:'bold',

    },
    button:{
        width:'80%',
        height:50,
        backgroundColor:'white',
        borderRadius:80,
        alignSelf:'center',
        elevation:20,
        margin:7,
        paddingLeft:10,
        flexDirection:'row',
        alignItems:'center',
    },
    buttonText:{
        flex:8,
        color:'#FF4B3A',
        fontSize:15,
        alignContent:'center',
        fontWeight:'bold'
    },
    buttonLogo:{
        flex:2,
        backgroundColor:'white',
        width:15,
        height:15,
    }



})