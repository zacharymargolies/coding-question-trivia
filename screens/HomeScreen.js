import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Swiper from "react-native-deck-swiper";
import { connect } from "react-redux";
import { Card, Button, Icon } from "react-native-elements";

import { fetchAllFacts, fetchFactsByTopic } from "../server/store/fact";

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { navigate } = this.props.navigation;
    if (this.props.facts.length) {
      return (
        <View style={styles.container}>
          <Swiper
            cards={this.props.facts}
            renderCard={fact => {
              return (
                <View style={styles.card}>
                  <Card
                    title={fact.topic.main}
                    image={require("../assets/images/developer.jpg")}
                  >
                    <Text style={{ marginBottom: 10 }}>{fact.content}</Text>
                    {/* <Button
                      icon={<Icon name="code" color="#ffffff" />}
                      backgroundColor="#03A9F4"
                      buttonStyle={{
                        borderRadius: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        marginBottom: 0
                      }}
                      title="VIEW NOW"
                    /> */}
                  </Card>
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
            backgroundColor="#4FD0E9"
            stackSize={3}
          />
        </View>
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
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white"
  },
  text: {
    textAlign: "center",
    fontSize: 50,
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
