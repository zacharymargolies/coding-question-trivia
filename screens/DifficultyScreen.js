import React, { Component } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import DifficultyCard from "../components/DifficultyCard";

export const images = {
  level1: require(`../assets/images/difficulty-1.jpg`),
  level2: require(`../assets/images/difficulty-2.jpg`),
  level3: require(`../assets/images/difficulty-3.jpg`),
  level4: require(`../assets/images/difficulty-4.jpg`),
  level5: require(`../assets/images/difficulty-5.jpg`),
  level6: require(`../assets/images/difficulty-6.jpg`),
  level7: require(`../assets/images/difficulty-7.jpg`),
  level8: require(`../assets/images/difficulty-8.jpg`),
  level9: require(`../assets/images/difficulty-9.jpg`),
  level10: require(`../assets/images/difficulty-10.jpg`)
};

export default class TopicsScreen extends Component {
  static navigationOptions = {
    title: "Difficulty",
    headerStyle: {
      backgroundColor: "#f7f1e3"
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      difficultyLevels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView overScrollMode={"never"} style={styles.scrollContainer}>
        <View style={styles.container}>
          {this.state.difficultyLevels.map((difficultyLevel, idx) => (
            <DifficultyCard
              difficultyLevel={difficultyLevel}
              key={idx}
              navigate={navigate}
            />
          ))}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    backgroundColor: "#f7f1e3"
  }
});
