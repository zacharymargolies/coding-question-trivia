import React from 'react';
import { connect } from 'react-redux';
import { INFORMATION_PLAYGROUND, QUIZZABLE_LAND } from '../store/appState';
import LoadingScreen from '../screens/LoadingScreen';
import FactCard from '../components/FactCard';
import QuizCard from '../components/QuizCard';

class CardsScreen extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };

  render() {
    const { navigate, goBack } = this.props.navigation;
    const { facts, questions, currentMode } = this.props;
    if (currentMode === INFORMATION_PLAYGROUND && facts.length) {
      return (
        <FactCard
          facts={facts}
          navigation={this.props.navigation}
          navigate={navigate}
        />
      );
    } else if (currentMode === QUIZZABLE_LAND && questions.length) {
      return (
        <QuizCard
          questions={questions}
          navigation={this.props.navigation}
          navigate={navigate}
          goBack={goBack}
        />
      );
    } else {
      return <LoadingScreen navigation={this.props.navigation} />;
    }
  }
}

const mapStateToProps = state => ({
  facts: state.fact.facts,
  topicId: state.fact.topicId,
  questions: state.question.questions,
  currentMode: state.appState.currentMode,
  answers: state.answer.answers,
});

export default connect(
  mapStateToProps,
  null
)(CardsScreen);
