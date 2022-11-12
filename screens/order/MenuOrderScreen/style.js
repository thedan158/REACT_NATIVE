import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../assets/Colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
    textCounter: {},
    buttonAdjust: {
      height: 25,
      width: 25,
      marginHorizontal: '5%',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      backgroundColor: Colors.primary,
      borderRadius: 30,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
  
      elevation: 3,
    },
    countingCartView: {
      alignItems: 'center',
      width: 20,
      height: 20,
      backgroundColor: '#FFFFFF',
      bottom: '67%',
      left: '67%',
      position: 'absolute',
      borderRadius: 30,
      borderColor: Colors.primary,
      borderWidth: 2,
    },
    floatingButton: {
      backgroundColor: Colors.primary,
  
      width: 65,
      height: 65,
      borderRadius: 40,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
  
      // shadowOffset: {
      //   width: 0,
      //   height: 2,
      // },
      // shadowOpacity: 0.25,
      // shadowRadius: 3.84,
  
      // elevation: 5,
    },
    container: {
      flex: 1,
  
      backgroundColor: '#fff',
      paddingTop: '8%',
    },
    shadow: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 1,
    },
    flatlistItemView: {
      height: 110,
      width: '100%',
      flex: 1,
      borderRadius: 30,
      borderWidth: 0,
      margin: 10,
      borderColor: '#808080',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      backgroundColor: '#fff',
      shadowColor: '#A0A0A0',
      shadowOffset: {
        width: 0,
        height: 7,
      },
      shadowOpacity: 0.43,
      shadowRadius: 9.51,
  
      elevation: 15,
      padding: 10,
    },
    containerImageItem: {
      height: '85%',
      width: 85,
      borderRadius: 20,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    txtDetailItemFlatlist: {
      fontSize: 12,
      color: '#3D3D3D',
      flexWrap: 'wrap',
    },
    txtNameItemFlatlist: {
      fontSize: 16,
      color: '#3D3D3D',
      fontWeight: 'bold',
      flexWrap: 'wrap',
    },
    txtPriceItemFlatlist: {
      fontSize: 18,
      color: '#F3554A',
      fontWeight: 'bold',
      flexWrap: 'wrap',
    },
    txtDetailItemFlatlistDarkTheme: {
      fontSize: 12,
      color: '#fff',
      flexWrap: 'wrap',
    },
    txtNameItemFlatlistDarkTheme: {
      fontSize: 16,
      color: '#fff',
      fontWeight: 'bold',
      flexWrap: 'wrap',
    },
    containerBtnAdjust: {
      justifyContent: 'center',
      flexDirection: 'row',
      flex: 1,
      paddingRight: '2%',
    },
    imgBtnOrangeStyle: {
      width: 24,
      height: 24,
      resizeMode: 'cover',
      zIndex: 2,
    },
    btnDel: {
      justifyContent: 'center',
      color: '#FFF',
      fontSize: 16,
      zIndex: 1,
      alignSelf: 'center',
    },
    txtQuantityItem: {
      fontSize: 16,
      marginHorizontal: '2%',
      color: '#3D3D3D',
    },
    txtQuantityItemDarkTheme: {
      fontSize: 16,
      marginHorizontal: '2%',
      color: '#fff',
    },
  
    // Modal Order List
    totalPrice: {
      flexDirection: 'column',
      marginLeft: '3%',
      alignSelf: 'center',
    },
    orderButton: {
      backgroundColor: Colors.primary,
      paddingVertical: 13,
      paddingHorizontal: 70,
      borderRadius: 20,
  
      alignSelf: 'center',
    },
    footer: {
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
  
      marginLeft: '0%',
      borderTopWidth: 1,
      borderTopColor: '#EBEBEB',
      paddingTop: 15,
    },
    listOrder: {
      width: '96%',
      marginLeft: '2%',
    },
    closeButton: {
      position: 'absolute',
  
      left: '90%',
      top: '-2%',
      width: 35,
      height: 35,
      justifyContent: 'center',
  
      backgroundColor: 'white',
      borderRadius: 30,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.34,
      shadowRadius: 3.27,
  
      elevation: 10,
    },
    subHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '90%',
      marginLeft: '5%',
      marginTop: '5%',
      marginBottom: '10%',
    },
    header: {
      flexDirection: 'row',
      position: 'absolute',
      height: '20%',
      left: '10%',
      top: '-2%',
    },
    tableName: {
      position: 'absolute',
  
      left: '10%',
      top: '-3%',
      width: '50%',
      justifyContent: 'center',
      height: '8%',
      backgroundColor: 'white',
      borderRadius: 30,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.34,
      shadowRadius: 3.27,
  
      elevation: 10,
    },
  });
  export default styles;