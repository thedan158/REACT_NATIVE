import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
  Image,
  ScrollView,
} from "react-native";
import React, { useRef } from "react";
import { CustomCollapsible } from "../custom component/CustomCollapsible";
import Colors from "../assets/Colors";
import { useNavigation } from "@react-navigation/core";
import CustomModal from "../custom component/CustomModal";
import back from "../assets/icons/back-green.png";

const PermissionManager = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);
  const collapsible = useRef();
  const collapsible1 = useRef();
  const [isWaiter, setIsWaiter] = React.useState(false);
  const [isChef, setIsChef] = React.useState(false);
  const childtoParent = async(childData) => {
    setIsWaiter(childData);
    console.log('Waiter:'+childData);
  };
  const childtoParentChef = async(childData) => {
    setIsChef(childData);
    console.log('Chef:'+childData);
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      {/* Back button  */}
      <View>
        <TouchableOpacity
          style={{
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "row",
            marginLeft: 20,
            marginTop: 40,
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
      </View>
      {/* Title  */}
      <Text style={styles.modalTitle}>Permission Manager</Text>

      {/* Permission manager  */}
      <ScrollView style={styles.permission}>
        <CustomCollapsible
          title="Waiter"
          subTitle="This account is able to READ MENUS, MAKING ORDER, PAYMENT"
          childtoParent={childtoParent}
        />
        <CustomCollapsible
          title="Chef"
          subTitle="This account is able to READ MENUS, MAKING ORDER, PAYMENT, EDIT MENU"
          childtoParent={childtoParentChef}
        />
        {/* Button  */}
        <View style={{ marginTop: "10%" }}>
          <TouchableOpacity
            onPress={() => setVisible(true)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Finish</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal  */}
      <CustomModal visible={visible}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../assets/icons/check.png")}
            style={{ height: 150, width: 150, marginVertical: 30 }}
          />
        </View>

        <Text style={{ marginVertical: 30, fontSize: 20, textAlign: "center" }}>
          Congratulations registration was successful
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("TabForOwner");
            setVisible(false);
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>OK</Text>
        </TouchableOpacity>
      </CustomModal>
    </View>
  );
};

export default PermissionManager;

const styles = StyleSheet.create({
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.secondary,
    textAlignVertical: "center",
    marginTop: 40,
    textAlign: "center",
  },
  permission: {
    marginVertical: 40,
  },
  button: {
    backgroundColor: Colors.secondary,
    width: "80%",
    padding: 15,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 1,
    alignSelf: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  header: {
    width: "100%",
    height: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
