import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { connect } from "react-redux";

const checkAnswer = (correctAnswerId, curAnswerId) => {
  if (correctAnswerId === curAnswerId) {
    console.log("You chose the correct answer!");
  } else {
    console.log("You chose the incorrect answer.");
  }
};

const AnswerButton = props => {
  const { correctAnswerId, curAnswerId, content } = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          checkAnswer(correctAnswerId, curAnswerId);
        }}
      >
        <Text style={styles.answerText}>{content}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#ffb142",
    borderWidth: wp("1%"),
    borderColor: "#227093",
    height: hp("4%"),
    width: wp("80%"),
    borderRadius: 25,
    marginTop: hp("0.5%"),
    marginBottom: hp("0.5%")
  },
  answerText: {
    textAlign: "center"
  }
});

// const mapStateToProps = props => ({});
// const mapDispatchToProps = dispatch => ({});

export default connect(
  null,
  null
)(AnswerButton);
