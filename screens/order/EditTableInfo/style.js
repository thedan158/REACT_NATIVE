import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../assets/Colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: windowHeight,
      width: windowWidth,
      paddingTop: '2%',
      backgroundColor: 'white',
    },
    view2: {
      flex: 3,
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    view3: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 5,
    },
    ImageBackground: {
      height: 50,
      width: 50,
      borderRadius: 15,
      position: 'absolute',
      alignSelf: 'center',
    },
    view4: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 10,
      width: '80%',
      alignItems: 'center',
      alignContent: 'center',
      alignSelf: 'center',
    },
    pickLogo: {
      width: 140,
      height: 140,
      backgroundColor: 'white',
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'black',
      borderWidth: 3,
      borderRadius: 10,
      borderStyle: 'dashed',
    },
    pick: {
      width: 140,
      height: 140,
      borderRadius: 15,
      alignSelf: 'center',
      borderColor: 'black',
    },
    button1: {
      backgroundColor: Colors.secondary,
      width: '60%',
      padding: 10,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 1,
    },
    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },
    button: {
      backgroundColor: Colors.primary,
      width: '50%',
      padding: 15,
      borderRadius: 20,
      elevation: 1,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
  
      elevation: 3,
    },
    button1: {
      backgroundColor: Colors.secondary,
      width: '50%',
      padding: 15,
      borderRadius: 20,
      elevation: 1,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
  
      elevation: 3,
    },
    buttonDelete: {
      backgroundColor: '#FFF0F3',
      width: '50%',
      padding: 15,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
      alignSelf: 'center',
      margin: 5,
      flexDirection: 'row',
      marginRight: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
  
      elevation: 3,
    },
    buttonTextDelete: {
      color: '#DA0000',
      fontWeight: '700',
      fontSize: 16,
    },
  });
  