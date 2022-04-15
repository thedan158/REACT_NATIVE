import { StyleSheet, Text, View, TouchableOpacity, Switch } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { CustomCollapsible } from '../custom component/CustomCollapsible'
import Colors from '../assets/Colors'
import { useNavigation } from '@react-navigation/core'




const PermissionManager = () => {
  const navigation = useNavigation()

  return (
    <View>
      <Text style={styles.modalTitle}>Permission Manager</Text>
      <View style={styles.permission}>
        <CustomCollapsible title="Tanhao" subTitle="T"/>
        <CustomCollapsible title="Tanhao" subTitle="This option will allow ... to ..... abcb xnxn x n
xz nx znx nx nz x bzm xnz bm xnbzm xnzmx nz x
zxn mbz nxm z nx mz  xz"/>
        <CustomCollapsible title="Tanhao" subTitle="This option will allow ... to ..... abcb xnxn x n
xz nx znx nx nz x bzm xnz bm xnbzm xnzmx nz x
zxn mbz nxm z nx mz  xz"/>
      </View>
      <View >
      <TouchableOpacity
        onPress={() => navigation.navigate('Signup')}
        style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        </View>
      </View>
  )
}

export default PermissionManager

const styles = StyleSheet.create({
  modalTitle:{
    fontSize:20,
    fontWeight:'bold',
    color:Colors.secondary,
    textAlignVertical:'center',
    marginTop:80,
    textAlign:'center'     
},
permission:{
  marginVertical:40
},
button:{
  backgroundColor:Colors.secondary,
  width:'80%',
  padding:15,
  borderRadius:30,
  justifyContent:'center',
  alignItems:'center',
  elevation:1,
  alignSelf:'center'
},
buttonText:{
  color:'white',
  fontWeight:'700',
  fontSize:16,

},

})