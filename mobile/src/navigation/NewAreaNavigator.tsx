import React from "react";

// Navigation
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import CreateAreaScreen from "../screens/CreateAreaScreen";
import NewAreaScreen from "../screens/NewAreaScreen";
import ActionsListScreen from "../screens/ActionsListScreen";
import ServicesScreen from "../screens/ServicesScreen";

const Stack = createStackNavigator();

export default function NewAreaStack() {
  return (
    <Stack.Navigator
      initialRouteName="NewArea"
      screenOptions={{
        headerShown: false,
        gestureDirection: "horizontal",
      }}
    >
      <Stack.Screen name="NewArea" component={NewAreaScreen} />
      <Stack.Screen name="Services" component={ServicesScreen} />
      <Stack.Screen name="ActionsList" component={ActionsListScreen} />
      <Stack.Screen name="FinishArea" component={CreateAreaScreen} />
    </Stack.Navigator>
  );
}