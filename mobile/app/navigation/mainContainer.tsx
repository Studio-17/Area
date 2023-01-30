import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomHeader from "./customHeader";
import { View, StyleSheet, Text } from "react-native";

// Screens
import HomeScreen from "../screens/homeScreen";
import ProfileScreen from "../screens/profileScreen";
import NewAppletScreen from "../screens/newAppletScreen";

const Tab = createBottomTabNavigator();

function MainContainer() {

  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarActiveTintColor: "#A37C5B",
        headerTitleAlign: "left",
        headerStyle: {
          backgroundColor: "#FFF7FA",
        },
        headerTitle: () => <CustomHeader />,
        headerRight: () => (
          <View
            style={styles.profileIcon}
          >
            <Text>VP</Text>
          </View>
        ),
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
        component={HomeScreen}
        options={{
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

const styles = StyleSheet.create({
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 10,
    backgroundColor: "#0165F5",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MainContainer;
