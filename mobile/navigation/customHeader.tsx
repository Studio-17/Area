import * as React from "react";
import { Text, StyleSheet, View } from "react-native";

function CustomHeader() {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>
        R<Text style={styles.blueText}>e</Text>accoon
      </Text>
      <View style={styles.profileIcon}>
        <Text>VP</Text>
      </View>
    </View>
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
  },
  headerContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
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

export default CustomHeader;
