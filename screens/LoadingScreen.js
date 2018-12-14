import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";

const LoadingScreen = props => {
  const { goBack } = props.navigation;
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#ffb142" />
      <TouchableOpacity onPress={() => goBack()}>
        <Text style={styles.text}>Loading...</Text>
        <Text style={styles.text}>
          This app is in beta. If you've been waiting a little while, click
          here.
        </Text>
        <Text style={styles.text}>Sorry, this one's on us!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#227093"
  },
  text: {
    textAlign: "center",
    color: "white",
    fontSize: 20
  }
});

export default LoadingScreen;
