import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../../assets/Colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    alignItems: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
  },
  button: {
    backgroundColor: Colors.secondary,
    width: '100%',
    padding: 15,
    borderRadius: 20,
    elevation: 1,
    alignItems: 'center',
  },
  button1: {
    backgroundColor: Colors.secondary,
    width: '60%',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },

  view2: {
    flex: 3,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  view3: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 5,
  },
  view4: {
    flex: 2,
    justifyContent: 'flex-start',
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
  },

  textView: {
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
    color: Colors.secondary,
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
    position: 'absolute',
    alignSelf: 'center',
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
    backgroundColor: Colors.secondary,
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

  gallery: {
    height: 65,
    width: 65,
    alignSelf: 'center',
  },

  textSignupButton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },

  pickLogo: {
    width: 140,
    height: 140,
    backgroundColor: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 10,
    borderStyle: 'dashed',
  },
  pick: {
    width: 140,
    height: 140,
    borderColor: 'black',
  },

  ImageBackground: {
    height: 50,
    width: 50,
    position: 'absolute',
    alignSelf: 'center',
  },
});
export default styles;
