import {Image, StyleSheet, Text,TextInput, View,TouchableOpacity, ScrollView } from 'react-native'
import React,{ useState } from 'react'
import { useNavigation } from '@react-navigation/core'

const CustomTextInput = ({
    onChangeText,
    iconPosition,
    icon,
    style,
    value,
    label,
    error,
    ...props
  }) => {
  
    const [focused, setFocused] = React.useState(false);

  const getFlexDirection = () => {
    if (icon && iconPosition) {
      if (iconPosition === 'left') {
        return 'row';
      } else if (iconPosition === 'right') {
        return 'row-reverse';
      }
    }
  };

  const getBorderColor = () => {
    if (error) {
      return 'red';
    }

    if (focused) {
      return '#FA4A0C';
    } else {
      return 'white';
    }
  };
  return (
    <View style={styles.inputContainer}>
      {label && <Text>{label}</Text>}

      <View
        style={[
          styles.wrapper,
          {alignItems: icon ? 'center' : 'baseline'},
          {borderColor: getBorderColor(), flexDirection: getFlexDirection()},
        ]}>
        <View>{icon && icon}</View>

        <TextInput
          style={[styles.textInput, style]}
          onChangeText={onChangeText}
          value={value}
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
          {...props}
        />
      </View>

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
  
}

export default CustomTextInput

const styles = StyleSheet.create({
    wrapper: {
        // height: 42,
        
        // borderRadius: 4,
        paddingHorizontal: 15,
        marginTop:15,
        
        

        width: 300,
        height: 55,
        backgroundColor: "white",
        justifyContent:'center',
        alignItems:'flex-start',
        borderRadius:13,  
        borderWidth: 1,
      },
    
      inputContainer: {
        paddingVertical: 12,
      },
    
      textInput: {
        flex: 1,
        width: '100%',
      },
    
      error: {
        color: 'red',
        paddingTop: 4,
        fontSize: 12,
      },
})