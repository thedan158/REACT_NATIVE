import { StyleSheet, Text, View,Image,TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import pencil from '../assets/icons/pencil.png'
import { useNavigation } from '@react-navigation/core'
import search from '../assets/icons/search.png'

const StaffManagement = () => {
    const navigation = useNavigation()
  return (
    <View style={styles.container}>
        <View style={styles.view1}>
            <Text style={styles.title}>List Staffs</Text>
            
            <TouchableOpacity style={styles.editBox} onPress={() => navigation.navigate('Signup')}>
            
                <Text style={styles.editText}>Edit</Text>
                <Image source={pencil} style={styles.pencil}/>
                
                </TouchableOpacity>
                
                
            
        </View>
        <View style={styles.containerTemp}>
        <View style={styles.containerSearchLayout}>
                <TouchableOpacity style={styles.btnSearch}>
                    <Image
                        source={search}
                        style={styles.imgIconSearch}
                    />
                </TouchableOpacity>
                <TextInput 
               
                placeholder ={'Search Table...'} />
            </View>
            </View>
    </View>
  )
}

export default StaffManagement

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    view1:{
        flexDirection:'row',
        alignItems:'center'
    },
    title:{
        fontSize:28,
        fontWeight:'bold',
        color:'#2C6E49',
        textAlign:'left',
        marginLeft:20,
        marginTop:30
    },
    editText:{
        fontSize:18,
        fontWeight:'bold',
        color:'#2C6E49',
        textAlignVertical:'center',
        marginTop:30,

    },
    editBox:{
        flexDirection:'row',
        position:'relative',
        left:160,
        


    },
    pencil:{
        height:18,
        width:18,
        left:10,
        alignSelf:'center',
        marginTop:30,

    },
    containerSearchLayout:{
        width: 280,
        height: 40,
        borderRadius: 15,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#FFF',
        backgroundColor: '#F3F3F3',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        padding: 0,
        marginTop: 20,
    },
    btnSearch:{
        height: 20,
        width: 20,
        marginLeft: 20,
        marginRight: 10,
    },
    imgIconSearch:{
        margin: 0,
        height: 16,
        width: 16,
    },
    containerTemp:{
        flexDirection: 'column',
        
        justifyContent:'center',
        alignItems:'center'
    },
})