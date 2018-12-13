import React from 'react';
import { StyleSheet, Text } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { connect } from 'react-redux';

const AnswerButton = props => {
  const { content } = props;
  return <Text style={styles.answer}>{content}</Text>;
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
