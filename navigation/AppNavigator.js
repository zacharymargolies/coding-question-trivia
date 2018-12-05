import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator, {
  TopicsStack,
  DifficultyStack,
  CardsStack,
  QuizStack
} from './MainTabNavigator';

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
  Topics: TopicsStack,
  Difficulty: DifficultyStack,
  Cards: CardsStack,
  Quizzes: QuizStack
});
