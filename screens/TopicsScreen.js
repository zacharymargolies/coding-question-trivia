import axios from 'axios';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import TopicCard from '../components/TopicCard';
import { URL } from '../store';

export default class TopicsScreen extends Component {
  static navigationOptions = {
    title: 'Topics',
    headerStyle: {
      backgroundColor: '#f7f1e3'
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      topics: []
    };
  }

  async componentDidMount() {
    const request = await axios.get(`${URL}/api/topics/`);
    this.setState({ topics: request.data });
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        {this.state.topics.map(topic => (
          <TopicCard topic={topic} key={topic.id} navigation={navigation} />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: '#f7f1e3'
  }
});
