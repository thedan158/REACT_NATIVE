import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../assets/Colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
      marginBottom: '0%',
      paddingTop: '0%',
      backgroundColor: '#fff',
    },
    containerTop: {
      backgroundColor: '#FF4B3A',
      height: 180,
      flexDirection: 'column',
      flex: 1,
      margin: 0,
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'space-around',
      paddingTop: '0%',
    },
    containerBottom: {
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
  
      borderColor: '#808080',
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
  
      marginTop: -40,
      paddingTop: 20,
      paddingLeft: 10,
    },
    txtSearchBar: {
      color: '#8A8A8A',
      maxWidth: 200,
      width: 200,
    },
    txtHeaderView: {
      fontSize: 30,
      fontWeight: 'bold',
      marginTop: 0,
      marginBottom: 0,
      paddingTop: 20,
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
      marginBottom: 50,
      paddingTop: -200,
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
      resizeMode: 'cover',
    },
    imgIconFillter: {
      height: 50,
      width: 50,
      margin: 0,
    },
    imgItemFlatlist: {
      height: 70,
      width: 70,
      marginTop: 20,
      marginBottom: 5,
      resizeMode: 'cover',
      alignSelf: 'center',
      margin: 0,
      borderRadius: 20,
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
    btnUserStyle: {
      height: 30,
      width: 30,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
    },
    imgUserStyle: {
      height: 25,
      width: 25,
      resizeMode: 'cover',
      alignSelf: 'center',
    },
  });
export default styles;