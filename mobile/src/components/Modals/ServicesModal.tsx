import React from "react";
import {
  Modal,
  StyleSheet,
  SafeAreaView,
  View,
  Pressable,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Service } from "../../redux/models/serviceModels";

import ServiceCard from "../Cards/ServiceCard";
import { ScrollView } from "react-native-gesture-handler";

interface Props {
  openServicesModal: boolean;
  onCloseServicesModal: () => void;
  setOpenServicesModal: any;
  // setOpenActionModal?: any;
  setServiceSelected?: any;
  services?: Service[] | null;
  onClickService: any;
}

export default function ServicesModal({
  openServicesModal,
  onCloseServicesModal,
  setOpenServicesModal,
  setServiceSelected,
  // setOpenActionModal,
  services,
}: Props) {
  const cardGap = 20;

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
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              marginLeft: cardGap,
              marginRight: cardGap,
            }}
          >
            {/* {services?.map((service, index) => (
                // <ServiceCard
                //   // setServiceSelected={setServiceSelected}
                //   service={service}
                //   setOpenActionModal={setOpenActionModal}
                //   setOpenServicesModal={setOpenServicesModal}
                //   key={index}
                //   cardGap={cardGap}
                //   index={index}
                // />
            ))} */}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    display: "flex",
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
