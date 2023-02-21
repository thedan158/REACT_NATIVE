import { Text, View, Image, Dimensions, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import Colors from "../../../../assets/Colors";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory-native";
import income from "../../../../assets/icons/income.png";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import styles from "./style";
import { getAPIActionJSON } from "../../../../api/ApiActions";
import { useEffect } from "react";
import { useState } from "react";

const windowWidth = Dimensions.get("screen").width;
const months = [
  { lable: "January", value: 1 },
  { lable: "February", value: 2 },
  { lable: "March", value: 3 },
  { lable: "April", value: 4 },
  { lable: "May", value: 5 },
  { lable: "June", value: 6 },
  { lable: "July", value: 7 },
  { lable: "August", value: 8 },
  { lable: "September", value: 9 },
  { lable: "October", value: 10 },
  { lable: "November", value: 11 },
  { lable: "December", value: 12 },
];
const Analytics = () => {
  const dispatch = useDispatch();
  const restaurantID = useSelector((state) => state.user.restaurantID);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [data, setData] = useState([
    { quarter: 1, earnings: 0 },
    { quarter: 2, earnings: 0 },
    { quarter: 3, earnings: 0 },
    { quarter: 4, earnings: 0 },
    { quarter: 5, earnings: 0 },
    { quarter: 6, earnings: 0 },
    { quarter: 7, earnings: 0 },
    { quarter: 8, earnings: 0 },
    { quarter: 9, earnings: 0 },
    { quarter: 10, earnings: 0 },
    { quarter: 11, earnings: 0 },
    { quarter: 12, earnings: 0 },
  ]);
  const onValueChange = (month) => {
    setSelectedMonth(month);
    console.log(month);
  };
  const calculateMonthlyIncome = (month, index) => {
    if (!month) return { quarter: index, earnings: 0 };
    var total = 0;
    month.map((order) => {
      total = total + order.totalPrice;
    });
    return { quarter: index, earnings: total };
  };
  const theme = useSelector((state) => state.setting.theme);
  const handleResponse = (response) => {
    if (!response.success) {
      Alert.alert(response.message);
      return;
    }
    var newData = [];
    newData.push(calculateMonthlyIncome(response.data.jan, 1));
    newData.push(calculateMonthlyIncome(response.data.feb, 2));
    newData.push(calculateMonthlyIncome(response.data.mar, 3));
    newData.push(calculateMonthlyIncome(response.data.apr, 4));
    newData.push(calculateMonthlyIncome(response.data.may, 5));
    newData.push(calculateMonthlyIncome(response.data.jun, 6));
    newData.push(calculateMonthlyIncome(response.data.july, 7));
    newData.push(calculateMonthlyIncome(response.data.aug, 8));
    newData.push(calculateMonthlyIncome(response.data.sep, 9));
    newData.push(calculateMonthlyIncome(response.data.oct, 10));
    newData.push(calculateMonthlyIncome(response.data.nov, 11));
    newData.push(calculateMonthlyIncome(response.data.dec, 12));
    setData(newData);
  };
  const getData = () => {
    dispatch(
      getAPIActionJSON("getAllOrder", null, null, `/${restaurantID}`, (e) =>
        handleResponse(e)
      )
    );
  };
  const getThisMonthIncome = () => {
    if (!data[selectedMonth - 1]) return "$ 0";
    return "$ " + data[selectedMonth - 1]?.earnings;
  };
  const getAllTimeIncome = () => {
    var allTimeIncome = 0;
    data.map((item) => {
      allTimeIncome = allTimeIncome + item.earnings;
    });
    return "$ " + allTimeIncome;
  };
  useEffect(() => {
    getData();
  }, []);
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
          <VictoryChart domainPadding={0} width={windowWidth * 1.04}>
            <VictoryAxis
              style={{
                tickLabels: {
                  fill: theme.PRIMARY_TEXT_COLOR,
                },
              }}
              tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
              tickFormat={[
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ]}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={(x) => `$${x / 1000}k`}
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
                    datum.quarter % 2 === 0 ? Colors.secondary : "#036666",
                },
              }}
              animate={{ duration: 1000, onLoad: { duration: 500 } }}
              barWidth={16}
              alignment="middle"
            />
          </VictoryChart>
        </View>
        <Picker
          style={{ height: 150, width: windowWidth }}
          selectedValue={selectedMonth}
          onValueChange={onValueChange}
        >
          <Picker.Item label="Select a month to see income" value="" />
          {months.map((month) => (
            <Picker.Item
              key={month.value}
              label={month.lable}
              value={month.value}
            />
          ))}
        </Picker>

        <View
          style={[
            styles.chartContainer,
            { backgroundColor: theme.PRIMARY_BUTTON_COLOR },
          ]}
        >
          <View style={styles.headerValue}>
            <Text style={styles.titleValue}>{getThisMonthIncome()}</Text>
          </View>
        </View>
        <View style={styles.headerText}>
          <Image
            source={income}
            style={{ height: 30, width: 30, marginHorizontal: 10 }}
          />
          <Text style={styles.title}>All time</Text>
        </View>
        <View style={styles.headerValue}>
          <Text style={styles.titleValue}>{getAllTimeIncome()}</Text>
        </View>
      </ScrollView>
    </ThemeProvider>
  );
};

export default Analytics;
