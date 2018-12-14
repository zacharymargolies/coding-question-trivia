import React, { Component } from "react";
import { StyleSheet, View, Picker, Text, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { URL } from "../store";
import RandomCard from "../components/RandomCard";

export default class RandomScreen extends Component {
  static navigationOptions = {
    title: "Random",
    headerStyle: {
      backgroundColor: "#f7f1e3"
    }
  };

  render() {
    const quantities = [5, 10, 15, 20];
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>How many cards would you like to see?</Text>
        </View>
        {quantities.map(quantity => (
          <RandomCard quantity={quantity} navigation={navigation} />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    backgroundColor: "#f7f1e3"
  },
  textContainer: {
    marginTop: hp("12.5%"),
    marginBottom: hp("5%")
  },
  text: {
    fontSize: 32,
    textAlign: "center"
  }
});
