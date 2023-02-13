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
import { Action } from "../../redux/models/actionModels";
import ServiceCard from "../Cards/ServiceCard";
import { useState } from "react";
import ActionCard from "../Cards/ActionCard";

interface Props {
  open: boolean;
  onClose: () => void;
  setActionSelected: React.Dispatch<React.SetStateAction<Action | null>>;
  service: Service | undefined;
}

const DATA = [
    {
        id: "1",
        title: "First Item",
    },
    {
        id: "2",
        title: "Second Item",
    },
    {
        id: "3",
        title: "Third Item",
    },
    {
        id: "4",
        title: "Fourth Item",
    },
    {
        id: "5",
        title: "Fifth Item",
    },
];

export default function ActionsModal({
  open,
  onClose,
  service,
  setActionSelected,
}: Props) {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const actions = DATA;

  return (
    <Modal animationType="slide" visible={open} onRequestClose={onClose}>
      <SafeAreaView>
        <View style={styles.modalContainer}>
          <Pressable style={styles.button} onPress={onClose}>
            <MaterialCommunityIcons name="close" color={"black"} size={50} />
          </Pressable>
        </View>
        <View style={{ padding: 10 }}>
          {actions?.map((service, index) => (
            // <ActionCard
            //   onClose={onClose}
            //   setServiceSelected={setServiceSelected}
            //   service={service}
            //   logo={""}
            //   key={index}
            // />
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
