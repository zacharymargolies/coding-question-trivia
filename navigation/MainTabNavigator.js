import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import MenuScreen from "../screens/MenuScreen";

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Cards",
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
  tabBarVisible: false
};

const MenuStack = createStackNavigator({
  Menu: MenuScreen
});

MenuStack.navigationOptions = {
  tabBarLabel: "Topics",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-list${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

export default createBottomTabNavigator(
  {
    MenuStack,
    HomeStack
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
