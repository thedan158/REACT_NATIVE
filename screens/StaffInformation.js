import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import VKH from '../assets/images/VKH.jpg'
import Colors from '../assets/Colors'

const StaffInformation = () => {
  return (
    <View style={styles.container}>
    
    {/* Image  */}
    <View style={styles.image}>  
      <Image source={VKH} style={styles.avatar}/> 
    </View> 

    {/* Staff's profile  */}
    <View style={styles.profile}>
      <Text style={styles.title}>Name</Text>
      <Text style={styles.information}>Vu Khanh Hoang</Text>

      <Text style={styles.title}>Email</Text>
      <Text style={styles.information}>20521352@gm.uit.edu.vn</Text>

      <Text style={styles.title}>Contact number</Text>
      <Text style={styles.information}>0528679244</Text>

      <Text style={styles.title}>Day of birth</Text>
      <Text style={styles.information}>14/06/2002</Text>

      <Text style={styles.title}>Address</Text>
      <Text style={styles.information}>Bien Hoa, Dong Nai, TP.HCM</Text>
      </View>
      
    </View>
  )
}

export default StaffInformation

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
    justifyContent:'center',
    
  },
  image:{
    alignItems:'center'
   
    
  },
  avatar:{
    height:150,
    width:150,
    borderRadius:100,
    
 
    
    
  },
  profile:{
    justifyContent:'flex-start',
    top:20,
    left:40,  
  },
  title:{
    marginTop:20,
    fontSize:20,
    fontStyle:'italic',
    fontWeight:'bold',
    color:Colors.secondary
  },
  information:{
    marginTop:10,
    fontSize:17,
    marginLeft:20
  }
})