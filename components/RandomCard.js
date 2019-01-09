import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { fetchRandomFacts } from '../store/fact';
import { fetchRandomQuestions } from '../store/question';
import { connect } from 'react-redux';
import { INFORMATION_PLAYGROUND, QUIZZABLE_LAND } from '../store/appState';

const RandomCard = props => {
  const { quantity, navigation } = props;
  return (
    <TouchableOpacity
      onPress={async () => {
        props.currentMode === INFORMATION_PLAYGROUND
          ? await props.getRandomFacts(quantity)
          : await props.getRandomQuestions(quantity);
        navigation.push('Cards');
      }}
      style={styles.container}
    >
      {/* QUANTITY TEXT */}
      <View style={styles.topicTextContainer}>
        <Text
          adjustsFontSizeToFit={true}
          numberOfLines={1}
          style={styles.topicText}
        >
          {quantity}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#ffb142',
    height: hp('20%'),
    width: wp('30%'),
    alignItems: 'center',
    margin: wp('1.0%'),
    borderRadius: wp('5%'),
    shadowColor: '#cc8e35',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 10,
  },
  topicTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topicText: {
    fontSize: 70,
    color: 'white',
  },
});

const mapStateToProps = state => ({
  currentMode: state.appState.currentMode,
});

const mapDispatchToProps = dispatch => ({
  getRandomFacts: quantity => {
    dispatch(fetchRandomFacts(quantity));
  },
  getRandomQuestions: quantity => {
    dispatch(fetchRandomQuestions(quantity));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RandomCard);
