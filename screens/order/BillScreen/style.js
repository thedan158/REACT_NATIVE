import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../assets/Colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
      marginBottom: '8%',
      backgroundColor: '#fff',
      paddingTop: '0%',
    },
    containerTop: {
      backgroundColor: '#FF4B3A',
      height: 180,
      flexDirection: 'column',
      flex: 1,
      margin: 0,
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      paddingTop: '3%',
    },
    containerBottom: {
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
  
      borderColor: '#808080',
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
  
      marginTop: -50,
      paddingTop: 20,
      paddingLeft: 10,
    },
    txtSearchBar: {
      color: '#000',
      maxWidth: 200,
      width: 200,
    },
    txtSearchBarDarkTheme: {
      maxWidth: 200,
      width: 200,
      color: '#8A8A8A',
    },
    txtHeaderView: {
      fontSize: 30,
      fontWeight: 'bold',
      marginTop: -40,
      marginBottom: 10,
    },
    txtItemFlatlist: {
      color: '#A09A99',
      marginBottom: 10,
      alignSelf: 'center',
      fontSize: 20,
    },
    txtItemFlatlistInUse: {
      color: Colors.primary,
      marginBottom: 10,
      alignSelf: 'center',
      fontSize: 20,
    },
    containerTemp: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    containerSearchLayout: {
      width: 280,
      height: 50,
      borderRadius: 15,
      marginRight: 10,
      borderWidth: 1,
      borderColor: '#A09A99',
      backgroundColor: '#fff',
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'center',
      padding: 0,
    },
    imgIconSearch: {
      margin: 0,
      height: 16,
      width: 16,
    },
    imgIconFillter: {
      height: 50,
      width: 50,
      margin: 0,
    },
    imgItemFlatlist: {
      height: 70,
      width: 70,
      borderRadius: 20,
      marginTop: 20,
      marginBottom: 5,
      resizeMode: 'cover',
      alignSelf: 'center',
      margin: 0,
    },
    btnSearch: {
      height: 20,
      width: 20,
      marginLeft: 20,
      marginRight: 10,
    },
    btnImgFillter: {
      height: 50,
      width: 50,
    },
    flatlistitemStyle: {
      height: 130,
      width: 130,
      borderRadius: 20,
  
      justifyContent: 'center',
      borderColor: 'grey',
      borderWidth: 2,
      alignItems: 'center',
      marginRight: 20,
      marginVertical: 20,
      marginLeft: 10,
    },
    flatlistitemStyleInUse: {
      height: 130,
      width: 130,
      borderRadius: 20,
      justifyContent: 'center',
      borderColor: Colors.primary,
      borderWidth: 2,
      alignContent: 'center',
      alignItems: 'center',
      marginRight: 20,
      marginVertical: 20,
      marginLeft: 10,
    },
  });
  export default styles;