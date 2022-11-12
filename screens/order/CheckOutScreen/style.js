import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../assets/Colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: windowWidth,
      height: windowHeight - '10%',
    },
    containerHeader: {
      flex: 1,
      flexDirection: 'row',
      maxWidth: '90%',
    },
    imgTagSourceStyle: {
      position: 'absolute',
      zIndex: 1,
      flex: 4,
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      justifyContent: 'center',
      alignContent: 'center',
    },
    imgCloseSourceStyle: {
      flex: 1,
      height: '100%',
      width: '100%',
      resizeMode: 'cover',
    },
  });

  export default styles;
  