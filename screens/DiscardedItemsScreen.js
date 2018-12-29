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

class DiscardedItemsScreen extends Component {
  static navigationOptions = {
    title: 'Discarded Items',
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
      <React.Fragment>
        {allDiscardedFacts.length ? (
          <View style={styles.container}>
            {/* DISCARDED ITEMS LIST */}
            <SelectMultiple
              items={allDiscardedFacts}
              selectedItems={this.state.selectedFacts}
              onSelectionsChange={selectedFacts =>
                this.setState({ selectedFacts })
              }
              checkboxStyle={styles.checkboxUnselected}
              rowStyle={styles.row}
            />

            {/* UNDISCARD BUTTON */}
            <TouchableOpacity
              disabled={!this.state.selectedFacts.length}
              style={
                this.state.selectedFacts.length
                  ? styles.undiscardButtonAvailable
                  : styles.undiscardButtonUnavailable
              }
              onPress={async () => {
                await this.undiscardFacts(this.state.selectedFacts);
                await this.props.getAllDiscardedFacts(1);
                this.setState({ selectedFacts: [] });
              }}
            >
              <Text style={styles.undiscardButtonText}>UNDISCARD ITEMS</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.container}>
            <Text>No Discarded Facts Found...</Text>
          </View>
        )}
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBackground
    // alignItems: 'center'
  },
  undiscardButtonAvailable: {
    alignSelf: 'center',
    height: hp('5%'),
    width: wp('90%'),
    marginBottom: hp('1.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.screenBackground,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: Colors.buttonAvailable
  },
  undiscardButtonUnavailable: {
    alignSelf: 'center',
    height: hp('5%'),
    width: wp('90%'),
    marginBottom: hp('1.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.screenBackground,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: Colors.buttonUnavailable
  },
  undiscardButtonText: {
    fontSize: 28,
    color: Colors.orange
  },
  row: {
    paddingRight: 50
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
)(DiscardedItemsScreen);
