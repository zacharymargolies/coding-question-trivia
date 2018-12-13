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

const DifficultyCard = props => {
  const { difficultyLevel, navigate, currentMode } = props;
  const imgPath = `level${difficultyLevel}`;
  const difficulties = {
    1: 0.3,
    2: 0.5,
    3: 0.6,
    4: 0.9
  };
  const setCurrentDifficultyPlay = async () => {
    props.setCurrentDifficultyPlay(difficulties[difficultyLevel]);
    await props.getFactsByDifficulty(difficulties[difficultyLevel]);
    navigate("Cards");
  };
  const setCurrentDifficultyQuiz = async () => {
    props.setCurrentQuestionDifficulty(difficulties[difficultyLevel]);
    await props.getQuestionsByDifficulty(difficulties[difficultyLevel]);
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
    backgroundColor: "#ffb142",
    height: hp("20%"),
    width: wp("30%"),
    alignItems: "center",
    margin: wp("1.0%"),
    borderRadius: wp("5%"),
    shadowColor: "#cc8e35",
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
    color: "white"
  },
  topicImage: {
    marginTop: hp("0.5%"),
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
  getFactsByDifficulty: difficultyLevel => {
    dispatch(fetchFactsByDifficulty(difficultyLevel));
  },
  setCurrentQuestionDifficulty: difficultyLevel => {
    dispatch(setCurrentQuestionDifficulty(difficultyLevel));
  },
  getQuestionsByDifficulty: difficultyLevel => {
    dispatch(fetchQuestionsByDifficulty(difficultyLevel));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DifficultyCard);
