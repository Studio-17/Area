import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar
} from "react-native";

// Components
import MyText from "../components/MyText";

function MainHeader() {
  return (
    <SafeAreaView style={styles.headerContainer}>
      <MyText style={styles.title}>
        R<MyText style={styles.blueText}>e</MyText>accoon
      </MyText>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  blueText: {
    color: "#0165F5",
  },
  title: {
    fontSize: 35,
    color: "#A37C5B",
    margin: 10,
    marginLeft: 20,
  },
  headerContainer: {
    marginTop: StatusBar.currentHeight || 0,
  },
});

export default MainHeader;
