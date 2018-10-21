import axios from "axios";
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import TopicCard from "../components/TopicCard";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

const icon = "av-timer";

export default class MenuScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topics: []
    };
  }

  async componentDidMount() {
    const request = await axios.get("http://localhost:8080/api/topics/");
    this.setState({ topics: request.data });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        {this.state.topics.map(topic => (
          <TopicCard topic={topic} key={topic.id} navigate={navigate} />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    backgroundColor: "#ffb142"
  }
});
