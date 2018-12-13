import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Swiper from "react-native-deck-swiper";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { CardNumber, CloseScreen, AnswerButton } from "../components";

import { fetchAllFacts, fetchFactsByTopic } from "../store/fact";
import { INFORMATION_PLAYGROUND, QUIZZABLE_LAND } from "../store/appState";
import { fetchAllAnswers } from "../store/answer";
import { URL } from "../store";
import axios from "axios";
import shuffle from "shuffle-array";

class CardsScreen extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false
  };

  render() {
    const { navigate, goBack } = this.props.navigation;
    const { facts, questions, currentMode } = this.props;
    console.log("--- CARDS SCREEN: --- ", questions[0]);
    if (currentMode === INFORMATION_PLAYGROUND && facts.length) {
      return (
        <React.Fragment>
          {/* CLOSE SCREEN */}
          <CloseScreen navigation={this.props.navigation} />
          <Swiper
            cards={facts}
            renderCard={fact => {
              return (
                <View style={styles.card}>
                  {/* TOPIC */}
                  <View style={styles.topicContainer}>
                    <Text style={styles.topicText}> {fact.topic.main} </Text>
                  </View>
                  {/* LINE */}
                  <View style={styles.line} />
                  {/* IMAGE */}
                  <View style={styles.imageContainer}>
                    <Image
                      source={require("../assets/images/developer.jpg")}
                      style={styles.image}
                    />
                  </View>
                  {/* FACT CONTENT */}
                  <View style={styles.factContainer}>
                    <Text style={styles.factText}>{fact.content}</Text>
                  </View>
                  {/* CARD NUMBER */}
                  <CardNumber
                    cur={facts.indexOf(fact) + 1}
                    len={facts.length}
                  />
                </View>
              );
            }}
            onSwipedAll={() => {
              console.log("You've finished all the cards!");
              navigate("Topics");
            }}
            onSwipedTop={async idx => {
              const { id } = this.props.facts[idx];
              try {
                await axios.put(`${URL}/api/facts/quizzable/${id}`);
              } catch (err) {
                console.log(err);
              }
            }}
            onSwipedBottom={async idx => {
              const { id } = this.props.facts[idx];
              try {
                await axios.put(`${URL}/api/facts/discard/${id}`);
              } catch (err) {
                console.log(err);
              }
            }}
            cardIndex={0}
            backgroundColor="#227093"
            stackSize={3}
          />
        </React.Fragment>
      );
    } else if (currentMode === QUIZZABLE_LAND && questions.length) {
      return (
        <React.Fragment>
          {/* CLOSE SCREEN */}
          <CloseScreen navigation={this.props.navigation} />
          <Swiper
            cards={questions}
            renderCard={question => {
              return (
                <View style={styles.card}>
                  {/* TOPIC */}
                  <View style={styles.topicContainer}>
                    <Text style={styles.topicText}>{question.topic.main} </Text>
                  </View>
                  {/* LINE */}
                  <View style={styles.line} />
                  {/* IMAGE */}
                  <View style={styles.imageContainer}>
                    <Image
                      source={require("../assets/images/developer.jpg")}
                      style={styles.image}
                    />
                  </View>
                  {/* QUESTION CONTENT */}
                  <View style={styles.factContainer}>
                    <Text style={styles.factText}>{question.content}</Text>
                  </View>
                  {/* ANSWERS  */}
                  <View style={styles.answersContainer}>
                    {question.answer.map(answer => (
                      <AnswerButton key={answer.id} content={answer.value} />
                    ))}
                  </View>
                  {/* CARD NUMBER */}
                  <CardNumber
                    cur={questions.indexOf(question) + 1}
                    len={questions.length}
                  />
                </View>
              );
            }}
            onSwipedAll={() => {
              console.log("You've finished all the cards!");
              goBack();
            }}
            onSwipedTop={async idx => {
              const { id } = questions[idx];
              try {
                await axios.put(`${URL}/api/facts/quizzable/${id}`);
              } catch (err) {
                console.log(err);
              }
            }}
            onSwipedBottom={async idx => {
              const { id } = questions[idx];
              try {
                await axios.put(`${URL}/api/facts/discard/${id}`);
              } catch (err) {
                console.log(err);
              }
            }}
            cardIndex={0}
            backgroundColor="#227093"
            stackSize={3}
          />
        </React.Fragment>
      );
    } else {
      return (
        <View>
          <Text>Loading</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  card: {
    marginTop: hp("5%"),
    marginBottom: hp("-2.5%"),
    flex: 1,
    flexDirection: "column",
    borderRadius: 25,
    borderColor: "#ffb142",
    justifyContent: "center",
    backgroundColor: "#ffb142"
  },
  topicContainer: {
    flex: 1,
    marginTop: hp("2.0%")
  },
  topicText: {
    fontFamily: "Arial Rounded MT Bold",
    fontWeight: "bold",
    fontSize: 42,
    color: "white",
    textAlign: "center"
  },
  line: {
    marginTop: hp("1.0%"),
    marginBottom: hp("3%"),
    alignSelf: "center",
    width: wp("80%"),
    borderBottomColor: "white",
    borderBottomWidth: hp(".25%"),
    borderRadius: wp(".25%")
  },
  imageContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: hp("2.5%")
  },
  image: {
    resizeMode: "contain",
    height: hp("37.0%"),
    width: hp("37.0%")
  },
  factContainer: {
    flex: 2
  },
  factText: {
    textAlign: "center",
    fontSize: 18,
    backgroundColor: "transparent"
  },
  answersContainer: {
    flex: 8,
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center"
  }
});

const mapStateToProps = state => ({
  facts: state.fact.facts,
  topicId: state.fact.topicId,
  questions: state.question.questions,
  currentMode: state.appState.currentMode,
  answers: state.answer.answers
});

const mapDispatchToProps = dispatch => ({
  getAllFacts: () => {
    dispatch(fetchAllFacts());
  },
  getFactsByTopic: topicId => {
    dispatch(fetchFactsByTopic(topicId));
  },
  getAllAsnwers: () => {
    dispatch(fetchAllAnswers());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardsScreen);
