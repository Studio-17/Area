import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Screens
import HomeStack from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import NewAppletScreen from "../screens/NewAppletScreen";

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarActiveTintColor: "#A37C5B",
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: "bold",
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
      }}
      sceneContainerStyle={{
        backgroundColor: "white",
        borderStyle: "solid",
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="NewAppletScreen"
        component={NewAppletScreen}
        options={{
          headerShown: false,
          tabBarLabel: "New",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
