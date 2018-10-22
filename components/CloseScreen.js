import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";

export default class CloseScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigate("Topics")}
      >
        <Text style={styles.text}>X</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    top: hp("5%"),
    left: wp("87.0%")
  },
  text: {
    fontSize: 50,
    color: "#ffb142",
    textShadowColor: "#cc8e35",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5
  }
});
