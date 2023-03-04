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
// import { createStackNavigator } from "@react-navigation/stack";

// Screens
// import AppletDetailsScreen from "./AppletDetailsScreen";
// import EditAreaScreen from "./EditAreaScreen";

// Redux
import { useAreasQuery, useDeleteAreaMutation } from "../redux/services/servicesApi";
import { Area } from "../redux/models/areaModels";

// Components
import MainHeader from "../components/MainHeader";
import AppletCard from "../components/Cards/AppletCard";
import MyText from "../components/MyText";
// import ServicesScreen from "./ServicesScreen";
// import ActionsListScreen from "./ActionsListScreen";
// import FinishEditAreaScreen from "./FinishEditAreaScreen";

export default function HomeScreen({ navigation }: { navigation: any }) {
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
