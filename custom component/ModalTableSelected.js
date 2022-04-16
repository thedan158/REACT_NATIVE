import { Text, StyleSheet, View, Modal, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const modalHeight = deviceHeight - 50;



export default function ModalTableSelected (props) {
    const [modalVisible, setModalVisible] = useState(false);


    return (
        <Modal
            style={styles.ModalStyles}
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                alert('Close ' + props.name);
                setModalVisible(!modalVisible);
            }}
        >
            {/* RootView Modal */}
            <View style={styles.containerModal}>
                <View style={styles.HeaderView}>
                    <Text style={styles.txtHeader}>{props.name}</Text>
                    <TouchableOpacity style={styles.btnCloseModal} onPress={() => setModalVisible(!modalVisible)}>
                        <Image source={require('../assets/icons/close.png')} style={styles.imgClose}/>  
                    </TouchableOpacity>
                </View>
                <View style={styles.ModalViewInfo}>
                    <View>
                        
                    </View>
                </View>

            </View>
        </Modal>
    )


}

const styles = StyleSheet.create({  
    ModalStyles:{
        borderRadius: 31,
        marginTop: 50,
        width: deviceWidth,
        height: modalHeight,


    },
    containerModal:{

    },
    ModalView:{
        margin: 10,
        flexDirection: 'row',
    },
    HeaderView:{
        borderRadius: 32,
        borderWidth: 1,
        borderColor: '#000',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    txtHeader:{
        fontSize: 18,
        fontWeight: 'bold',
    },
    imgClose:{

    },
    btnCloseModal:{},
})