import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
  label?: string;
  onPress?: any;
}

export default function CustomButton({ label, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.containerBtn}>
      <Text style={styles.textBtn}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerBtn: {
    backgroundColor: "#0165F5",
    padding: 20,
    borderRadius: 100,
    marginBottom: 30,
  },
  textBtn: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
    color: "#fff",
  },
});
