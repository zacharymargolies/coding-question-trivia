import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import DifficultyCard from '../components/DifficultyCard';

export const images = {
  level1: require(`../assets/images/difficulty-1.jpg`),
  level2: require(`../assets/images/difficulty-2.jpg`),
  level3: require(`../assets/images/difficulty-3.jpg`),
  level4: require(`../assets/images/difficulty-4.jpg`)
};

export default class TopicsScreen extends Component {
  static navigationOptions = {
    title: 'Difficulty',
    headerStyle: {
      backgroundColor: '#f7f1e3'
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      difficultyLevels: ['1', '2', '3', '4']
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        {this.state.difficultyLevels.map((difficultyLevel, idx) => (
          <DifficultyCard
            difficultyLevel={difficultyLevel}
            key={idx}
            navigate={navigate}
          />
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
