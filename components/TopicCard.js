import React from "react";
import { StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { setCurrentFactTopic, fetchFactsByTopic } from "../store/fact";
import {
  setCurrentQuestionTopic,
  fetchQuestionsByTopic
} from "../store/question";
import { fetchAllAnswers } from "../store/answer";
import { connect } from "react-redux";
import { QUIZZABLE_LAND } from "../store/appState";
import Colors from "../styles/constants/Colors";
import { userId } from "../store/index";

const TopicCard = props => {
  const { topic, navigation, currentMode } = props;
  const setTopicPlay = async () => {
    props.setCurrentFactTopic(topic.id);
    await props.getFactsByTopic(topic.id, userId);
    navigation.push("Cards");
  };
  const setTopicQuiz = async () => {
    props.setCurrentQuestionTopic(topic.id);
    await props.getQuestionsByTopic(topic.id, userId);
    await props.getAllAnswers();
    navigation.push("Cards");
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
    display: "flex",
    backgroundColor: Colors.orange,
    height: hp("20%"),
    width: wp("30%"),
    alignItems: "center",
    margin: wp("1.0%"),
    borderRadius: wp("5%"),
    shadowColor: Colors.shadowOrange,
    shadowOffset: {
      width: 0,
      height: 7
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 10
  },
  topicText: {
    marginTop: hp("4%"),
    fontSize: 26,
    color: Colors.white
  },
  topicImage: {
    marginTop: hp("1.0%"),
    height: hp("9%"),
    width: hp("9%"),
    borderRadius: hp("4.5%")
  }
});

const mapStateToProps = state => ({
  currentMode: state.appState.currentMode
});

const mapDispatchToProps = dispatch => ({
  setCurrentFactTopic: topicId => {
    dispatch(setCurrentFactTopic(topicId));
  },
  getFactsByTopic: (topicId, userId) => {
    dispatch(fetchFactsByTopic(topicId, userId));
  },
  setCurrentQuestionTopic: topicId => {
    dispatch(setCurrentQuestionTopic(topicId));
  },
  getQuestionsByTopic: (topicId, userId) => {
    dispatch(fetchQuestionsByTopic(topicId, userId));
  },
  getAllAnswers: () => {
    dispatch(fetchAllAnswers());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicCard);
