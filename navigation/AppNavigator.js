import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import { TopicsStack } from './MainTabNavigator';
import TopicsScreen from '../screens/TopicsScreen';

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
  // Topics: TopicsScreen
  Topics: TopicsStack
});
