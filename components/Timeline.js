import React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { fetchQuestionsByTimeline } from '../store/question';
import { fetchAllAnswers } from '../store/answer';
import { connect } from 'react-redux';
import Colors from '../styles/constants/Colors';

const TimelineCard = props => {
  const { topic, navigation } = props;
  const setTopicQuiz = async () => {
    await props.getQuestionsByTimeline();
    await props.getAllAnswers();
    navigation.push('Cards');
  };
  return (
    <TouchableOpacity
      onPress={() => {
        setTopicQuiz();
      }}
      style={styles.container}
    >
      {/* TOPIC TEXT */}
      <Text
        adjustsFontSizeToFit={true}
        numberOfLines={1}
        style={styles.topicText}
      >
        {topic.main}
      </Text>
      {/* TOPIC IMAGE */}
      <Image style={styles.topicImage} source={{ uri: topic.image }} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: Colors.orange,
    height: hp('20%'),
    width: wp('30%'),
    alignItems: 'center',
    margin: wp('1.0%'),
    borderRadius: wp('5%'),
    shadowColor: Colors.shadowOrange,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 10,
  },
  topicText: {
    marginTop: hp('4%'),
    fontSize: 26,
    color: Colors.white,
  },
  topicImage: {
    marginTop: hp('1.0%'),
    height: hp('9%'),
    width: hp('9%'),
    borderRadius: hp('4.5%'),
  },
});

const mapStateToProps = state => ({
  currentMode: state.appState.currentMode,
});

const mapDispatchToProps = dispatch => ({
  getQuestionsByTimeline: () => {
    dispatch(fetchQuestionsByTimeline());
  },
  getAllAnswers: () => {
    dispatch(fetchAllAnswers());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimelineCard);
