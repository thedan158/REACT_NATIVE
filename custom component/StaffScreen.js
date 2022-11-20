import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  ImageBackground,
} from 'react-native';
import React, { Children } from 'react';
import back from '../assets/icons/back-orange.png';
import home from '../assets/icons/HomeOrange.png';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';
import background from '../assets/images/background.png';
import { useSelector, useDispatch } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CustomScreen = ({ icon, title, previousScreen, children }) => {
  const theme = useSelector((state) => state.setting.theme);
  const navigation = useNavigation();
  return (
    <ThemeProvider theme={theme}>
      <Container>
        {/* Header  */}
        <View style={styles.containerHeaderTop}>
          <TouchableOpacity
            style={{
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexDirection: 'row',
              marginLeft: 20,
            }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image
              source={back}
              style={{
                height: 20,

                width: 20,
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              width: '80%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image source={icon} style={styles.icon} />
            <View style={styles.containerTitleInfo}>
              <Text style={styles.txtHome}>{title}</Text>
            </View>
          </View>
        </View>

        {/* Order details  */}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 9.5,
          }}
        >
          {children}
        </View>
      </Container>
    </ThemeProvider>
  );
};

export default CustomScreen;
const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_COLOR};
  align-items: center;
  justify-content: center;
`;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: windowWidth,
    height: windowHeight,
    justifyContent: 'center',
  },
  containerHeaderTop: {
    flexDirection: 'row',
    marginTop: 20,
    width: windowWidth,
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 0.5,
  },
  icon: {
    height: 30,
    width: 30,
    top: 5,
  },
  containerTitleInfo: {
    marginTop: 10,
    maxWidth: '80%',

    alignItems: 'center',
    alignContent: 'center',
  },
  txtHome: {
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginHorizontal: 5,
  },
});
