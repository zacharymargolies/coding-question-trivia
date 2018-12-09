import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { connect } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { CardNumber, CloseScreen } from '../components';

import { fetchAllFacts, fetchFactsByTopic } from '../store/fact';
import axios from 'axios';
import { URL } from '../store';

class CardsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { navigate } = this.props.navigation;
    const { facts, questions } = this.props;
    console.log('--- FACTS: --- ', facts);
    console.log('--- QUESTIONS: --- ', questions);
    if (facts.length) {
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
                      source={require('../assets/images/developer.jpg')}
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
              navigate('Topics');
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
    } else if (questions.length) {
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
                      source={require('../assets/images/developer.jpg')}
                      style={styles.image}
                    />
                  </View>
                  {/* FACT CONTENT */}
                  <View style={styles.factContainer}>
                    <Text style={styles.factText}>{question.content}</Text>
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
              navigate('Topics');
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
    backgroundColor: '#fff'
  },
  card: {
    marginTop: hp('5%'),
    marginBottom: hp('-2.5%'),
    flex: 1,
    flexDirection: 'column',
    borderRadius: 25,
    borderColor: '#ffb142',
    justifyContent: 'center',
    backgroundColor: '#ffb142'
  },
  topicContainer: {
    flex: 1,
    marginTop: hp('2.0%')
  },
  topicText: {
    fontFamily: 'Arial Rounded MT Bold',
    fontWeight: 'bold',
    fontSize: 42,
    color: 'white',
    textAlign: 'center'
  },
  line: {
    marginTop: hp('1.0%'),
    marginBottom: hp('3%'),
    alignSelf: 'center',
    width: wp('80%'),
    borderBottomColor: 'white',
    borderBottomWidth: hp('.25%'),
    borderRadius: wp('.25%')
  },
  imageContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('5.0%')
  },
  image: {
    resizeMode: 'contain',
    height: hp('37.0%'),
    width: hp('37.0%')
  },
  factContainer: {
    flex: 10
  },
  factText: {
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: 'transparent'
  }
});

const mapStateToProps = state => ({
  facts: state.fact.facts,
  topicId: state.fact.topicId,
  questions: state.question.questions
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
)(CardsScreen);
