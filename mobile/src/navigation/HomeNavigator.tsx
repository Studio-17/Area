// Navigation
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import HomeScreen from "../screens/HomeScreen";
import AppletDetailsScreen from "../screens/AppletDetailsScreen";
import EditAreaScreen from "../screens/EditAreaScreen";
import ServicesScreen from "../screens/ServicesScreen";
import ActionsListScreen from "../screens/ActionsListScreen";
import FinishEditAreaScreen from "../screens/FinishEditAreaScreen";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AppletDetailsScreen"
        component={AppletDetailsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditArea"
        component={EditAreaScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Services"
        component={ServicesScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ActionsList"
        component={ActionsListScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FinishEditArea"
        component={FinishEditAreaScreen}
        options={{
          headerShown: false,
        }}
      />

    </Stack.Navigator>
  );
}