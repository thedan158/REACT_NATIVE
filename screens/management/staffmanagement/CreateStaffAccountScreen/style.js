import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../../assets/Colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FFFFFF',
    height: windowHeight,
    width: windowWidth,
  },
  inputContainer: {
    width: 300,
    height: 55,

    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 13,
  },

  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  button: {
    backgroundColor: '#4FA987',
    width: '80%',
    padding: 15,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  buttonOutline: {
    marginTop: 5,
    borderColor: '#4FA987',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#FA4A0C',
    fontWeight: '700',
    fontSize: 16,
  },
  newOwnerText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'normal',
  },

  // container:{
  //     flex:1,
  //     backgroundColor:'#F2F2F2'
  // },

  view1: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  textPleaseRegister: {
    color: '#4FA987',
    position: 'relative',
    marginTop: 100,
    fontSize: 20,
    fontWeight: 'bold',
  },

  textView: {
    flex: 0.12,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },

  view2: {
    flex: 1,
    marginTop: 70,
  },

  textLabel: {
    fontSize: 15,
    marginTop: 15,
    marginBottom: 15,
  },
  registerText: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
  },

  dropShadow: {
    shadowColor: '#171717',
    // shadowOffset: {width: 0, height: 3},
    // shadowOpacity: 0.4,
    // shadowRadius: 2,
    elevation: 11,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.secondary,
    textAlignVertical: 'center',
    marginTop: 40,
    textAlign: 'center',
  },
});
export default styles;
