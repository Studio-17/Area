import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  SafeAreaView,
  View,
  Pressable,
} from "react-native";

// Redux
import { Service } from "../../redux/models/serviceModels";

import MyText from "../../components/MyText";
import CustomButton from "../../components/CustomButton";

// Icons
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  openConnectToServiceModal?: boolean;
  setOpenConnectToServiceModal?: any;
  service?: Service;
  onClickToConnect?: () => void;
};

export default function ConnectionToServiceModal(
  {
    openConnectToServiceModal,
    setOpenConnectToServiceModal,
    service,
    onClickToConnect
  }: Props) {
  return (
    <Modal
      animationType="slide"
      visible={openConnectToServiceModal}
    >
      <SafeAreaView>
        <View style={styles.modalContainer}>
          <Pressable
            style={styles.button}
            onPress={() => setOpenConnectToServiceModal(false)}
          >
            <MaterialCommunityIcons name="close" color={"black"} size={50} />
          </Pressable>
        </View>
        <View style={{ padding: 20 }}>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <MyText>
              {service?.name}
            </MyText>
          </View>
          <CustomButton label="Connect" onPress={onClickToConnect} />
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
