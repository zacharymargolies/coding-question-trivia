import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import CardsScreen from "../screens/CardsScreen";
import TopicsScreen from "../screens/TopicsScreen";
import InformationPlayground from "../screens/InformationPlayground";
import QuizzableLand from "../screens/QuizzableLand";
import DifficultyScreen from "../screens/DifficultyScreen";
import RandomScreen from "../screens/RandomScreen.js";
import store from "../store";
import { setCurrentMode } from "../store/appState";
import { INFORMATION_PLAYGROUND, QUIZZABLE_LAND } from "../store/appState";

export const CardsStack = createStackNavigator({
  Cards: CardsScreen
});

export const QuizStack = createStackNavigator({
  Quizzes: QuizzableLand,
  Topics: TopicsScreen,
  Difficulty: DifficultyScreen,
  Random: RandomScreen,
  Cards: CardsScreen
});

QuizStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 1) {
    tabBarVisible = false;
  }
  store.dispatch(setCurrentMode(QUIZZABLE_LAND));
  return {
    tabBarLabel: "Quizzes",
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={
          Platform.OS === "ios"
            ? `ios-browsers${focused ? "" : "-outline"}`
            : "md-information-circle"
        }
      />
    ),
    tabBarVisible
  };
};

const PlaygroundStack = createStackNavigator({
  Playground: InformationPlayground,
  Topics: TopicsScreen,
  Difficulty: DifficultyScreen,
  Random: RandomScreen,
  Cards: CardsScreen
});

PlaygroundStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 1) {
    tabBarVisible = false;
  }
  store.dispatch(setCurrentMode(INFORMATION_PLAYGROUND));
  return {
    tabBarLabel: "Playground",
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={
          Platform.OS === "ios"
            ? `ios-list${focused ? "" : "-outline"}`
            : "md-information-circle"
        }
      />
    ),
    tabBarVisible
  };
};

export default createBottomTabNavigator(
  {
    PlaygroundStack,
    QuizStack
  },
  {
    tabBarOptions: {
      labelStyle: {
        fontSize: 12
      },
      style: {
        marginBottom: -15,
        backgroundColor: "#f7f1e3"
      }
    }
  }
);
