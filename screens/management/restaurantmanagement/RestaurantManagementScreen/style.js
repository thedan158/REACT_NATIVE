import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../../assets/Colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 60,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4FA987',
  },
  viewText: {
    height: 130,
    alignContent: 'center',
  },
});
export default styles;
