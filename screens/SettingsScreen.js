import React, { Component } from 'react';
import { StyleSheet, View, Picker, Text, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Colors from '../styles/constants/Colors';
import { connect } from 'react-redux';
import SelectMultiple from 'react-native-select-multiple';

class SettingsScreen extends Component {
  static navigationOptions = {
    title: 'Settings',
    headerStyle: {
      backgroundColor: Colors.screenBackground
    }
  };

  constructor(props) {
    super(props);
    this.state = { selectedFacts: [] };
  }

  render() {
    const { allDiscardedFacts } = this.props;
    return (
      <View style={styles.container}>
        <SelectMultiple
          items={allDiscardedFacts}
          selectedItems={this.state.selectedFacts}
          onSelectionsChange={selectedFacts => this.setState({ selectedFacts })}
        />
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
