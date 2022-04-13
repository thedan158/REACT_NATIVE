import { StyleSheet, Dimensions, TouchableOpacity, ScrollView, Text, View, Image, LogBox, FlatList, ImageBackground } from 'react-native'
import React from 'react'


// TODO 1: FLATLIST in Flash Offer view 
// TODO 2: Image Tag in Dicount Offers with text

let DataBestSeller = [
  {
    id: 1,
    name: 'Beef Bacon',
    detail: 'Hooooooooolaaaaaaa',
    imgSource: require('../assets/images/BeefBaconMeal.png'),
    price: '$4.99'
  },
  {
    id: 2,
    name: 'Egg fried rice',
    detail: 'Hooooolyyyyyyyyy',
    imgSource: require('../assets/images/1512474034-837-bua-sang-chac-da-voi-com-chien-ca-hoi-mem-toi-bo-duong-_mg_8357-1512473926-width660height440.jpg'),
    price: '$4.99',
  },
  {
    id: 3,
    name: 'Basad saad',
    detail: 'Hooooolyyyyyyyyy',
    imgSource: require('../assets/images/1512474034-837-bua-sang-chac-da-voi-com-chien-ca-hoi-mem-toi-bo-duong-_mg_8357-1512473926-width660height440.jpg'),
    price: '$4.99',
  }

]

let DataDiscountOffer = [
  {
    id: 1,
    name: 'Suhani',
    type: 'Chinese, North India',
    price: 8.00,
    discount: 50,
    starReview: '4.5',
    detail: 'Hoooooolyyyyyyyyyyy ssssssssssssssss Vhkagasasddasfgdasfg husmg aadsgdan asjhga asghas',
    numDish: 145,
    imgSource: require('../assets/images/fried-rice-chicken-prepared-served-260nw-1043177890.png'),
  },
  {
    id: 2,
    name: 'Fried rice',
    type: 'VietNam, No1 on Earth server',
    price: 10.00,
    discount: 40,
    starReview: '5.0',
    detail: 'Hoooooolyyyyyyyyyyy ssssssssssssssss asdgfasbo adsgasjna',
    numDish: 100,
    imgSource: require('../assets/images/fried-rice-chicken-prepared-served-260nw-1043177890.png'),
  },
]

class FlatlistBestSellerItem extends React.Component{
  constructor(props){
    super(props)
  }

  render() {
    return(
      <View style={[styles.containerBestSellerItem]}>
          <Image 
                style={{height: 130, width: 145, }}
                resizeMode = 'contain'
                source={this.props.item.imgSource}/>
          <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 16, color: '#483332', marginVertical: 5,}}>{this.props.item.name}</Text>
          <Text style={{color: '#483332', fontSize: 10, alignSelf: 'center', marginBottom: 5,}}>{this.props.item.detail}</Text>
          <TouchableOpacity style={{height: 35, width: 129, borderRadius: 10, borderWidth: 0.5, backgroundColor: '#F8774A', alignSelf: 'center', padding: 5,}}>  
            <Text style={{alignSelf: 'center', alignItems: 'center', alignContent:'center', color: '#fff', fontSize: 15,}}>{this.props.item.price}</Text>
          </TouchableOpacity>

        </View>
    )
  }

}

class FlatlistDiscountOffer extends React.Component{
  constructor(props){
    super(props)
  }

  render() {
    return(
      // container discount view
      <View style={styles.containerDiscountOffersItem}>
      <View style={styles.containerDiscountOffersItemImg}>
        <ImageBackground resizeMode= "cover" resizeMethod='auto' style={{zIndex: 2, height: 141.1 ,overflow: 'hidden', width: 351.94, borderTopLeftRadius: 13.31, borderTopRightRadius: 13.31,}} source={this.props.item.imgSource}>
          <View style={{ marginLeft: 0, marginVertical: 10,}}>
            <Image style={{zIndex: 1, marginVertical: 5,}} source={require("../assets/icons/Tag.png")}/>
            <Image style={{zIndex: 1, marginVertical: 5,}} source={require("../assets/icons/Tag1.png")}/>
          </View>
        </ImageBackground>
      </View>
      
      {/* ----Info View---- */}
      <View style={styles.containerDiscountOffersItemInfo}>
        {/* Big Info View */}
        <View style={styles.containerDiscountOffersItemInfoBigInfo}> 
          <View>
            <Text style={{color: '#333333', fontSize: 18, fontWeight: 'bold', marginVertical: 2.5,}}>{this.props.item.name}</Text>
            <Text style={{fontSize: 14.64, marginTop: 0, marginBottom: 0, width: 150,}}>{this.props.item.type}</Text>
            <View style={{flexDirection: 'row', marginBottom: 0, marginTop: 0, justifyContent: 'space-around', paddingRight: 80, alignItems: 'flex-end'}}>
              <Text style={{textDecorationLine: 'line-through', fontSize: 12, marginLeft: -5,}}>${this.props.item.price}</Text>
              <Text style={{fontSize: 19, color: '#F88922'}}>${ this.props.item.price - (this.props.item.price * (this.props.item.discount / 100))}</Text>
            </View>
          </View>
          <View style={{justifyContent: 'space-around',}}>
            <View style={styles.boxStarReview}>
              <Text style={{color: '#fff', alignSelf: 'center', fontSize: 14, fontWeight: 'bold', marginLeft: 0, }}>{this.props.item.starReview}</Text>
              <Image style={{height:12, width:12, marginVertical: 6, marginRight: 0,}} source={require('../assets/icons/Star1.png')}/>
            </View>

            <View style={styles.boxCaloriesInfo}>
              <Image style={{alignSelf: 'center', }} source={require('../assets/icons/009-fire.png')}/>
              <Text style={{alignSelf: 'center', }}>{this.props.item.numDish}</Text>
            </View>
          </View>
        </View>
        {/* -------- Devide line -------- */}
        <View style={{width: 324.56, backgroundColor: '#EDEDED', height: 3, marginVertical: 2.5,}}></View>
        {/* Detail Info View */}
        <View style={styles.containerDiscountOffersItemInfoDetaiInfo}>
          <Text style={{fontSize: 11, marginTop: 0,}}>{this.props.item.detail}</Text>
        </View>
      </View>
    </View>

    )
  }

}

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
LogBox.ignoreLogs(['Remote debugger']);

const HomeScreen = () => {
  return (

    // ROOT container
    <ScrollView>
    <View style={styles.container}>

      {/* ======Header container====== */}
      <View style={styles.containerHeader}>
        <View style={[styles.containerHeaderTop, styles.elevation]}>
          <Image style={styles.imgHomeIc} source={{uri: 'https://icons-for-free.com/download-icon-HOME-131994911289288683_512.png'}}/>
          <View style={styles.containerHeaderText}>
            <Text style={styles.txtHeaderHome}>Home</Text>
            <Text style={{fontSize: 16,}}>21-42-34, Q1 Tp.HCM</Text>
          </View>
          
        </View>
          {/* ---Button edit--- */}
        <TouchableOpacity style={[styles.btnHeaderEdit, styles.elevation]}>
            <Text style={{fontSize: 18, color: '#fff', fontWeight: 'bold',}}>Edit</Text>
            <Image style={{ width: 18, height: 18, marginVertical: 2, marginHorizontal: 4, backgroundColor:'transparent'}} source={{uri: 'https://icon-library.com/images/pen-icon-png/pen-icon-png-5.jpg'}}></Image>
          </TouchableOpacity>

      </View>

      {/* =======Flash Offer container====== */}
      <View style={styles.containerFlashOffer}>
        {/* <<<<<<<<<<<<<<<-----------------FLATLIST View rework --------------->>>>>>>>>>>> */}
        <View style={styles.containerFlashOfferBanner}>
          <View style={{width: 90, margin: 5,}} >
            <Text style={{fontWeight: 'bold', fontSize: 16, color: '#AD3F32'}}>Flash  Offer</Text>
            <Text style={{color: '#000', fontSize: 8,}}>We are here with the hottest meals in town.</Text>
          </View>
          <Image style={{width: 218, height: 134, margin: 5,}} source={require('../assets/images/Meal.png')}/>
        </View>
        {/* <<<<<<<<<<<<<<<<--------------Index FlatList item dot ------------>>>>>>>>>> */}
        <View style={styles.containerFlashOfferBannerIndexDot}>

        </View>
      </View>
      {/* =======Best Seller container====== */}
      <View style={styles.containerBestSeller}>
          <Text style={{fontSize: 18, fontWeight: 'bold',}}>Best seller</Text>
        <FlatList
          style={{}}
          data={DataBestSeller}
          horizontal = {true}
          renderItem={({item, index}) => {
            return(
              <FlatlistBestSellerItem item={item} index={index}/>
            )
          }}
          keyExtractor={item => item.id}
        >

        </FlatList>
      </View>

      {/* =======Discount offer container====== */}
      <View style={[styles.containerDiscountOffers, styles.elevation]}>
        <Text style={{color: '#483332', fontSize: 18, fontWeight: 'bold', padding: 10}}>Discount Offers</Text>
        {/* ----Image View---- */}
        <FlatList 
          style={{}}
          data={DataDiscountOffer}
          horizontal= {true}
          renderItem={({item, index}) => {
            return(
              <FlatlistDiscountOffer item={item} index={index}/>
            )
          }}
          keyExtractor = {item => item.id}
          />
      </View>


      {/* =======Happy meal container====== */}
      <View style={styles.containerHappyMeal}>


      </View>
    
    </View>  
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container:{
    paddingVertical: 30,
    paddingHorizontal: 10,
  },
  containerHeader:{
    backgroundColor: 'transparent',
  },
  containerHeaderTop:{
    flexDirection:'row',
    alignContent: 'center',
  },
  containerFlashOffer:{

  },
  containerBestSeller:{
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  containerBestSellerItem:{
    height: 222,
    width: 148,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#808080',
    marginTop: 10,
    marginHorizontal: 5,
    elevation: 0,
  },
  containerDiscountOffersItem:{
    width: 352.96, 
    height: 269,
    borderRadius: 13.31,
    borderWidth: 1,
    zIndex: 2,
  
    marginLeft: 10,
  },
  containerDiscountOffersItemImg:{
    height: 141.1,
    width: 351.94,
    borderTopLeftRadius: 13.31,
    borderTopRightRadius: 13.31,
    marginBottom: 0,
  },
  containerDiscountOffersItemInfo:{
    alignSelf: 'center',
  },
  containerDiscountOffersItemInfoBigInfo:{
    flexDirection: 'row',
    marginLeft: 5,
    marginBottom: 0,
  },
  containerDiscountOffersItemInfoDetaiInfo:{
    alignSelf: 'center',
    justifyContent: 'flex-end'
  },
  containerFlashOfferBanner:{
    margin: 10,
    padding: 5,
    flexDirection: 'row',
    backgroundColor: '#E9B7B2',
    borderRadius: 10,
  },
  containerFlashOfferBannerIndexDot:{
    margin: 5,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#808080'
  },
  containerDiscountOffers:{
    
  },
  containerHappyMeal:{

  },
  containerHeaderText:{
    paddingVertical: 5,
  },
  imgHomeIc:{
    height: 60,
    width: 60,
  },
  txtHeaderHome:{
    fontWeight: 'bold',
    fontSize: 18,
  },
  btnHeaderEdit:{
    flexDirection: 'row',
    justifyContent: 'center',
    height: 42,
    width: 104,
    marginLeft: deviceWidth - 130,
    backgroundColor: '#F8774A',
    borderRadius: 25,
    alignContent: 'center',
    alignItems: 'center',
  },
  elevation: {
    elevation: 20,
    shadowOpacity: 1,
    shadowColor: '#000',
  },
  boxStarReview:{
    height: 24,
    width: 54.77,
    borderRadius: 24,
    opacity: 38.2,
    backgroundColor: '#509807',
    alignSelf: 'center',
    flexDirection: 'row',
    padding: 0,
    justifyContent: 'center',
    marginLeft: 110,
    marginBottom: 20,
  },
  boxCaloriesInfo:{
    height: 18,
    width: 56.8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: 100,
  },
})