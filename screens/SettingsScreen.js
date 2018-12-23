import React, { Component } from 'react';
import { StyleSheet, View, Picker, Text, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Colors from '../styles/constants/Colors';
import { connect } from 'react-redux';
import SelectMultiple from 'react-native-select-multiple';
import { discardFact, fetchAllDiscardedFacts } from '../store/fact';

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

  undiscardFacts = selectedFacts => {
    selectedFacts.map(fact => {
      this.props.undiscardFact(fact);
    });
  };

  render() {
    const { allDiscardedFacts } = this.props;
    return (
      <View style={styles.container}>
        <SelectMultiple
          items={allDiscardedFacts}
          selectedItems={this.state.selectedFacts}
          onSelectionsChange={selectedFacts => this.setState({ selectedFacts })}
        />

        <TouchableOpacity
          onPress={() => {
            this.undiscardFacts(this.state.selectedFacts);
            this.props.getAllDiscardedFacts(1);
            this.setState({ selectedFacts: [] });
          }}
        >
          <Text>Undiscard Items</Text>
        </TouchableOpacity>
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
const mapDispatchToProps = dispatch => ({
  undiscardFact: selectedFact =>
    dispatch(discardFact(1, selectedFact.id, false)),
  getAllDiscardedFacts: userId => dispatch(fetchAllDiscardedFacts(userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);
