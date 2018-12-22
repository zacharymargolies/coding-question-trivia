import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import Colors from '../styles/constants/Colors';

class AnswerButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answered: false,
      correct: false
    };
  }

  checkAnswer = (correctAnswerId, curAnswerId) => {
    if (correctAnswerId === curAnswerId) {
      this.setState({
        answered: true,
        correct: true
      });
      console.log('You chose the correct answer!');
    } else {
      this.setState({ answered: true, correct: false });
      console.log('You chose the incorrect answer.');
    }
  };

  render() {
    const { correctAnswerId, curAnswerId, content } = this.props;
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
            this.checkAnswer(correctAnswerId, curAnswerId);
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
    marginBottom: hp('0.5%')
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
    marginBottom: hp('0.5%')
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
    marginBottom: hp('0.5%')
  },
  answerText: {
    padding: wp('1.5%'),
    textAlign: 'center'
  }
});

// const mapStateToProps = props => ({});
// const mapDispatchToProps = dispatch => ({});

export default connect(
  null,
  null
)(AnswerButton);
