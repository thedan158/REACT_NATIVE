import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  dateText: {},
  date: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '3%',
    marginTop: '7%',
  },
  containerHeader: {
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '5%',
    marginLeft: '5%',
  },
  textHeader: {
    fontWeight: 'bold',
    fontSize: 25,
    alignSelf: 'center',
  },
  notifications: {
    marginBottom: '15%',
  },
  container: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    backgroundColor: 'white',
  },
});
export default styles;
