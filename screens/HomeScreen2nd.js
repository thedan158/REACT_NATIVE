import { StyleSheet, Dimensions, Text, View, Image, TouchableOpacity, ImageBackground, LogBox } from 'react-native'
import React from 'react'
import {LinearGradient} from 'expo-linear-gradient'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeScreen2nd = () => {
  LogBox.ignoreAllLogs();
  return (
    <View style={styles.container}>
      {/* ======Header container====== */}
      <View style={[styles.containerHeaderTop]}>
          <Image style={styles.imgHomeIc} source={{uri: 'https://icons-for-free.com/download-icon-HOME-131994911289288683_512.png'}}/>
          <View style={styles.containerHeaderText}>
            <Text style={styles.txtHeaderHome}>Home</Text>
            <Text style={{fontSize: 16,}}>21-42-34, Q1 Tp.HCM....</Text>
          </View>
          <Image style={styles.imgUserIc} source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'}}/>
        </View>

        {/* View  Info Section */}

        <View style={styles.containerInfoView}>
          <View>
            {/* Button open Menu */}
            <TouchableOpacity style={styles.btnMenuOpen}>
              <LinearGradient 
              colors={['#ff1b31', '#fb8b1d']}
              start={{x: 0, y: 0}} 
              end={{x: 1, y: 0}}
              style={styles.btnMenuOpen}>
                <View style={styles.containerMenuInfo}>
                  <View style={{flex: 2, paddingHorizontal: 5, marginTop: 10,}}>
                    {/* Header Tag Info View */}
                    <View style={styles.containerHeaderInfoTxt}>
                      <Text style={{color: '#FFF', fontSize: 30, marginRight: 5, fontWeight: 'bold'}}>MENU</Text>
                      <View style={{alignContent:'center', justifyContent: 'center', alignSelf: 'center', marginBottom: 5,}}>
                        <Text style={{color: '#fff', fontSize: 20, marginBottom: -2,}}>OF</Text>
                        <Text style={{color: '#fff', marginVertical: -7, fontSize: 12,}}>THE</Text>

                      </View>
                      <Text style={{color: '#fff', fontSize: 30, marginLeft: 5, fontWeight: 'bold'}}>DAY</Text>
                    </View>
                    {/* Detail info for Menu Section */}
                      <View style={styles.containerHeaderDetailMenuInfoTxt}>
                        <Text style={{color: '#fff', fontSize: 15, fontWeight: 'bold'}}>100% FRESH FOOD</Text>
                        <Text style={{color: '#fff'}}>so you can order in a smile</Text>
                      </View>
                      <Image 
                      source={{uri: 'https://www.pngall.com/wp-content/uploads/2/Meal-PNG-Pic.png'}}
                      style={{width: 70, height: 70, right: 0, left: 120, bottom: 20,
                        shadowColor: "#000",
                      shadowOffset: {
                      width: 0,
                      height: 2,
                      },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                  
                    elevation: 5,}}/>
                    <View>

                    </View>
                    <Image />
                  </View>
                  <View style={{flex:1.5, marginLeft: 5, backgroundColor: 'transparent', marginTop: 15, borderBottomRightRadius: 15,}}>
                    <ImageBackground source={{uri: 'https://www.pngall.com/wp-content/uploads/2/Meal-PNG-Pic.png'}} style={{height: 170, width: 170, flex: 1, marginRight: 0,}} resizeMode='contain'/>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          {/* Button open Sale off and New Dish */}
          <View style={styles.containerInfoView2nd}>

            {/* Sale off Button section */}
            <View style={{}}>
              <TouchableOpacity style={styles.btnSaleOffOpen}>
                <LinearGradient 
                colors={['#cb264a', '#f12f5e']}
                start={{x: 0, y: 0}} 
                end={{x: 1, y: 0}}
                style={styles.btnSaleOffOpen}
                >
                  <View style={styles.ContainnerTextSaleOff}>
                    <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>LARGE DISCOUNT</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{color: '#fff', }}>Upto </Text>
                      <Text style={{color: '#fee38d', fontWeight: 'bold', fontSize: 15, textDecorationLine: 'underline'}}>50% OFF</Text>
                    </View>
                    <Text style={{color: '#fff', fontSize: 17, fontWeight: 'bold',}}>No upper limit!!!</Text>
                  </View>
                  <Image source={{uri: 'https://freepikpsd.com/file/2019/11/food-dishes-png-7-Transparent-Images.png'}}
                        style={styles.imgSaleOff}/>
                </LinearGradient>

              </TouchableOpacity>
            </View>

            {/* Try new Dish Button section */}
            <View style={{}}>
              <TouchableOpacity style={styles.btnTryNewDishOpen}>
                  <LinearGradient
                  colors={['#e01d89', '#fc69cd']}
                  style={styles.btnTryNewDishOpen}
                  start={{x: 0, y: 0}} 
                  end={{x: 1, y: 0}}
                  >
                    <View style={styles.ContainnerTextSaleOff}>
                      <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>TRY NEW</Text>
                      <Text style={{color: '#fff', }}>Explore unique tastes from new easteries</Text>
                    </View>
                    <Image source={{uri: 'https://freepikpsd.com/file/2019/11/food-dishes-png-7-Transparent-Images.png'}}
                        style={styles.imgTryNew}/>
                  </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* Devide line */}
        <View style={styles.view3}>
        <View style={styles.containerLineDevide}>               
        </View>
        <View>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Exclusively on Swiggy</Text>
            <Text>Deal-icious offers from top voucher!</Text>
          </View>
        </View>
        {/* Container bottom */}
        <View style={styles.containerBottom}>
          {/* Header bottom Info */}
          
          
          <TouchableOpacity style={styles.btnExclusivelyDeal}>
            <LinearGradient
              colors={['#FB6A70', '#FCA384']}
              start={{x: 0, y: 0}} 
              end={{x: 1, y: 0}}
              style={styles.linearExclusivelyDeal}
            >
              <View style={styles.containerBottomSection}>
                {/* Info Section */}
              <View style={{flex: 1, paddingLeft: 10, paddingTop: 10,}}>
                <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold',}}>Rescued Food</Text>
                <Text style={{color: '#fff', marginTop: -8,}}>Saving food and hunger.  {'\n'}</Text>
                <Text style={{color: '#fff'}}>Left over food and supplies are gathered from food venders and chefs  {'\n'}</Text>
                <Text style={{color: '#fff'}}>Grab them now! </Text>
              </View>
              {/* Image Section */}
              <View style={{flex: 1,}}>
                <Image source={require('../assets/images/Artboard1.png')} style={styles.imgExclusiveSale}/>        
              </View>        
              </View>
            </LinearGradient>
          </TouchableOpacity>
          </View>
    </View>
  )
}

export default HomeScreen2nd

const styles = StyleSheet.create({
  container:{
    paddingTop: 30,
    paddingHorizontal: 10,
    marginBottom: 50,
    flex: 1,
    height:windowHeight
  },
  containerHeaderTop:{
    flexDirection:'row',
    alignContent: 'center',
    flex: 2,
  },
  containerInfoView:{
    alignSelf: 'center',
    justifyContent:"center",
    width: windowWidth,
    flex: 4,
  },
  view3:
  {
    flex:1, 
    justifyContent:'center'
  },
  containerBottom:{
    width: windowWidth,
    marginTop: 0,
    paddingLeft: 10,
    flex: 3,
  },
  containerBottomSection:{
    flexDirection: 'row'
  },
  containerHeaderInfoTxt:{
    flexDirection: 'row',
    paddingLeft: 20,
    paddingTop: 15,
    paddingBottom: 0,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  containerMenuInfo:{
    flexDirection: 'row',
    flex: 1,
  },
  ContainnerTextSaleOff:{
    marginLeft: 10,
    marginTop: 20,
  },
  containerInfoView2nd:{
    flexDirection: 'row', 
    width: windowWidth - 30, 
    backgroundColor: 'transparent', 
    justifyContent:'space-around',
    
  },
  containerHeaderDetailMenuInfoTxt:{
    paddingLeft: 10,
    width: 150
  },
  imgHomeIc:{
    height: 60,
    width: 60,
  },
  txtHeaderHome:{
    fontWeight: 'bold',
    fontSize: 18,
  },
  containerHeaderText:{
    paddingVertical: 5,
    flexWrap:"wrap",
    width: 150,
  },
  containerLineDevide:{
    marginLeft: 10,
    // marginTop: 30,
    marginBottom: 10,
    width: windowWidth - 40,
    height: 2,
    backgroundColor: '#AFAFAF',
    
  },
  imgUserIc:{
    width: 50,
    height: 50,
    borderRadius: 45, 
    left:80, 
    marginTop: 5,
    shadowColor: "#000",
    
  },
  imgExclusiveSale:{
    height: 150,
    width: 150,
    top: 50,
  },
  imgSaleOff:{
    height: 100,
    width: 100,
    left: 50,
    top: 0,
    shadowColor: "#000",
    shadowOffset: {
	  width: 0,
	  height: 2,
    },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,

  },
  imgTryNew:{
    height: 100,
    width: 100,
    left: 50,
    top: 20,
    shadowColor: "#000",
    shadowOffset: {
	  width: 0,
	  height: 2,
    },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
  },
  btnMenuOpen:{
    width: windowWidth - 30,
    height: 160,
    borderRadius: 15,
    alignSelf: 'center',
    shadowColor: "#f66166",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    
    elevation: 7,
  },
  btnExclusivelyDeal:{
    width: windowWidth - 40,
    height: 190,
    marginTop: 10,
    borderRadius: 15,
    shadowColor: "#fb6c74",
    shadowOffset: {
	width: 0,
	height: 3,
  },
  shadowOpacity: 0.29,
  shadowRadius: 4.65,

  elevation: 7,
  },
  linearExclusivelyDeal:{
    width: windowWidth - 40,
    height: 190,
    marginTop: 10,
    borderRadius: 15,
    
  },
  btnSaleOffOpen:{
    height: 160,
    width: 160,
    borderRadius: 15,
    marginLeft: 10,
    marginTop: 10,
    shadowColor: "#f981a1",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    
    elevation: 7,
  },
  btnTryNewDishOpen:{
    height: 160,
    width: 160,
    borderRadius: 15,
    marginTop: 10,
    marginLeft: 10,
    shadowColor: "#f8bcd5",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    
    elevation: 7,
  },
})