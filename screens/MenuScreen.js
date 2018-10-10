import axios from "axios";
import React, { Component } from "react";
import { Text } from "react-native";
import { List, ListItem } from "react-native-elements";

const icon = "av-timer";

// const list = [
//   {
//     title: "Appointments",
//     icon: "av-timer"
//   },
//   {
//     title: "Trips",
//     icon: "flight-takeoff"
//   }
// ];

export default class MenuScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topics: []
    };
  }

  async componentDidMount() {
    const request = await axios.get("http://192.168.1.4:8080/api/topics/");
    this.setState({ topics: request.data });
  }

  render() {
    const { navigate } = this.props.navigation;
    console.log("NAVIGATE: ", navigate);
    return (
      <List>
        {this.state.topics.map(topic => (
          <ListItem
            onPress={() => {
              console.log("LIST ITEM PRESSED: ", topic.main);
              navigate("Home");
            }}
            key={topic.main}
            title={topic.main}
            leftIcon={{ name: icon }}
          />
        ))}
      </List>
    );
  }
}
