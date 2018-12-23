import React, { Component } from 'react';
import { StyleSheet, View, Picker, Text, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Colors from '../styles/constants/Colors';
import { connect } from 'react-redux';
import SelectMultiple from 'react-native-select-multiple';
import { discardFact } from '../store/fact';

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
    console.log('UNDISCARD FACTS RAN');
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
            console.log('ON PRESS CLICKED');
            this.undiscardFacts(this.state.selectedFacts);
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
    dispatch(discardFact(1, selectedFact.id, false))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);
