import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import background from '../assets/images/background.png';
import * as ImagePicker from 'expo-image-picker';
import Colors from '../assets/Colors';
import back from '../assets/icons/back-green.png';
import CustomTextInput from '../custom component/CustomTextInput';
import { useNavigation } from '@react-navigation/core';
import del from '../assets/icons/delete.png';
import CustomModal from '../custom component/CustomModal';
import gallery from '../assets/icons/picture.png';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const EditMenuScreen = ({ route }) => {
  const { item } = route.params;
  const [priceDish, setPriceDish] = useState(item.price);
  const [nameDish, setNameDish] = useState(item.name);
  const [specialFeatures, setSpecialFeatures] = useState(item.votes);
  const [discount, setDiscount] = useState(item.price);
  const [image, setImage] = useState(item.imagePath);
  const [visible, setVisible] = useState(false);
  const [visibleDeleted, setVisibleDeleted] = useState(false);
  const navigation = useNavigation();
  useEffect(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Permission denied!');
    }
  }, []);

  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <ImageBackground
      source={background}
      resizeMode="cover"
      style={{
        flex: 1,
      }}
    >
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              width: windowWidth,
              alignItems: 'center',
              justifyContent: 'space-between',
              flex: 0.5,
            }}
          >
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
          </View>

          {/* Pick image  */}
          <View style={styles.view2}>
            <TouchableOpacity onPress={PickImage}>
              <View style={styles.pickLogo}>
                <ImageBackground
                  style={styles.ImageBackground}
                  imageStyle={{ borderRadius: 15 }}
                  source={gallery}
                />
                {image && (
                  <Image source={{ uri: image }} style={styles.pick}></Image>
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={PickImage} style={styles.button1}>
              <Text style={styles.buttonText}>Select Your Image</Text>
            </TouchableOpacity>
          </View>
          {/* Input section  */}
          <View style={styles.view3}>
            {/* Name dish input */}

            <CustomTextInput
              blurColor={Colors.secondary}
              value={nameDish}
              onChangeText={(text) => setNameDish(text)}
              placeholder="Name Dish"
            />

            {/* Features input */}

            <CustomTextInput
              blurColor={Colors.secondary}
              value={specialFeatures}
              onChangeText={(text) => setSpecialFeatures(text)}
              placeholder="Special Features"
            />

            {/* Price Dish */}

            <CustomTextInput
              blurColor={Colors.secondary}
              value={priceDish}
              onChangeText={(text) => setPriceDish(text)}
              placeholder="Price Dish"
              keyboardType="decimal-pad"
            />

            {/* Discount  */}
            <CustomTextInput
              blurColor={Colors.secondary}
              value={discount}
              onChangeText={(text) => setDiscount(text)}
              placeholder="Discount"
              keyboardType="decimal-pad"
            />
          </View>

          <View style={styles.view4}>
            {/* Button Delete */}
            <TouchableOpacity
              onPress={() => {
                setVisibleDeleted(true);
              }}
              style={styles.buttonDelete}
            >
              <Image
                source={del}
                style={{ height: 15, width: 15, marginHorizontal: 10 }}
              />
              <Text style={styles.buttonTextDelete}>Delete</Text>
            </TouchableOpacity>

            {/* Button Save */}
            <TouchableOpacity
              onPress={() => setVisible(true)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>SAVE</Text>
            </TouchableOpacity>
          </View>

          {/* Modal delete */}
          <CustomModal visible={visibleDeleted}>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../assets/icons/save-green.png')}
                style={{ height: 150, width: 150, marginVertical: 30 }}
              />
            </View>

            <Text
              style={{ marginVertical: 30, fontSize: 20, textAlign: 'center' }}
            >
              Deleted table successfully.
            </Text>
            <TouchableOpacity
              onPress={() => {
                setVisibleDeleted(false);
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </CustomModal>

          {/* Modal adding  */}
          <CustomModal visible={visible}>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../assets/icons/save-green.png')}
                style={{ height: 150, width: 150, marginVertical: 30 }}
              />
            </View>

            <Text
              style={{ marginVertical: 30, fontSize: 20, textAlign: 'center' }}
            >
              Adding table successfully.
            </Text>
            <TouchableOpacity
              onPress={() => {
                setVisible(false);
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </CustomModal>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default EditMenuScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  view3: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 5,
  },
  view4: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  ImageBackground: {
    height: 140,
    width: 140,
    alignSelf: 'center',
    position: 'absolute',
    alignSelf: 'center',
  },
  pick: {
    width: 140,
    height: 140,
    borderRadius: 15,
    borderColor: 'black',
    alignSelf: 'center',
  },
  containerHeaderTab: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  button1: {
    backgroundColor: Colors.secondary,
    width: '60%',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  button: {
    backgroundColor: Colors.secondary,
    width: '50%',
    padding: 15,
    borderRadius: 20,
    elevation: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonDelete: {
    backgroundColor: '#FFF0F3',
    width: '50%',
    padding: 15,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    alignSelf: 'center',
    margin: 5,
    flexDirection: 'row',
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  buttonTextDelete: {
    color: '#DA0000',
    fontWeight: '700',
    fontSize: 16,
  },
});
