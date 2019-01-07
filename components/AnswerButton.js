import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import Colors from '../styles/constants/Colors';
import Expo from 'expo';
import { updateSRQuestionData } from '../store/question';
import { userId } from '../store/index';

class AnswerButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answered: false,
      correct: false,
      performanceRating: 0.6,
    };
  }

  adjustPerformanceRating = answerCorrect => {
    let newPerformanceRating = 0.6;
    answerCorrect
      ? (newPerformanceRating = this.state.performanceRating + 0.2)
      : (newPerformanceRating = this.state.performanceRating - 0.2);

    if (newPerformanceRating < 0) {
      newPerformanceRating = 0.1;
    } else if (newPerformanceRating > 1) {
      newPerformanceRating = 1;
    }

    this.setState({
      performanceRating: newPerformanceRating,
    });
  };

  checkAnswer = async (correctAnswerId, curAnswerId) => {
    if (correctAnswerId === curAnswerId) {
      this.adjustPerformanceRating(true);
      this.setState({
        answered: true,
        correct: true,
      });
      // PLAY SOUND
      const correctAnswer = new Expo.Audio.Sound();
      try {
        await correctAnswer.loadAsync(
          require('../assets/sounds/correctAnswer.mp3')
        );
        await correctAnswer.playAsync();
      } catch (err) {
        console.log(err);
      }
      await this.props.updateSRData(
        userId,
        curAnswerId,
        this.state.performanceRating
      );
    } else {
      this.adjustPerformanceRating(false);
      this.setState({
        answered: true,
        correct: false,
      });
      // PLAY SOUND
      const incorrectAnswer = new Expo.Audio.Sound();
      try {
        await incorrectAnswer.loadAsync(
          require('../assets/sounds/incorrectAnswer.wav')
        );
        await incorrectAnswer.playAsync();
      } catch (err) {
        console.log(err);
      }
    }
    await this.props.updateSRData(
      userId,
      curAnswerId,
      this.state.performanceRating
    );
  };

  render() {
    const { correctAnswerId, curAnswerId, content, soundEffects } = this.props;

    return (
      <View
        style={
          this.state.answered
            ? this.state.correct
              ? styles.correctContainer
              : styles.incorrectContainer
            : styles.container
        }
      >
        <TouchableOpacity
          onPress={() => {
            this.checkAnswer(correctAnswerId, curAnswerId, soundEffects);
          }}
        >
          <Text style={styles.answerText}>{content}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.orange,
    borderWidth: wp('1%'),
    borderColor: Colors.backgroundColorBlue,
    height: hp('4%'),
    width: wp('80%'),
    borderRadius: 25,
    marginTop: hp('0.5%'),
    marginBottom: hp('0.5%'),
  },
  correctContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.orange,
    borderWidth: wp('1%'),
    borderColor: Colors.correctAnswerGreen,
    height: hp('4%'),
    width: wp('80%'),
    borderRadius: 25,
    marginTop: hp('0.5%'),
    marginBottom: hp('0.5%'),
  },
  incorrectContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.orange,
    borderWidth: wp('1%'),
    borderColor: Colors.incorrectAnswerRed,
    height: hp('4%'),
    width: wp('80%'),
    borderRadius: 25,
    marginTop: hp('0.5%'),
    marginBottom: hp('0.5%'),
  },
  answerText: {
    padding: wp('1.5%'),
    textAlign: 'center',
  },
});

// const mapStateToProps = props => ({});
const mapDispatchToProps = dispatch => ({
  updateSRData: (userId, questionId, performanceRating) => {
    dispatch(updateSRQuestionData(userId, questionId, performanceRating));
  },
});

export default connect(
  null,
  mapDispatchToProps
)(AnswerButton);
