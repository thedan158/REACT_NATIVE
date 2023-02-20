import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import InputText from '../../../../custom component/InputText';
import eye from '../../../../assets/icons/eye-green.png';
import hidden from '../../../../assets/icons/closed-eyes-green.png';
import Colors from '../../../../assets/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import back from '../../../../assets/icons/back-green.png';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import styles from './style';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const CreateStaffAccount = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const navigation = useNavigation();
  const theme = useSelector((state) => state.setting.theme);

  const handleCreateAccount = async () => {
    if (username === '' || password === '') {
      Alert.alert('Warning', 'Please fill all field');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Warning', 'Password must be at least 6 characters');
      return;
    }
    const data = {
      username: username,
      password: password,
    };
    await AsyncStorage.setItem('staffInfo', JSON.stringify(data));
    navigation.navigate('PermissionManager', {
      username: username,
      password: password,
    });
  };
  return (
    <ThemeProvider theme={theme}>
      <ScrollView style={{ backgroundColor: theme.PRIMARY_BACKGROUND_COLOR }}>
        {/* Back button  */}
        <View>
          <TouchableOpacity
            style={{
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexDirection: 'row',
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

        {/* Title */}
        <Text style={styles.modalTitle}>Create your staff account</Text>

        {/* Input section */}
        <View
          style={{
            marginTop: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <InputText
            label="Username"
            placeholder="Username"
            blurColor={Colors.secondary}
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          <InputText
            label="Password"
            placeholder="Password"
            value={password}
            blurColor={Colors.secondary}
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
                />
              </TouchableOpacity>
            }
            iconPosition="right"
          />

          {/* Button section  */}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleCreateAccount} style={styles.button}>
            <Text style={styles.buttonText}>Create</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemeProvider>
  );
};

export default CreateStaffAccount;
