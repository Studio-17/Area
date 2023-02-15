import React from "react";
import {
  Modal,
  StyleSheet,
  SafeAreaView,
  View,
  Pressable,
} from "react-native";

// Icons
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Models
import { Service } from "../../redux/models/serviceModels";
import { Action } from "../../redux/models/actionModels";

// API
import { useActionsQuery } from "../../redux/services/servicesApi";

import ActionCard from "../Cards/ActionCard";

interface Props {
  openActionsModal: boolean;
  onCloseActionsModal: () => void;
  onCloseServicesModal: () => void;
  service: Service;
  onClickOnAreasCards: any;
  typeSelected: "action" | "reaction";
}

export default function ActionsModal(
  {
    openActionsModal,
    onCloseActionsModal,
    onCloseServicesModal,
    service,
    onClickOnAreasCards,
    typeSelected
  }: Props) {
  const {
    data: actions,
    isError,
    isLoading,
    isFetching,
  } = useActionsQuery(service.uuid);

  return (
    <Modal animationType="slide" visible={openActionsModal} onRequestClose={onCloseActionsModal}>
      <SafeAreaView>
        <View style={styles.modalContainer}>
          <Pressable style={styles.button} onPress={onCloseActionsModal}>
            <MaterialCommunityIcons name="close" color={"black"} size={50} />
          </Pressable>
        </View>
        <View style={{ padding: 10 }}>
          {actions
            ?.filter((action: Action) => action.type === typeSelected)
            .map((action: Action, index: number) => (
              <ActionCard
                onClose={onCloseActionsModal}
                onCloseServicesModal={onCloseServicesModal}
                actionContent={
                  typeSelected === "action" ? action.name : undefined
                }
                reactionContent={
                  typeSelected === "reaction" ? action.name : undefined
                }
                onClick={onClickOnAreasCards}
                uuidOfAction={action.uuid}
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
