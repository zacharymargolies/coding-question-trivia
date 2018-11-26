import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import CardsScreen from '../screens/CardsScreen';
// import TopicsScreen from '../screens/TopicsScreen';
import InformationPlayground from '../screens/InformationPlayground';

const CardsStack = createStackNavigator({
  Cards: CardsScreen
});

CardsStack.navigationOptions = {
  tabBarLabel: 'Cards',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-browsers${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
  tabBarVisible: false
};

// const TopicsStack = createStackNavigator({
//   Topics: TopicsScreen
// });

// TopicsStack.navigationOptions = {
//   tabBarLabel: "Topics",
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={
//         Platform.OS === "ios"
//           ? `ios-list${focused ? "" : "-outline"}`
//           : "md-information-circle"
//       }
//     />
//   )
// };

const PlaygroundStack = createStackNavigator({
  Playground: InformationPlayground
});

PlaygroundStack.navigationOptions = {
  tabBarLabel: 'Playground',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-list${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  )
};

export default createBottomTabNavigator(
  {
    // TopicsStack,
    PlaygroundStack,
    CardsStack
  },
  {
    tabBarOptions: {
      labelStyle: {
        fontSize: 12
      },
      style: {
        marginBottom: -15,
        backgroundColor: '#f7f1e3'
      }
    }
  }
);
