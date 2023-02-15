import React from "react";
import { Modal, StyleSheet, SafeAreaView, View, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Service } from "../../redux/models/serviceModels";

import ServiceCard from "../Cards/ServiceCard";

interface Props {
  openServicesModal: boolean;
  onCloseServicesModal: () => void;
  setOpenActionModal: any;
  setServiceSelected?: any;
  services?: Service[] | null;
}

export default function ServicesModal({
  openServicesModal,
  onCloseServicesModal,
  setServiceSelected,
  setOpenActionModal,
  services,
}: Props) {
  return (
    <Modal
      animationType="slide"
      visible={openServicesModal}
      onRequestClose={onCloseServicesModal}
    >
      <SafeAreaView>
        <View style={styles.modalContainer}>
          <Pressable style={styles.button} onPress={onCloseServicesModal}>
            <MaterialCommunityIcons name="close" color={"black"} size={50} />
          </Pressable>
        </View>
        <View style={{ padding: 10 }}>
          {services?.map((service, index) => (
            <ServiceCard
              setServiceSelected={setServiceSelected}
              service={service}
              setOpenActionModal={setOpenActionModal}
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
