import React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { setCurrentTopic, fetchFactsByTopic } from '../server/store/fact';
import { connect } from 'react-redux';

const TopicCard = props => {
  const { topic, navigation } = props;
  const setTopicPlay = async () => {
    props.setCurrentTopic(topic.id);
    await props.getFactsByTopic(topic.id);
    navigation.push('Cards');
  };
  const setTopicQuiz = async () => {
    props.setCurrentTopic(topic.id);
    await props.getQuestionsByTopic(topic.id);
    navigation.push('Cards');
  };
  return (
    <TouchableOpacity
      onPress={console.log('ON PRESS RAN')}
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
  setCurrentTopic: topicId => {
    dispatch(setCurrentTopic(topicId));
  },
  getFactsByTopic: topicId => {
    dispatch(fetchFactsByTopic(topicId));
  },
  getQuestionsByTopic: topicId => {
    dispatch(fetchQuestionsByTopic(topicId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicCard);
