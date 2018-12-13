import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#ffb142" />
      <Text style={styles.text}>Loading...</Text>
      <Text style={styles.text}>
        This app is in beta. If you've been waiting a little while go ahead and
        restart it.
      </Text>
      <Text style={styles.text}>Sorry, this one's on us!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#227093'
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20
  }
});

export default LoadingScreen;
