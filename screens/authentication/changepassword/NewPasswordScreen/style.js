import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../../assets/Colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  },
  inputContainer: {
    width: 300,
    height: 55,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 13,
  },

  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#FA4A0C',
    width: '100%',
    padding: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#FA4A0C',
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
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textPleaseRegister: {
    position: 'relative',
    top: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },

  logo: {
    height: 160,
    width: 170,
    position: 'relative',
    top: 5,
    marginTop: 25,
  },

  textView: {
    flex: 0.12,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },

  view2: {
    flex: 0.9,
    marginTop: 20,
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
  forgotPassword: {
    color: '#FA4A0C',
    fontWeight: '700',
    fontSize: 16,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 15,
    textAlign: 'center',
    color: '#9B9B9B',
  },
});
export default styles;
