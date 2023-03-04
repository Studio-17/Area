import * as React from "react";

// Icons
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Screens
import ProfileScreen from "../screens/ProfileScreen";
import HomeStack from "../navigation/HomeNavigator";
import NewAreaStack from "../navigation/NewAreaNavigator";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {

  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarActiveTintColor: "#A37C5B",
        headerShown: false,
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
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="New"
        component={NewAreaStack}
        options={{
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
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
