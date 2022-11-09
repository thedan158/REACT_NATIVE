import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  FlatList,
  SectionList,
} from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import UnreadNotification from '../../custom component/UnreadNotification';
import ReadNotification from '../../custom component/ReadNotification';

const windowsWidth = Dimensions.get('window').width;
const windowsHeight = Dimensions.get('window').height;
const NotificationScreen = () => {
  const theme = useSelector((state) => state.themeReducer.theme);
  // list notifications here
  const notifications = [
    {
      date: 'Today',
      data: [
        {
          id: 1,
          tableName: 'TABLE 1',
          time: '04:27 PM',
          details: 'The food is ready and you can take it for customer',
          isRead: false,
        },
        {
          id: 2,
          tableName: 'TABLE 2',
          time: '05:58 PM',
          details: 'The food is ready and you can take it for customer',
          isRead: false,
        },
      ],
    },
    {
      date: 'July 21, 2022',
      data: [
        {
          id: 3,
          tableName: 'TABLE 3',
          time: '07:09 PM',
          details: 'The food is ready and you can take it for customer',
          isRead: false,
        },
        {
          id: 4,
          tableName: 'TABLE 4',
          time: '07:18 PM',
          details: 'The food is ready and you can take it for customer',
          isRead: true,
        },
        {
          id: 5,
          tableName: 'TABLE 5',
          time: '08:44 PM',
          details: 'The food is ready and you can take it for customer',
          isRead: true,
        },
        {
          id: 6,
          tableName: 'TABLE 6',
          time: '08:52 PM',
          details: 'The food is ready and you can take it for customer',
          isRead: false,
        },
        {
          id: 7,
          tableName: 'TABLE 7',
          time: '09:33 PM',
          details: 'The food is ready and you can take it for customer',
          isRead: false,
        },
      ],
    },
  ];

  // flatlist notification here
  const renderItem = ({ item }) => {
    if (item.isRead) {
      return (
        <ScrollView>
          <ReadNotification item={item} />
        </ScrollView>
      );
    } else {
      return (
        <ScrollView>
          <UnreadNotification item={item} />
        </ScrollView>
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <View style={styles.containerHeader}>
          <Content style={styles.textHeader}>Notifications</Content>
        </View>
        <ScrollView style={styles.notifications}>
          <SectionList
            sections={notifications}
            renderItem={renderItem}
            renderSectionHeader={({ section: { date } }) => (
              <View style={styles.date}>
                <Content style={styles.dateText}>{date}</Content>
              </View>
            )}
            keyExtractor={(item, index) => item + index}
          />
        </ScrollView>
      </Container>
    </ThemeProvider>
  );
};

const Content = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.PRIMARY_TEXT_COLOR};
  font-weight: bold;
`;

const Container = styled.View`
  width: ${windowsWidth}px;
  height: ${windowsHeight}px;
  background-color: ${(props) => props.theme.PRIMARY_BACKGROUND_COLOR};
  flex: 1;
  padding-top: 3%;
`;
export default NotificationScreen;

const styles = StyleSheet.create({
  dateText: {},
  date: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '3%',
    marginTop: '7%',
  },
  containerHeader: {
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '5%',
    marginLeft: '5%',
  },
  textHeader: {
    fontWeight: 'bold',
    fontSize: 25,
    alignSelf: 'center',
  },
  notifications: {
    marginBottom: '15%',
  },
  container: {
    flex: 1,
    width: windowsWidth,
    height: windowsHeight,
    backgroundColor: 'white',
  },
});
