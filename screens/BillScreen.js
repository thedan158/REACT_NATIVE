import {
    StyleSheet,
    FlatList,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
  } from "react-native";
  import React, { Component } from "react";
  import ModalTableSelect from "../custom component/ModalTableSelect";
  
  const SearchIconResouce = require("../assets/icons/search.png");
  const FillterIconResouce = require("../assets/icons/fillter.png");
  
  const DataTable = [
    {
      id: 1,
      name: "Table 1",
      imgSourceSelected: require("../assets/icons/table ic.png"),
      imgSourceEmpty: require("../assets/icons/table gray ic.png"),
    },
    {
      id: 2,
      name: "Table 2",
      imgSourceSelected: require("../assets/icons/table ic.png"),
      imgSourceEmpty: require("../assets/icons/table gray ic.png"),
    },
    {
      id: 3,
      name: "Table 3",
      imgSourceSelected: require("../assets/icons/table ic.png"),
      imgSourceEmpty: require("../assets/icons/table gray ic.png"),
    },
    {
      id: 4,
      name: "Table 4",
      imgSourceSelected: require("../assets/icons/table ic.png"),
      imgSourceEmpty: require("../assets/icons/table gray ic.png"),
    },
    {
      id: 5,
      name: "Table 5",
      imgSourceSelected: require("../assets/icons/table ic.png"),
      imgSourceEmpty: require("../assets/icons/table gray ic.png"),
    },
    {
      id: 6,
      name: "Table 6",
      imgSourceSelected: require("../assets/icons/table ic.png"),
      imgSourceEmpty: require("../assets/icons/table gray ic.png"),
    },
    {
      id: 7,
      name: "Table 7",
      imgSourceSelected: require("../assets/icons/table ic.png"),
      imgSourceEmpty: require("../assets/icons/table gray ic.png"),
    },
    {
      id: 8,
      name: "Table 8",
      imgSourceSelected: require("../assets/icons/table ic.png"),
      imgSourceEmpty: require("../assets/icons/table gray ic.png"),
    },
  ];
  
  class FlatlistItem extends Component {
    render() {
      return (
        <View>
          <TouchableOpacity style={styles.flatlistitemStyle}>
            <View>
              <Image
                source={this.props.item.imgSourceEmpty}
                style={styles.imgItemFlatlist}
              />
              <Text style={styles.txtItemFlatlist}>{this.props.item.name}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }
  
  const BillScreen = () => {
    return (
      // Root View
      <ScrollView style={styles.container}>
        <View style={styles.containerTop}>
          <Text style={styles.txtHeaderView}>BiLL</Text>
          <View style={styles.containerTemp}>
            <View style={styles.containerSearchLayout}>
              <TouchableOpacity style={styles.btnSearch}>
                <Image source={SearchIconResouce} style={styles.imgIconSearch} />
              </TouchableOpacity>
              <TextInput
                style={styles.txtSearchBar}
                placeholder={"Search Table..."}
              />
            </View>
  
            <TouchableOpacity style={styles.btnImgFillter}>
              <Image source={FillterIconResouce} style={styles.imgIconFillter} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.containerBottom}>
          <FlatList
            data={DataTable}
            renderItem={({ item, index }) => {
              return <FlatlistItem item={item} index={index}></FlatlistItem>;
            }}
            keyExtractor={(item) => item.id}
            nestedScrollEnabled
            numColumns={2}
          />
        </View>
      </ScrollView>
    );
  };
  
  export default BillScreen;
  
  const styles = StyleSheet.create({
    container: {
      marginBottom: 55,
    },
    containerTop: {
      backgroundColor: "#FF4B3A",
      height: 180,
      flexDirection: "column",
      flex: 1,
      margin: 0,
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
    },
    containerBottom: {
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      borderColor: "#808080",
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
      marginTop: -50,
      paddingTop: 20,
      paddingLeft: 10,
    },
    txtSearchBar: {
      color: "#000",
    },
    txtHeaderView: {
      fontSize: 30,
      fontWeight: "bold",
      marginTop: -40,
      marginBottom: 10,
    },
    txtItemFlatlist: {
      color: "#A09A99",
      margin: 20,
    },
    containerTemp: {
      flexDirection: "row",
      marginBottom: 10,
    },
    containerSearchLayout: {
      width: 280,
      height: 50,
      borderRadius: 15,
      marginRight: 10,
      borderWidth: 1,
      borderColor: "#A09A99",
      backgroundColor: "#fff",
      flexDirection: "row",
      alignItems: "center",
      alignContent: "center",
      padding: 0,
    },
    imgIconSearch: {
      margin: 0,
      height: 16,
      width: 16,
    },
    imgIconFillter: {
      height: 50,
      width: 50,
      margin: 0,
    },
    imgItemFlatlist: {
      height: 70,
      width: 70,
      margin: 0,
    },
    btnSearch: {
      height: 20,
      width: 20,
      marginLeft: 20,
      marginRight: 10,
    },
    btnImgFillter: {
      height: 50,
      width: 50,
    },
    flatlistitemStyle: {
      height: 130,
      width: 130,
      borderRadius: 20,
      justifyContent: "center",
      borderColor: "grey",
      borderWidth: 2,
      alignItems: "center",
      marginRight: 20,
      marginVertical: 20,
      marginLeft: 10,
    },
  });
  