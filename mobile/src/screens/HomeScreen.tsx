import * as React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  Pressable,
} from "react-native";

// Navigation
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import AppletDetailsScreen from "./AppletDetailsScreen";

// Redux
import { useAreasQuery, useDeleteAreaMutation } from "../redux/services/servicesApi";
import { Area } from "../redux/models/areaModels";

// Components
import MainHeader from "../components/MainHeader";
import AppletCard from "../components/Cards/AppletCard";
import MyText from "../components/MyText";

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
  const { data: areas, isLoading, isFetching, refetch } = useAreasQuery();

  return (
    <SafeAreaView style={styles.container}>
      <MainHeader />
      <ScrollView>
          {areas?.length !== 0 ? (
          <>
            {areas?.map((area: Area, index: number) => (
              <AppletCard navigation={navigation} area={area} key={index} />
            ))}
          </>
        ) : (
          <MyText style={styles.textNew}>No coonies yet ...</MyText>
        )}
      </ScrollView>
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
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
    backgroundColor: "#FFF7FA",
  },
  textNew: {
    textAlign: "center",
    color: "black",
    fontSize: 20,
  },
});
