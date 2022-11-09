import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../../assets/Colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    width: windowWidth,
    height: windowHeight,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#FA4A0C',
    width: '80%',
    padding: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  view1: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 3,
  },

  view2: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 5,
  },
  view3: {
    flex: 2,
  },

  textPleaseRegister: {
    position: 'relative',

    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  logo: {
    height: 160,
    width: 170,
    position: 'relative',

    marginTop: 25,
  },

  textView: {
    flex: 0.12,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },

  loginBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    top: 30,
    left: 10,
  },

  loginText: {
    color: '#FA4A0C',
    fontWeight: '700',
    fontSize: 16,
  },

  ownerText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'normal',
  },

  signupBox: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    right: 15,
  },

  rectangle: {
    width: 130,
    height: 3,
    backgroundColor: '#FA4A0C',
    position: 'relative',
    bottom: -9,
  },

  signupText: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  registerText: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
  },

  fullNameBox: {
    width: 300,
    height: 55,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 13,
  },

  fullNameText: {
    fontSize: 15,
    marginLeft: 30,
  },

  passwordBox: {
    width: 300,
    height: 55,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    marginTop: 25,
  },

  textSignupButton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
export default styles;
