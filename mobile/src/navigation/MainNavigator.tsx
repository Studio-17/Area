import * as React from "react";

// Navigation
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";

// Screens
import NewAreaScreen from "../screens/NewAreaScreen";

const Stack = createStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
          headerShown: false,
      }}
    >
      <Stack.Screen name="main" component={TabNavigator} />
      {/*<Stack.Group>*/}
      {/*</Stack.Group>*/}
      {/*<Stack.Group screenOptions={{ presentation: 'modal' }}>*/}
      {/*  <Stack.Screen name="newarea" component={NewAreaScreen} />*/}
      {/*</Stack.Group>*/}
    </Stack.Navigator>
  );
}
