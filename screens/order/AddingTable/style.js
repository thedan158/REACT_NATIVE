import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../assets/Colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    view2: {
      justifyContent: 'space-evenly',
      alignItems: 'center',
      marginVertical: 50,
    },
    view3: {
      marginVertical: 50,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    ImageBackground: {
      height: 200,
      width: 200,
      borderRadius: 15,
      position: 'absolute',
      alignSelf: 'center',
    },
    view4: {
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
      backgroundColor: Colors.secondary,
      width: '100%',
      padding: 15,
      borderRadius: 20,
      elevation: 1,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  export default styles;