import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes'

export default function FlatButtonMenu(text, onPress) {
    return(
        <TouchableOpacity style={styles.rectangle} onPress={onPress}>
                <View style={styles.line}></View>
                <View style={styles.line}></View>
                <View style={styles.line}></View>
                {/* <Text style={styles.textContent}>{text}</Text> */}

        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    rectangle:{
        width: 75,
        flex: 1,
        height: 54, 
        borderRadius: 30,
        backgroundColor: '#000',
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center'
    },
    line:{
        width: 18,
        backgroundColor:  '#000000',
        height: 1,
        flex: 1,
        margin: 3
    },
    textContent:{
        textTransform: 'capitalize',
        width: 45,
        height: 20,
        backgroundColor: '#2E3A59'
    }

})
