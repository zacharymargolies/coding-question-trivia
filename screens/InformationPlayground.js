import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PlaygroundCard from '../components/PlaygroundCard';
import { connect } from 'react-redux';
import { setCurrentMode, INFORMATION_PLAYGROUND } from '../store/appState';
import { playgroundSelectors } from '../store';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

class InformationPlayground extends React.Component {
  static navigationOptions = {
    title: 'Information Playground',
    headerStyle: {
      backgroundColor: '#f7f1e3',
    },
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Want to study?</Text>
          <Text style={styles.text}>
            Choose a selector below to get started!
          </Text>
        </View>

        {playgroundSelectors.map(selector => (
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
    backgroundColor: '#f7f1e3',
  },
  textContainer: {
    marginTop: hp('12.5%'),
    marginBottom: hp('5%'),
  },
  text: {
    fontSize: 32,
    textAlign: 'center',
  },
});

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  // setCurrentMode: currentMode => {
  //   dispatch(setCurrentMode(currentMode));
  // }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InformationPlayground);
