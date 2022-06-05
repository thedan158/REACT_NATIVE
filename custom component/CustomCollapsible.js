import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import React, { Children, Component } from 'react';
import { useState } from 'react';
import Collapsible from 'react-native-collapsible';
import { ScrollView } from 'react-native-gesture-handler';
import question from '../assets/icons/question.png';

export class CustomCollapsible extends Component {
  state = {
    collapsed: true,
    switchValue: false,
  };

  toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
    const { title, subTitle } = this.props;

    return (
      <View style={styles.collapsing}>
        <TouchableOpacity onPress={this.toggleExpanded}>
          <View style={styles.header}>
            <Text style={styles.headerText}>{title}</Text>
            <Image style={styles.question} source={question} />
            <View style={styles.switchBox}>
              <Switch
                style={styles.switch}
                value={this.state.switchValue}
                onValueChange={(switchValue) => this.setState({ switchValue })}
              />
            </View>
          </View>
        </TouchableOpacity>

        <Collapsible collapsed={this.state.collapsed} align="center">
          <View style={styles.content}>
            <Text>{subTitle}</Text>
          </View>
        </Collapsible>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  collapsing: {
    borderBottomWidth: 1,
    borderBottomColor: '#A5B0B5',
  },
  header: {
    flexDirection: 'row',

    marginLeft: '5%',
    height: 50,
    marginVertical: '7%',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  content: {
    marginBottom: 20,
    marginLeft: 50,
  },
  question: {
    height: 18,
    width: 18,
    alignSelf: 'center',
    margin: 5,
  },
  switch: {
    position: 'relative',
    left: 200,
  },
});
