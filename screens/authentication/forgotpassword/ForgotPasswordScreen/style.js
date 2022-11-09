import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../../assets/Colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  },
  inputContainer: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },

  input: {
    // borderRadius: 10,
    // marginTop: 5,
    // alignSelf: 'center',
    // left: 20,

    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    left: 27,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
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

  view1: {
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
  },

  textView: {
    flex: 0.12,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },

  view2: {
    flex: 5,
    marginTop: 20,
  },
  view3: {
    flex: 2,
  },
  textLabel: {
    fontSize: 15,
    margin: 15,
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
});
export default styles;
