import { Text, StyleSheet, Dimensions, Modal } from 'react-native'
import React, { Component } from 'react'



const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const modalHeight = deviceHeight - 50;


export default class ModalTableSelect extends Component {

    constructor(props){
        super(props);
    }

  render() {
    return (
      <Modal 
        ref={'ModalTable'}
        style={styles.ModalContainer}
        onClosed= {() => {
            alert('...')
        }}
      >
          <Text style={styles.txtTest}>My modal test</Text>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({

    ModalContainer:{
        
    },
    txtTest:{

    },
})