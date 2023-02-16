import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

// Components
import MyText from "../components/MyText";

interface Props {
  label?: string;
  onPress?: any;
}

export default function CustomButton({ label, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.containerBtn}>
      <MyText style={styles.textBtn}>{label}</MyText>
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
