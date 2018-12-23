import React, { Component } from 'react';
import { StyleSheet, View, Picker, Text, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Colors from '../styles/constants/Colors';
import { connect } from 'react-redux';
import store from '../store';

class SettingsScreen extends Component {
  static navigationOptions = {
    title: 'Settings',
    headerStyle: {
      backgroundColor: Colors.screenBackground
    }
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { allDiscardedFacts } = this.props;
    return (
      <View style={styles.container}>
        {allDiscardedFacts.map(fact => (
          <React.Fragment key={fact.id}>
            <Text>Discarded Fact</Text>
            <Text>{fact.content}</Text>
          </React.Fragment>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBackground
  }
});

const mapStateToProps = state => ({
  allDiscardedFacts: state.fact.allDiscardedFacts
});
// const mapDispatchToProps = ({})

export default connect(
  mapStateToProps,
  null
)(SettingsScreen);
