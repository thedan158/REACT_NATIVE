import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../assets/Colors";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const maxWidth40 = windowWidth - 40;
const imgSearchSource = require("../assets/icons/search.png");

const Button2Screen = () => {
  return (
    <KeyboardAwareScrollView 
        style={{flex: 1}}

    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <LinearGradient
          style={styles.container}
          colors={[Colors.FrenchRaspberry, Colors.ParadisePink]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={styles.containerHeaderSearch}>
            <View style={styles.containerSearchingSection}>
              <TouchableOpacity style={styles.btnSearch}>
                <Image style={styles.imgSearch} source={imgSearchSource} />
              </TouchableOpacity>
              <TextInput
                placeholder="Search..."
                style={styles.txtInputSearch}
              />
            </View>
          </View>
          <View style={styles.containerInfoItem}></View>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

export default Button2Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    paddingTop: "8%",
  },
  containerHeaderSearch: {
    flex: 1,
    flexDirection: "row",
    maxWidth: maxWidth40,
    justifyContent: "center",
    alignContent: "center",
  },
  containerInfoItem: {
    flex: 9,
  },
  containerSearchingSection: {
    flex: 4,
    flexDirection: "row",
    maxWidth: "90%",
    borderRadius: 40,
    alignSelf: "center",
    backgroundColor: Colors.lightGray,
    height: "50%",
    justifyContent: "center",
  },
  imgSearch: {
    width: "50%",
    height: "50%",
    flex: 1,
    alignSelf: "center",
    resizeMode: "contain",
  },
  btnSearch: {
    flex: 1,
    width: "50%",
    height: "50%",
    alignSelf: "center",
    right: "230%",
    marginRight: "3%",
  },
  txtInputSearch: {
    right: "500%",
  },
});
