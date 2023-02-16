import * as React from "react";

// Navigation
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";

// Screens
import NewAppletScreen from "../screens/NewAppletScreen";

const Stack = createStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
          headerShown: false,
      }}
    >
      <Stack.Group>
      <Stack.Screen name="main" component={TabNavigator} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="newapplet" component={NewAppletScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
