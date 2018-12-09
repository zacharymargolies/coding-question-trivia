import React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { setCurrentFactTopic, fetchFactsByTopic } from '../store/fact';
import {
  setCurrentQuestionTopic,
  fetchQuestionsByTopic
} from '../store/question';
import { connect } from 'react-redux';
import { QUIZZABLE_LAND } from '../store/appState';

const TopicCard = props => {
  const { topic, navigation, currentMode } = props;
  const setTopicPlay = async () => {
    console.log('--- SET FACT PLAY: ---', topic.id);
    props.setCurrentFactTopic(topic.id);
    await props.getFactsByTopic(topic.id);
    navigation.push('Cards');
  };
  const setTopicQuiz = async () => {
    console.log('--- SET QUESTION QUIZ: ---', topic.id);
    props.setCurrentQuestionTopic(topic.id);
    await props.getQuestionsByTopic(topic.id);
    navigation.push('Cards');
  };
  return (
    <TouchableOpacity
      onPress={() => {
        currentMode === QUIZZABLE_LAND ? setTopicQuiz() : setTopicPlay();
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
    backgroundColor: '#ffb142',
    height: hp('20%'),
    width: wp('30%'),
    alignItems: 'center',
    margin: wp('1.0%'),
    borderRadius: wp('5%'),
    shadowColor: '#cc8e35',
    shadowOffset: {
      width: 0,
      height: 7
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 10
  },
  topicText: {
    marginTop: hp('4%'),
    fontSize: 26,
    color: 'white'
  },
  topicImage: {
    marginTop: hp('1.0%'),
    height: hp('9%'),
    width: hp('9%'),
    borderRadius: hp('4.5%')
  }
});

const mapStateToProps = state => ({
  currentMode: state.appState.currentMode
});

const mapDispatchToProps = dispatch => ({
  setCurrentFactTopic: topicId => {
    dispatch(setCurrentFactTopic(topicId));
  },
  getFactsByTopic: topicId => {
    dispatch(fetchFactsByTopic(topicId));
  },
  setCurrentQuestionTopic: topicId => {
    dispatch(setCurrentQuestionTopic(topicId));
  },
  getQuestionsByTopic: topicId => {
    dispatch(fetchQuestionsByTopic(topicId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicCard);
