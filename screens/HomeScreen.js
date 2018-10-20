import React from "react";
import { Platform, StyleSheet, Text, View, Image } from "react-native";
import Swiper from "react-native-deck-swiper";
import { connect } from "react-redux";

import { fetchAllFacts, fetchFactsByTopic } from "../server/store/fact";

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { navigate } = this.props.navigation;
    if (this.props.facts.length) {
      return (
        <Swiper
          cards={this.props.facts}
          renderCard={fact => {
            return (
              <View style={styles.card}>
                // TOPIC
                <View style={styles.topicContainer}>
                  <Text style={styles.topicText}> {fact.topic.main} </Text>
                </View>
                // IMAGE
                <View style={styles.imageContainer}>
                  <Image
                    source={require("../assets/images/developer.jpg")}
                    style={styles.image}
                  />
                </View>
                // FACT CONTENT
                <View style={styles.factContainer}>
                  <Text style={styles.factText}>{fact.content}</Text>
                </View>
              </View>
            );
          }}
          onSwiped={cardIndex => {
            console.log(cardIndex);
            this.setState({ showContent: false });
          }}
          onSwipedAll={() => {
            console.log("You've finished all the cards!");
            navigate("Menu");
          }}
          cardIndex={0}
          backgroundColor="#227093"
          stackSize={3}
          cardVerticalMargin={80}
        />
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
    flex: 1,
    flexDirection: "column",
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#ffb142",
    justifyContent: "center",
    backgroundColor: "#ffb142"
  },
  topicContainer: {
    flex: 1
  },
  topicText: {
    fontSize: 28,
    textAlign: "center"
  },
  imageContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50
  },
  image: {
    resizeMode: "contain",
    height: 300,
    width: 300
  },
  factContainer: {
    flex: 10
  },
  factText: {
    textAlign: "center",
    fontSize: 18,
    backgroundColor: "transparent"
  }
});

const mapStateToProps = state => ({
  facts: state.fact.facts,
  topicId: state.fact.topicId
});

const mapDispatchToProps = dispatch => ({
  getAllFacts: () => {
    dispatch(fetchAllFacts());
  },
  getFactsByTopic: topicId => {
    dispatch(fetchFactsByTopic(topicId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
