import { Image, Text, View, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import logo from "../../../../assets/images/logo_app.png";
import InputText from "../../../../custom component/InputText";
import eye from "../../../../assets/icons/eye-green.png";
import hidden from "../../../../assets/icons/closed-eyes-green.png";
import Colors from "../../../../assets/Colors";
import OwnerScreen from "../../../../custom component/OwnerScreen";
import CustomModal from "../../../../custom component/CustomModal";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style";
import { getAPIActionJSON } from "../../../../api/ApiActions";

const ChangePassword = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [isSecureEntryConfirm, setIsSecureEntryConfirm] = useState(true);
  const [visible, setVisible] = React.useState(false);
  const theme = useSelector((state) => state.setting.theme);
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();
  // function close LoadingOwner and open CustomModal when timePassed is true

  const handleChangePassword = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Password not match");
      return;
    }
    dispatch(
      getAPIActionJSON(
        "changePassword",
        {
          username: username,
          oldPassword: oldPassword,
          newPassword: password,
          confirmPassword: confirmPassword,
        },
        null,
        "",
        (e) => handleResponse(e)
      )
    );
    const handleResponse = (res) => {
      if (!res.success) {
        Alert.alert(
          "Error",
          "Failed to changed password, please ensure your information is correct"
        );
        return;
      }
    };
    setVisible(true);
  };
  return (
    <ScrollView>
      <OwnerScreen>
        <View style={styles.container}>
          {/* Logo and title  */}
          <View style={styles.view1}>
            <View>
              <Image style={styles.logo} source={logo}></Image>
            </View>
            <View>
              <Text
                style={[
                  styles.textPleaseRegister,
                  { color: theme.PRIMARY_TEXT_COLOR },
                ]}
              >
                Reset new password
              </Text>
            </View>
          </View>

          {/* Input section  */}
          <View style={styles.view2}>
            <View>
              <InputText
                blurColor={Colors.secondary}
                label="Old Password"
                placeholder="Old Password"
                value={oldPassword}
                onChangeText={(text) => setOldPassword(text)}
                secureTextEntry={isSecureEntry}
                icon={
                  <TouchableOpacity
                    onPress={() => {
                      setIsSecureEntry((prev) => !prev);
                    }}
                  >
                    <Image
                      source={isSecureEntry ? hidden : eye}
                      style={{ width: 25, height: 25 }}
                    ></Image>
                  </TouchableOpacity>
                }
                iconPosition="right"
              />
              <InputText
                blurColor={Colors.secondary}
                label="Password"
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={isSecureEntry}
                icon={
                  <TouchableOpacity
                    onPress={() => {
                      setIsSecureEntry((prev) => !prev);
                    }}
                  >
                    <Image
                      source={isSecureEntry ? hidden : eye}
                      style={{ width: 25, height: 25 }}
                    ></Image>
                  </TouchableOpacity>
                }
                iconPosition="right"
              />
              <InputText
                blurColor={Colors.secondary}
                label="Confirm password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                secureTextEntry={isSecureEntryConfirm}
                icon={
                  <TouchableOpacity
                    onPress={() => {
                      setIsSecureEntryConfirm((prev) => !prev);
                    }}
                  >
                    <Image
                      source={isSecureEntryConfirm ? hidden : eye}
                      style={{ width: 25, height: 25 }}
                    ></Image>
                  </TouchableOpacity>
                }
                iconPosition="right"
              />
            </View>

            {/* Button reset password  */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handleChangePassword}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Modal  */}
          <CustomModal visible={visible}>
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../../../../assets/icons/password-green.png")}
                style={{ height: 150, width: 150, marginVertical: 30 }}
              />
            </View>

            <Text
              style={{ marginVertical: 30, fontSize: 20, textAlign: "center" }}
            >
              Your password has been reset successfully
            </Text>
            <TouchableOpacity
              onPress={() => {
                setVisible(false);
                navigation.goBack();
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </CustomModal>
        </View>
      </OwnerScreen>
    </ScrollView>
  );
};

export default ChangePassword;
