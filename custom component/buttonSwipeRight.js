import React from 'react'
import { StyleSheet,Image, Text, View, TouchableOpacity } from 'react-native'

let arrowResource = require('../assets/icons/Vector.png');


const FlatButton_SwipeRight = (title, onPress) => {
    const _content = (
        <View style={styles.rectangle_container}>
            <Text style={styles.textView}>{title}</Text>
            <Image 
                resource= {arrowResource}
                style = {styles.imageView}
            ></Image>
        </View>

    )
    return (
        <TouchableOpacity onPress={props.onPress}>{_content}</TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    rectangle_container:{
        padding: 10,
        height: 60,
        width: 364,
        top: -10,
        bottom: 100,
        borderRadius: 20,
        backgroundColor: '#F3F3F6',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textView:{
        width: 175,
        height: 30,
        color: '#000',
    },
    imageView:{
        
    },

})