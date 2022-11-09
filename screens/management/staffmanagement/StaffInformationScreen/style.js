import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../../assets/Colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  checkboxContainer: {
    width: '100%',
    justifyContent: 'center',

    height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    borderColor: Colors.secondary,
    borderWidth: 1,
  },

  checkboxContainer1: {
    width: '100%',
    justifyContent: 'center',

    height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginTop: 23,
    marginRight: 10,
  },
  svg: {
    height: '295%',
  },
  box: {
    backgroundColor: Colors.secondary,
    height: '10%',
  },
  header: {
    justifyContent: 'flex-start',

    position: 'absolute',
    height: '55%',
    width: '80%',
    alignSelf: 'center',

    top: '30%',
    borderRadius: 20,
    paddingTop: '5%',
    paddingLeft: '8%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  circle: {
    height: 120,
    width: 120,
    alignSelf: 'center',
    position: 'absolute',
    top: '5%',
  },
  avatar: {
    height: 120,
    width: 120,

    borderRadius: 120,
    alignSelf: 'center',
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  information: {
    marginTop: 10,
    fontSize: 17,
    marginLeft: 20,

    maxWidth: '85%',
  },

  buttonContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column-reverse',
    marginBottom: '5%',
    flex: 1,
  },
  button: {
    width: '50%',
    padding: 15,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    margin: 5,
    flexDirection: 'row',

    shadowColor: '#C9184A',

    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  button3: {
    backgroundColor: Colors.secondary,
    width: '50%',
    padding: 13,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    margin: 15,
    flexDirection: 'row',

    shadowColor: '#084625',

    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 16,
  },
  buttonText1: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  button1: {
    backgroundColor: '#767676',
    width: '48%',
    padding: 15,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    alignSelf: 'center',
  },
  button2: {
    backgroundColor: '#F44336',
    width: '48%',
    padding: 15,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    alignSelf: 'center',
  },
});
export default styles;
