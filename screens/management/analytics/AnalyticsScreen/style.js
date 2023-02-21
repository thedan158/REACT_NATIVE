import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../../../assets/Colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  selectedMonth: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  chartContainer: {
    marginLeft: "2.5%",
    marginBottom: "10%",
    width: windowWidth * 0.95,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  title: {
    color: Colors.secondary,
    fontSize: 30,
    fontWeight: "bold",
  },
  titleValue: {
    color: Colors.primary,
    fontSize: 30,
    fontWeight: "bold",
  },
  headerText: {
    width: "90%",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: "5%",
    marginTop: "5%",
    flexDirection: "row",
  },
  headerValue: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "5%",
    marginTop: "5%",
    flexDirection: "row",
    marginBottom: "10%",
  },
});
export default styles;
