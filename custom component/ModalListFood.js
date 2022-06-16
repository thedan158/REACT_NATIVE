import {
  StyleSheet,
  Text,
  View,
  Modal,
  Animated,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import ListFood from '../screens/ListFood';

const CustomModal = ({ visible, children }) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setShowModal(false);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackground}>
        <ListFood />
        {/* a button close to the bottom of the screen  */}

        <Animated.View>{children}</Animated.View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalContainer: {
    backgroundColor: 'white',
  },
});
