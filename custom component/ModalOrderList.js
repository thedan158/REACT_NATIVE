import {
  StyleSheet,
  Text,
  View,
  Modal,
  Animated,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import Colors from '../assets/Colors';
import close from '../assets/icons/close_orange.png';
import { StatusBar } from 'expo-status-bar';

const ModalPrivacy = ({ visible, children }) => {
  const theme = useSelector((state) => state.setting.theme);
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
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Modal transparent visible={showModal}>
        <View style={styles.modalBackground}>
          <Animated.View style={[{ transform: [{ scale: scaleValue }] }]}>
            <Container>{children}</Container>
          </Animated.View>
        </View>
      </Modal>
    </ThemeProvider>
  );
};

const Container = styled.View`
  background-color: ${(props) => props.theme.PRIMARY_BUTTON_COLOR};
  padding-horizontal: 20px;
  padding-vertical: 30px;
  border-radius: 20px;
  elevation: 20;
  width: 94%;
  height: 94%;
  margin-left: 3%;
  margin-top: 5%;
`;
const Content = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
  font-weight: bold;
`;
export default ModalPrivacy;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : '5%',
  },
});
