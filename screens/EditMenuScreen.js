import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const EditMenuScreen = () => {
  return (
    <View style={styles.container}>
        <View style={styles.containerHeaderTab}>
            
        </View>
    </View>
  )
}

export default EditMenuScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',

    },
    containerHeaderTab:{
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },

})