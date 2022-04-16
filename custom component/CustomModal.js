import { StyleSheet, Text, View, Modal } from 'react-native'
import React from 'react'


const CustomModal = ({visible, children}) => {
    const [showModal, setShowModal] = React.useState(visible);
  return (
    <Modal transparent visible={false}>
            <View style={styles.modalBackground}>
                <View style={[styles.modalContainer]}>
                    {children}
                </View>
            </View>
    </Modal>
  )
}

export default CustomModal

const styles = StyleSheet.create({
    modalBackground:{
        flex:1,
        backgroundColor:'rgba(0,0,0,0.3)',
        justifyContent:'center',
        alignItems:'center'
    },
    modalContainer:{
        height:'80%',
        width:'90%',
        backgroundColor:'white',
        paddingHorizontal:20,
        paddingVertical:30,
        borderRadius:20,
        elevation:20
    },
})