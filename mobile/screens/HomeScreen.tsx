import * as React from "react";
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  StatusBar,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import AppletDetailsScreen from "./AppletDetailsScreen";
import MainHeader from "../components/MainHeader";
import Applet from "../components/Cards/AppletCard";
import axios from "axios";
import { useEffect, useState } from "react";

const DATA = [
  {
    uuid: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    name: "First Item",
  },
  {
    uuid: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    name: "Second Item",
  },
  {
    uuid: "58694a0f-3da1-471f-bd96-145571e29d72",
    name: "Third Item",
  },
  {
    uuid: "58294a0f-3da1-471f-bd96-145571e29d72",
    name: "Fourth Item",
  },
  {
    uuid: "58296f0f-3da1-471f-bd96-145571e29d72",
    name: "Fifth Item",
  },
];


function HomeScreen({ navigation }: { navigation: any }) {
  // const [data, setData] = useState<any>([]);
  // useEffect(() => {
  //   getApplets();
  // }, []);
  const data = DATA;

  // const getApplets = () => {
  //   axios.get("http://localhost:8000/api/area").then((response) => {
  //     setData(response.data);
  //     // data = DATA;
  //   });
  // };

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
