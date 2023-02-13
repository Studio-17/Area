import React from "react";
import {
  Modal,
  StyleSheet,
  SafeAreaView,
  View,
  Pressable,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Action } from "../../redux/models/actionModels";

import ActionCard from "../Cards/ActionCard";

interface Props {
  open: boolean;
  onClose: () => void;
  setActionSelected?: any;
  actions?: Action[] | undefined;
}

export default function ActionsModal({
  open,
  onClose,
  actions,
  setActionSelected,
}: Props) {

  return (
    <Modal animationType="slide" visible={open} onRequestClose={onClose}>
      <SafeAreaView>
        <View style={styles.modalContainer}>
          <Pressable style={styles.button} onPress={onClose}>
            <MaterialCommunityIcons name="close" color={"black"} size={50} />
          </Pressable>
        </View>
        <View style={{ padding: 10 }}>
          {actions?.map((action, index) => (
            <ActionCard
              onClose={onClose}
              setActionSelected={setActionSelected}
              logo={""}
              action={action}
              key={index}
            />
          ))}
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "FFF7FA",
  },
  textModal: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#A37C5B",
  },
  button: {
    margin: 10,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
});
