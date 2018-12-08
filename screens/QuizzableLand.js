import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PlaygroundCard from '../components/PlaygroundCard';
import { connect } from 'react-redux';
import { setCurrentMode, QUIZZABLE_LAND } from '../server/store/appState';

class QuizzableWorld extends React.Component {
  static navigationOptions = {
    title: 'Quizzable Land',
    headerStyle: {
      backgroundColor: '#f7f1e3'
    }
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.setCurrentMode(QUIZZABLE_LAND);
  }

  render() {
    const allSelectors = [
      {
        main: 'Topics',
        image: 'https://i.ytimg.com/vi/xOGxyw9DSa8/maxresdefault.jpg'
      },
      {
        main: 'Difficulty',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgF3kq4R9m6RqKS2W3weyEiBfVXaaTO8HmMAghHLH3yTXSe3tt'
      },
      {
        main: 'Random',
        image:
          'https://cdn3.iconfinder.com/data/icons/flat-icons-web/40/Random-512.png'
      }
    ];
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text>
          Time to quiz yourself! Choose a selector below to get started!
        </Text>
        {allSelectors.map(selector => (
          <PlaygroundCard
            selector={selector}
            key={selector.id}
            navigation={navigation}
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

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  setCurrentMode: currentMode => {
    dispatch(setCurrentMode(currentMode));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizzableWorld);
