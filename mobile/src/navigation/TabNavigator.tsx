import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";

// Screens
import HomeStack from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {

  function BlankNewPlaceholder() {
    return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}></View>
    );
  };

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
        component={BlankNewPlaceholder}
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
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("newapplet");
          },
        })}
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
