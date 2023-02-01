import React from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Service from "../Service";

export default function AllServicesModal({ name, modalVisible, setModalVisible, data }: any) {
  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity
          onPress={() => setModalVisible(!modalVisible)}
        >
          <MaterialCommunityIcons
            name="chevron-left"
            color={"black"}
            size={50}
          />
        </TouchableOpacity>
        <Text style={styles.textModal}>Select {name}</Text>
      </View>
      <View style={{ padding: 10 }}>
        <FlatList
          data={data}
          renderItem={({ item }) => <Service item={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "FFF7FA"
  },
  textModal: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#A37C5B",
  },
});
