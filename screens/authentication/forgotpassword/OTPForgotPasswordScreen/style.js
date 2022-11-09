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

  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
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
    marginTop: 15,
  },
  newOwnerText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'normal',
  },

  view1: {
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 3,
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
    flex: 7,
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
  subtitle: {
    fontSize: 15,
    marginBottom: 15,
    textAlign: 'center',
    color: '#9B9B9B',
  },
  inputContainer: {
    width: 55,
    height: 55,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    borderWidth: 2,
  },
  numberInput: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
  otpView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 30,
  },
  subtitle2: {
    fontSize: 15,
    marginTop: 15,
    textAlign: 'center',
    color: '#9B9B9B',
  },
  countDown: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
export default styles;
