import * as React from "react";
import { Text, StyleSheet, SafeAreaView, StatusBar } from "react-native";

function MainHeader() {
  return (
    <SafeAreaView style={styles.headerContainer}>
      <Text style={styles.title}>
        R<Text style={styles.blueText}>e</Text>accoon
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  blueText: {
    color: "#0165F5",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#A37C5B",
    margin: 10,
    marginLeft: 20,
  },
  headerContainer: {
    marginTop: StatusBar.currentHeight || 0,
  },
});

export default MainHeader;
