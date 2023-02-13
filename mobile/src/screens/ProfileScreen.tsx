import * as React from "react";
import { SafeAreaView, Text, StyleSheet, StatusBar } from "react-native";
import MainHeader from "../components/MainHeader";

export default function ProfileScreen({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView style={styles.screenContainer}>
      <MainHeader />
      <Text>Profile Screen...</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#FFF7FA",
  },
});