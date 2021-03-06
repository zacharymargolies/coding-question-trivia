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
  }

  render() {
    const { navigation } = this.props;
    const options = [
      { title: 'Discarded Items', id: 1, navigate: 'DiscardedItems' },
      { title: 'Quizzable Items', id: 2, navigate: 'QuizzableItems' }
    ];
    return (
      <View style={styles.container}>
        {options.map(option => {
          return (
            <TouchableOpacity
              style={styles.settingsOptionButton}
              onPress={() => navigation.navigate(option.navigate)}
              key={option.id}
            >
              <Text style={styles.settingsOptionButtonText}>
                {option.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBackground,
    alignItems: 'center'
  },
  settingsOptionButton: {
    justifyContent: 'center',
    height: hp('5%'),
    width: wp('90%'),
    backgroundColor: Colors.orange,
    borderColor: Colors.orange,
    borderRadius: 10,
    marginTop: hp('1%'),
    marginBottom: hp('1%')
  },
  settingsOptionButtonText: {
    textAlign: 'center',
    fontSize: 24,
    color: Colors.white
  }
});

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);
