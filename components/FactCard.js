import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Swiper from "react-native-deck-swiper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { CardNumber, CloseScreen } from "../components";
import Colors from "../styles/constants/Colors";
import { connect } from "react-redux";
import { discardFact } from "../store/fact";
import { makeQuizzableQuestions } from "../store/question";
import { userId } from "../store/index";

const FactCard = props => {
  const { facts, navigation, navigate } = props;
  return (
    <React.Fragment>
      {/* CLOSE SCREEN */}
      <CloseScreen navigation={navigation} />
      <Swiper
        cards={facts}
        renderCard={fact => {
          return (
            <View style={styles.card}>
              {/* TOPIC */}
              <View style={styles.topicContainer}>
                <Text
                  style={styles.topicText}
                  adjustsFontSizeToFit={true}
                  numberOfLines={1}
                >
                  {fact.topic.main}
                </Text>
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
              <CardNumber cur={facts.indexOf(fact) + 1} len={facts.length} />
            </View>
          );
        }}
        onSwipedAll={() => {
          console.log("You've finished all the cards!");
          navigate("Topics");
        }}
        onSwipedBottom={idx => {
          const { id } = facts[idx];
          const discard = true;
          props.discardFact(userId, id, discard);
        }}
        onSwipedTop={idx => {
          const { questions } = facts[idx];
          const quizzable = true;
          props.makeQuizzableQuestions(userId, quizzable, questions);
        }}
        cardIndex={0}
        backgroundColor={Colors.backgroundColorBlue}
        showSecondCard={true}
        verticalThreshold={hp("10%")}
        horizontalThreshold={wp("15%")}
        goBackToPreviousCardOnSwipeRight={true}
        stackSize={3}
        animateCardOpacity={true}
        // swipeBackCard={true}
        // childrenOnTop={true}
      />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: hp("5%"),
    marginBottom: hp("-2.5%"),
    flex: 1,
    flexDirection: "column",
    borderRadius: 25,
    borderColor: Colors.orange,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.orange
  },
  topicContainer: {
    flex: 1,
    marginTop: hp("2.0%"),
    width: wp("80%")
  },
  topicText: {
    width: wp("80%"),
    // fontFamily: 'Sans Forgetica',
    fontWeight: "bold",
    fontSize: 42,
    color: Colors.white,
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
    flex: 8,
    width: wp("80%")
  },
  factText: {
    // fontFamily: 'Sans Forgetica',
    fontFamily: "Helvetica",
    textAlign: "center",
    fontSize: 22,
    backgroundColor: "transparent"
  }
});

const mapDispatchToProps = dispatch => ({
  discardFact: (userId, factId, discard) => {
    dispatch(discardFact(userId, factId, discard));
  },
  makeQuizzableQuestions: (userId, quizzable, questions) => {
    dispatch(makeQuizzableQuestions(userId, quizzable, questions));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(FactCard);
