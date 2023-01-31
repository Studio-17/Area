import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import NewAppletScreen from "../screens/NewAppletScreen";
import TabNavigator from "./TabNavigator";

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
