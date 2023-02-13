import React from "react";
import {
  Modal,
  StyleSheet,
  SafeAreaView,
  View,
  Pressable,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Service } from "../../redux/models/serviceModels";
import ServiceCard from "../Cards/ServiceCard";
import { useState } from "react";
import ActionsModal from "./ActionsModal";

interface Props {
  open: boolean;
  onClose: () => void;
  setServiceSelected?: any;
  services?: Service[] | undefined;
  setActionSelected?: any;
}

export default function ServicesModal({
  open,
  onClose,
  setServiceSelected,
  setActionSelected,
  services,
}: Props) {

  const [openModal, setOpenModal] = useState<boolean>(false);

  const actions = [
    {
      name: "Action 1",
      uuid: "uuid1",
      description: "Description 1",
      type: "action",
    },
    {
      name: "Action 2",
      uuid: "uuid2",
      description: "Description 2",
      type: "action"
    },
    {
      name: "Action 3",
      uuid: "uuid3",
      description: "Description 3",
      type: "action"
    }
  ];

  const handleClose = () => {
    onClose();
    setOpenModal(false);
  };

  return (
    <Modal animationType="slide" visible={open} onRequestClose={onClose}>
      <ActionsModal open={openModal} onClose={handleClose} actions={actions} setActionSelected={setActionSelected} />
      <SafeAreaView>
        <View style={styles.modalContainer}>
          <Pressable style={styles.button} onPress={onClose}>
            <MaterialCommunityIcons name="close" color={"black"} size={50} />
          </Pressable>
        </View>
        <View style={{ padding: 10 }}>
          {services?.map((service, index) => (
            <ServiceCard
              onClose={onClose}
              setServiceSelected={setServiceSelected}
              service={service}
              logo={""}
              setOpenModal={setOpenModal}
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
