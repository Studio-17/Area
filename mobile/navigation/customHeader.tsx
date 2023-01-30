import * as React from "react";
import { Text, StyleSheet } from "react-native";

function CustomHeader() {
  return (
    <Text style={styles.title}>
      R<Text style={styles.blueText}>e</Text>accoon
    </Text>
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
  },
  headerContainer: {
    flexDirection: "row",
    flex: 1,
    display: "flex",
  },
});

export default CustomHeader;
