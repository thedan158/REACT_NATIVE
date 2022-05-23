import { StyleSheet, Text, View, Dimensions, ImageBackground, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import Colors from "../assets/Colors";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const imgTagSource = require('../assets/icons/Tag2.png');
const imgCloseSource = require('../assets/icons/close.png');
const imgBackgroundSource = require('../assets/images/background.png');
const maxWidthConst = windowWidth - 20;

const DATA = [
    {
        id: 1,
        nameDish: 'Pizza',
        NumberDish: 2,
        _NumberDish: '2',
        PriceDish: 3.0,
        _PriceDish: '3.0',
    },
    {
        id: 2,
        nameDish: 'Pizzaaaaa',
        NumberDish: 4,
        _NumberDish: '4',
        PriceDish: 3.5,
        _PriceDish: '3.55',
    },
    {
        id: 3,
        nameDish: 'Pizza',
        NumberDish: 1,
        _NumberDish: '1',
        PriceDish: 3.2,
        _PriceDish: '3.2',
    },
    
    
]

let _totalBill = 0;
function getTotalBill(DATAList) {
    for (let _item of DATAList) {
        let _subTotal = _item.PriceDish * _item.NumberDish;
        _totalBill += _subTotal;
    }
    return _totalBill;
}


const CheckOutTableScreen = ({ item, title, discount }) => {

    title = 'Table 1';
    item = DATA;
    discount = 50;
    let tempTotal = getTotalBill(DATA) * (discount / 100);
    let finalDiscount = discount.toString() + '%';

    const FlatlistItem = ({ itemChild }) => {
        return (
            <View style={styles.containerFlatListItemStyle}>
                <Text>{itemChild._NumberDish}</Text>
                <Text>{itemChild._nameDish}</Text>
    
            </View>
        );
    };

    function displayListItemBill(ListData) {
        ListData = DATA;
        return ListData.map((_itemListData) => {
            return(
                <View style={styles.containerItemMapList}>
                    <View style={styles.containerNumberDish}>
                        <Text style={styles.txtNumberDishItemMap}>{_itemListData.NumberDish}</Text>
                    </View>
                    <Text style={styles.txtNameDishItemMap}>{_itemListData.nameDish}</Text>
                    <Text style={styles.txtPriceDishItemMap}>${_itemListData.PriceDish}</Text>
                </View>
            );
        });
    
    }

    return (

        <View style={styles.container}>
            <ImageBackground
                source={imgBackgroundSource}
                style={styles.imgBackgroundSourceStyle}
            >
                <View style={styles.containerHeader}>
                    <ImageBackground
                        source={imgTagSource}
                        style={styles.imgTagSourceStyle}
                    >
                        <Text style={styles.txtTitle}>{title}</Text>
                    </ImageBackground>
                    <TouchableOpacity
                        style={styles.btnCloseScreen}
                    >
                        <Image
                            source={imgCloseSource}
                            style={styles.imgCloseSourceStyle}
                        >

                        </Image>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerFlatListStyle}>
                    
                    {/* <FlatList style={styles}
                        data={DATA}
                        renderItem= {({_itemFlatList, index}) =>{
                            return(
                                <FlatlistItem
                                    itemChild={_itemFlatList}
                                />
                            )
                        }}
                    /> */}
                    {displayListItemBill()}
                    

                </View>
                <View style={styles.DevideLineStyle}></View>
                <View style={styles.containerBottom}>
                    <View style={styles.containerDiscount}>
                        <Text style={styles.txtDiscount}>Discount</Text>
                        <Text style={styles.txtDiscountInfo}>{finalDiscount}</Text>
                    </View>
                    <View style={styles.containerTotals}>
                        <Text style={styles.txtTotal}>Total</Text>
                        <Text style={styles.txtTotalInfo}>${tempTotal}</Text>
                    </View>
                    <TouchableOpacity style={styles.btnCheckOutStyle}>
                        <Text style={styles.txtCheckOutStyle}>Checkout</Text>
                    </TouchableOpacity>
                </View>

            </ImageBackground>
        </View>
    )
}

export default CheckOutTableScreen

const styles = StyleSheet.create({
    container: {
        height: windowHeight,
        width: windowWidth,
        flex: 1,
        paddingTop: '6%',
    },
    containerHeader: {
        flex: 3,
        height: windowHeight - 200,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignContent: 'center',
        paddingLeft: '2%',
    },
    containerFlatListItemStyle: {
        flex: 1,
        paddingTop: '2%',
        flexDirection: 'row',
        width: windowWidth,
        paddingLeft: '5%',
    },
    containerTotals: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: '5%',
        paddingRight: '5%',
    },
    containerDiscount: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingTop: '2%',
    },
    containerItemMapList:{
        flexDirection: 'row',
        flex: 1,
        paddingTop: '2%',
    },
    containerNumberDish:{
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: Colors.primary,
        flex: 1.5,
        borderRadius: 15,
        width: '35%',
        height: '50%',
        marginRight: '10%',
    },
    containerFlatListStyle: {
        flex: 6,
        paddingHorizontal: '2%',
        marginTop: -150,
    },
    containerBottom: {
        flex: 2.5,
    },
    imgBackgroundSourceStyle: {
        flex: 1,
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
    },
    imgTagSourceStyle: {
        width: '100%',
        height: '60%',
        flex: 2.5,
        resizeMode: 'contain',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        paddingRight: '0%',
        marginRight: '0%',
    },
    imgCloseSourceStyle: {

    },
    btnCloseScreen: {
        paddingTop: '7%',
        flex: 0.5,
        marginLeft: '10%',
        paddingLeft: '10%',
    },
    btnCheckOutStyle: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        width: windowWidth - 50,
        alignSelf: 'center',
        marginBottom: '5%',
        backgroundColor: Colors.primary,
        borderRadius: 40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    txtTotal: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    txtDiscount: {
        fontSize: 15,

    },
    txtTotalInfo: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: '72%',
    },
    txtTitle: {
        flex: 1,
        marginRight: '0%',
        marginBottom: '0%',
        marginTop: '10%',
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    txtDiscountInfo: {
        marginLeft: '68%',
        fontSize: 18,
        fontWeight: 'bold',
    },
    txtCheckOutStyle: {
        color: Colors.gray,
        fontSize: 20,
        fontWeight: 'bold',

    },
    txtPriceDishItemMap:{
        flex: 1.5,
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: '5%',
        paddingTop: '2%',
    },
    txtNameDishItemMap:{
        flex: 4,
        paddingTop: '2%',
    },
    txtNumberDishItemMap:{
        paddingLeft: '5%',
        color: Colors.lightGray,
        alignSelf: 'center',
        fontSize: 18,
    },
    DevideLineStyle: {
        flex: 0.01,
        width: maxWidthConst,
        height: "0.1%",
        marginTop: "0%",
        marginBottom: "0%",
        backgroundColor: "#AFAFAF",
        alignSelf: "center",
    }
})
