import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Animated,
  FlatList,
} from 'react-native';
import React, { useRef } from 'react';
import Colors from '../assets/Colors';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
  VictoryPie,
} from 'victory-native';
import income from '../assets/icons/income.png';
import { useSelector } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';

const windowWidth = Dimensions.get('screen').width;

const data = [
  // { quarter: 'Jan', earnings: 30 },
  // { quarter: 'Feb', earnings: 10 },
  // { quarter: 'Mar', earnings: 15 },
  // { quarter: 'Apr', earnings: 20 },
  // { quarter: 'May', earnings: 22 },
  // { quarter: 'Jun', earnings: 33 },
  // { quarter: 'Jul', earnings: 24 },
  // { quarter: 'Aug', earnings: 17 },
  // { quarter: 'Sep', earnings: 15 },
  // { quarter: 'Oct', earnings: 13 },
  // { quarter: 'Nov', earnings: 19 },
  // { quarter: 'Dec', earnings: 16 },
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 20000 },
  { quarter: 5, earnings: 22000 },
  { quarter: 6, earnings: 33000 },
  { quarter: 7, earnings: 24000 },
];

const sex = [
  { id: 1, x: 'Men', y: 55 },
  { id: 2, x: 'Women', y: 45 },
];

const Analytics = () => {
  const categoryListHeightAnimationValue = useRef(
    new Animated.Value(115)
  ).current;

  const [showMoreToggle, setShowMoreToggle] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const theme = useSelector((state) => state.themeReducer.theme);

  function renderCategoryList() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        onPress={() => setSelectedCategory(item)}
        style={{
          flex: 1,
          flexDirection: 'row',
          margin: 5,
          paddingVertical: 10,
          paddingHorizontal: 12,
          borderRadius: 5,
          backgroundColor: 'white',
        }}
      >
        <Text style={{ marginLeft: 10 }}>{item.x}</Text>
        <Text style={{ marginLeft: 10 }}>{item.y}</Text>
      </TouchableOpacity>
    );

    return (
      <View>
        <Animated.View style={{ height: categoryListHeightAnimationValue }}>
          <FlatList
            data={sex}
            renderItem={renderItem}
            keyExtractor={(item) => `${item.id}`}
            numColumns={2}
          />
        </Animated.View>

        <TouchableOpacity
          style={{
            flexDirection: 'row',

            justifyContent: 'center',
          }}
          onPress={() => {
            if (showMoreToggle) {
              Animated.timing(categoryListHeightAnimationValue, {
                toValue: 115,
                duration: 500,
                useNativeDriver: false,
              }).start();
            } else {
              Animated.timing(categoryListHeightAnimationValue, {
                toValue: 172.5,
                duration: 500,
                useNativeDriver: false,
              }).start();
            }

            setShowMoreToggle(!showMoreToggle);
          }}
        >
          <Text>{showMoreToggle ? 'LESS' : 'MORE'}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <ScrollView
        style={[
          styles.container,
          { backgroundColor: theme.PRIMARY_BACKGROUND_COLOR },
        ]}
      >
        <View style={styles.headerText}>
          <Image
            source={income}
            style={{ height: 30, width: 30, marginHorizontal: 10 }}
          />
          <Text style={styles.title}>Incomes</Text>
        </View>
        <View
          style={[
            styles.chartContainer,
            { backgroundColor: theme.PRIMARY_BUTTON_COLOR },
          ]}
        >
          <VictoryChart
            // domainPadding will add space to each side of VictoryBar to
            // prevent it from overlapping the axis
            domainPadding={0}
            width={windowWidth * 1.04}
          >
            <VictoryAxis
              // tickValues specifies both the number of ticks and where
              // they are placed on the axis
              style={{
                tickLabels: {
                  fill: theme.PRIMARY_TEXT_COLOR,
                },
              }}
              tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
              tickFormat={[
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ]}
            />
            <VictoryAxis
              dependentAxis
              // tickFormat specifies how ticks should be displayed
              tickFormat={(x) => `$${x / 1000}k`}
              // color of axis values
              style={{
                tickLabels: {
                  fill: theme.PRIMARY_TEXT_COLOR,
                },
              }}
            />
            <VictoryBar
              data={data}
              x="quarter"
              y="earnings"
              style={{
                data: {
                  fill: ({ datum }) =>
                    datum.quarter % 2 === 0 ? Colors.secondary : '#036666',
                },
              }}
              animate={{ duration: 1000, onLoad: { duration: 500 } }}
              barWidth={16}
              alignment="start"
            />
          </VictoryChart>
        </View>

        {/* <View style={styles.chartContainer}>
        <VictoryPie
          startAngle={120}
          endAngle={480}
          radius={110}
          theme={VictoryTheme.material}
          colorScale={[Colors.secondary, '#036666']}
          // labels={({ datum }) => `y: ${datum.y}`}
          data={sex}
          events={[
            {
              target: 'data',
              eventHandlers: {
                onPressIn: () => {
                  return [
                    {
                      target: 'data',
                      mutation: ({ style }) => {
                        return style.fill === '#c43a31'
                          ? null
                          : { style: { fill: '#c43a31' } };
                      },
                    },
                    {
                      target: 'labels',
                      mutation: ({ props }) => {
                        let name = sex[props.index].x
                        
                      },
                    },
                  ];
                },
              },
            },
          ]}
        />
      </View>

      <View>{renderCategoryList()}</View> */}
      </ScrollView>
    </ThemeProvider>
  );
};

export default Analytics;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    flex: 1,
  },
  chartContainer: {
    marginLeft: '2.5%',
    marginTop: '10%',
    marginBottom: '10%',
    height: 300,
    width: windowWidth * 0.95,

    justifyContent: 'center',
    borderRadius: 10,

    shadowColor: '#000',
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
    fontWeight: 'bold',
  },
  headerText: {
    width: '90%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: '5%',
    marginTop: '5%',
    flexDirection: 'row',
  },
});
