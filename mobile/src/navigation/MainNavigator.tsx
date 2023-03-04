import * as React from "react";

// Navigation
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";

const Stack = createStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
          headerShown: false,
      }}
    >
      <Stack.Screen name="main" component={TabNavigator} />
    </Stack.Navigator>
  );
}
