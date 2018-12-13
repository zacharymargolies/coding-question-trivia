import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { connect } from 'react-redux';

const checkAnswer = (correctAnswerId, curAnswerId) => {
  if (correctAnswerId === curAnswerId) {
    console.log('You chose the correct answer!');
  } else {
    console.log('You chose the incorrect answer.');
  }
};

const AnswerButton = props => {
  const { correctAnswerId, curAnswerId, content } = props;
  return (
    <TouchableOpacity
      onPress={() => {
        checkAnswer(correctAnswerId, curAnswerId);
      }}
    >
      <Text style={styles.answer}>{content}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  answer: {
    textAlign: 'center',
    backgroundColor: '#ffb142',
    borderWidth: wp('1%'),
    borderColor: '#227093',
    height: hp('8%'),
    width: wp('80%'),
    borderRadius: 25,
    marginTop: hp('0.5%'),
    marginBottom: hp('0.5%')
  }
});

// const mapStateToProps = props => ({});
// const mapDispatchToProps = dispatch => ({});

export default connect(
  null,
  null
)(AnswerButton);
