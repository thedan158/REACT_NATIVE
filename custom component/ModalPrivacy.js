import {
  StyleSheet,
  Text,
  View,
  Modal,
  Animated,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';

const ModalPrivacy = ({ visible, children }) => {
  const theme = useSelector((state) => state.themeReducer.theme);
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Modal transparent visible={showModal}>
        <View style={styles.modalBackground}>
          <Animated.View style={[{ transform: [{ scale: scaleValue }] }]}>
            <Container>
              <View style={{ marginBottom: '10%' }}>
                <Content>Policy and privacy</Content>
              </View>
              <ScrollView
                style={{
                  marginLeft: '5%',
                  height: '80%',
                  marginBottom: '7%',
                }}
              >
                <Content
                  style={{ fontSize: 14, fontWeight: '400', lineHeight: 18 }}
                >
                  Privacy Policy Software Animals built the Foody app as a Free
                  app. This SERVICE is provided by Software Animals at no cost
                  and is intended for use as is. This page is used to inform
                  visitors regarding my policies with the collection, use, and
                  disclosure of Personal Information if anyone decided to use my
                  Service. If you choose to use my Service, then you agree to
                  the collection and use of information in relation to this
                  policy. The Personal Information that I collect is used for
                  providing and improving the Service. I will not use or share
                  your information with anyone except as described in this
                  Privacy Policy. The terms used in this Privacy Policy have the
                  same meanings as in our Terms and Conditions, which are
                  accessible at Foody unless otherwise defined in this Privacy
                  Policy. Information Collection and Use For a better
                  experience, while using our Service, I may require you to
                  provide us with certain personally identifiable information,
                  including but not limited to images. The information that I
                  request will be retained on your device and is not collected
                  by me in any way. The app does use third-party services that
                  may collect information used to identify you. Link to the
                  privacy policy of third-party service providers used by the
                  app Google Play Services Google Analytics for Firebase
                  Firebase Crashlytics Expo Log Data I want to inform you that
                  whenever you use my Service, in a case of an error in the app
                  I collect data and information (through third-party products)
                  on your phone called Log Data. This Log Data may include
                  information such as your device Internet Protocol (“IP”)
                  address, device name, operating system version, the
                  configuration of the app when utilizing my Service, the time
                  and date of your use of the Service, and other statistics.
                  Cookies Cookies are files with a small amount of data that are
                  commonly used as anonymous unique identifiers. These are sent
                  to your browser from the websites that you visit and are
                  stored on your device's internal memory. This Service does not
                  use these “cookies” explicitly. However, the app may use
                  third-party code and libraries that use “cookies” to collect
                  information and improve their services. You have the option to
                  either accept or refuse these cookies and know when a cookie
                  is being sent to your device. If you choose to refuse our
                  cookies, you may not be able to use some portions of this
                  Service. Service Providers I may employ third-party companies
                  and individuals due to the following reasons: To facilitate
                  our Service; To provide the Service on our behalf; To perform
                  Service-related services; or To assist us in analyzing how our
                  Service is used. I want to inform users of this Service that
                  these third parties have access to their Personal Information.
                  The reason is to perform the tasks assigned to them on our
                  behalf. However, they are obligated not to disclose or use the
                  information for any other purpose. Security I value your trust
                  in providing us your Personal Information, thus we are
                  striving to use commercially acceptable means of protecting
                  it. But remember that no method of transmission over the
                  internet, or method of electronic storage is 100% secure and
                  reliable, and I cannot guarantee its absolute security. Links
                  to Other Sites This Service may contain links to other sites.
                  If you click on a third-party link, you will be directed to
                  that site. Note that these external sites are not operated by
                  me. Therefore, I strongly advise you to review the Privacy
                  Policy of these websites. I have no control over and assume no
                  responsibility for the content, privacy policies, or practices
                  of any third-party sites or services. Children’s Privacy These
                  Services do not address anyone under the age of 13. I do not
                  knowingly collect personally identifiable information from
                  children under 13 years of age. In the case I discover that a
                  child under 13 has provided me with personal information, I
                  immediately delete this from our servers. If you are a parent
                  or guardian and you are aware that your child has provided us
                  with personal information, please contact me so that I will be
                  able to do the necessary actions. Changes to This Privacy
                  Policy I may update our Privacy Policy from time to time.
                  Thus, you are advised to review this page periodically for any
                  changes. I will notify you of any changes by posting the new
                  Privacy Policy on this page. This policy is effective as of
                  2022-06-17 Contact Us If you have any questions or suggestions
                  about my Privacy Policy, do not hesitate to contact me at
                  thedan671@gmail.com.
                </Content>
              </ScrollView>

              <View
                style={{ flexDirection: 'row', justifyContent: 'flex-end' }}
              >
                {children}
              </View>
            </Container>
          </Animated.View>
        </View>
      </Modal>
    </ThemeProvider>
  );
};

const Container = styled.View`
  background-color: ${(props) => props.theme.PRIMARY_BUTTON_COLOR};
  padding-horizontal: 20px;
  padding-vertical: 20px;
  border-radius: 20px;
  elevation: 20;
  width: 90%;
  height: 90%;
`;
const Content = styled.Text`
  font-size: 20px;
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
  font-weight: bold;
`;
export default ModalPrivacy;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    height: '90%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
});
