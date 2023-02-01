import React from "react";
import {
  Text,
  StyleSheet,
  Pressable,
  View,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";


export default function ActionCard({ textValue, color, handleFunction }: any) {
  return (
    <View style={{ paddingVertical: 13, paddingHorizontal: 40 }}>
      <View style={[styles.cardProperties, {backgroundColor: color}]}>
        <Text style={styles.cardTitle}>{textValue}</Text>
        <Pressable
          onPress={handleFunction}
          style={styles.cardButton}
        >
          <MaterialCommunityIcons
            name="plus"
            color={"black"}
            size={35}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardProperties: {
    padding: 15,
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    margin: "auto",
    padding: 10,
    color: "black",
    fontSize: 35,
    fontWeight: "bold",
  },
  cardButton: {
    backgroundColor: "white",
    borderRadius: 100,
    height: 50,
    width: 50,
    marginRight: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }
});