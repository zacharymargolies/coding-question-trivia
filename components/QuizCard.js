import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { CardNumber, CloseScreen, AnswerButton } from '../components';
import { URL } from '../store';
import axios from 'axios';
import Colors from '../styles/constants/Colors';

const QuizCard = props => {
  const { questions, goBack, navigation } = props;
  return (
    <React.Fragment>
      {/* CLOSE SCREEN */}
      <CloseScreen navigation={navigation} />
      <Swiper
        cards={questions}
        renderCard={question => {
          return (
            <View style={styles.card}>
              {/* TOPIC */}
              <View style={styles.topicContainer}>
                <Text
                  adjustsFontSizeToFit={true}
                  numberOfLines={1}
                  style={styles.topicText}
                >
                  {question.topic.main}
                </Text>
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
              {/* QUESTION CONTENT */}
              <View style={styles.questionContainer}>
                <Text style={styles.questionText}>{question.content}</Text>
              </View>
              {/* ANSWERS  */}
              <View style={styles.answersContainer}>
                {question.answerPool.map(answer => (
                  <AnswerButton
                    correctAnswerId={question.answer.id}
                    curAnswerId={answer.id}
                    key={answer.id}
                    content={answer.value}
                    questionId={question.id}
                  />
                ))}
              </View>
              {/* CARD NUMBER */}
              <View style={styles.cardNumberContainer}>
                <CardNumber
                  cur={questions.indexOf(question) + 1}
                  len={questions.length}
                />
              </View>
            </View>
          );
        }}
        onSwipedAll={() => {
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
        backgroundColor={Colors.backgroundColorBlue}
        showSecondCard={true}
        disableRightSwipe={true}
        verticalThreshold={hp('10%')}
        horizontalThreshold={wp('15%')}
        stackSize={3}
        animateCardOpacity={true}
      />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: hp('5%'),
    marginBottom: hp('-2.5%'),
    flex: 1,
    flexDirection: 'column',
    borderRadius: 25,
    borderColor: Colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.orange,
  },
  topicContainer: {
    flex: 1,
    marginTop: hp('2.0%'),
    width: wp('80%'),
  },
  topicText: {
    width: wp('80%'),
    fontFamily: 'Arial Rounded MT Bold',
    fontWeight: 'bold',
    fontSize: 42,
    color: 'white',
    textAlign: 'center',
  },
  line: {
    marginTop: hp('1.0%'),
    marginBottom: hp('3%'),
    alignSelf: 'center',
    width: wp('80%'),
    borderBottomColor: 'white',
    borderBottomWidth: hp('.25%'),
    borderRadius: wp('.25%'),
  },
  imageContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('2.5%'),
  },
  image: {
    resizeMode: 'contain',
    height: hp('37.0%'),
    width: hp('37.0%'),
  },
  questionContainer: {
    flex: 2,
  },
  questionText: {
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
  answersContainer: {
    flex: 8,
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: hp('7%'),
  },
  cardNumberContainer: {
    flex: 1,
    alignSelf: 'flex-end',
    marginRight: wp('3%'),
    marginBottom: hp('1%'),
  },
});

export default QuizCard;
