import * as React from "react";
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  StatusBar,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import AppletDetailsScreen from "./AppletDetailsScreen";
import MainHeader from "../components/Header/MainHeader";
import Applet from "../components/Card/AppletCard";
import axios from "axios";
import { useEffect, useState } from "react";


function HomeScreen({ navigation }: { navigation: any }) {
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    getApplets();
  }, []);

  const getApplets = () => {
    axios.get("http://localhost:8000/api/area").then((response) => {
      setData(response.data);
    });
  };

  return (
    <SafeAreaView style={styles.cardContainer}>
      <MainHeader />
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Applet navigation={navigation} item={item} />
        )}
        keyExtractor={(item) => item.uuid}
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
