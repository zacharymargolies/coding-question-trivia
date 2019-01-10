import React, { Component } from 'react';
import { StyleSheet, View, Picker, Text, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../styles/constants/Colors';
import { connect } from 'react-redux';
import SelectMultiple from 'react-native-select-multiple';
import {
  makeQuizzableQuestions,
  fetchAllQuizzableItems,
} from '../store/question';

class QuizzableItemsScreen extends Component {
  static navigationOptions = {
    title: 'Quizzable Items',
    headerStyle: {
      backgroundColor: Colors.screenBackground,
    },
  };

  constructor(props) {
    super(props);
    this.state = { quizzableItems: [] };
  }

  render() {
    const { allQuizzableItems } = this.props;
    return (
      <React.Fragment>
        {allQuizzableItems.length ? (
          <View style={styles.container}>
            {/* DISCARDED ITEMS LIST */}
            <SelectMultiple
              items={allQuizzableItems}
              selectedItems={this.state.quizzableItems}
              onSelectionsChange={quizzableItems =>
                this.setState({ quizzableItems })
              }
              checkboxStyle={styles.checkboxUnselected}
              rowStyle={styles.row}
            />

            {/* UNDISCARD BUTTON */}
            <TouchableOpacity
              disabled={!this.state.quizzableItems.length}
              style={
                this.state.quizzableItems.length
                  ? styles.undiscardButtonAvailable
                  : styles.undiscardButtonUnavailable
              }
              onPress={async () => {
                await this.props.unquizItems(this.state.quizzableItems);
                await this.props.getAllQuizzableItems();
                this.setState({ quizzableItems: [] });
              }}
            >
              <Text style={styles.undiscardButtonText}>MAKE UNQUIZZABLE</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.container}>
            <Text>No Quizzable Items Found...</Text>
          </View>
        )}
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBackground,
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
    backgroundColor: Colors.buttonAvailable,
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
    backgroundColor: Colors.buttonUnavailable,
  },
  undiscardButtonText: {
    fontSize: 28,
    color: Colors.orange,
  },
  row: {
    paddingRight: 50,
  },
});

const mapStateToProps = state => ({
  allQuizzableItems: state.question.allQuizzableItems,
});
const mapDispatchToProps = dispatch => ({
  unquizItems: quizzableItems =>
    dispatch(makeQuizzableQuestions(false, quizzableItems)),
  getAllQuizzableItems: () => dispatch(fetchAllQuizzableItems()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizzableItemsScreen);
