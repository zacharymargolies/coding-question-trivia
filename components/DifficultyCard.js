import React from "react";
import { StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import {
  setCurrentFactDifficulty,
  fetchFactsByDifficulty
} from "../store/fact";
import {
  setCurrentQuestionDifficulty,
  fetchQuestionsByDifficulty
} from "../store/question";
import { connect } from "react-redux";
import { images } from "../screens/DifficultyScreen";
import { QUIZZABLE_LAND } from "../store/appState";
import Colors from "../styles/constants/Colors";
import { userId } from "../store/index";

const DifficultyCard = props => {
  const { difficultyLevel, navigate, currentMode } = props;
  const imgPath = `level${difficultyLevel}`;
  const difficulties = {
    1: 0.1,
    2: 0.2,
    3: 0.3,
    4: 0.4,
    5: 0.5,
    6: 0.6,
    7: 0.7,
    8: 0.8,
    9: 0.9,
    10: 1.0
  };
  const setCurrentDifficultyPlay = async () => {
    props.setCurrentDifficultyPlay(difficulties[difficultyLevel]);
    await props.getFactsByDifficulty(difficulties[difficultyLevel], userId);
    navigate("Cards");
  };
  const setCurrentDifficultyQuiz = async () => {
    props.setCurrentQuestionDifficulty(difficulties[difficultyLevel]);
    await props.getQuestionsByDifficulty(difficulties[difficultyLevel], userId);
    navigate("Cards");
  };
  return (
    <TouchableOpacity
      onPress={() => {
        currentMode === QUIZZABLE_LAND
          ? setCurrentDifficultyQuiz()
          : setCurrentDifficultyPlay();
      }}
      style={styles.container}
    >
      {/* TOPIC TEXT */}
      <Text
        adjustsFontSizeToFit={true}
        numberOfLines={1}
        style={styles.topicText}
      >
        {difficultyLevel}
      </Text>
      {/* TOPIC IMAGE */}
      <Image style={styles.topicImage} source={images[imgPath]} />
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
    marginTop: hp("3%"),
    fontSize: 26,
    color: Colors.white
  },
  topicImage: {
    marginTop: hp("2.0%"),
    height: hp("8%"),
    width: hp("8%"),
    borderRadius: hp("4%")
  }
});

const mapStateToProps = state => ({
  currentMode: state.appState.currentMode
});

const mapDispatchToProps = dispatch => ({
  setCurrentDifficultyPlay: difficultyLevel => {
    dispatch(setCurrentFactDifficulty(difficultyLevel));
  },
  getFactsByDifficulty: (difficultyLevel, userId) => {
    dispatch(fetchFactsByDifficulty(difficultyLevel, userId));
  },
  setCurrentQuestionDifficulty: difficultyLevel => {
    dispatch(setCurrentQuestionDifficulty(difficultyLevel));
  },
  getQuestionsByDifficulty: (difficultyLevel, userId) => {
    dispatch(fetchQuestionsByDifficulty(difficultyLevel, userId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DifficultyCard);
