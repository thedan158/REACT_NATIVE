import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../../assets/Colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  iconHeader: {
    width: 20,
    height: 20,
    alignSelf: 'flex-start',
    margin: 10,
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
  icon: {
    width: 18,
    height: 18,
    position: 'absolute',
    right: 30,
    top: '30%',
  },
  textName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  view1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.secondary,
    textAlign: 'left',
    marginLeft: 20,
    marginTop: 30,
  },
  editText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.secondary,
    textAlignVertical: 'center',
    marginTop: 30,
    left: -10,
  },
  editBox: {
    flexDirection: 'row',
    position: 'relative',
    left: 160,
  },
  pencil: {
    height: 18,
    width: 18,
    left: 0,
    alignSelf: 'center',
    marginTop: 30,
  },
  containerSearchLayout: {
    width: 280,
    height: 40,
    borderRadius: 15,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#FFF',
    backgroundColor: '#F3F3F3',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    padding: 0,
    marginTop: 20,
  },
  btnSearch: {
    height: 20,
    width: 20,
    marginLeft: 20,
    marginRight: 10,
  },
  imgIconSearch: {
    margin: 0,
    height: 16,
    width: 16,
  },
  containerTemp: {
    flexDirection: 'column',

    justifyContent: 'center',
    alignItems: 'center',
  },
  textWaiter: {
    fontSize: 20,

    position: 'relative',

    fontWeight: 'bold',
  },
  add: {
    marginTop: 30,
    marginRight: 20,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    height: 600,
    width: '90%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: '100%',
    height: 20,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.secondary,
    textAlignVertical: 'center',
    marginTop: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: Colors.secondary,
    width: '100%',
    padding: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    marginTop: 50,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  TouchableOpacity: {
    backgroundColor: 'transparent',
    width: windowWidth * 0.7,
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    marginLeft: 80,
    // borderBottomColor: '#e0e0e0',
  },
});
export default styles;
