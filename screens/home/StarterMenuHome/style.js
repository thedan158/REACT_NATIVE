import {StyleSheet, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: windowWidth,
      height: windowHeight,
      paddingTop: '0%',
    },
    containerHeaderViewTab: {
      flex: 1,
      flexDirection: 'row',
      height: 60,
      width: windowWidth,
      justifyContent: 'space-around',
      alignItems: 'center',
      flexWrap: 'wrap-reverse',
    },
    containerDevideLine: {
      height: 1,
      width: windowWidth - 15,
      marginTop: '4%',
      marginBottom: '5%',
      backgroundColor: '#AFAFAF',
      alignSelf: 'center',
    },
    containerItemFlatList: {
      width: windowWidth - 40,
      height: '100%',
      paddingHorizontal: '5%',
      backgroundColor: '#FFFFFF',
      paddingTop: 0,
      marginVertical: '2%',
      alignSelf: 'center',
      justifyContent: 'center',
      borderRadius: 15,
      paddingBottom: '1.5%',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
  
      elevation: 4,
      flex: 1,
    },
    containerImageItem: {
      flex: 2,
      marginBottom: '1%',
      justifyContent: 'center',
      alignContent: 'center',
    },
    containerSearchViewComponent: {
      height: 40,
      width: windowWidth,
      maxWidth: '85%',
      alignSelf: 'center',
      borderRadius: 15,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
  
      elevation: 5,
    },
    containerInfoViewTab: {
      height: 70,
      width: windowWidth,
      maxWidth: '110%',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      paddingHorizontal: '5%',
    },
    containerInfoItem: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignContent: 'center',
      paddingHorizontal: '5%',
    },
    containerInfoItem1: {
      flex: 7,
    },
    containerRatingItem: {
      flexDirection: 'row',
      flex: 2,
      marginBottom: '3%',
    },
    txtPriceItemInfo2: {
      color: '#EF5B5B',
      fontSize: 25,
      fontWeight: 'bold',
    },
    txtHeaderViewTab: {
      color: '#fff',
      fontSize: 25,
      fontWeight: 'bold',
      paddingTop: '0%',
    },
    txtNameDishItem: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: '2%',
    },
    txtRatingItem: {
      color: '#EF5B5B',
      marginHorizontal: 5,
    },
    containerPriceItem: {
      flex: 1,
    },
    btnSearchStyle: {
      width: 20,
      height: 20,
      flex: 1,
    },
    imgSearchStyle: {
      width: 20,
      height: 20,
      resizeMode: 'cover',
    },
    imgStarItem: {
      height: 15,
      width: 15,
    },
    btnGoBack: {
      height: 30,
      width: 30,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
    },
    btnUserStyle: {
      height: 30,
      width: 30,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
    },
    imgGoBackStyle: {
      height: 25,
      width: 25,
      resizeMode: 'cover',
      alignSelf: 'center',
    },
    imgSourceItem: {
      resizeMode: 'cover',
      margin: '2%',
      borderRadius: 15,
      height: 150,
      width: windowWidth - 50,
      alignSelf: 'center',
      flex: 1,
    },
    imgUserStyle: {
      height: 25,
      width: 25,
      resizeMode: 'cover',
      alignSelf: 'center',
    },
  });