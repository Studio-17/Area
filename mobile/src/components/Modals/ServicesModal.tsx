import * as React from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  View,
  Pressable,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Service } from "../../redux/models/serviceModels";
import ServiceCard from "../Cards/ServiceCard";
import { useState } from "react";
import ActionCard from "../Cards/ActionCard";

interface Props {
  open: boolean;
  onClose: () => void;
  setServiceSelected: React.Dispatch<React.SetStateAction<Service | null>>;
  services: Service[] | undefined;
  setActionSelected: React.Dispatch<React.SetStateAction<Service | null>>;
}

export default function ServicesModal({
  open,
  onClose,
  setServiceSelected,
  setActionSelected,
  services,
}: Props) {
  const [openModal, setOpenModal] = useState<boolean>(false);

  console.log(services)

  return (
    <Modal animationType="slide" visible={open} onRequestClose={onClose}>
      {/* <ActionCard
        // setServiceSelected={setServiceSelected}
        open={openModal}
        onClose={() => setOpenModal(false)}
        services={services}
      /> */}
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
