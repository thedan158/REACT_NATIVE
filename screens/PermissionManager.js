import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import { CustomCollapsible } from '../custom component/CustomCollapsible';
import Colors from '../assets/Colors';
import { useNavigation } from '@react-navigation/core';
import CustomModal from '../custom component/CustomModal';

const PermissionManager = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      {/* Title  */}
      <Text style={styles.modalTitle}>Permission Manager</Text>

      {/* Permission manager  */}
      <ScrollView style={styles.permission}>
        <CustomCollapsible title="Tanhao" subTitle="T" />
        <CustomCollapsible
          title="Tanhao"
          subTitle="This option will allow ... to ..... abcb xnxn x n
xz nx znx nx nz x bzm xnz bm xnbzm xnzmx nz x
zxn mbz nxm z nx mz  xz"
        />
        <CustomCollapsible
          title="Tanhao"
          subTitle="This option will allow ... to ..... abcb xnxn x n
xz nx znx nx nz x bzm xnz bm xnbzm xnzmx nz x
zxn mbz nxm z nx mz  xz"
        />

        {/* Button  */}
        <View style={{ marginTop: '10%' }}>
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
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../assets/icons/check.png')}
            style={{ height: 150, width: 150, marginVertical: 30 }}
          />
        </View>

        <Text style={{ marginVertical: 30, fontSize: 20, textAlign: 'center' }}>
          Congratulations registration was successful
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('TabForOwner');
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
    fontWeight: 'bold',
    color: Colors.secondary,
    textAlignVertical: 'center',
    marginTop: 80,
    textAlign: 'center',
  },
  permission: {
    marginVertical: 40,
  },
  button: {
    backgroundColor: Colors.secondary,
    width: '80%',
    padding: 15,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
