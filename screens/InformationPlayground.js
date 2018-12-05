import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PlaygroundCard from '../components/PlaygroundCard';
import { connect } from 'react-redux';

class InformationPlayground extends React.Component {
  static navigationOptions = {
    title: 'Information Playground',
    headerStyle: {
      backgroundColor: '#f7f1e3'
    }
  };

  constructor(props) {
    super(props);

    this.state = {};
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
        <Text> Want to study? Choose a selector below to get started!</Text>
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

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InformationPlayground);
