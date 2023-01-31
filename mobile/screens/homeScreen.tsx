import * as React from "react";
import { SafeAreaView, StyleSheet, FlatList, StatusBar, Text, Pressable } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import AppletDetailsScreen from "./AppletDetailsScreen";
import CustomHeader from "../navigation/CustomHeader";
import Applet from "../components/Applet";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    color: "grey",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
    color: "grey",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
    color: "grey",
  },
  {
    id: "58694a0f-3dze-471f-bd96-145571e29d72",
    title: "Fourth Item",
    color: "grey",
  },
  {
    id: "58434a0f-3dze-471f-bd96-145571e29d72",
    title: "Fifth Item",
    color: "grey",
  },
];

function HomeScreen({ navigation } : { navigation: any }) {

  const data = DATA;

  return (
    <SafeAreaView style={styles.cardContainer}>
      <CustomHeader />
      <FlatList
        data={data}
        renderItem={({ item }) => <Applet navigation={navigation} item={item} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

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
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#FFF7FA",
  },
});
