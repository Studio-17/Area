import * as React from "react";
import { SafeAreaView, StyleSheet } from "react-native";

// Components
import MyText from "../MyText";

export default function DetailsActionCard({ children, style }: { children: any, style?: any }) {
  return (
    <SafeAreaView style={[styles.actionCard, style]}>
      <MyText style={styles.cardTitle}>{children}</MyText>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  actionCard: {
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    backgroundColor: "#0165F5",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  cardTitle: {
    margin: "auto",
    padding: 15,
    color: "black",
    fontSize: 15,
  },
});
